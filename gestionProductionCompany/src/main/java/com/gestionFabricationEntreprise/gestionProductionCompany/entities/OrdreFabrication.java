package com.gestionFabricationEntreprise.gestionProductionCompany.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import groovy.transform.ToString;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class OrdreFabrication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private int qte_produite;
  
    @Column(name = "description", length = 2000,nullable = false)
    private String description;

   
    private String status;
   

    
	@JsonFormat(pattern = "yyyy-MM-dd")
    private Date date_creation;
	@JsonFormat(pattern = "yyyy-MM-dd")
    private Date date_sortie;
	
   
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;
    private int progression;
    

  public int getProgression() {
		return progression;
	}

	public void setProgression(int progression) {
		this.progression = progression;
	}

public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}
	

	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}

    public Client getClient_id() {
        return client;
    }

    public void setClient_id(Client client) {
        this.client = client;
    }
    public OrdreFabrication(String id) {
        this.id = Integer.parseInt(id);
    }


    @JsonIgnore
    @OneToMany(mappedBy = "ordreFabrication", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	
	  private List<Product> products = new ArrayList<Product>();
 
    
	@JsonIgnore
    @OneToMany(mappedBy = "ordreFabrication", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<EtapeProduction> etapesProduction;



	    public OrdreFabrication(Client client) {
	        this.client = client;
	    }



	    public OrdreFabrication(int id, int qte_produite, String description, String status, Date date_creation,
	            Date date_sortie, Client client, List<Product> products) {
	        this(String.valueOf(id)); // Appel du constructeur prenant une chaîne de caractères
	        this.qte_produite = qte_produite;
	        this.description = description;
	        this.status = status;
	        this.date_creation = date_creation;
	        this.date_sortie = date_sortie;
	        this.client = client;
	        this.products = products;
	    }

	public Date getDate_creation() {
			return date_creation;
		}

		public void setDate_creation(Date date_creation) {
			this.date_creation = date_creation;
		}

		
	public Date getDate_sortie() {
			return date_sortie;
		}

		public void setDate_sortie(Date date_sortie) {
			this.date_sortie = date_sortie;
		}

		public List<EtapeProduction> getEtapesProduction() {
			return etapesProduction;
		}

		public void setEtapesProduction(List<EtapeProduction> etapesProduction) {
			this.etapesProduction = etapesProduction;
		}



	public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

	public int getQte_produite() {
		return qte_produite;
	}

	public void setQte_produite(int qte_produite) {
		this.qte_produite = qte_produite;
	}

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	

	
}
