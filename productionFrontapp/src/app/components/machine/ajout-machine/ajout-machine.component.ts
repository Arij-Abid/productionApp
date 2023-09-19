import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Machine } from 'src/app/model/machine';
import { MachineService } from 'src/app/service/machine.service';

@Component({
  selector: 'app-ajout-machine',
  templateUrl: './ajout-machine.component.html',
  styleUrls: ['./ajout-machine.component.css']
})
export class AjoutMachineComponent implements OnInit {

  machine: Machine = {
    id: 0,
    nom: '',
    description: '',
    capacite: 0,
    status: ''
  };

  constructor(private machineService: MachineService, private router: Router) {}

  ngOnInit(): void {}

  addMachine(): void {
    this.machineService.addMachine(this.machine)
      .subscribe(() => {
        console.log('Machine added successfully.');
        this.router.navigate(['/machines']);
      }, error => {
        console.log('Failed to add machine:', error);
        // Handle error cases here
      });
  }
}