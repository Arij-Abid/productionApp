package com.gestionFabricationEntreprise.gestionProductionCompany.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.gestionFabricationEntreprise.gestionProductionCompany.DAO.ProductRepository;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Product;


public interface ProductServiceImpl{
    List<Product> getAllProducts();
    Product getProductById(Integer id);
    Product createProduct(Product product);
    Product updateProduct(Integer id, Product product);
    void deleteProduct(Integer id);
}