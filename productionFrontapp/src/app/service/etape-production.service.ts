import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Role } from '../enum/role.enum';
import { EtapeProduction } from '../model/etape-production';
import { OrdreFabrication } from '../model/ordre-fabrication';
import { AuthenticationService } from './authentication.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class EtapeProductionService {

  host="http://localhost:8081/api/etapeProduction"

 ordreFabricationhost="http://localhost:8081/api/OrdreFabrication"

employeehost="http://localhost:8081/user"


  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getAllEtapeProductions(): Observable<EtapeProduction []> {
    return this.http.get<EtapeProduction []>(`${this.host}/all`);
  }


  getAllOrdreFabrications(): Observable<OrdreFabrication[]> {
    return this.http.get<OrdreFabrication[]>(this.ordreFabricationhost+"/all");
  }

  getAllEmployees(): Observable<User[]> {
    return this.http.get<User[]>(this.employeehost+"/all/employee");
  }


  private getHeaders(): HttpHeaders {
    const token = this.authenticationService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  createEtapeProduction(etapeProduction: EtapeProduction): Observable<void> {
    // Check if the logged-in user has the SUPER_ADMIN role userRole === Role.RESPONSABLE || 
    const userRole = this.authenticationService.getUserRole();

    if (userRole === Role.ROLE_SUPER_ADMIN || userRole === Role.RESPONSABLE  ) {
      const headers = this.getHeaders();
      return this.http.post<void>(`${this.host}/add`, etapeProduction, { headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }

/*
  createEtapeProduction(etapeProduction: EtapeProduction): Observable<void> {
    if (this.authenticationService.getUserRole() === Role.ROLE_SUPER_ADMIN) {
      const headers = this.getHeaders();
      // Update the employee ID property
      etapeProduction.employee_id.userId = etapeProduction.employee_id.userId.toString();
      return this.http.post<void>(`${this.host}/add`, etapeProduction, { headers });
    } else {
      return throwError('Unauthorized access');
    }
  }
  
*/

  

  updateEtapeProduction(id: number, etapeProduction: EtapeProduction): Observable<void> {
    const headers = this.getHeaders();
    return this.http.put<void>(`${this.host}/${id}`, etapeProduction, { headers });
  }
  public getEtapeProductionByUserId(userId: string): Observable<EtapeProduction> {
    return this.http.get<EtapeProduction>(`${this.host}/etapeProductionByUserId/${userId}`);
  }
  

  getEtapeProductionById(id: number): Observable<EtapeProduction> {
    return this.http.get<EtapeProduction>(`${this.host}/${id}`);
  }

/*

  updateClient(id: number, client: Client): Observable<void> {
    return this.http.put<void>(`${this.host}/${id}`, client);
  }
*/
 


  deleteEtapeProduction(id: number): Observable<void> {
    const userRole = this.authenticationService.getUserRole();

    if (userRole === Role.ROLE_SUPER_ADMIN || userRole === Role.RESPONSABLE  ) {
      const headers = this.getHeaders();
      return this.http.delete<void>(`${this.host}/${id}`, { headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }
  
//new add
public assignEmployeeToEtapeProduction(etapeProductionId: number, employeeId: number): Observable<any> {
  return this.http.post<any>(`${this.host}/etape/assignEmployee`, {
    etapeProductionId,
    employeeId
  });
}

public getAssignedEtapesForEmployee(): Observable<EtapeProduction[]> {
  return this.http.get<EtapeProduction[]>(`${this.host}/etape/assignedEtapes`);
}






}

