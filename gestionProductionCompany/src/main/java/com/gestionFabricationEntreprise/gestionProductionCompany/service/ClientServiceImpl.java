package com.gestionFabricationEntreprise.gestionProductionCompany.service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestionFabricationEntreprise.gestionProductionCompany.DAO.ClientRepository;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Client;


 public interface ClientServiceImpl {

	 List<Client> getAllClients();
	 Client getClientById(int id);
	 Client createClient(Client client);
	 Client updateClient(int id, Client client);
	    void deleteClient(int id);
	
 }
