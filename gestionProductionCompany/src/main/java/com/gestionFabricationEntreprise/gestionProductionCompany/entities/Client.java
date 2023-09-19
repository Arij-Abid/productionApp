package com.gestionFabricationEntreprise.gestionProductionCompany.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gestionFabricationEntreprise.gestionProductionCompany.domain.User;

import groovy.transform.ToString;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Client {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;
	    private String name;
	    private String email;
	    private String ville;
	    private String adresse;
	    private int tel;
/*
	  @JsonIgnore
	   @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	  private List<OrdreFabrication> ordresFabrication = new ArrayList<OrdreFabrication>();
*/
	  @JsonIgnore
	  @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	    private List<OrdreFabrication> ordresFabrication = new ArrayList<>();

	    @OneToOne(cascade = CascadeType.ALL)
	    @JoinColumn(name = "user_id", referencedColumnName = "id")
	    private User user;
	    
	    public void addOrdreFabrication(OrdreFabrication ordreFabrication) {
	        ordreFabrication.setClient(this);
	        ordresFabrication.add(ordreFabrication);
	    }
	  
	    public void addUser(User user) {
	        user.setClient(this);
	        this.user = user;
	    }

	    
	/*  
	  
	  public void addOrdreFabrication(OrdreFabrication ordreFabrication) {
		    ordreFabrication.setClient(this);
		    ordresFabrication.add(ordreFabrication);
		}


	    public void removeOrdreFabrication(OrdreFabrication ordreFabrication) {
	        ordresFabrication.remove(ordreFabrication);
	        ordreFabrication.setClient(null);
	    }
	*/   
	   // private List<OrdreFabrication> ordresFabrication = new ArrayList<>();

	public User getUser() {
			return user;
		}


		public void setUser(User user) {
			this.user = user;
		}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}





	public int getTel() {
		return tel;
	}

	public void setTel(int tel) {
		this.tel = tel;
	}

	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}




	public String getVille() {
		return ville;
	}


	public void setVille(String ville) {
		this.ville = ville;
	}


	public String getAdresse() {
		return adresse;
	}


	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}


	public List<OrdreFabrication> getOrdresFabrication() {
		return ordresFabrication;
	}


	public void setOrdresFabrication(List<OrdreFabrication> ordresFabrication) {
		this.ordresFabrication = ordresFabrication;
	}

}