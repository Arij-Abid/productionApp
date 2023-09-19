import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Role } from '../enum/role.enum';
import { Product } from '../model/product';
import { AuthenticationService } from './authentication.service';
import { Category } from '../model/category';
import { OrdreFabrication } from '../model/ordre-fabrication';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  host="http://localhost:8081/api/products"

  categoryhost="http://localhost:8081/api/categorie"
 ordreFabricationhost="http://localhost:8081/api/OrdreFabrication"
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getAllProducts(): Observable<Product []> {
    return this.http.get<Product []>(`${this.host}/all`);
  }
  
  getAllCategorys(): Observable<Category[]> {
    if (this.authenticationService.getUserRole() === Role.ROLE_SUPER_ADMIN) {
      const headers = this.getHeaders();
      console.log(this.authenticationService.getUserRole());
      return this.http.get<Category[]>(`${this.categoryhost}/all`, { headers });
    } else {
      // Gérer l'accès non autorisé
      return throwError('Unauthorized access');
    }
  }

  getAllOrdreFabrications(): Observable<OrdreFabrication[]> {
    return this.http.get<OrdreFabrication[]>(this.ordreFabricationhost+"/all");
  }


  private getHeaders(): HttpHeaders {
    const token = this.authenticationService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  createProduct(product: Product): Observable<void> {
    // Check if the logged-in user has the SUPER_ADMIN role
    if (this.authenticationService.getUserRole() === Role.ROLE_SUPER_ADMIN) {
      const headers = this.getHeaders();
      return this.http.post<void>(`${this.host}/add`, product, { headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }
  

  updateProduct(id: number, product: Product): Observable<void> {
    const headers = this.getHeaders();
    return this.http.put<void>(`${this.host}/${id}`, product, { headers });
  }



  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.host}/${id}`);
  }




  deleteProduct(id: number): Observable<void> {
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

