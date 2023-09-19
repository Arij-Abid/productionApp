package com.gestionFabricationEntreprise.gestionProductionCompany.service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gestionFabricationEntreprise.gestionProductionCompany.DAO.EtapeProductionRepository;
import com.gestionFabricationEntreprise.gestionProductionCompany.DAO.UserRepository;
import com.gestionFabricationEntreprise.gestionProductionCompany.domain.User;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.EtapeProduction;
import com.gestionFabricationEntreprise.gestionProductionCompany.exception.domain.NotFoundException;

@Service
@Transactional
public class EtapeProductionService implements EtapeProductionServiceImpl{



	    private EtapeProductionRepository etapeProductionRepository;
	    private final  OrdreFabricationService ordreFabricationService;
	    private UserRepository userRepository;
		private UserServiceImpl userServiceImpl;

	    
	    @Autowired
	    public EtapeProductionService(EtapeProductionRepository etapeProductionRepository,
	    		UserRepository userRepositor,UserServiceImpl userServiceImpl,OrdreFabricationService ordreFabricationService) {
	        this.etapeProductionRepository =etapeProductionRepository;
	        this.ordreFabricationService=ordreFabricationService;
	        this.userRepository = userRepository;
	        this.userServiceImpl= userServiceImpl;


	    }

	    @Override
	    public List<EtapeProduction> getAllEtapeProductions() {
	        return etapeProductionRepository.findAll();
	    }

	    @Override
	    public EtapeProduction getEtapeProductionById(Integer id) {
	        return etapeProductionRepository.findById(id)
	                .orElseThrow(() -> new IllegalArgumentException("etape Production not found with ID: " + id));
	    }

	    @Override
	   public EtapeProduction createEtapeProduction(EtapeProduction etapeProduction) {
	        return etapeProductionRepository.save(etapeProduction);
	    }
	
	/*    public EtapeProduction createEtapeProduction(EtapeProduction EtapeProduction) {
	        User employee = userRepository.findById(employeeId).orElseThrow(() -> new EntityNotFoundException("EMPLOYEE with ID " + employeeId + " not found"));
	        
	        EtapeProduction etapeProduction = new EtapeProduction();
	        etapeProduction.setEmployee_id(employee);
	        // Set other fields
	        
	        return etapeProductionRepository.save(etapeProduction);
	    }
	  
	    */
	    @Override
	    public EtapeProduction updateEtapeProduction(Integer id, EtapeProduction etapeProduction) {
	      //EtapeProduction existingEtapeProduction = getEtapeProductionById(id);
	      EtapeProduction existingEtapeProduction = etapeProductionRepository.findById(id)
	              .orElseThrow(() -> new NotFoundException("EtapeProduction not found"));
	      
	      existingEtapeProduction.setName(etapeProduction.getName());
	      existingEtapeProduction.setStatus(etapeProduction.getStatus());
	      existingEtapeProduction.setQteProduite(etapeProduction.getQteProduite());
	      existingEtapeProduction.setDescription(etapeProduction.getDescription());
	      existingEtapeProduction.setProgression(etapeProduction.getProgression());
	      existingEtapeProduction.setNumEtape(etapeProduction.getNumEtape());
	      existingEtapeProduction.setDatedebut(etapeProduction.getDatedebut());
	      existingEtapeProduction.setDatefin(etapeProduction.getDatefin());
	      existingEtapeProduction.setOrdreFabrication(etapeProduction.getOrdreFabrication());
	  /*    User employee = etapeProduction.getEmployee_id();
	      if (employee != null && employee.getUserId() == null) {
	          User savedEmployee = userRepository.save(employee);
	          existingEtapeProduction.setEmployee_id(savedEmployee);
	      }
	      */

	      User employee = etapeProduction.getEmployee_id();
	      if (employee != null && employee.getUserId() != null) {
	       /*   User savedEmployee = userRepository.findById(employee.getUserId())
	        		  
	              .orElseThrow(() -> new NotFoundException("User not found"));*/
	    	    User savedEmployee= userServiceImpl.getEmployeesById(etapeProduction.getEmployee_id().getUserId());


	          if (savedEmployee.getRole().equals("ROLE_EMPLOYEE")) {
	              existingEtapeProduction.setEmployee_id(savedEmployee);
	          } else {
	              // Handle the error if the selected employee does not have the required role
	              throw new IllegalStateException("Selected employee does not have the required role");
	          }
	      }
	      return etapeProductionRepository.save(existingEtapeProduction);
	    }

	    

	    @Override
	    public void deleteEtapeProduction(Integer id) {
	    	EtapeProduction etapeProduction = getEtapeProductionById(id);
	    	etapeProductionRepository.delete(etapeProduction);
	    }

	    @Override
	    public EtapeProduction getEtapeProductionByUserId(String userId) {
	        return etapeProductionRepository.findByEmployeeUserId(userId)
	                .orElseThrow(() -> new NoSuchElementException("EtapeProduction not found for user ID: " + userId));
	    }

	   
	   
	}