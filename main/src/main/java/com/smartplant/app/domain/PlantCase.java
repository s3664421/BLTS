package com.smartplant.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;

/**
 * A PlantCase.
 */
@Entity
@Table(name = "plant_case")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PlantCase implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "time_opened")
    private Instant timeOpened;

    @Column(name = "time_closed")
    private Instant timeClosed;

    @Column(name = "status")
    private String status;

    @Column(name = "open")
    private Boolean open;

    @ManyToOne
    @JsonIgnoreProperties("plantCases")
    private Plant plant;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getTimeOpened() {
        return timeOpened;
    }

    public PlantCase timeOpened(Instant timeOpened) {
        this.timeOpened = timeOpened;
        return this;
    }

    public void setTimeOpened(Instant timeOpened) {
        this.timeOpened = timeOpened;
    }

    public Instant getTimeClosed() {
        return timeClosed;
    }

    public PlantCase timeClosed(Instant timeClosed) {
        this.timeClosed = timeClosed;
        return this;
    }

    public void setTimeClosed(Instant timeClosed) {
        this.timeClosed = timeClosed;
    }

    public String getStatus() {
        return status;
    }

    public PlantCase status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean isOpen() {
        return open;
    }

    public PlantCase open(Boolean open) {
        this.open = open;
        return this;
    }

    public void setOpen(Boolean open) {
        this.open = open;
    }

    public Plant getPlant() {
        return plant;
    }

    public PlantCase plant(Plant plant) {
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
        if (!(o instanceof PlantCase)) {
            return false;
        }
        return id != null && id.equals(((PlantCase) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PlantCase{" +
            "id=" + getId() +
            ", timeOpened='" + getTimeOpened() + "'" +
            ", timeClosed='" + getTimeClosed() + "'" +
            ", status='" + getStatus() + "'" +
            ", open='" + isOpen() + "'" +
            "}";
    }
}
