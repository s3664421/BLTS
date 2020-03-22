package com.smartplant.app.web.rest;

import com.smartplant.app.MainApp;
import com.smartplant.app.domain.Requirments;
import com.smartplant.app.repository.RequirmentsRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RequirmentsResource} REST controller.
 */
@SpringBootTest(classes = MainApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class RequirmentsResourceIT {

    private static final Long DEFAULT_TEMP_LOW = 1L;
    private static final Long UPDATED_TEMP_LOW = 2L;

    private static final Long DEFAULT_TEMP_HIGH = 1L;
    private static final Long UPDATED_TEMP_HIGH = 2L;

    private static final Long DEFAULT_HUMIDITY_LOW = 1L;
    private static final Long UPDATED_HUMIDITY_LOW = 2L;

    private static final Long DEFAULT_HUMIDITY_HIGH = 1L;
    private static final Long UPDATED_HUMIDITY_HIGH = 2L;

    private static final Long DEFAULT_LIGHT_LOW = 1L;
    private static final Long UPDATED_LIGHT_LOW = 2L;

    private static final Long DEFAULT_LIGHT_HIGH = 1L;
    private static final Long UPDATED_LIGHT_HIGH = 2L;

    private static final Long DEFAULT_MOISTURE_LOW = 1L;
    private static final Long UPDATED_MOISTURE_LOW = 2L;

    private static final Long DEFAULT_MOISTURE_HIGH = 1L;
    private static final Long UPDATED_MOISTURE_HIGH = 2L;

    @Autowired
    private RequirmentsRepository requirmentsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRequirmentsMockMvc;

    private Requirments requirments;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Requirments createEntity(EntityManager em) {
        Requirments requirments = new Requirments()
            .tempLow(DEFAULT_TEMP_LOW)
            .tempHigh(DEFAULT_TEMP_HIGH)
            .humidityLow(DEFAULT_HUMIDITY_LOW)
            .humidityHigh(DEFAULT_HUMIDITY_HIGH)
            .lightLow(DEFAULT_LIGHT_LOW)
            .lightHigh(DEFAULT_LIGHT_HIGH)
            .moistureLow(DEFAULT_MOISTURE_LOW)
            .moistureHigh(DEFAULT_MOISTURE_HIGH);
        return requirments;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Requirments createUpdatedEntity(EntityManager em) {
        Requirments requirments = new Requirments()
            .tempLow(UPDATED_TEMP_LOW)
            .tempHigh(UPDATED_TEMP_HIGH)
            .humidityLow(UPDATED_HUMIDITY_LOW)
            .humidityHigh(UPDATED_HUMIDITY_HIGH)
            .lightLow(UPDATED_LIGHT_LOW)
            .lightHigh(UPDATED_LIGHT_HIGH)
            .moistureLow(UPDATED_MOISTURE_LOW)
            .moistureHigh(UPDATED_MOISTURE_HIGH);
        return requirments;
    }

    @BeforeEach
    public void initTest() {
        requirments = createEntity(em);
    }

    @Test
    @Transactional
    public void createRequirments() throws Exception {
        int databaseSizeBeforeCreate = requirmentsRepository.findAll().size();

        // Create the Requirments
        restRequirmentsMockMvc.perform(post("/api/requirments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(requirments)))
            .andExpect(status().isCreated());

        // Validate the Requirments in the database
        List<Requirments> requirmentsList = requirmentsRepository.findAll();
        assertThat(requirmentsList).hasSize(databaseSizeBeforeCreate + 1);
        Requirments testRequirments = requirmentsList.get(requirmentsList.size() - 1);
        assertThat(testRequirments.getTempLow()).isEqualTo(DEFAULT_TEMP_LOW);
        assertThat(testRequirments.getTempHigh()).isEqualTo(DEFAULT_TEMP_HIGH);
        assertThat(testRequirments.getHumidityLow()).isEqualTo(DEFAULT_HUMIDITY_LOW);
        assertThat(testRequirments.getHumidityHigh()).isEqualTo(DEFAULT_HUMIDITY_HIGH);
        assertThat(testRequirments.getLightLow()).isEqualTo(DEFAULT_LIGHT_LOW);
        assertThat(testRequirments.getLightHigh()).isEqualTo(DEFAULT_LIGHT_HIGH);
        assertThat(testRequirments.getMoistureLow()).isEqualTo(DEFAULT_MOISTURE_LOW);
        assertThat(testRequirments.getMoistureHigh()).isEqualTo(DEFAULT_MOISTURE_HIGH);
    }

    @Test
    @Transactional
    public void createRequirmentsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = requirmentsRepository.findAll().size();

        // Create the Requirments with an existing ID
        requirments.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRequirmentsMockMvc.perform(post("/api/requirments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(requirments)))
            .andExpect(status().isBadRequest());

        // Validate the Requirments in the database
        List<Requirments> requirmentsList = requirmentsRepository.findAll();
        assertThat(requirmentsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRequirments() throws Exception {
        // Initialize the database
        requirmentsRepository.saveAndFlush(requirments);

        // Get all the requirmentsList
        restRequirmentsMockMvc.perform(get("/api/requirments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(requirments.getId().intValue())))
            .andExpect(jsonPath("$.[*].tempLow").value(hasItem(DEFAULT_TEMP_LOW.intValue())))
            .andExpect(jsonPath("$.[*].tempHigh").value(hasItem(DEFAULT_TEMP_HIGH.intValue())))
            .andExpect(jsonPath("$.[*].humidityLow").value(hasItem(DEFAULT_HUMIDITY_LOW.intValue())))
            .andExpect(jsonPath("$.[*].humidityHigh").value(hasItem(DEFAULT_HUMIDITY_HIGH.intValue())))
            .andExpect(jsonPath("$.[*].lightLow").value(hasItem(DEFAULT_LIGHT_LOW.intValue())))
            .andExpect(jsonPath("$.[*].lightHigh").value(hasItem(DEFAULT_LIGHT_HIGH.intValue())))
            .andExpect(jsonPath("$.[*].moistureLow").value(hasItem(DEFAULT_MOISTURE_LOW.intValue())))
            .andExpect(jsonPath("$.[*].moistureHigh").value(hasItem(DEFAULT_MOISTURE_HIGH.intValue())));
    }
    
    @Test
    @Transactional
    public void getRequirments() throws Exception {
        // Initialize the database
        requirmentsRepository.saveAndFlush(requirments);

        // Get the requirments
        restRequirmentsMockMvc.perform(get("/api/requirments/{id}", requirments.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(requirments.getId().intValue()))
            .andExpect(jsonPath("$.tempLow").value(DEFAULT_TEMP_LOW.intValue()))
            .andExpect(jsonPath("$.tempHigh").value(DEFAULT_TEMP_HIGH.intValue()))
            .andExpect(jsonPath("$.humidityLow").value(DEFAULT_HUMIDITY_LOW.intValue()))
            .andExpect(jsonPath("$.humidityHigh").value(DEFAULT_HUMIDITY_HIGH.intValue()))
            .andExpect(jsonPath("$.lightLow").value(DEFAULT_LIGHT_LOW.intValue()))
            .andExpect(jsonPath("$.lightHigh").value(DEFAULT_LIGHT_HIGH.intValue()))
            .andExpect(jsonPath("$.moistureLow").value(DEFAULT_MOISTURE_LOW.intValue()))
            .andExpect(jsonPath("$.moistureHigh").value(DEFAULT_MOISTURE_HIGH.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRequirments() throws Exception {
        // Get the requirments
        restRequirmentsMockMvc.perform(get("/api/requirments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRequirments() throws Exception {
        // Initialize the database
        requirmentsRepository.saveAndFlush(requirments);

        int databaseSizeBeforeUpdate = requirmentsRepository.findAll().size();

        // Update the requirments
        Requirments updatedRequirments = requirmentsRepository.findById(requirments.getId()).get();
        // Disconnect from session so that the updates on updatedRequirments are not directly saved in db
        em.detach(updatedRequirments);
        updatedRequirments
            .tempLow(UPDATED_TEMP_LOW)
            .tempHigh(UPDATED_TEMP_HIGH)
            .humidityLow(UPDATED_HUMIDITY_LOW)
            .humidityHigh(UPDATED_HUMIDITY_HIGH)
            .lightLow(UPDATED_LIGHT_LOW)
            .lightHigh(UPDATED_LIGHT_HIGH)
            .moistureLow(UPDATED_MOISTURE_LOW)
            .moistureHigh(UPDATED_MOISTURE_HIGH);

        restRequirmentsMockMvc.perform(put("/api/requirments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRequirments)))
            .andExpect(status().isOk());

        // Validate the Requirments in the database
        List<Requirments> requirmentsList = requirmentsRepository.findAll();
        assertThat(requirmentsList).hasSize(databaseSizeBeforeUpdate);
        Requirments testRequirments = requirmentsList.get(requirmentsList.size() - 1);
        assertThat(testRequirments.getTempLow()).isEqualTo(UPDATED_TEMP_LOW);
        assertThat(testRequirments.getTempHigh()).isEqualTo(UPDATED_TEMP_HIGH);
        assertThat(testRequirments.getHumidityLow()).isEqualTo(UPDATED_HUMIDITY_LOW);
        assertThat(testRequirments.getHumidityHigh()).isEqualTo(UPDATED_HUMIDITY_HIGH);
        assertThat(testRequirments.getLightLow()).isEqualTo(UPDATED_LIGHT_LOW);
        assertThat(testRequirments.getLightHigh()).isEqualTo(UPDATED_LIGHT_HIGH);
        assertThat(testRequirments.getMoistureLow()).isEqualTo(UPDATED_MOISTURE_LOW);
        assertThat(testRequirments.getMoistureHigh()).isEqualTo(UPDATED_MOISTURE_HIGH);
    }

    @Test
    @Transactional
    public void updateNonExistingRequirments() throws Exception {
        int databaseSizeBeforeUpdate = requirmentsRepository.findAll().size();

        // Create the Requirments

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRequirmentsMockMvc.perform(put("/api/requirments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(requirments)))
            .andExpect(status().isBadRequest());

        // Validate the Requirments in the database
        List<Requirments> requirmentsList = requirmentsRepository.findAll();
        assertThat(requirmentsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRequirments() throws Exception {
        // Initialize the database
        requirmentsRepository.saveAndFlush(requirments);

        int databaseSizeBeforeDelete = requirmentsRepository.findAll().size();

        // Delete the requirments
        restRequirmentsMockMvc.perform(delete("/api/requirments/{id}", requirments.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Requirments> requirmentsList = requirmentsRepository.findAll();
        assertThat(requirmentsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
