package com.smartplant.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;

/**
 * A DataReading.
 */
@Entity
@Table(name = "data_reading")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DataReading implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "time", nullable = false)
    private Instant time;

    @NotNull
    @Column(name = "temp", nullable = false)
    private Float temp;

    @NotNull
    @Column(name = "humidity", nullable = false)
    private Float humidity;

    @NotNull
    @Column(name = "light", nullable = false)
    private Float light;

    @NotNull
    @Column(name = "moisture", nullable = false)
    private Float moisture;

    @ManyToOne
    @JsonIgnoreProperties("dataReadings")
    private Plant plant;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getTime() {
        return time;
    }

    public DataReading time(Instant time) {
        this.time = time;
        return this;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    public Float getTemp() {
        return temp;
    }

    public DataReading temp(Float temp) {
        this.temp = temp;
        return this;
    }

    public void setTemp(Float temp) {
        this.temp = temp;
    }

    public Float getHumidity() {
        return humidity;
    }

    public DataReading humidity(Float humidity) {
        this.humidity = humidity;
        return this;
    }

    public void setHumidity(Float humidity) {
        this.humidity = humidity;
    }

    public Float getLight() {
        return light;
    }

    public DataReading light(Float light) {
        this.light = light;
        return this;
    }

    public void setLight(Float light) {
        this.light = light;
    }

    public Float getMoisture() {
        return moisture;
    }

    public DataReading moisture(Float moisture) {
        this.moisture = moisture;
        return this;
    }

    public void setMoisture(Float moisture) {
        this.moisture = moisture;
    }

    public Plant getPlant() {
        return plant;
    }

    public DataReading plant(Plant plant) {
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
        if (!(o instanceof DataReading)) {
            return false;
        }
        return id != null && id.equals(((DataReading) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DataReading{" +
            "id=" + getId() +
            ", time='" + getTime() + "'" +
            ", temp=" + getTemp() +
            ", humidity=" + getHumidity() +
            ", light=" + getLight() +
            ", moisture=" + getMoisture() +
            "}";
    }
}
