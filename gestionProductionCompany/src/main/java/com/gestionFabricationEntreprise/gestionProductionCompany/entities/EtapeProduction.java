package com.gestionFabricationEntreprise.gestionProductionCompany.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.gestionFabricationEntreprise.gestionProductionCompany.domain.User;

import groovy.transform.ToString;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class EtapeProduction {
	
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private int id;
	
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "status", nullable = false)
    private String status;
	
    @Column(name = "qteProduite", nullable = false)
    private int qteProduite;
    private String description;
	@JsonFormat(pattern = "yyyy-MM-dd")
    private Date datedebut;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date datefin;
	
	private int progression;
	private int numEtape;
	
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "ordre_fabrication_id", nullable = false)
	private OrdreFabrication ordreFabrication;

	
	
	@JsonIgnore  
	@ManyToOne
	//	@JoinColumn(name = "employee_id", referencedColumnName = "userId")

	@JoinColumn(name = "employee_id", referencedColumnName = "userId")
	@Where(clause = "role = 'ROLE_EMPLOYEE'")
	private User employee;  // Change to `User` type

	/*
	public User getEmployee() {
		return employee;
	}

	public void setEmployee(User employee) {
		this.employee = employee;
	}

	*/	

		public User getEmployee_id() {
		return employee;
	}

	public void setEmployee_id(User employee) {
		this.employee = employee;
	}

/*
		public User getEmployee_id() {
		return employee_id;
	}

	public void setEmployee_id(User employee_id) {
		this.employee_id = employee_id;
	}
*/
		// Getter and setter for  ordreFabrication
	    public OrdreFabrication getOrdre_fabrication_id() {
	        return ordreFabrication;
	    }

	    public void setOrdre_fabrication_id(OrdreFabrication ordreFabrication) {
	        this.ordreFabrication= ordreFabrication;
	    }
	    
	 
	    
	public int getProgression() {
			return progression;
		}

		public void setProgression(int progression) {
			this.progression = progression;
		}

		public int getNumEtape() {
			return numEtape;
		}

		public void setNumEtape(int numEtape) {
			this.numEtape = numEtape;
		}

	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getQteProduite() {
		return qteProduite;
	}
	public void setQteProduite(int qteProduite) {
		this.qteProduite = qteProduite;
	}
	public Date getDatedebut() {
		return datedebut;
	}
	public void setDatedebut(Date datedebut) {
		this.datedebut = datedebut;
	}
	public Date getDatefin() {
		return datefin;
	}
	public void setDatefin(Date datefin) {
		this.datefin = datefin;
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
	public OrdreFabrication getOrdreFabrication() {
		return ordreFabrication;
	}
	public void setOrdreFabrication(OrdreFabrication ordreFabrication) {
		this.ordreFabrication = ordreFabrication;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

}
