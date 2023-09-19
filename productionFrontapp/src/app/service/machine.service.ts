import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Machine } from '../model/machine';

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  private host = 'http://localhost:8081/api/machines';

  constructor(private http: HttpClient) {}

  getAllMachines(): Observable<Machine[]> {
    return this.http.get<Machine[]>(`${this.host}/all`);
  }

  getMachineById(id: number): Observable<Machine> {
    return this.http.get<Machine>(`${this.host}/${id}`);
  }

  addMachine(machine: Machine): Observable<void> {
    return this.http.post<void>(`${this.host}/add`, machine);
  }

  updateMachine(id: number, machine: Machine): Observable<void> {
    return this.http.put<void>(`${this.host}/${id}`, machine);
  }

  deleteMachine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.host}/${id}`);
  }
}

