export interface commodities{
    id: number;
    id_parent: number;
    name: string;
    code: string;
    kind: string;
    price_buy: number;
    price_sell: number;
    is_available: boolean;
    is_visible: boolean;
    is_raw: boolean;
    is_harvestable: boolean;
    is_buyable: number;
    is_sellable: number;
    is_temporary: number;
    is_illegal: boolean;
    wiki: string;
    date_added: number;
    date_modified: number;
}