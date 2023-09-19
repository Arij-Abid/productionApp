 package com.gestionFabricationEntreprise.gestionProductionCompany.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.*; 
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;
@Data
@AllArgsConstructor
@ToString
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product {
	  @Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	  private int id;
	    private String  nom;
	    private double prix;
	    @Column(length = 2000)
	    private String description;
		/*@JsonFormat(pattern = "yyyy-MM-dd")
		private Date date_creation;
		*/
		//
	/*	@Temporal(TemporalType.DATE)
		private Date date_creation;

		*/
		@JsonFormat(pattern = "yyyy-MM-dd")
	    private Date dateCreation;
		@JsonFormat(pattern = "yyyy-MM-dd")
	    private Date livraison;
		private int quantiteStock;
	 
	    
	  /*  @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	    @JoinTable(name = "product_images", joinColumns = {
	            @JoinColumn(name = "product_id")
	    }, inverseJoinColumns = {
	            @JoinColumn(name = "image_id")
	    })
	    private Set<ImageProduct> productImages;

	    */
	    ///
	   @JsonIgnore  
	   @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "id_OF", nullable = false)
	    private OrdreFabrication ordreFabrication;

	   @JsonIgnore
	    @ManyToOne
	    @JoinColumn(name = "category_id")
	    private Category category;

	

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public String getNom() {
			return nom;
		}

		public void setNom(String nom) {
			this.nom = nom;
		}

	
		public double getPrix() {
			return prix;
		}

		public void setPrix(double prix) {
			this.prix = prix;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public Date getDateCreation() {
			return dateCreation;
		}

		public void setDateCreation(Date dateCreation) {
			this.dateCreation = dateCreation;
		}

		public Date getLivraison() {
			return livraison;
		}

		public void setLivraison(Date livraison) {
			this.livraison = livraison;
		}

		public int getQuantiteStock() {
			return quantiteStock;
		}

		public void setQuantiteStock(int quantiteStock) {
			this.quantiteStock = quantiteStock;
		}

		public OrdreFabrication getOrdreFabrication() {
			return ordreFabrication;
		}

		public void setOrdreFabrication(OrdreFabrication ordreFabrication) {
			this.ordreFabrication = ordreFabrication;
		}

		public Category getCategory() {
			return category;
		}

		public void setCategory(Category category) {
			this.category = category;
		}

		// Getter and setter for client_id
	    public Category getCategory_id() {
	        return category;
	    }

	    public void setCategory_id(Category category) {
	        this.category = category;
	    }
	    

		// Getter and setter for  ordreFabrication
	    public OrdreFabrication getId_OF() {
	        return ordreFabrication;
	    }

	    public void setId_OF(OrdreFabrication ordreFabrication) {
	        this.ordreFabrication= ordreFabrication;
	    }

	public Product() {
	}
}