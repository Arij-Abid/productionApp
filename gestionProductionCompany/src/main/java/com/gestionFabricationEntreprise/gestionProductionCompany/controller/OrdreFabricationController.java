package com.gestionFabricationEntreprise.gestionProductionCompany.controller;

import java.util.List;
import java.util.Map;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gestionFabricationEntreprise.gestionProductionCompany.DAO.ClientRepository;
import com.gestionFabricationEntreprise.gestionProductionCompany.DAO.OrdreFabricationRepository;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Client;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.OrdreFabrication;
import com.gestionFabricationEntreprise.gestionProductionCompany.enumeration.Role;
import com.gestionFabricationEntreprise.gestionProductionCompany.service.ClientService;
import com.gestionFabricationEntreprise.gestionProductionCompany.service.OrdreFabricationService;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/OrdreFabrication")
public class OrdreFabricationController {

    @Autowired
    private  OrdreFabricationService ordreFabricationService;
    
    
    
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private OrdreFabricationRepository ordreFabricationRepository;
    @Autowired
    private ClientService clientService;

    
    @Autowired
    public OrdreFabricationController(OrdreFabricationService ordreFabricationService,ClientService clientService) {
    	super();
    	this.ordreFabricationService = ordreFabricationService;
    	this.clientService= clientService;
    }
 

    @GetMapping("/all")
    public ResponseEntity<List<OrdreFabrication>> getAllOrdreFabrication() {
        List<OrdreFabrication> ordreFabrication = ordreFabricationService.getAllOrdreFabrication();
        return new ResponseEntity<List<OrdreFabrication>>(ordreFabrication, HttpStatus.OK);
    }
  /*  @GetMapping("/orders")
    public List<OrdreFabrication> getOrdersForClients() {
        return ordreFabricationService.getOrdersForClients();
    }
    */
    
    /*
    @GetMapping("/orders")
    public ResponseEntity<List<OrdreFabrication>> getClientOrders() {
        List<OrdreFabrication> orders = ordreFabricationService.getOrdersByClientRole("ROLE_CLIENT");
        return ResponseEntity.ok(orders);
    }
   */

    @GetMapping("/{id}")
    public ResponseEntity<OrdreFabrication> getOrdreFabricationById(@PathVariable("id") int id) {
    	OrdreFabrication ordreFabrication = ordreFabricationService.getOrdreFabricationById(id);
        if (ordreFabrication != null) {
            return new ResponseEntity<OrdreFabrication>(ordreFabrication, HttpStatus.OK);
        }
        return new ResponseEntity<OrdreFabrication>(HttpStatus.NOT_FOUND);
    }

    
 /*
 public ResponseEntity<OrdreFabrication> createOrdreFabrication(@RequestBody OrdreFabrication ordreFabrication) {
    //	System.out.println(ordreFabrication.getClient().getId());
    	OrdreFabrication createdOrdreFabrication = ordreFabricationService.createOrdreFabrication(ordreFabrication);
        return new ResponseEntity<OrdreFabrication>(createdOrdreFabrication, HttpStatus.CREATED);
    }
*/
    //****

    /*
    @PostMapping("/add")
    public ResponseEntity<OrdreFabrication> addOrdreFabrication(@RequestBody OrdreFabrication ordreFabrication) {
        OrdreFabrication savedOrdreFabrication = ordreFabricationService.createOrdreFabrication(ordreFabrication);
        return ResponseEntity.ok(savedOrdreFabrication);
    }
*/
    
   /* @PostMapping("/add")
    public ResponseEntity<OrdreFabrication> createOrdreFabrication(@RequestBody OrdreFabrication ordreFabrication) {
        OrdreFabrication savedOrdreFabrication = ordreFabricationService.createOrdreFabrication(ordreFabrication);
        return ResponseEntity.ok(savedOrdreFabrication);
    }
 */
    
    
    
    //
    @PostMapping("/add")
    public ResponseEntity<OrdreFabrication> createOrdreFabrication(@RequestBody OrdreFabrication ordreFabrication) {
        if (ordreFabrication.getClient_id() != null) {
            Client client = clientService.getClientById(ordreFabrication.getClient_id().getId());
            ordreFabrication.setClient_id(client);
            OrdreFabrication savedOrdreFabrication = ordreFabricationService.createOrdreFabrication(ordreFabrication);
            return ResponseEntity.ok(savedOrdreFabrication);
        } else {
            // Handle the case where the client is not defined
            return ResponseEntity.badRequest().build();
        }
    }

    
   
    @PutMapping("/{id}")
    public ResponseEntity<OrdreFabrication> updateOrdreFabrication(@PathVariable("id") int id, @RequestBody OrdreFabrication ordreFabrication) {
    	OrdreFabrication updatedOrdreFabrication = ordreFabricationService.updateOrdreFabrication(id, ordreFabrication);
        if (updatedOrdreFabrication != null) {
            return new ResponseEntity<OrdreFabrication>(updatedOrdreFabrication, HttpStatus.OK);
        }
        return new ResponseEntity<OrdreFabrication>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrdreFabrication(@PathVariable("id") int id) {
        ordreFabricationService.deleteOrdreFabrication(id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    
    //

    

    /*
    @DeleteMapping("/{id_OF}")
    public ResponseEntity<Void> deleteOrdreFabrication(@PathVariable("id_OF") int id_OF) {
    	ordreFabricationService.deleteOrdreFabrication(id_OF);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    */
    
    
    @GetMapping("/percentage-by-order")
    public ResponseEntity<Map<String, Double>> calculatePercentageByOrdrer() {
        Map<String, Double> percentageByOrder = ordreFabricationService.calculatePercentageByOrdrer();
        // affichage terminal
        percentageByOrder.forEach((status, percentage) ->
                System.out.println("status: " + status + ", égale: " + percentage + "%")
        );
        return ResponseEntity.ok(percentageByOrder);
    }
    
    
}
