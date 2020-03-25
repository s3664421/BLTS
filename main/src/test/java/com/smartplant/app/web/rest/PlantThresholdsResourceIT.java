package com.smartplant.app.web.rest;

import com.smartplant.app.MainApp;
import com.smartplant.app.domain.PlantThresholds;
import com.smartplant.app.repository.PlantThresholdsRepository;

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
 * Integration tests for the {@link PlantThresholdsResource} REST controller.
 */
@SpringBootTest(classes = MainApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class PlantThresholdsResourceIT {

    private static final Float DEFAULT_TEMP_LOW = 1F;
    private static final Float UPDATED_TEMP_LOW = 2F;

    private static final Float DEFAULT_TEMP_HIGH = 1F;
    private static final Float UPDATED_TEMP_HIGH = 2F;

    private static final Float DEFAULT_HUMIDITY_LOW = 1F;
    private static final Float UPDATED_HUMIDITY_LOW = 2F;

    private static final Float DEFAULT_HUMIDITY_HIGH = 1F;
    private static final Float UPDATED_HUMIDITY_HIGH = 2F;

    private static final Float DEFAULT_LIGHT_LOW = 1F;
    private static final Float UPDATED_LIGHT_LOW = 2F;

    private static final Float DEFAULT_LIGHT_HIGH = 1F;
    private static final Float UPDATED_LIGHT_HIGH = 2F;

    private static final Float DEFAULT_MOISTURE_LOW = 1F;
    private static final Float UPDATED_MOISTURE_LOW = 2F;

    private static final Float DEFAULT_MOISTURE_HIGH = 1F;
    private static final Float UPDATED_MOISTURE_HIGH = 2F;

    @Autowired
    private PlantThresholdsRepository plantThresholdsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPlantThresholdsMockMvc;

    private PlantThresholds plantThresholds;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlantThresholds createEntity(EntityManager em) {
        PlantThresholds plantThresholds = new PlantThresholds()
            .tempLow(DEFAULT_TEMP_LOW)
            .tempHigh(DEFAULT_TEMP_HIGH)
            .humidityLow(DEFAULT_HUMIDITY_LOW)
            .humidityHigh(DEFAULT_HUMIDITY_HIGH)
            .lightLow(DEFAULT_LIGHT_LOW)
            .lightHigh(DEFAULT_LIGHT_HIGH)
            .moistureLow(DEFAULT_MOISTURE_LOW)
            .moistureHigh(DEFAULT_MOISTURE_HIGH);
        return plantThresholds;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlantThresholds createUpdatedEntity(EntityManager em) {
        PlantThresholds plantThresholds = new PlantThresholds()
            .tempLow(UPDATED_TEMP_LOW)
            .tempHigh(UPDATED_TEMP_HIGH)
            .humidityLow(UPDATED_HUMIDITY_LOW)
            .humidityHigh(UPDATED_HUMIDITY_HIGH)
            .lightLow(UPDATED_LIGHT_LOW)
            .lightHigh(UPDATED_LIGHT_HIGH)
            .moistureLow(UPDATED_MOISTURE_LOW)
            .moistureHigh(UPDATED_MOISTURE_HIGH);
        return plantThresholds;
    }

    @BeforeEach
    public void initTest() {
        plantThresholds = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlantThresholds() throws Exception {
        int databaseSizeBeforeCreate = plantThresholdsRepository.findAll().size();

        // Create the PlantThresholds
        restPlantThresholdsMockMvc.perform(post("/api/plant-thresholds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plantThresholds)))
            .andExpect(status().isCreated());

        // Validate the PlantThresholds in the database
        List<PlantThresholds> plantThresholdsList = plantThresholdsRepository.findAll();
        assertThat(plantThresholdsList).hasSize(databaseSizeBeforeCreate + 1);
        PlantThresholds testPlantThresholds = plantThresholdsList.get(plantThresholdsList.size() - 1);
        assertThat(testPlantThresholds.getTempLow()).isEqualTo(DEFAULT_TEMP_LOW);
        assertThat(testPlantThresholds.getTempHigh()).isEqualTo(DEFAULT_TEMP_HIGH);
        assertThat(testPlantThresholds.getHumidityLow()).isEqualTo(DEFAULT_HUMIDITY_LOW);
        assertThat(testPlantThresholds.getHumidityHigh()).isEqualTo(DEFAULT_HUMIDITY_HIGH);
        assertThat(testPlantThresholds.getLightLow()).isEqualTo(DEFAULT_LIGHT_LOW);
        assertThat(testPlantThresholds.getLightHigh()).isEqualTo(DEFAULT_LIGHT_HIGH);
        assertThat(testPlantThresholds.getMoistureLow()).isEqualTo(DEFAULT_MOISTURE_LOW);
        assertThat(testPlantThresholds.getMoistureHigh()).isEqualTo(DEFAULT_MOISTURE_HIGH);
    }

    @Test
    @Transactional
    public void createPlantThresholdsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = plantThresholdsRepository.findAll().size();

        // Create the PlantThresholds with an existing ID
        plantThresholds.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlantThresholdsMockMvc.perform(post("/api/plant-thresholds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plantThresholds)))
            .andExpect(status().isBadRequest());

        // Validate the PlantThresholds in the database
        List<PlantThresholds> plantThresholdsList = plantThresholdsRepository.findAll();
        assertThat(plantThresholdsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTempLowIsRequired() throws Exception {
        int databaseSizeBeforeTest = plantThresholdsRepository.findAll().size();
        // set the field null
        plantThresholds.setTempLow(null);

        // Create the PlantThresholds, which fails.

        restPlantThresholdsMockMvc.perform(post("/api/plant-thresholds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plantThresholds)))
            .andExpect(status().isBadRequest());

        List<PlantThresholds> plantThresholdsList = plantThresholdsRepository.findAll();
        assertThat(plantThresholdsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTempHighIsRequired() throws Exception {
        int databaseSizeBeforeTest = plantThresholdsRepository.findAll().size();
        // set the field null
        plantThresholds.setTempHigh(null);

        // Create the PlantThresholds, which fails.

        restPlantThresholdsMockMvc.perform(post("/api/plant-thresholds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plantThresholds)))
            .andExpect(status().isBadRequest());

        List<PlantThresholds> plantThresholdsList = plantThresholdsRepository.findAll();
        assertThat(plantThresholdsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHumidityLowIsRequired() throws Exception {
        int databaseSizeBeforeTest = plantThresholdsRepository.findAll().size();
        // set the field null
        plantThresholds.setHumidityLow(null);

        // Create the PlantThresholds, which fails.

        restPlantThresholdsMockMvc.perform(post("/api/plant-thresholds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plantThresholds)))
            .andExpect(status().isBadRequest());

        List<PlantThresholds> plantThresholdsList = plantThresholdsRepository.findAll();
        assertThat(plantThresholdsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHumidityHighIsRequired() throws Exception {
        int databaseSizeBeforeTest = plantThresholdsRepository.findAll().size();
        // set the field null
        plantThresholds.setHumidityHigh(null);

        // Create the PlantThresholds, which fails.

        restPlantThresholdsMockMvc.perform(post("/api/plant-thresholds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plantThresholds)))
            .andExpect(status().isBadRequest());

        List<PlantThresholds> plantThresholdsList = plantThresholdsRepository.findAll();
        assertThat(plantThresholdsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLightLowIsRequired() throws Exception {
        int databaseSizeBeforeTest = plantThresholdsRepository.findAll().size();
        // set the field null
        plantThresholds.setLightLow(null);

        // Create the PlantThresholds, which fails.

        restPlantThresholdsMockMvc.perform(post("/api/plant-thresholds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plantThresholds)))
            .andExpect(status().isBadRequest());

        List<PlantThresholds> plantThresholdsList = plantThresholdsRepository.findAll();
        assertThat(plantThresholdsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLightHighIsRequired() throws Exception {
        int databaseSizeBeforeTest = plantThresholdsRepository.findAll().size();
        // set the field null
        plantThresholds.setLightHigh(null);

        // Create the PlantThresholds, which fails.

        restPlantThresholdsMockMvc.perform(post("/api/plant-thresholds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plantThresholds)))
            .andExpect(status().isBadRequest());

        List<PlantThresholds> plantThresholdsList = plantThresholdsRepository.findAll();
        assertThat(plantThresholdsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMoistureLowIsRequired() throws Exception {
        int databaseSizeBeforeTest = plantThresholdsRepository.findAll().size();
        // set the field null
        plantThresholds.setMoistureLow(null);

        // Create the PlantThresholds, which fails.

        restPlantThresholdsMockMvc.perform(post("/api/plant-thresholds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plantThresholds)))
            .andExpect(status().isBadRequest());

        List<PlantThresholds> plantThresholdsList = plantThresholdsRepository.findAll();
        assertThat(plantThresholdsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMoistureHighIsRequired() throws Exception {
        int databaseSizeBeforeTest = plantThresholdsRepository.findAll().size();
        // set the field null
        plantThresholds.setMoistureHigh(null);

        // Create the PlantThresholds, which fails.

        restPlantThresholdsMockMvc.perform(post("/api/plant-thresholds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plantThresholds)))
            .andExpect(status().isBadRequest());

        List<PlantThresholds> plantThresholdsList = plantThresholdsRepository.findAll();
        assertThat(plantThresholdsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPlantThresholds() throws Exception {
        // Initialize the database
        plantThresholdsRepository.saveAndFlush(plantThresholds);

        // Get all the plantThresholdsList
        restPlantThresholdsMockMvc.perform(get("/api/plant-thresholds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plantThresholds.getId().intValue())))
            .andExpect(jsonPath("$.[*].tempLow").value(hasItem(DEFAULT_TEMP_LOW.doubleValue())))
            .andExpect(jsonPath("$.[*].tempHigh").value(hasItem(DEFAULT_TEMP_HIGH.doubleValue())))
            .andExpect(jsonPath("$.[*].humidityLow").value(hasItem(DEFAULT_HUMIDITY_LOW.doubleValue())))
            .andExpect(jsonPath("$.[*].humidityHigh").value(hasItem(DEFAULT_HUMIDITY_HIGH.doubleValue())))
            .andExpect(jsonPath("$.[*].lightLow").value(hasItem(DEFAULT_LIGHT_LOW.doubleValue())))
            .andExpect(jsonPath("$.[*].lightHigh").value(hasItem(DEFAULT_LIGHT_HIGH.doubleValue())))
            .andExpect(jsonPath("$.[*].moistureLow").value(hasItem(DEFAULT_MOISTURE_LOW.doubleValue())))
            .andExpect(jsonPath("$.[*].moistureHigh").value(hasItem(DEFAULT_MOISTURE_HIGH.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getPlantThresholds() throws Exception {
        // Initialize the database
        plantThresholdsRepository.saveAndFlush(plantThresholds);

        // Get the plantThresholds
        restPlantThresholdsMockMvc.perform(get("/api/plant-thresholds/{id}", plantThresholds.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(plantThresholds.getId().intValue()))
            .andExpect(jsonPath("$.tempLow").value(DEFAULT_TEMP_LOW.doubleValue()))
            .andExpect(jsonPath("$.tempHigh").value(DEFAULT_TEMP_HIGH.doubleValue()))
            .andExpect(jsonPath("$.humidityLow").value(DEFAULT_HUMIDITY_LOW.doubleValue()))
            .andExpect(jsonPath("$.humidityHigh").value(DEFAULT_HUMIDITY_HIGH.doubleValue()))
            .andExpect(jsonPath("$.lightLow").value(DEFAULT_LIGHT_LOW.doubleValue()))
            .andExpect(jsonPath("$.lightHigh").value(DEFAULT_LIGHT_HIGH.doubleValue()))
            .andExpect(jsonPath("$.moistureLow").value(DEFAULT_MOISTURE_LOW.doubleValue()))
            .andExpect(jsonPath("$.moistureHigh").value(DEFAULT_MOISTURE_HIGH.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPlantThresholds() throws Exception {
        // Get the plantThresholds
        restPlantThresholdsMockMvc.perform(get("/api/plant-thresholds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlantThresholds() throws Exception {
        // Initialize the database
        plantThresholdsRepository.saveAndFlush(plantThresholds);

        int databaseSizeBeforeUpdate = plantThresholdsRepository.findAll().size();

        // Update the plantThresholds
        PlantThresholds updatedPlantThresholds = plantThresholdsRepository.findById(plantThresholds.getId()).get();
        // Disconnect from session so that the updates on updatedPlantThresholds are not directly saved in db
        em.detach(updatedPlantThresholds);
        updatedPlantThresholds
            .tempLow(UPDATED_TEMP_LOW)
            .tempHigh(UPDATED_TEMP_HIGH)
            .humidityLow(UPDATED_HUMIDITY_LOW)
            .humidityHigh(UPDATED_HUMIDITY_HIGH)
            .lightLow(UPDATED_LIGHT_LOW)
            .lightHigh(UPDATED_LIGHT_HIGH)
            .moistureLow(UPDATED_MOISTURE_LOW)
            .moistureHigh(UPDATED_MOISTURE_HIGH);

        restPlantThresholdsMockMvc.perform(put("/api/plant-thresholds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlantThresholds)))
            .andExpect(status().isOk());

        // Validate the PlantThresholds in the database
        List<PlantThresholds> plantThresholdsList = plantThresholdsRepository.findAll();
        assertThat(plantThresholdsList).hasSize(databaseSizeBeforeUpdate);
        PlantThresholds testPlantThresholds = plantThresholdsList.get(plantThresholdsList.size() - 1);
        assertThat(testPlantThresholds.getTempLow()).isEqualTo(UPDATED_TEMP_LOW);
        assertThat(testPlantThresholds.getTempHigh()).isEqualTo(UPDATED_TEMP_HIGH);
        assertThat(testPlantThresholds.getHumidityLow()).isEqualTo(UPDATED_HUMIDITY_LOW);
        assertThat(testPlantThresholds.getHumidityHigh()).isEqualTo(UPDATED_HUMIDITY_HIGH);
        assertThat(testPlantThresholds.getLightLow()).isEqualTo(UPDATED_LIGHT_LOW);
        assertThat(testPlantThresholds.getLightHigh()).isEqualTo(UPDATED_LIGHT_HIGH);
        assertThat(testPlantThresholds.getMoistureLow()).isEqualTo(UPDATED_MOISTURE_LOW);
        assertThat(testPlantThresholds.getMoistureHigh()).isEqualTo(UPDATED_MOISTURE_HIGH);
    }

    @Test
    @Transactional
    public void updateNonExistingPlantThresholds() throws Exception {
        int databaseSizeBeforeUpdate = plantThresholdsRepository.findAll().size();

        // Create the PlantThresholds

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlantThresholdsMockMvc.perform(put("/api/plant-thresholds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plantThresholds)))
            .andExpect(status().isBadRequest());

        // Validate the PlantThresholds in the database
        List<PlantThresholds> plantThresholdsList = plantThresholdsRepository.findAll();
        assertThat(plantThresholdsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlantThresholds() throws Exception {
        // Initialize the database
        plantThresholdsRepository.saveAndFlush(plantThresholds);

        int databaseSizeBeforeDelete = plantThresholdsRepository.findAll().size();

        // Delete the plantThresholds
        restPlantThresholdsMockMvc.perform(delete("/api/plant-thresholds/{id}", plantThresholds.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlantThresholds> plantThresholdsList = plantThresholdsRepository.findAll();
        assertThat(plantThresholdsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
