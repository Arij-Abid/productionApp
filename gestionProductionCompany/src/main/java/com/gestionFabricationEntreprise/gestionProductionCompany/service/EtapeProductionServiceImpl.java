package com.gestionFabricationEntreprise.gestionProductionCompany.service;

import java.util.List;

import com.gestionFabricationEntreprise.gestionProductionCompany.domain.User;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.EtapeProduction;

public interface EtapeProductionServiceImpl  {

	
    List<EtapeProduction> getAllEtapeProductions();
    EtapeProduction getEtapeProductionById(Integer id);
    EtapeProduction createEtapeProduction(EtapeProduction etapeProduction);
    EtapeProduction updateEtapeProduction(Integer id, EtapeProduction etapeProduction);
    void deleteEtapeProduction(Integer id);
    EtapeProduction getEtapeProductionByUserId(String  userId);
    
}
