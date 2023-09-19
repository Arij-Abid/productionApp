import { Client } from "./client";
import { Product } from "./product";

export interface OrdreFabrication {


id: number,
name: string,
date_sortie: Date,
date_creation: Date,
description: string,
progression:  number,
qte_produite: number,
status: string,
client_id: Client,

//clientId:any;
//products: Product[], // Include products

}
