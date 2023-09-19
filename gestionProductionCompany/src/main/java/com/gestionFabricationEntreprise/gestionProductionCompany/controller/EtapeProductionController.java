package com.gestionFabricationEntreprise.gestionProductionCompany.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;

import com.gestionFabricationEntreprise.gestionProductionCompany.domain.User;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Category;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.EtapeProduction;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.OrdreFabrication;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Product;
import com.gestionFabricationEntreprise.gestionProductionCompany.service.CategoryService;
import com.gestionFabricationEntreprise.gestionProductionCompany.service.EtapeProductionService;
import com.gestionFabricationEntreprise.gestionProductionCompany.service.OrdreFabricationService;
import com.gestionFabricationEntreprise.gestionProductionCompany.service.ProductService;
import com.gestionFabricationEntreprise.gestionProductionCompany.service.UserServiceImpl;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/etapeProduction")
public class EtapeProductionController {

	private EtapeProductionService etapeProductionService;



	@Autowired
	private OrdreFabricationService ordreFabricationService;

	private UserServiceImpl userServiceImpl;

	@Autowired
	public EtapeProductionController(EtapeProductionService etapeProductionService,
			OrdreFabricationService ordreFabricationService, UserServiceImpl userServiceImpl
		) {
this.etapeProductionService	=etapeProductionService;
this.ordreFabricationService = ordreFabricationService;
this.userServiceImpl= userServiceImpl;
	}

    @GetMapping("/all")
    public ResponseEntity<List<EtapeProduction>> getAllEtapeProductions() {
        List<EtapeProduction> etapeProductions = etapeProductionService.getAllEtapeProductions();
        return new ResponseEntity<>(etapeProductions, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EtapeProduction> getEtapeProductionById(@PathVariable Integer id) {
    	EtapeProduction etapeProduction = etapeProductionService.getEtapeProductionById(id);
        return new ResponseEntity<>(etapeProduction, HttpStatus.OK);
    }

 
  /*  @PostMapping("/add")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product newProduct = productService.createProduct(product);
        		//addProduct(product);
        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }
*/
    
   /* @PostMapping("/add")
    public ResponseEntity<EtapeProduction> createEtapeProduction(@RequestBody EtapeProduction etapeProduction) {
      
        if (etapeProduction.getOrdre_fabrication_id() != null) {
            OrdreFabrication ordreFabrication = ordreFabricationService.getOrdreFabricationById(etapeProduction.getOrdre_fabrication_id().getId());
            etapeProduction.setOrdreFabrication(ordreFabrication);
        }
        
        if (etapeProduction.getEmployee_id() != null) {
            User employee = userServiceImpl.getEmployeesById(etapeProduction.getEmployee_id().getId());
            etapeProduction.setEmployee_id(employee);
        }
        EtapeProduction savedEtapeProduction = etapeProductionService.createEtapeProduction(etapeProduction);
        return ResponseEntity.ok(savedEtapeProduction);
    }
    */
    
    @PostMapping("/add")
    public ResponseEntity<EtapeProduction> createEtapeProduction(@RequestBody EtapeProduction etapeProduction) {


        if (etapeProduction.getOrdre_fabrication_id() != null) {
            OrdreFabrication ordreFabrication = ordreFabricationService.getOrdreFabricationById(etapeProduction.getOrdre_fabrication_id().getId());
            etapeProduction.setOrdreFabrication(ordreFabrication);
        }

        
        if (etapeProduction.getEmployee_id() != null && etapeProduction.getEmployee_id().getUserId() != null) {
            User employee = userServiceImpl.getEmployeesById(etapeProduction.getEmployee_id().getUserId());
            if (employee.getRole().equals("ROLE_EMPLOYEE")) {
                etapeProduction.setEmployee_id(employee);
            } else {
                // Handle the error if the selected employee does not have the required role
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        }
        EtapeProduction savedEtapeProduction = etapeProductionService.createEtapeProduction(etapeProduction);
        return ResponseEntity.ok(savedEtapeProduction);
    }


    

    @GetMapping("/employees")
    public ResponseEntity<List<User>> getEmployees() {
        List<User> employees = userServiceImpl.getAllEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<EtapeProduction> updateEtapeProduction(@PathVariable Integer id, @RequestBody EtapeProduction etapeProduction) {
    	EtapeProduction updatedEtapeProduction = etapeProductionService.updateEtapeProduction(id, etapeProduction);
    	if (etapeProduction.getEmployee_id() != null && etapeProduction.getEmployee_id().getUserId() != null) {
    	    User employee = userServiceImpl.getEmployeesById(etapeProduction.getEmployee_id().getUserId());
    	    if (employee.getRole().equals("ROLE_EMPLOYEE")) {
    	        etapeProduction.setEmployee_id(employee);
    	    } else {
    	        // Handle the error if the selected employee does not have the required role
    	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    	    }
    	}

        return new ResponseEntity<>(updatedEtapeProduction, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEtapeProduction(@PathVariable Integer id) {
    	etapeProductionService.deleteEtapeProduction(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
}