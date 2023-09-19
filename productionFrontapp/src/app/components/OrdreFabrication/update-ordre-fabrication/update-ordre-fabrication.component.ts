import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/model/client';
import { OrdreFabrication } from 'src/app/model/ordre-fabrication';
import { OrdreFabricationService } from 'src/app/service/ordre-fabrication.service';

@Component({
  selector: 'app-update-ordre-fabrication',
  templateUrl: './update-ordre-fabrication.component.html',
  styleUrls: ['./update-ordre-fabrication.component.css']
})
export class UpdateOrdreFabricationComponent implements OnInit {

  ordreFabrication: OrdreFabrication = {
    id: 0,
    name:'',
    date_sortie: new Date(),
    date_creation: new Date(),
    description: '',
    qte_produite: 0,
    progression:  0,
    status: '',
    client_id: { id: 0, adresse: '', email: '', name: '', tel: 0, ville: '' }
  };
  clients: Client[] = [];
  

  constructor(
    private ordreFabricationService: OrdreFabricationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }




  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Extract the id parameter from the route
      this.loadOrdreFabrication(id);
      this.loadClients();
    });
  }

  loadOrdreFabrication(id: number): void {
    this.ordreFabricationService.getOrdreFabricationById(id).subscribe(
      (ordreFabrication: OrdreFabrication) => {
        this.ordreFabrication = ordreFabrication;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  loadClients(): void {
    this.ordreFabricationService.getAllClients().subscribe(
      (clients: Client[]) => {
        this.clients = clients;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  //
  updateOrdreFabrication(): void {
    const id = this.ordreFabrication.id; // Get the id value from the ordreFabrication object
    this.ordreFabricationService.updateOrdreFabrication(id, this.ordreFabrication).subscribe(
      (ordreFabrication: OrdreFabrication) => {
        console.log(ordreFabrication);
        this.router.navigate(['/ordreFabrications']);
        // Do something after successfully updating the ordreFabrication
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
 
}