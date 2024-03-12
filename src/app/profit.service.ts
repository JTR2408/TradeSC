import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, map } from 'rxjs';
import { Ship } from './ships.model';
import { tradePost } from './tradePost.model';

@Injectable({
  providedIn: 'root'
})
export class ProfitService {

  constructor(private dataService: DataService) { }

  findBestTrade(ship: Ship, investment: number): Observable<string> {
    return this.dataService.getTradePosts().pipe(
      map((tradePosts: tradePost[]) => {
        let maxProfit = 0;
        let bestTrade = '';

        if (!tradePosts || tradePosts.length === 0) {
          return 'No trade posts available';
        }

        tradePosts.forEach((buyPost: tradePost) => {
          if (!buyPost.prices) {
            return;
          }
          for (const commodity in buyPost.prices) {
            const buyPrice = buyPost.prices[commodity].price_buy;
            const sellPost = this.findBestSellPost(commodity, tradePosts, buyPost);
            if (sellPost) {
              const sellPrice = sellPost.prices[commodity].price_sell;
              const profit = (sellPrice - buyPrice) * ship.scu;
              if (profit > maxProfit && buyPrice * ship.scu <= investment) {
                maxProfit = profit;
                bestTrade = `Buy ${commodity} from ${buyPost.name} and sell at ${sellPost.name}`;
              }
            }
          }
        });

        return bestTrade || 'No profitable trade found';
      })
    );
  }

  private findBestSellPost(commodity: string, tradePosts: tradePost[], buyPost: tradePost): tradePost | null {
    let maxSellPrice = 0;
    let bestSellPost: tradePost | null = null;

    tradePosts.forEach((sellPost: tradePost) => {
      if (sellPost !== buyPost && sellPost.prices && commodity in sellPost.prices) {
        const sellPrice = sellPost.prices[commodity].price_sell;
        if (sellPrice > maxSellPrice) {
          maxSellPrice = sellPrice;
          bestSellPost = sellPost;
        }
      }
    });

    return bestSellPost;
  }
}
