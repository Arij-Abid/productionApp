import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/enum/role.enum';
import { EtapeProduction } from 'src/app/model/etape-production';
import { OrdreFabrication } from 'src/app/model/ordre-fabrication';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { EtapeProductionService } from 'src/app/service/etape-production.service';
import { OrdreFabricationService } from 'src/app/service/ordre-fabrication.service';

@Component({
  selector: 'app-update-etape-production',
  templateUrl: './update-etape-production.component.html',
  styleUrls: ['./update-etape-production.component.css']
})
export class UpdateEtapeProductionComponent implements OnInit {

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
   

 ordreFabrications: OrdreFabrication[]= [];
 employees: User[] = []; // List of employees

  constructor(
    private etapeProductionService: EtapeProductionService,
    private router: Router,
    private route: ActivatedRoute, 
    private authenticationService: AuthenticationService

    
  ) { }

  public isAdminOrSuperAdmin: boolean;

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.ROLE_SUPER_ADMIN;
  }

  public get isResponsable(): boolean {
    return this.isAdmin || this.getUserRole() === Role.RESPONSABLE;
  }

  public get isAdminOrResponsable(): boolean {
    return this.isAdmin || this.isResponsable;
  }

  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Extract the id parameter from the route
      this.loadEtapeProduction(id);// Appel à loadProduct pour récupérer les détails du produit
      this.loadOrdreFabrications();
     this.loadEmployees();

    });
  }



  loadEtapeProduction(id: number): void {
    this.etapeProductionService.getEtapeProductionById(id).subscribe(
      (etapeProduction: EtapeProduction) => {
        this.etapeProduction = etapeProduction;
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

  loadOrdreFabrications(): void {
    this.etapeProductionService.getAllOrdreFabrications().subscribe(
      (ordreFabrications: OrdreFabrication[]) => {
        this.ordreFabrications = ordreFabrications;
  
        // Trouver l'ordre de fabrication actuel
        // Maintenant, vous pouvez utiliser la variable "ordreFabricationActuel" pour accéder à la valeur actuelle de l'ordre de fabrication
  
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
 
updateEtapeProduction(): void {
  const id = this.etapeProduction.id;
  this.etapeProductionService.updateEtapeProduction(id, this.etapeProduction).subscribe(
    () => { // Modification : Supprimer le paramètre 'etapeProduction'
      console.log('Etape production mise à jour avec succès');
      this.router.navigate(['/etape/production']);
    },
    (error: any) => {
      console.error(error);
    }
  );
}

}