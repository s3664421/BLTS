package com.smartplant.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PlantThresholds.
 */
@Entity
@Table(name = "plant_thresholds")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PlantThresholds implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "temp_low", nullable = false)
    private Float tempLow;

    @NotNull
    @Column(name = "temp_high", nullable = false)
    private Float tempHigh;

    @NotNull
    @Column(name = "humidity_low", nullable = false)
    private Float humidityLow;

    @NotNull
    @Column(name = "humidity_high", nullable = false)
    private Float humidityHigh;

    @NotNull
    @Column(name = "light_low", nullable = false)
    private Float lightLow;

    @NotNull
    @Column(name = "light_high", nullable = false)
    private Float lightHigh;

    @NotNull
    @Column(name = "moisture_low", nullable = false)
    private Float moistureLow;

    @NotNull
    @Column(name = "moisture_high", nullable = false)
    private Float moistureHigh;

    @OneToOne(mappedBy = "plantthresholds")
    @JsonIgnore
    private Plant plant;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getTempLow() {
        return tempLow;
    }

    public PlantThresholds tempLow(Float tempLow) {
        this.tempLow = tempLow;
        return this;
    }

    public void setTempLow(Float tempLow) {
        this.tempLow = tempLow;
    }

    public Float getTempHigh() {
        return tempHigh;
    }

    public PlantThresholds tempHigh(Float tempHigh) {
        this.tempHigh = tempHigh;
        return this;
    }

    public void setTempHigh(Float tempHigh) {
        this.tempHigh = tempHigh;
    }

    public Float getHumidityLow() {
        return humidityLow;
    }

    public PlantThresholds humidityLow(Float humidityLow) {
        this.humidityLow = humidityLow;
        return this;
    }

    public void setHumidityLow(Float humidityLow) {
        this.humidityLow = humidityLow;
    }

    public Float getHumidityHigh() {
        return humidityHigh;
    }

    public PlantThresholds humidityHigh(Float humidityHigh) {
        this.humidityHigh = humidityHigh;
        return this;
    }

    public void setHumidityHigh(Float humidityHigh) {
        this.humidityHigh = humidityHigh;
    }

    public Float getLightLow() {
        return lightLow;
    }

    public PlantThresholds lightLow(Float lightLow) {
        this.lightLow = lightLow;
        return this;
    }

    public void setLightLow(Float lightLow) {
        this.lightLow = lightLow;
    }

    public Float getLightHigh() {
        return lightHigh;
    }

    public PlantThresholds lightHigh(Float lightHigh) {
        this.lightHigh = lightHigh;
        return this;
    }

    public void setLightHigh(Float lightHigh) {
        this.lightHigh = lightHigh;
    }

    public Float getMoistureLow() {
        return moistureLow;
    }

    public PlantThresholds moistureLow(Float moistureLow) {
        this.moistureLow = moistureLow;
        return this;
    }

    public void setMoistureLow(Float moistureLow) {
        this.moistureLow = moistureLow;
    }

    public Float getMoistureHigh() {
        return moistureHigh;
    }

    public PlantThresholds moistureHigh(Float moistureHigh) {
        this.moistureHigh = moistureHigh;
        return this;
    }

    public void setMoistureHigh(Float moistureHigh) {
        this.moistureHigh = moistureHigh;
    }

    public Plant getPlant() {
        return plant;
    }

    public PlantThresholds plant(Plant plant) {
        this.plant = plant;
        return this;
    }

    public void setPlant(Plant plant) {
        this.plant = plant;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlantThresholds)) {
            return false;
        }
        return id != null && id.equals(((PlantThresholds) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PlantThresholds{" +
            "id=" + getId() +
            ", tempLow=" + getTempLow() +
            ", tempHigh=" + getTempHigh() +
            ", humidityLow=" + getHumidityLow() +
            ", humidityHigh=" + getHumidityHigh() +
            ", lightLow=" + getLightLow() +
            ", lightHigh=" + getLightHigh() +
            ", moistureLow=" + getMoistureLow() +
            ", moistureHigh=" + getMoistureHigh() +
            "}";
    }
}
