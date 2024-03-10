export interface tradePost {
    system: string;
    planet: string;
    satellite: string;
    city: string | null;
    code: string;
    name: string;
    name_short: string;
    space: string;
    visible: string;
    armistice: string;
    trade: string;
    outlaw: string;
    refinery: string;
    shops: string;
    restricted: string;
    minable: number;
    date_added: number;
    date_modified: number;
    prices: { [commodityCode: string]: Price };
}

export interface Price {
    name: string;
    kind: string;
    operation: "buy" | "sell";
    price_buy: number;
    price_sell: number;
    date_update: number;
    is_updated: boolean;
}