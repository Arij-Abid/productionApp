package com.gestionFabricationEntreprise.gestionProductionCompany.service;

import java.util.List;
import java.util.Map;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestionFabricationEntreprise.gestionProductionCompany.DAO.ClientRepository;
import com.gestionFabricationEntreprise.gestionProductionCompany.DAO.OrdreFabricationRepository;
import com.gestionFabricationEntreprise.gestionProductionCompany.DAO.ProductRepository;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Client;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.OrdreFabrication;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Product;

public interface OrdreFabricationServiceImpl{ 
public List<OrdreFabrication> getAllOrdreFabrication();
public OrdreFabrication getOrdreFabricationById(int id);
public OrdreFabrication createOrdreFabrication(OrdreFabrication ordreFabrication);
public OrdreFabrication updateOrdreFabrication(int id, OrdreFabrication ordreFabrication);
public void deleteOrdreFabrication(int id); 
//  public OrdreFabricationService(OrdreFabricationRepository ordreFabricationRepository, ClientRepository clientRepository);
//  public  OrdreFabrication saveOrdreFabrication(OrdreFabrication ordreFabrication);
public Map<String, Double> calculatePercentageByOrdrer();
}