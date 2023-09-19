package com.gestionFabricationEntreprise.gestionProductionCompany.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestionFabricationEntreprise.gestionProductionCompany.DAO.MachineRepository;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Machine;

@Service
public  class MachineService  implements MachineServiceImpl{

@Autowired
private MachineRepository machineRepository;

@Override
public List<Machine> getAllMachines() {
    return machineRepository.findAll();
}

@Override
public Machine getMachineById(int id) {
    return machineRepository.findById(id).orElse(null);
}

@Override
public void addMachine(Machine machine) {
    machineRepository.save(machine);
}

@Override
public void updateMachine(int id, Machine machine) {
    Machine existingMachine = machineRepository.findById(id).orElse(null);
    if (existingMachine != null) {
        existingMachine.setNom(machine.getNom());
        existingMachine.setDescription(machine.getDescription());
        existingMachine.setCapacite(machine.getCapacite());
        existingMachine.setStatus(machine.getStatus());
        machineRepository.save(existingMachine);
    }
}

@Override
public void deleteMachine(int id) {
    machineRepository.deleteById(id);
}
}

