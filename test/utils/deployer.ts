import {ethers} from "ethers";

const hre = require("hardhat");

export class Deployer {
    public bentoBox: any;
    public kashiMaster: any;
    public nabe: any;
    public oracle: any;
    public assets: any[];
    public collaterals: any[];
    public kashiPairs: any[];

    private static instance: Deployer;

    public static async getInstance(): Promise<Deployer> {
        if (Deployer.instance === undefined) {
            const bentoBox = await Deployer.deployBentoBox();
            const kashiMaster = await Deployer.deployKashiMaster(bentoBox);
            const nabe = await Deployer.deployNabe(bentoBox, kashiMaster);
            const oracle = await Deployer.deployOracle();
            Deployer.instance = new Deployer(bentoBox, kashiMaster, nabe, oracle);
        }
        return Deployer.instance;
    }

    private constructor(bentobox: any, kashiMaster: any, nabe: any, oracle: any) {
        this.bentoBox = bentobox;
        this.kashiMaster = kashiMaster;
        this.nabe = nabe;
        this.oracle = oracle;
        this.assets = [];
        this.collaterals = [];
        this.kashiPairs = [];
    }

    static async deployBentoBox(): Promise<any> {
        const WETH = await hre.ethers.getContractFactory('WETHMock');
        const weth = await WETH.deploy();
        await weth.deployed();
        const BentoBox = await hre.ethers.getContractFactory('BentoBox');
        const bentoBox = await BentoBox.deploy(weth.address);
        await bentoBox.deployed();
        return bentoBox;
    }

    static async deployKashiMaster(bentobox: any): Promise<any> {
        const KashiMaster = await hre.ethers.getContractFactory('KashiPair');
        const kashiMaster = await KashiMaster.deploy(bentobox.address);
        await kashiMaster.deployed();
        return kashiMaster;
    }

    static async deployNabe(bentoBox: any, kashiMaster: any): Promise<any> {
        const Nabe = await hre.ethers.getContractFactory('Nabe');
        const nabe = await Nabe.deploy(bentoBox.address, kashiMaster.address);
        await nabe.deployed();
        return nabe;
    }

    static async deployOracle(): Promise<any> {
        const Oracle = await hre.ethers.getContractFactory('OracleMock');
        const oracle = await Oracle.deploy();
        await oracle.deployed();
        return oracle;
    }

    static async deployERC20Mock(totalSupply: number): Promise<any> {
        const ERC20Mock = await hre.ethers.getContractFactory('ERC20Mock');
        const erc20 = await ERC20Mock.deploy(totalSupply);
        await erc20.deployed();
        return erc20;
    }

    async deployKashiPair(asset: any, collateral: any, oracle: any): Promise<void> {
        const data = hre.ethers.utils.defaultAbiCoder.encode(['address', 'address', 'address', 'bytes'], [collateral.address, asset.address, oracle.address, await oracle.getDataParameter()]);
        //@ts-ignore
        await this.bentoBox.deploy(this.kashiMaster.address, data, true);
    }

    public static getContractAddresses(contracts: any[]) {
        return contracts.map((contract) => {
            return contract.address;
        });
    }
}
