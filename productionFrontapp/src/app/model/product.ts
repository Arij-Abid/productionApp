import { Category } from "./category";
import { OrdreFabrication } from "./ordre-fabrication";

export interface Product {
    id: number;
    nom: string;
    prix: number;
    description: string;
    dateCreation: Date;
    livraison: Date;
    quantiteStock: number;
    category_id: Category,
    id_OF: OrdreFabrication,
}
