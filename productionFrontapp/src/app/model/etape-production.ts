import { OrdreFabrication } from "./ordre-fabrication";
import { User } from "./user";

export interface EtapeProduction {

    id: number,
    name: string,
    datedebut: Date,
    datefin: Date,
    description: string,
    qte_produite: number,
    progression: number,
     numEtape: number,
    status: string,
    ordre_fabrication_id: OrdreFabrication,
    employee_id:User,
    

}
