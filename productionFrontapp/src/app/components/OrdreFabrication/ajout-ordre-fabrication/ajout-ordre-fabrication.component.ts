
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { OrdreFabrication } from 'src/app/model/ordre-fabrication';
import { OrdreFabricationService } from 'src/app/service/ordre-fabrication.service';
import { FormGroup, NgModel } from '@angular/forms'; // Add this line


@Component({
  selector: 'app-ajout-ordre-fabrication',
  templateUrl: './ajout-ordre-fabrication.component.html',
  styleUrls: ['./ajout-ordre-fabrication.component.css']
})
export class AjoutOrdreFabricationComponent implements OnInit {
 
ordreFabrication: OrdreFabrication = {
  id: 0,
  name:'',
  date_sortie: new Date(),
  date_creation: new Date(),
  description: '',
  qte_produite: 0,
  progression:  0,
  status: '',
  client_id: { id: 0, adresse: '', email: '', name: '', tel: 0, ville: '' },
  //products: [] // Include products

};
ordreFabricationForm: FormGroup; // Define a FormGroup for your form
clients: Client[] = [];

constructor(private ordreFabricationService: OrdreFabricationService, private router: Router) { }

ngOnInit(): void {
  this.loadClients();
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

addOrdreFabrication(): void {
  this.ordreFabricationService.addOrdreFabrication(this.ordreFabrication).subscribe(
    (ordreFabrication: OrdreFabrication) => {
      console.log(ordreFabrication);
      this.router.navigate(['/ordreFabrications']);
      // Do something after successfully adding the ordreFabrication
    },
    (error: any) => {
      console.error(error);
    }
  );
}
}