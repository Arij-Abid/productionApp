import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Role } from '../enum/role.enum';
import { Category } from '../model/category';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  host="http://localhost:8081/api/categorie"
 

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}


  private getHeaders(): HttpHeaders {
    const token = this.authenticationService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  } 
  /*
  getAllCategorys(): Observable<Category[]> {
    if (this.authenticationService.getUserRole() === Role.SUPER_ADMIN) {
      const headers = this.getHeaders();
      return this.http.get<Category[]>(`${this.host}/all`);
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
  }
}
*/
/*
getAllCategorys(): Observable<Category[]> {
  const role = this.authenticationService.getUserRole();
  if (role === Role.SUPER_ADMIN) {
    const headers = this.getHeaders();
    return this.http.get<Category[]>(`${this.host}/all`, { headers });
  } else {
    // Handle unauthorized access
    //console.log("hi")
    return throwError('Unauthorized access');
  }
}
*/
getAllCategorys(): Observable<Category[]> {
  if (this.authenticationService.getUserRole() === Role.ROLE_SUPER_ADMIN) {
    const headers = this.getHeaders();
    console.log(this.authenticationService.getUserRole());
    return this.http.get<Category[]>(`${this.host}/all`, { headers });
  } else {
    // Gérer l'accès non autorisé
    return throwError('Unauthorized access');
  }
}

//


/*
  createClient(client: Client): Observable<void> {
    const headers = this.getHeaders();
    return this.http.post<void>(`${this.host}/add`, client, { headers });
  }
*/
  createCategory(category: Category): Observable<void> {
    // Check if the logged-in user has the SUPER_ADMIN role
    if (this.authenticationService.getUserRole() === Role.ROLE_SUPER_ADMIN) {
      const headers = this.getHeaders();
      return this.http.post<void>(`${this.host}/add`, category, { headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }
  

  updateCategory(id: number, category: Category): Observable<void> {
    const headers = this.getHeaders();
    return this.http.put<void>(`${this.host}/${id}`, category, { headers });
  }

  
  /*

 getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientsUrl);
  }
  */

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.host}/${id}`);
  }

  /*
  createClient(client: Client): Observable<void> {
    return this.http.post<void>(`${this.host}/add`, client);
  }
*/
/*
  createClient(client: Client): Observable<void> {
    // Check if the logged-in user has the SUPER_ADMIN role
    if (this.authenticationService.getUserFromLocalCache().role === Role.SUPER_ADMIN) {
      return this.http.post<void>(`${this.host}/add`, client);
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }
  
*/
/*

  updateClient(id: number, client: Client): Observable<void> {
    return this.http.put<void>(`${this.host}/${id}`, client);
  }
*/
 
  
/*
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.host}/${id}`);
  }

*/


  deleteCategory(id: number): Observable<void> {
    // Check if the logged-in user has the SUPER_ADMIN role
    if (this.authenticationService.getUserRole() === Role.ROLE_SUPER_ADMIN) {
      const headers = this.getHeaders();
      return this.http.delete<void>(`${this.host}/${id}`, { headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }

}

