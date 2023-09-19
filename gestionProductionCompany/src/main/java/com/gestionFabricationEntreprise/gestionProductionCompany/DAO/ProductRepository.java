package com.gestionFabricationEntreprise.gestionProductionCompany.DAO;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

	   /* List<Product> findAll(Pageable pageable);
//
  
	    List<Product> findByNomContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String key1,
	            String key2,
	            Pageable pageable);
*/
	}
