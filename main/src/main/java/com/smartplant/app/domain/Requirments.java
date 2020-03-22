package com.smartplant.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Requirments.
 */
@Entity
@Table(name = "requirments")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Requirments implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "temp_low")
    private Long tempLow;

    @Column(name = "temp_high")
    private Long tempHigh;

    @Column(name = "humidity_low")
    private Long humidityLow;

    @Column(name = "humidity_high")
    private Long humidityHigh;

    @Column(name = "light_low")
    private Long lightLow;

    @Column(name = "light_high")
    private Long lightHigh;

    @Column(name = "moisture_low")
    private Long moistureLow;

    @Column(name = "moisture_high")
    private Long moistureHigh;

    @OneToOne
    @JoinColumn(unique = true)
    private Plant plant;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTempLow() {
        return tempLow;
    }

    public Requirments tempLow(Long tempLow) {
        this.tempLow = tempLow;
        return this;
    }

    public void setTempLow(Long tempLow) {
        this.tempLow = tempLow;
    }

    public Long getTempHigh() {
        return tempHigh;
    }

    public Requirments tempHigh(Long tempHigh) {
        this.tempHigh = tempHigh;
        return this;
    }

    public void setTempHigh(Long tempHigh) {
        this.tempHigh = tempHigh;
    }

    public Long getHumidityLow() {
        return humidityLow;
    }

    public Requirments humidityLow(Long humidityLow) {
        this.humidityLow = humidityLow;
        return this;
    }

    public void setHumidityLow(Long humidityLow) {
        this.humidityLow = humidityLow;
    }

    public Long getHumidityHigh() {
        return humidityHigh;
    }

    public Requirments humidityHigh(Long humidityHigh) {
        this.humidityHigh = humidityHigh;
        return this;
    }

    public void setHumidityHigh(Long humidityHigh) {
        this.humidityHigh = humidityHigh;
    }

    public Long getLightLow() {
        return lightLow;
    }

    public Requirments lightLow(Long lightLow) {
        this.lightLow = lightLow;
        return this;
    }

    public void setLightLow(Long lightLow) {
        this.lightLow = lightLow;
    }

    public Long getLightHigh() {
        return lightHigh;
    }

    public Requirments lightHigh(Long lightHigh) {
        this.lightHigh = lightHigh;
        return this;
    }

    public void setLightHigh(Long lightHigh) {
        this.lightHigh = lightHigh;
    }

    public Long getMoistureLow() {
        return moistureLow;
    }

    public Requirments moistureLow(Long moistureLow) {
        this.moistureLow = moistureLow;
        return this;
    }

    public void setMoistureLow(Long moistureLow) {
        this.moistureLow = moistureLow;
    }

    public Long getMoistureHigh() {
        return moistureHigh;
    }

    public Requirments moistureHigh(Long moistureHigh) {
        this.moistureHigh = moistureHigh;
        return this;
    }

    public void setMoistureHigh(Long moistureHigh) {
        this.moistureHigh = moistureHigh;
    }

    public Plant getPlant() {
        return plant;
    }

    public Requirments plant(Plant plant) {
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
        if (!(o instanceof Requirments)) {
            return false;
        }
        return id != null && id.equals(((Requirments) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Requirments{" +
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
