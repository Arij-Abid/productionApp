import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/enum/role.enum';
import { Client } from 'src/app/model/client';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ClientService } from 'src/app/service/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajoute-client',
  templateUrl: './ajoute-client.component.html',
  styleUrls: ['./ajoute-client.component.css']
})
export class AjouteClientComponent implements OnInit {

  
  client: Client = {
    id: 0,
    adresse:'',
    email:'',
    name: '',
    tel: 0,
    ville:  ''
  };
  ngOnInit(): void {}





public isAdminOrSuperAdmin: boolean;

  constructor(private authenticationService: AuthenticationService,private clientService: ClientService, private router: Router) {
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

  addClient(): void {
    this.clientService.createClient(this.client)
      .subscribe(() => {
        console.log('Client added successfully.');
        this.router.navigate(['/clients']);
      }, error => {
        console.log('Failed to add Client:', error);
        // Handle error cases here
      });
  }

*/
  
  addClient(): void {
    this.clientService.createClient(this.client)
      .subscribe(
        () => {
          console.log('Client added successfully.');
          Swal.fire('Success!', 'Client created successfully.', 'success');
          this.router.navigate(['/clients']);
        },
        error => {
          console.log('Failed to add Client:', error);
          // Handle error cases here
        }
      );
  }



}