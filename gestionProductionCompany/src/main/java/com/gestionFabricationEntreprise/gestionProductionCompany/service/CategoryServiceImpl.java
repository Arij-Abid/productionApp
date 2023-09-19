package com.gestionFabricationEntreprise.gestionProductionCompany.service;

import java.util.List;

import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Category;

public interface CategoryServiceImpl {
	List<Category> getAllCategories();
	  Category createCategory(Category category);
	    Category getCategoryById(int id);
	    Category updateCategory(int id, Category category);
	    void deleteCategory(int id);
	
}
