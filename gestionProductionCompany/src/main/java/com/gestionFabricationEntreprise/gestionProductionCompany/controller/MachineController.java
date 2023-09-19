package com.gestionFabricationEntreprise.gestionProductionCompany.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Machine;
import com.gestionFabricationEntreprise.gestionProductionCompany.service.MachineService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/machines")
public class MachineController {
    @Autowired
    private MachineService machineService;
    
    @GetMapping("/all")
    public List<Machine> getAllMachines() {
        return machineService.getAllMachines();
    }

    
    
    @GetMapping("/{id}")
    public Machine getMachineById(@PathVariable int id) {
        return machineService.getMachineById(id);
    }
    
    @PostMapping("/add")
    public void addMachine(@RequestBody Machine machine) {
        machineService.addMachine(machine);
    }
    
    @PutMapping("/{id}")
    public void updateMachine(@PathVariable int id, @RequestBody Machine machine) {
        machineService.updateMachine(id, machine);
    }
    
    @DeleteMapping("/{id}")
    public void deleteMachine(@PathVariable int id) {
        machineService.deleteMachine(id);
    }
}
