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

import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Category;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.OrdreFabrication;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Product;
import com.gestionFabricationEntreprise.gestionProductionCompany.service.CategoryService;
import com.gestionFabricationEntreprise.gestionProductionCompany.service.OrdreFabricationService;
import com.gestionFabricationEntreprise.gestionProductionCompany.service.ProductService;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/products")
public class ProductController {

	private ProductService productService;

	
	@Autowired
	private CategoryService categoryService;

	@Autowired
	private OrdreFabricationService ordreFabricationService;

	

	@Autowired
	public ProductController(ProductService productService, OrdreFabricationService ordreFabricationService,
			CategoryService categoryService) {
		this.productService = productService;
		this.ordreFabricationService = ordreFabricationService;
		this.categoryService = categoryService;
	}

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        try {
            List<Product> products = productService.getAllProducts();
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            // Return an appropriate error response
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        Product product = productService.getProductById(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        if (product.getCategory_id() != null) {
            Category category = categoryService.getCategoryById(product.getCategory_id().getId());
            product.setCategory(category);
        }

        if (product.getId_OF() != null) {
            OrdreFabrication ordreFabrication = ordreFabricationService.getOrdreFabricationById(product.getId_OF().getId());
            product.setOrdreFabrication(ordreFabrication);
        }

        Product savedProduct = productService.createProduct(product);
        return ResponseEntity.ok(savedProduct);
    }

    
    
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody Product product) {
        Product updatedProduct = productService.updateProduct(id, product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}