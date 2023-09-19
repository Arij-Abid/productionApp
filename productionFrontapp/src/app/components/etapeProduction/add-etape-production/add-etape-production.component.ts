import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/enum/role.enum';
import { EtapeProduction } from 'src/app/model/etape-production';
import { OrdreFabrication } from 'src/app/model/ordre-fabrication';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { EtapeProductionService } from 'src/app/service/etape-production.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-etape-production',
  templateUrl: './add-etape-production.component.html',
  styleUrls: ['./add-etape-production.component.css']
})
export class AddEtapeProductionComponent implements OnInit {


  etapeProduction : EtapeProduction  = {
    id: 0,
    name: '',
    description: '',
    datedebut: new Date(),
    qte_produite: 0,
    progression:  0,
    numEtape:  0,
    status: '',
    datefin: new Date(),
    ordre_fabrication_id: { id: 0, name:'', date_sortie: new Date(), date_creation: new Date(),
       description: '', qte_produite: 0,progression:  0, status: '', 
       client_id: {  id: 0,
        adresse: '',
        email:  '',
        name:  '',
        tel: 0,
        ville:  ''} 
      },
      employee_id:{

     userId: '', firstName: '',lastName: '',username:'',email: '',lastLoginDate: null,
    lastLoginDateDisplay: null,
    joinDate: null,
    profileImageUrl: '',
    active: false,
    notLocked: false,
   role: '',
   authorities: [],
      }
  };

  
  ordreFabrications: OrdreFabrication[] = [];
  employees: User[] = []; // List of employees
  //selectedEmployee: User; // Selected employee
  //etapes: EtapeProduction[]; // List of production steps
  isAdminOrSuperAdmin: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private etapeProductionService: EtapeProductionService,
    private router: Router
  ) {
    this.isAdminOrSuperAdmin = this.isAdmin || this.isSuperAdmin;
  }

  ngOnInit(): void {
    this.loadOrdreFabrications();
    this.loadEmployees();
 //   this.fetchEmployees(); // Fetch employees on component initialization
  }

  private get isAdmin(): boolean {
    const userRole = this.authenticationService.getUserRole();
    return userRole === Role.ADMIN;
  }

  private get isSuperAdmin(): boolean {
    const userRole = this.authenticationService.getUserRole();
    return userRole === Role.ROLE_SUPER_ADMIN;
  }

  loadOrdreFabrications(): void {
    this.etapeProductionService.getAllOrdreFabrications().subscribe(
      (ordreFabrications: OrdreFabrication[]) => {
        this.ordreFabrications = ordreFabrications;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  
  loadEmployees(): void {
    this.etapeProductionService.getAllEmployees().subscribe(
      (employees: User[]) => {
        this.employees = employees;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  addEtapeProduction(): void {
    this.etapeProductionService.createEtapeProduction(this.etapeProduction)
      .subscribe(
        () => {
          console.log('Etape Production added successfully.');
          Swal.fire('Success!', 'Etape Production created successfully.', 'success');
          this.router.navigate(['/etape/production']);
        },
        error => {
          console.log('Failed to add Etape Production:', error);
          // Handle error cases here
        }
      );
  }

  /*


addEtapeProduction(): void {
  if (this.etapeProduction.employee_id && this.etapeProduction.employee_id.userId) {
    this.etapeProduction.employee_id = this.etapeProduction.employee_id.userId;
  }

  this.etapeProductionService.createEtapeProduction(this.etapeProduction)
    .subscribe(
      () => {
        console.log('Etape Production added successfully.');
        Swal.fire('Success!', 'Etape Production created successfully.', 'success');
        this.router.navigate(['/etape/production']);
      },
      error => {
        console.log('Failed to add Etape Production:', error);
        // Handle error cases here
      }
    );
}


  */


  fetchEmployees() {
    // Call the userService to fetch employees of type ROLE_EMPLOYEE
    this.userService.getUsersByRole('ROLE_EMPLOYEE').subscribe(
      (employees: User[]) => {
        this.employees = employees;
      },
      (error: any) => {
        // Handle error
      }
    );
  }
/*
  assignEmployeeToEtape() {
    if (this.selectedEmployee) {
      // Call the etapeProductionService to assign the selected employee to the production step
      this.etapeProductionService
        .assignEmployeeToEtapeProduction(
          this.etapeProduction.id,
          this.selectedEmployee.userId,        )
        .subscribe(
          (response: any) => {
            // Success message or further actions
          },
          (error: any) => {
            // Handle error
          }
        );
    }
  }
*/
/*
  fetchAssignedEtapesForEmployee() {
    // Call the etapeProductionService to fetch the assigned production steps for the logged-in employee
    this.etapeProductionService.getAssignedEtapesForEmployee().subscribe(
      (etapes: EtapeProduction[]) => {
        this.etapes = etapes;
      },
      (error: any) => {
        // Handle error
      }
    );
  }*/


}