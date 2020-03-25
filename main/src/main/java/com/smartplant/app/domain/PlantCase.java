package com.smartplant.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;

import com.smartplant.app.domain.enumeration.AttentionItem;

import com.smartplant.app.domain.enumeration.CaseStatus;

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

    @Enumerated(EnumType.STRING)
    @Column(name = "needs_attention")
    private AttentionItem needsAttention;

    @Column(name = "time_opened")
    private Instant timeOpened;

    @Column(name = "time_closed")
    private Instant timeClosed;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private CaseStatus status;

    @Column(name = "case_notes")
    private String caseNotes;

    @ManyToOne
    @JsonIgnoreProperties("plantCases")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("plantcases")
    private Plant plant;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AttentionItem getNeedsAttention() {
        return needsAttention;
    }

    public PlantCase needsAttention(AttentionItem needsAttention) {
        this.needsAttention = needsAttention;
        return this;
    }

    public void setNeedsAttention(AttentionItem needsAttention) {
        this.needsAttention = needsAttention;
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

    public CaseStatus getStatus() {
        return status;
    }

    public PlantCase status(CaseStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(CaseStatus status) {
        this.status = status;
    }

    public String getCaseNotes() {
        return caseNotes;
    }

    public PlantCase caseNotes(String caseNotes) {
        this.caseNotes = caseNotes;
        return this;
    }

    public void setCaseNotes(String caseNotes) {
        this.caseNotes = caseNotes;
    }

    public User getUser() {
        return user;
    }

    public PlantCase user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
            ", needsAttention='" + getNeedsAttention() + "'" +
            ", timeOpened='" + getTimeOpened() + "'" +
            ", timeClosed='" + getTimeClosed() + "'" +
            ", status='" + getStatus() + "'" +
            ", caseNotes='" + getCaseNotes() + "'" +
            "}";
    }
}
