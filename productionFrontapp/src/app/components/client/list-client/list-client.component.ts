import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/enum/role.enum';
import { Client } from 'src/app/model/client';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ClientService } from 'src/app/service/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {



  public isAdminOrSuperAdmin: boolean;
  public clients: Client[];

  constructor(
    private clientService: ClientService,
    private authenticationService: AuthenticationService
  ) {
    this.isAdminOrSuperAdmin = this.isAdmin || this.isSuperAdmin;
  }

  private get isAdmin(): boolean {
    const userRole = this.authenticationService.getUserRole();
    return userRole === Role.ADMIN;
  }

  private get isSuperAdmin(): boolean {
    const userRole = this.authenticationService.getUserRole();
    return userRole === Role.ROLE_SUPER_ADMIN;
  }


/*
  clients: Client[] = [];

  constructor(private clientService: ClientService) { }
  */

  ngOnInit() {
    this.getAllClients();
  }

  getAllClients(): void {
    this.clientService.getAllClients().subscribe(
      clients => {
        this.clients = clients;
        console.log('Clients retrieved successfully:', this.clients);
      },
      error => {
        console.log('Failed to retrieve clients:', error);
        // Handle error cases here
      }
    );
  }



  

  




  deleteClient(client: Client): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this client?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(client.id).subscribe(
          () => {
            console.log('Client deleted successfully.');
            this.getAllClients();
            Swal.fire('Success', 'Client deleted successfully.', 'success');
          },
          (error) => {
            console.log('Failed to delete client:', error);
            Swal.fire('Error', 'Failed to delete client.', 'error');
          }
        );
      }
    });
  }
  

}