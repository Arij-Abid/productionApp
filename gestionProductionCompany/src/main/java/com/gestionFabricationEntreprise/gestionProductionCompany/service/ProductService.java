package com.gestionFabricationEntreprise.gestionProductionCompany.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.gestionFabricationEntreprise.gestionProductionCompany.DAO.ProductRepository;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Client;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Product;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class  ProductService  implements ProductServiceImpl {

    private ProductRepository productRepository;
    private final  CategoryService categoryService;
    private final  OrdreFabricationService ordreFabricationService;
    @Autowired
    public ProductService(ProductRepository productRepository,CategoryService categoryService,OrdreFabricationService ordreFabricationService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
        this.ordreFabricationService=ordreFabricationService;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Integer id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + id));
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }
/*
    @Override
    public Product updateProduct(Integer id, Product product) {
        Product existingProduct = getProductById(id);
        existingProduct.setNom(product.getNom());
        existingProduct.setPrix(product.getPrix());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setDateCreation(product.getDateCreation());
        existingProduct.setLivraison(product.getLivraison());
        existingProduct.setQuantiteStock(product.getQuantiteStock());
  
        return productRepository.save(existingProduct);
    }
    */
    
    @Override
    public Product updateProduct(Integer id, Product product) {
      Product existingProduct = getProductById(id);
      existingProduct.setNom(product.getNom());
      existingProduct.setPrix(product.getPrix());
      existingProduct.setDescription(product.getDescription());
      existingProduct.setDateCreation(product.getDateCreation());
      existingProduct.setLivraison(product.getLivraison());
      existingProduct.setQuantiteStock(product.getQuantiteStock());
      existingProduct.setCategory(product.getCategory()); // Mettez à jour la catégorie du produit
      existingProduct.setOrdreFabrication(product.getOrdreFabrication()); // Mettez à jour l'ordre de fabrication du produit

      return productRepository.save(existingProduct);
    }

    

    @Override
    public void deleteProduct(Integer id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }
}