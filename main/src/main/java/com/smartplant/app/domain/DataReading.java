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
    private Long temp;

    @NotNull
    @Column(name = "humidity", nullable = false)
    private Long humidity;

    @NotNull
    @Column(name = "light", nullable = false)
    private Long light;

    @NotNull
    @Column(name = "moisture", nullable = false)
    private Long moisture;

    @ManyToOne
    @JsonIgnoreProperties("dataReadings")
    private Sensor sensor;

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

    public Long getTemp() {
        return temp;
    }

    public DataReading temp(Long temp) {
        this.temp = temp;
        return this;
    }

    public void setTemp(Long temp) {
        this.temp = temp;
    }

    public Long getHumidity() {
        return humidity;
    }

    public DataReading humidity(Long humidity) {
        this.humidity = humidity;
        return this;
    }

    public void setHumidity(Long humidity) {
        this.humidity = humidity;
    }

    public Long getLight() {
        return light;
    }

    public DataReading light(Long light) {
        this.light = light;
        return this;
    }

    public void setLight(Long light) {
        this.light = light;
    }

    public Long getMoisture() {
        return moisture;
    }

    public DataReading moisture(Long moisture) {
        this.moisture = moisture;
        return this;
    }

    public void setMoisture(Long moisture) {
        this.moisture = moisture;
    }

    public Sensor getSensor() {
        return sensor;
    }

    public DataReading sensor(Sensor sensor) {
        this.sensor = sensor;
        return this;
    }

    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
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
