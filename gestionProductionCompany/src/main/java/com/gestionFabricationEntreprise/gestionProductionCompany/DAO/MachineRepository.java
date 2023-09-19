package com.gestionFabricationEntreprise.gestionProductionCompany.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Machine;

@Repository
public interface MachineRepository extends JpaRepository<Machine, Integer> {
}
