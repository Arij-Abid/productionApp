package com.gestionFabricationEntreprise.gestionProductionCompany.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.EntityNotFoundException;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gestionFabricationEntreprise.gestionProductionCompany.DAO.ClientRepository;
import com.gestionFabricationEntreprise.gestionProductionCompany.DAO.OrdreFabricationRepository;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Client;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.OrdreFabrication;
import com.gestionFabricationEntreprise.gestionProductionCompany.enumeration.Role;



@Service
public class OrdreFabricationService implements  OrdreFabricationServiceImpl {

	  private final OrdreFabricationRepository ordreFabricationRepository;
	    private final ClientService clientService;

	    public OrdreFabricationService(OrdreFabricationRepository ordreFabricationRepository, ClientService clientService) {
	        this.ordreFabricationRepository = ordreFabricationRepository;
	        this.clientService = clientService;
	    }

/*
	    public List<OrdreFabrication> getOrdersForClients() {
	        return ordreFabricationRepository.findByClientRole(Role.ROLE_CLIENT);
	    }
	    
	    */
    ///****
    @Override
    public List<OrdreFabrication> getAllOrdreFabrication() {
        return ordreFabricationRepository.findAll();
    }

    @Override
   /* public OrdreFabrication getOrdreFabricationById(int id) {
        return ordreFabricationRepository.findById(id).orElse(null);
    }
*/
    public OrdreFabrication getOrdreFabricationById(int id) {
        return ordreFabricationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("OrdreFabrication with ID " + id+ " not found"));
    }
    //**a changer
  /*  public OrdreFabrication createOrdreFabrication(OrdreFabrication ordreFabrication) {
       
        Client client = clientService.getClientById(ordreFabrication.getClient());
        
        //Client client = clientService.getClientById(ordreFabrication.getClientId());
        ordreFabrication.setClient(client);
        return ordreFabricationRepository.save(ordreFabrication);
    }

    
    */
    
    public OrdreFabrication createOrdreFabrication(OrdreFabrication ordreFabrication) {
    	 return ordreFabricationRepository.save(ordreFabrication);
    }
   /* 
    
    public OrdreFabrication createOrdreFabrication(OrdreFabrication ordreFabrication) {
    	int clientId = ordreFabrication.getClient().getId();
    	Client client = clientRepository.findById(clientId)
    	.orElseThrow(() -> new EntityNotFoundException("Client with ID " + clientId + " not found"));
    	ordreFabrication.setClient(client);
    	return ordreFabricationRepository.save(ordreFabrication);
    	}  

    
    /*
    @Override
	public List<OrdreFabrication> getAllOrdreFabricationsByClient(int id) {
	
		return ordreFabricationRepository.findAllByClient_id(id);
	}
*/
    
 
    /*
    public OrdreFabrication createOrdreFabrication(OrdreFabrication ordreFabrication) {
        return ordreFabricationRepository.save(ordreFabrication);
    }
    */
 /*   public OrdreFabrication createOrdreFabrication(OrdreFabrication ordreFabrication) {
        Client client = clientRepository.findById(ordreFabrication.getClient().getId())
                .orElseThrow(() -> new EntityNotFoundException("Client not found"));

        ordreFabrication.setClient(client);
        return ordreFabricationRepository.save(ordreFabrication);
    }
    */
    //

    
/*
    public OrdreFabrication createOrdreFabrication(OrdreFabrication ordreFabrication) {
     Client client = ordreFabrication.getClient();
     if (client == null) {
         throw new IllegalArgumentException("Client must be provided for creating OrdreFabrication");
     }
     Client savedClient = clientRepository.save(client);
     ordreFabrication.setClient(savedClient);
     return ordreFabricationRepository.save(ordreFabrication);
 }
*/
    


    @Override
    public OrdreFabrication updateOrdreFabrication(int id, OrdreFabrication ordreFabrication) {
    	OrdreFabrication existingOrdreFabrication = ordreFabricationRepository.findById(id).orElse(null);
        if (existingOrdreFabrication != null) {
            existingOrdreFabrication.setStatus(ordreFabrication.getStatus());
            existingOrdreFabrication.setDescription(ordreFabrication.getDescription());
            existingOrdreFabrication.setQte_produite(ordreFabrication.getQte_produite());
            existingOrdreFabrication.setProgression(ordreFabrication.getProgression());
            existingOrdreFabrication.setDate_creation(ordreFabrication.getDate_creation());
            existingOrdreFabrication.setDate_sortie(ordreFabrication.getDate_sortie()); 
            existingOrdreFabrication.setClient_id(ordreFabrication.getClient_id()); 
   
            return ordreFabricationRepository.save(existingOrdreFabrication);
        }
        return null;
    }

    @Override
    public void deleteOrdreFabrication(int id) {
    	ordreFabricationRepository.deleteById(id);
    }

	@Override
	public Map<String, Double> calculatePercentageByOrdrer() {
		{
	        List<OrdreFabrication> allOrders = ordreFabricationRepository.findAll();
	        Map<String, Double> percentageByorderFabrication = new HashMap<>();

	        // Count the occurrences of each nature activity
	        Map<String, Long> countByOrderFabrication = allOrders.stream()
	                .collect(Collectors.groupingBy(OrdreFabrication::getStatus, Collectors.counting()));

	        // Calculate the percentage for each nature activity
	        long totalData = allOrders.size();
	        countByOrderFabrication.forEach((status, count) -> {
	            double percentage = (count.doubleValue() / totalData) * 100;
	            percentageByorderFabrication.put(status, percentage);
	        });

	        return percentageByorderFabrication;
	    }
	}
}
