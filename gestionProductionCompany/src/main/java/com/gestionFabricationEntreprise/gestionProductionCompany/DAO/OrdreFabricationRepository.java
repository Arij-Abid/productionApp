package com.gestionFabricationEntreprise.gestionProductionCompany.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gestionFabricationEntreprise.gestionProductionCompany.entities.OrdreFabrication;

@Repository
public interface OrdreFabricationRepository  extends JpaRepository<OrdreFabrication, Integer> {
	
	
	
	
}

