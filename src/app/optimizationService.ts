import { DataService } from './data.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Ship } from './ships.model';
import { Injectable } from '@angular/core';
import { tradePost } from './tradePost.model';
import { tradeRoute } from './tradeRoute.model'


@Injectable({
    providedIn: 'root'
  })
  export class OptimizationService {
  
    constructor(private dataService: DataService) {}
  
    findBestTradeRoute(investment: number): Observable<tradeRoute | null> {
      return this.dataService.getTradePosts().pipe(
        switchMap(tradePosts => this.dataService.getShips().pipe(
          map(ships => this.calculateBestTradeRoute(investment, ships[0], tradePosts)) // Assuming only one ship is selected
        ))
      );
    }
  
    private calculateBestTradeRoute(investment: number, ship: Ship, tradePosts: tradePost[]): tradeRoute | null {
      let bestTradeRoute: tradeRoute | null = null;
      let bestProfit = 0;
  
      for (const tradePost of tradePosts) {
        for (const commodity in tradePost.prices) {
          const buyPrice = tradePost.prices[commodity].price_buy;
          const sellPrice = tradePost.prices[commodity].price_sell;
          const quantity = Math.min(Math.floor(investment / buyPrice), ship.scu);
          const cost = buyPrice * quantity;
          const revenue = sellPrice * quantity;
          const profit = revenue - cost;
  
          if (profit > bestProfit) {
            bestTradeRoute = {
              buyLocation: tradePost.name,
              sellLocation: tradePost.name, // For now, assume the sell location is the same as the buy location
              commodity: commodity,
              quantity: quantity,
              profit: profit
            };
            bestProfit = profit;
          }
        }
      }
      
      return bestTradeRoute;
    }
  }