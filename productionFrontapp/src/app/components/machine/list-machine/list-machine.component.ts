import { Component, OnInit } from '@angular/core';
import { Machine } from 'src/app/model/machine';
import { MachineService } from 'src/app/service/machine.service';

@Component({
  selector: 'app-list-machine',
  templateUrl: './list-machine.component.html',
  styleUrls: ['./list-machine.component.css']
})
export class ListMachineComponent implements OnInit {

  machines: Machine[] = [];

  constructor(private machineService: MachineService) { }

  ngOnInit() {
    this.getAllMachines();
  }

  getAllMachines() {
    this.machineService.getAllMachines()
    .subscribe(machines => {
      this.machines = machines;
    });
  }
/* 
  addMachine(nom: string, description: string, capacite: number, status: string) {
    const newMachine: Machine = {nom, description, capacite, status} as Machine;
    this.machineService.addMachine(newMachine)
    .subscribe(machine => {
      this.machines.push(machine);
    });
  }

 */


  deleteMachine(machine: Machine) {
    this.machineService.deleteMachine(machine.id)
    .subscribe(() => {
      this.machines = this.machines.filter(m => m !== machine);
    });
  }
  

  
}