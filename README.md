<div align="center">
  <img src="https://user-images.githubusercontent.com/80489471/119342815-e7339b00-bc95-11eb-87fb-7c187f75c13a.png"/>
</div>


# Nabe - liquidity aggregator for kashi

Nabe is a liquidity aggregator for kashi.
It chase APYs between all pairs following the rules set by users that deposited liquidity inside.

## Why use Nabe ?

Kashi is one of the best lending solution in the market right now. It Allows you to borrow and lend your assets and manage the risks easily because each money market is a pair composed of an asset and a collateral. So when you lend you only need to trust 1 collateral ! In other money markets like Aave or Compound you need to trust multiple ones.

It brings another cool feature, because risks are isolated you can create a pair for every asset and collateral you want (as long as an oracle price is available for them).

But there is major problem, because everything is isolated if you want to lend on multiple pairs, you'll need to monitor them to allways get the best APY.

### Example

You trust ETH and YFI and have 1k USDC :

Lend APY on ETH is 10% and 3% on YFI.
So you will probably lend 1k USDC in the ETH pair.

It's a good idea but as utilization will go down because you provided liquidity, in few hours/days ETH APY will probably be lower than the YFI one, you will need to rebalance it or hope for more borrowers !
So you need to monitor APYs on your different trusted assets, it takes time and have a cost in gas especially on layer 1.

### Here is Nabe

Nabe is a smart contract where you can put your assets (ex: USDC), and say what are your trusted collaterals.
Nabe will chase APY's for you against performance fees and respect your assets allocations.

### How it works

Nabe is only the security contract, that verify allocations.
Most of the work is done off chain by the chef 👩‍🍳

The chef is an address chosen by the lender when lending tokens, there can be multiple chefs that compete with each other to attract more users and get more fees.
Indeed when you become a chef 👨‍🍳, you set your performance fees, it can be 5% or 50% it's up to you !
But keep in mind that if one of your lenders is not happy with your performances he can choose a new chef 👩‍🍳 !

When you are a chef you calculate the best recipe for your users off chain and then call Nabe to rebalance what's needs to be rabalanced (for example move 10% usdc from KmETH to kmYFI).
If the new allocation don't respect your users ones, Nabe will refuse it !

## Diagram

<img width="1148" alt="Capture d’écran 2021-06-21 à 15 43 28" src="https://user-images.githubusercontent.com/80489471/122773487-4072f800-d25d-11eb-845e-8b375cf4c2f1.png">



