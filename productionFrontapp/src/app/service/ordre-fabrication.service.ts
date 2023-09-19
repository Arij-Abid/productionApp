import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Client } from '../model/client';
import { OrdreFabrication } from '../model/ordre-fabrication';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrdreFabricationService {

  host="http://localhost:8081/api/OrdreFabrication"
  clienthost="http://localhost:8081/api/client"

  constructor(private http: HttpClient) { }

//ddd


getAllOrdreFabrications(): Observable<OrdreFabrication[]> {
  return this.http.get<OrdreFabrication[]>(this.host+"/all");
}

addOrdreFabrication(ordreFabrication: OrdreFabrication): Observable<OrdreFabrication> {
  return this.http.post<OrdreFabrication>(this.host+"/add", ordreFabrication);
}
//getAllClients(): Observable<Client[]> {
 // return this.http.get<Client[]>(`${this.host}/all`);



getAllClients() {
  return this.http.get<Client[]>(`${this.clienthost+"/all"}`).pipe(
    catchError((error: any) => {
      console.error(error);
      return throwError('Une erreur est survenue lors de la récupération des clients.');
    })
  );
}

//

/*
  addOrdreFabrication(ordreFabrication: OrdreFabrication): Observable<OrdreFabrication> {
    const url = `${this.host}/ordresFabrication`;
    return this.http.post<OrdreFabrication>(url, ordreFabrication);
  }
*/
//const url = `${this.host}/api/OrdreFabrication/${id_of}`;




/*
deleteOrdreFabrication(id_OF: number): Observable<any> {
  const url = `${this.host}/${id_OF}`;
  return this.http.delete(url);
}
*/


deleteOrdreFabrication(id_of: number): Observable<any> {
  const url = `${this.host}/${id_of}`;
  return this.http.delete(url);
}

getOrdreFabricationById(id: number): Observable<OrdreFabrication> {
  const url = `${this.host}/${id}`;
  return this.http.get<OrdreFabrication>(url);
}


  getOrdresFabrication(): Observable<OrdreFabrication[]> {
    const url = `${this.host}/all`;
    return this.http.get<OrdreFabrication[]>(url);
  }

  
  updateOrdreFabrication(id: number, ordreFabrication: OrdreFabrication): Observable<OrdreFabrication> {
    const url = `${this.host}/${id}`;
    return this.http.put<OrdreFabrication>(url, ordreFabrication);
  }
  
  chartPercentOrderFabrication( ): Observable<any> {
    
    return this.http.get<any>(this.host+'/percentage-by-order');
  }


//*
 /* updateOrdreFabrication(ordreFabrication: OrdreFabrication): Observable<OrdreFabrication> {
    const url = `${this.host}/ordresFabrication/${ordreFabrication.id_of}`;
    return this.http.put<OrdreFabrication>(url, ordreFabrication);
  }

  deleteOrdreFabrication(id_of: number): Observable<any> {
    const url = `${this.host}/ordresFabrication/${id_of}`;
    return this.http.delete(url);
  }


  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>('http://localhost:8081/api/client/all');
  }
//*/




}











  /*
  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`api/clients/${id}`);
  }
  */


/*
  getAllOrdreFabrications(): Observable<OrdreFabrication[]> {
    return this.http.get<OrdreFabrication[]>(`${this.host}/all`);
  }
//love
addOrdreFabrication(ordreFabrication: OrdreFabrication): Observable<OrdreFabrication> {
  return this.http.post<OrdreFabrication>(this.host, ordreFabrication);
}

getOrdresFabrication(): Observable<OrdreFabrication[]> {
  return this.http.get<OrdreFabrication[]>(this.host);
}
}

getClients(): Observable<Client[]> {
  return this.http.get<Client[]>('http://localhost:8081/api/client/all');
}

getClientById(id: number): Observable<Client> {
  return this.http.get<Client>(`api/clients/${id}`);
}


}
*/