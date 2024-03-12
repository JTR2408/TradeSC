import { DataService } from './data.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Ship } from './ships.model';
import { Injectable } from '@angular/core';
import { tradePost } from './tradePost.model';
import { tradeRoute } from './tradeRoute.model'


@Injectable({
    providedIn: 'root'
  })
  export class OptimizationService {
  
    constructor(private dataService: DataService) {}
  
    // findBestTradeRoute(investment: number): Observable<tradeRoute | null> {
    //   return this.dataService.getTradePosts().pipe(
    //     switchMap(tradePosts => this.dataService.getShips().pipe(
    //       map(ships => this.calculateBestTradeRoute(investment, ships[0], tradePosts)) // Assuming only one ship is selected
    //     ))
    //   );
    // }

    findBestTradeRoute(investment: number, selectedShip: Ship): Observable<tradeRoute | null> {
      return this.dataService.getTradePosts().pipe(
        switchMap(tradePosts => {
          const tradeRoute = this.calculateBestTradeRoute(investment, selectedShip, tradePosts);
          return of(tradeRoute); // Assuming calculateBestTradeRoute returns a TradeRoute
        })
      );
    }
  
    // private calculateBestTradeRoute(investment: number, ship: Ship, tradePosts: tradePost[]): tradeRoute | null {
      
    //   console.log('Selected ship', ship);
    //   console.log('Investment amount:', investment);

    //   let bestTradeRoute: tradeRoute | null = null;
    //   let bestProfit = 0;
  
    //   for (const buyPost of tradePosts) {
    //       for (const sellPost of tradePosts) {
    //           for (const commodity in buyPost.prices) {
    //               const buyPrice = buyPost.prices[commodity].price_buy;
    //               const sellPrice = sellPost.prices[commodity].price_sell;
    //               const quantity = Math.min(Math.floor(investment / buyPrice), ship.scu);
    //               const cost = buyPrice * quantity;
    //               const revenue = sellPrice * quantity;
    //               const profit = revenue - cost;
  
    //               if (profit > bestProfit) {
    //                   bestTradeRoute = {
    //                       buyLocation: buyPost.name,
    //                       sellLocation: sellPost.name,
    //                       commodity: commodity,
    //                       quantity: quantity,
    //                       profit: profit
    //                   };
    //                   bestProfit = profit;
    //               }
    //           }
    //       }
    //   }
    //   console.log('Best trade route:', bestTradeRoute);
    //   return bestTradeRoute;
  //}
  private calculateBestTradeRoute(investment: number, ship: Ship, tradePosts: tradePost[]): tradeRoute | null {
    let bestTradeRoute: tradeRoute | null = null;
    let bestProfit = 0;

    console.log('Starting trade route calculation...');
    
    // Iterate over each buy trade post
    for (const buyPost of tradePosts) {
        console.log('Testing buy post:', buyPost.name);

        // Iterate over each sell trade post
        for (const sellPost of tradePosts) {
            console.log('Testing sell post:', sellPost.name);

            // Skip if buy and sell trade posts are the same
            if (buyPost === sellPost) {
                console.log('Skipping identical buy and sell post:', buyPost.name);
                continue;
            }

                // Add null check for sellPost.prices
            if (!sellPost.prices) {
              console.log(`Skipping sell post ${sellPost.name} as it has no prices`);
              continue;
          }

            console.log('Considering different buy and sell posts...');

            // Iterate over commodities available for buying at the buy trade post
            for (const commodity in buyPost.prices) {
                console.log('Considering commodity:', commodity);

                // Check if the commodity is available for selling at the sell trade post
                if (!(commodity in sellPost.prices)) {
                    console.log(`Skipping commodity '${commodity}' as it's not available for selling at ${sellPost.name}`);
                    continue;
                }

                console.log(`Commodity '${commodity}' is available for selling at ${sellPost.name}`);

                // Further processing for calculating profit...
            }
        }
    }

    console.log('Trade route calculation complete.');
    return bestTradeRoute;
}


}