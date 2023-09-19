package com.gestionFabricationEntreprise.gestionProductionCompany.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestionFabricationEntreprise.gestionProductionCompany.DAO.MachineRepository;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Machine;

public  interface MachineServiceImpl{
    List<Machine> getAllMachines();
    Machine getMachineById(int id);
    void addMachine(Machine machine);
    void updateMachine(int id, Machine machine);
    void deleteMachine(int id);
}