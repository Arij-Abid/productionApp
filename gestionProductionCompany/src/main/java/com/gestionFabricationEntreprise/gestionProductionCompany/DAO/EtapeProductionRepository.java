package com.gestionFabricationEntreprise.gestionProductionCompany.DAO;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gestionFabricationEntreprise.gestionProductionCompany.entities.EtapeProduction;


@Repository
public interface EtapeProductionRepository extends JpaRepository<EtapeProduction, Integer> {
    Optional<EtapeProduction> findById(int etapeProductionId);
    
    Optional<EtapeProduction> findByEmployeeUserId(String userId);
}
