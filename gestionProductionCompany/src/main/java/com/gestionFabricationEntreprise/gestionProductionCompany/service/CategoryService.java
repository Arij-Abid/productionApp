package com.gestionFabricationEntreprise.gestionProductionCompany.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestionFabricationEntreprise.gestionProductionCompany.DAO.CategoryRepository;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Category;
import com.gestionFabricationEntreprise.gestionProductionCompany.exception.domain.NotFoundException;

@Service
public class CategoryService  implements CategoryServiceImpl {


    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    
    public Category createCategory(Category category) {
       
        return categoryRepository.save(category);
    }
    
    public List<Category> getAllCategories() {
      
        return categoryRepository.findAll();
    }
    
    
    
    
    public Category getCategoryById(int id) {
        
        return categoryRepository.findById(id).orElseThrow(() -> new NotFoundException("Category not found"));
    }
    

    
    public Category updateCategory(int id, Category category) {
      
        Category existingCategory = getCategoryById(id);
        existingCategory.setName(category.getName());
        existingCategory.setDescription(category.getDescription());
        return categoryRepository.save(existingCategory);
    }
    
    public void deleteCategory(int id) {
        
        Category category = getCategoryById(id);
        categoryRepository.delete(category);
    }
}