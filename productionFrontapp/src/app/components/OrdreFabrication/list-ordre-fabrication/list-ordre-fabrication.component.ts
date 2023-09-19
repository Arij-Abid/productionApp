import { Component, OnInit } from '@angular/core';
import { OrdreFabrication } from 'src/app/model/ordre-fabrication';
import { OrdreFabricationService } from 'src/app/service/ordre-fabrication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-ordre-fabrication',
  templateUrl: './list-ordre-fabrication.component.html',
  styleUrls: ['./list-ordre-fabrication.component.css']
})
export class ListOrdreFabricationComponent implements OnInit {

 
 //getAllOrdreFabrications
  ordreFabrications: OrdreFabrication[] = [];

  constructor(private ordreFabricationService: OrdreFabricationService) { }

  ngOnInit() {
    this.getAllOrdreFabrications();
  }

  getAllOrdreFabrications() {
    this.ordreFabricationService.getOrdresFabrication()
    .subscribe(ordreFabrications => {
      this.ordreFabrications = ordreFabrications;
    });
  }

  

  deleteOrdreFabrication(ordreFabrication: OrdreFabrication): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this ordreFabrication?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordreFabricationService.deleteOrdreFabrication(ordreFabrication.id).subscribe(
          () => {
            console.log('ordreFabrication deleted successfully.');
            this.getAllOrdreFabrications();
            Swal.fire('Success', 'ordreFabrication deleted successfully.', 'success');
          },
          (error) => {
            console.log('Failed to delete ordreFabrication:', error);
            Swal.fire('Error', 'Failed to delete ordreFabrication.', 'error');
          }
        );
      }
    });
  }
  


/*
  deleteOrdreFabrication(ordreFabrication: OrdreFabrication) {
    this.ordreFabricationService.deleteOrdreFabrication(ordreFabrication.id_of)
      .subscribe(() => {
        this.ordreFabrications = this.ordreFabrications.filter(m => m !== ordreFabrication);
      });
  }
  
  */


}

  
