import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Client } from '../model/client';
import { Role } from '../enum/role.enum';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  host="http://localhost:8081/api/client"


  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.host}/all`);
  }
  


  private getHeaders(): HttpHeaders {
    const token = this.authenticationService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
/*
  createClient(client: Client): Observable<void> {
    const headers = this.getHeaders();
    return this.http.post<void>(`${this.host}/add`, client, { headers });
  }
*/
  createClient(client: Client): Observable<void> {
    // Check if the logged-in user has the SUPER_ADMIN role
    if (this.authenticationService.getUserRole() === Role.ROLE_SUPER_ADMIN) {
      const headers = this.getHeaders();
      return this.http.post<void>(`${this.host}/add`, client, { headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }
  

  updateClient(id: number, client: Client): Observable<void> {
    const headers = this.getHeaders();
    return this.http.put<void>(`${this.host}/${id}`, client, { headers });
  }

  
  /*

 getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientsUrl);
  }
  */

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.host}/${id}`);
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


  deleteClient(id: number): Observable<void> {
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

