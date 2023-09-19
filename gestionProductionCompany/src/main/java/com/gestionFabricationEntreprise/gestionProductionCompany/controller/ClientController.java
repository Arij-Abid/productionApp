package com.gestionFabricationEntreprise.gestionProductionCompany.controller;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestionFabricationEntreprise.gestionProductionCompany.domain.User;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Client;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Machine;
import com.gestionFabricationEntreprise.gestionProductionCompany.enumeration.Role;
import com.gestionFabricationEntreprise.gestionProductionCompany.service.ClientService;
import com.gestionFabricationEntreprise.gestionProductionCompany.service.MachineService;
import com.gestionFabricationEntreprise.gestionProductionCompany.service.OrdreFabricationService;
import com.gestionFabricationEntreprise.gestionProductionCompany.service.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/client")
public class ClientController {
	
	@Autowired
	private final ClientService clientService;
	

    private UserService userService;

	
    @Autowired
    public ClientController(ClientService clientService,
    		OrdreFabricationService ordreFabricationService
    		,UserService userService) {
        this.clientService = clientService;
        this.ordreFabricationService =ordreFabricationService;
        this.userService = userService;
    }
    
    
    //***
   
    private final OrdreFabricationService ordreFabricationService;

 
    
    
    @GetMapping("/all")
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }
/*
    @GetMapping("/{id}")
  public Client getClientById(@PathVariable int id) {
        return clientService.getClientById(id);
    }
 */
    //***

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable int id) {
        Client client = clientService.getClientById(id);
        return ResponseEntity.ok(client);
    }
   /* @PostMapping("/add")
    public void addClient(@RequestBody Client client) {
    	clientService.addClient(client);
    }
*/
    
 
    @PostMapping("/add")
    public ResponseEntity<Client> createClient(@RequestBody Client client) {
        Client createdClient = clientService.createClient(client);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdClient);
    }

    
    
    
    
    /*
    
    @PutMapping("/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable int id, @RequestBody Client client) {
        // Add logic to update an existing client by ID
        Client updatedClient = clientService.updateClient(id, client);
        return ResponseEntity.ok(updatedClient);
    }
  */

    
    @PutMapping("/{id}")
   // @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity<Client> updateClient(@PathVariable int id, @RequestBody Client client) {
        Client updatedClient = clientService.updateClient(id, client);
        if (updatedClient != null) {
            return ResponseEntity.ok(updatedClient);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    
    /*
    @PutMapping("/{id}")
    public void updateClient(@PathVariable int id, @RequestBody Client client) {
    	clientService.updateClient(id, client);
    }
   */ 
    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable int id) {
    	clientService.deleteClient(id);
    }
    

 
}
