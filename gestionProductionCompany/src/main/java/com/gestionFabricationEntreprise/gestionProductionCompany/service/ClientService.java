package com.gestionFabricationEntreprise.gestionProductionCompany.service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestionFabricationEntreprise.gestionProductionCompany.DAO.ClientRepository;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Client;



import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;



@Service
public class ClientService implements ClientServiceImpl {

	@Autowired
	private final  ClientRepository clientRepository;
    
	//private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

 
    
    @Override
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }
    
  
   /* public Client getClientById(int id) {
        return clientRepository.findById(id).orElse(null);
    }
    */
    @Override
    public Client getClientById(int id) {
        return clientRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Client not found"));
        
    }
 
  
    
    
  
    public Client createClient(Client client) {
        return clientRepository.save(client);
    }
    
    
 
    /*
    @Override
    public Client updateClient(Long clientId, Client client) {
        // Implement the logic to update a client, e.g., find the existing client by ID, update the fields, and save it using the clientRepository
        Client existingClient = clientRepository.findById(clientId)
                .orElseThrow(() -> new EntityNotFoundException("Client not found with ID: " + clientId));

        // Update the fields of the existing client with the values from the input client object
        existingClient.setName(client.getName());
        // Update other fields as needed

        return clientRepository.save(existingClient);
    }
    */
    
  
  
  /*  
    @Override
    public void updateClient(int id, Client client) {
    	Client existingClient = clientRepository.findById(id).orElse(null);
        if (existingClient!= null) {
        	
        	
        	 existingClient.setName(client.getName());
             existingClient.setTel(client.getTel());
             
             
             existingClient.setEmail(client.getEmail());
            
             existingClient.setAdresse(client.getAdresse());
        
       
            clientRepository.save(existingClient);
        }
    }
    */
    @Override
    public void deleteClient(int id) {
    	clientRepository.deleteById(id);
    }



    @Override
    public Client updateClient(int id, Client client) {
        // Add logic to update an existing client by ID
        // First, check if the client with the given ID exists in the repository
        Optional<Client> existingClient = clientRepository.findById(id);
        if (existingClient.isPresent()) {
            // Update the fields of the existing client
            Client updatedClient = existingClient.get();
            // Update the necessary fields
            updatedClient.setName(client.getName());
            updatedClient.setVille(client.getVille());
            updatedClient.setTel(client.getTel());
            updatedClient.setEmail(client.getEmail());
            updatedClient.setAdresse(client.getAdresse());
            
            return clientRepository.save(updatedClient);
        } else {
        	 throw new EntityNotFoundException("Client not found with ID: " + id);
        }
    }

    
	
	
	
	
}


