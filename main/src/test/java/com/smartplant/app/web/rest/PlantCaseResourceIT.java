package com.smartplant.app.web.rest;

import com.smartplant.app.MainApp;
import com.smartplant.app.domain.PlantCase;
import com.smartplant.app.repository.PlantCaseRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.smartplant.app.domain.enumeration.AttentionItem;
import com.smartplant.app.domain.enumeration.CaseStatus;
/**
 * Integration tests for the {@link PlantCaseResource} REST controller.
 */
@SpringBootTest(classes = MainApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class PlantCaseResourceIT {

    private static final AttentionItem DEFAULT_NEEDS_ATTENTION = AttentionItem.TEMP_LOW;
    private static final AttentionItem UPDATED_NEEDS_ATTENTION = AttentionItem.TEMP_HIGH;

    private static final Instant DEFAULT_TIME_OPENED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIME_OPENED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_TIME_CLOSED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIME_CLOSED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final CaseStatus DEFAULT_STATUS = CaseStatus.OPEN;
    private static final CaseStatus UPDATED_STATUS = CaseStatus.CLOSED;

    private static final String DEFAULT_CASE_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_CASE_NOTES = "BBBBBBBBBB";

    @Autowired
    private PlantCaseRepository plantCaseRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPlantCaseMockMvc;

    private PlantCase plantCase;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlantCase createEntity(EntityManager em) {
        PlantCase plantCase = new PlantCase()
            .needsAttention(DEFAULT_NEEDS_ATTENTION)
            .timeOpened(DEFAULT_TIME_OPENED)
            .timeClosed(DEFAULT_TIME_CLOSED)
            .status(DEFAULT_STATUS)
            .caseNotes(DEFAULT_CASE_NOTES);
        return plantCase;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlantCase createUpdatedEntity(EntityManager em) {
        PlantCase plantCase = new PlantCase()
            .needsAttention(UPDATED_NEEDS_ATTENTION)
            .timeOpened(UPDATED_TIME_OPENED)
            .timeClosed(UPDATED_TIME_CLOSED)
            .status(UPDATED_STATUS)
            .caseNotes(UPDATED_CASE_NOTES);
        return plantCase;
    }

    @BeforeEach
    public void initTest() {
        plantCase = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlantCase() throws Exception {
        int databaseSizeBeforeCreate = plantCaseRepository.findAll().size();

        // Create the PlantCase
        restPlantCaseMockMvc.perform(post("/api/plant-cases")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plantCase)))
            .andExpect(status().isCreated());

        // Validate the PlantCase in the database
        List<PlantCase> plantCaseList = plantCaseRepository.findAll();
        assertThat(plantCaseList).hasSize(databaseSizeBeforeCreate + 1);
        PlantCase testPlantCase = plantCaseList.get(plantCaseList.size() - 1);
        assertThat(testPlantCase.getNeedsAttention()).isEqualTo(DEFAULT_NEEDS_ATTENTION);
        assertThat(testPlantCase.getTimeOpened()).isEqualTo(DEFAULT_TIME_OPENED);
        assertThat(testPlantCase.getTimeClosed()).isEqualTo(DEFAULT_TIME_CLOSED);
        assertThat(testPlantCase.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testPlantCase.getCaseNotes()).isEqualTo(DEFAULT_CASE_NOTES);
    }

    @Test
    @Transactional
    public void createPlantCaseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = plantCaseRepository.findAll().size();

        // Create the PlantCase with an existing ID
        plantCase.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlantCaseMockMvc.perform(post("/api/plant-cases")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plantCase)))
            .andExpect(status().isBadRequest());

        // Validate the PlantCase in the database
        List<PlantCase> plantCaseList = plantCaseRepository.findAll();
        assertThat(plantCaseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlantCases() throws Exception {
        // Initialize the database
        plantCaseRepository.saveAndFlush(plantCase);

        // Get all the plantCaseList
        restPlantCaseMockMvc.perform(get("/api/plant-cases?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plantCase.getId().intValue())))
            .andExpect(jsonPath("$.[*].needsAttention").value(hasItem(DEFAULT_NEEDS_ATTENTION.toString())))
            .andExpect(jsonPath("$.[*].timeOpened").value(hasItem(DEFAULT_TIME_OPENED.toString())))
            .andExpect(jsonPath("$.[*].timeClosed").value(hasItem(DEFAULT_TIME_CLOSED.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].caseNotes").value(hasItem(DEFAULT_CASE_NOTES)));
    }
    
    @Test
    @Transactional
    public void getPlantCase() throws Exception {
        // Initialize the database
        plantCaseRepository.saveAndFlush(plantCase);

        // Get the plantCase
        restPlantCaseMockMvc.perform(get("/api/plant-cases/{id}", plantCase.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(plantCase.getId().intValue()))
            .andExpect(jsonPath("$.needsAttention").value(DEFAULT_NEEDS_ATTENTION.toString()))
            .andExpect(jsonPath("$.timeOpened").value(DEFAULT_TIME_OPENED.toString()))
            .andExpect(jsonPath("$.timeClosed").value(DEFAULT_TIME_CLOSED.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.caseNotes").value(DEFAULT_CASE_NOTES));
    }

    @Test
    @Transactional
    public void getNonExistingPlantCase() throws Exception {
        // Get the plantCase
        restPlantCaseMockMvc.perform(get("/api/plant-cases/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlantCase() throws Exception {
        // Initialize the database
        plantCaseRepository.saveAndFlush(plantCase);

        int databaseSizeBeforeUpdate = plantCaseRepository.findAll().size();

        // Update the plantCase
        PlantCase updatedPlantCase = plantCaseRepository.findById(plantCase.getId()).get();
        // Disconnect from session so that the updates on updatedPlantCase are not directly saved in db
        em.detach(updatedPlantCase);
        updatedPlantCase
            .needsAttention(UPDATED_NEEDS_ATTENTION)
            .timeOpened(UPDATED_TIME_OPENED)
            .timeClosed(UPDATED_TIME_CLOSED)
            .status(UPDATED_STATUS)
            .caseNotes(UPDATED_CASE_NOTES);

        restPlantCaseMockMvc.perform(put("/api/plant-cases")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlantCase)))
            .andExpect(status().isOk());

        // Validate the PlantCase in the database
        List<PlantCase> plantCaseList = plantCaseRepository.findAll();
        assertThat(plantCaseList).hasSize(databaseSizeBeforeUpdate);
        PlantCase testPlantCase = plantCaseList.get(plantCaseList.size() - 1);
        assertThat(testPlantCase.getNeedsAttention()).isEqualTo(UPDATED_NEEDS_ATTENTION);
        assertThat(testPlantCase.getTimeOpened()).isEqualTo(UPDATED_TIME_OPENED);
        assertThat(testPlantCase.getTimeClosed()).isEqualTo(UPDATED_TIME_CLOSED);
        assertThat(testPlantCase.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testPlantCase.getCaseNotes()).isEqualTo(UPDATED_CASE_NOTES);
    }

    @Test
    @Transactional
    public void updateNonExistingPlantCase() throws Exception {
        int databaseSizeBeforeUpdate = plantCaseRepository.findAll().size();

        // Create the PlantCase

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlantCaseMockMvc.perform(put("/api/plant-cases")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plantCase)))
            .andExpect(status().isBadRequest());

        // Validate the PlantCase in the database
        List<PlantCase> plantCaseList = plantCaseRepository.findAll();
        assertThat(plantCaseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlantCase() throws Exception {
        // Initialize the database
        plantCaseRepository.saveAndFlush(plantCase);

        int databaseSizeBeforeDelete = plantCaseRepository.findAll().size();

        // Delete the plantCase
        restPlantCaseMockMvc.perform(delete("/api/plant-cases/{id}", plantCase.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlantCase> plantCaseList = plantCaseRepository.findAll();
        assertThat(plantCaseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
