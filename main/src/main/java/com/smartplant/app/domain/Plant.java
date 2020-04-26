package com.smartplant.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Plant.
 */
@Entity
@Table(name = "plant")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Plant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "location", nullable = false)
    private String location;

    @NotNull
    @Column(name = "sensor_id", nullable = false)
    private String sensorID;
    
    @Column(name = "avg_temp")
    private Float avgTemp;
    
    @Column(name = "avg_humidity")
    private Float avgHumidity;
    
    @Column(name = "avg_light")
    private Float avgLight;
    
    @Column(name = "avg_moisture")
    private Float avgMoisture;

    @OneToOne
    @JoinColumn(unique = true)
    private PlantThresholds plantthresholds;

    @OneToMany(mappedBy = "plant")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PlantCase> plantcases = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("plants")
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Plant name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Plant description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public Plant location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSensorID() {
        return sensorID;
    }

    public Plant sensorID(String sensorID) {
        this.sensorID = sensorID;
        return this;
    }

    public void setSensorID(String sensorID) {
        this.sensorID = sensorID;
    }
    
    public Float getAvgTemp() {
    	return avgTemp;
    }

    public Plant avgTemp(Float avgTemp) {
    	this.avgTemp = avgTemp;
    	return this;
    }
    
    public void setAvgTemp(Float avgTemp) {
    	this.avgTemp = avgTemp;
    }
    
    public Float getAvgHumidity() {
    	return avgHumidity;
    }

    public Plant avgHumidity(Float avgHumidity) {
    	this.avgHumidity = avgHumidity;
    	return this;
    }
    
    public void setAvgHumidity(Float avgHumidity) {
    	this.avgHumidity = avgHumidity;
    }
    
    public Float getAvgLight() {
    	return avgLight;
    }

    public Plant avgLight(Float avgLight) {
    	this.avgLight = avgLight;
    	return this;
    }
    
    public void setAvgLight(Float avgLight) {
    	this.avgLight = avgLight;
    }

    public Float getAvgMoisture() {
    	return avgMoisture;
    }

    public Plant avgMoisture(Float avgMoisture) {
    	this.avgMoisture = avgMoisture;
    	return this;
    }
    
    public void setAvgMoisture(Float avgMoisture) {
    	this.avgMoisture = avgMoisture;
    }

    public PlantThresholds getPlantthresholds() {
        return plantthresholds;
    }

    public Plant plantthresholds(PlantThresholds plantThresholds) {
        this.plantthresholds = plantThresholds;
        return this;
    }

    public void setPlantthresholds(PlantThresholds plantThresholds) {
        this.plantthresholds = plantThresholds;
    }

    public Set<PlantCase> getPlantcases() {
        return plantcases;
    }

    public Plant plantcases(Set<PlantCase> plantCases) {
        this.plantcases = plantCases;
        return this;
    }

    public Plant addPlantcase(PlantCase plantCase) {
        this.plantcases.add(plantCase);
        plantCase.setPlant(this);
        return this;
    }

    public Plant removePlantcase(PlantCase plantCase) {
        this.plantcases.remove(plantCase);
        plantCase.setPlant(null);
        return this;
    }

    public void setPlantcases(Set<PlantCase> plantCases) {
        this.plantcases = plantCases;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Plant customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Plant)) {
            return false;
        }
        return id != null && id.equals(((Plant) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Plant{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", location='" + getLocation() + "'" +
            ", sensorID='" + getSensorID() + "'" +
            ", avgTemp='" + getAvgTemp() + "'" +
            ", avgHumidity='" + getAvgHumidity() + "'" +
            ", avgLight='" + getAvgLight() + "'" +
            ", avgMoisture='" + getAvgMoisture() + "'" +
            "}";
    }
}
