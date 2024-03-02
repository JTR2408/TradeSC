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
    is_buyable: boolean;
    is_sellable: boolean;
    is_temporary: boolean;
    is_illegal: boolean;
    wiki: string;
    date_added: number;
    date_modified: number;
}