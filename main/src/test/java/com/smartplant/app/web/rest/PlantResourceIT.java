package com.smartplant.app.web.rest;

import com.smartplant.app.MainApp;
import com.smartplant.app.domain.Plant;
import com.smartplant.app.repository.PlantRepository;

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
 * Integration tests for the {@link PlantResource} REST controller.
 */
@SpringBootTest(classes = MainApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class PlantResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final String DEFAULT_SENSOR_ID = "AAAAAAAAAA";
    private static final String UPDATED_SENSOR_ID = "BBBBBBBBBB";
    
    private static final Float DEFAULT_AVG_TEMP = 1f;
    private static final Float UPDATED_AVG_TEMP = 2f;

    private static final Float DEFAULT_AVG_HUMIDITY = 3f;
    private static final Float UPDATED_AVG_HUMIDITY = 4f;

    private static final Float DEFAULT_AVG_LIGHT = 5f;
    private static final Float UPDATED_AVG_LIGHT = 6f;

    private static final Float DEFAULT_AVG_MOISTURE = 7f;
    private static final Float UPDATED_AVG_MOISTURE = 8f;

    @Autowired
    private PlantRepository plantRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPlantMockMvc;

    private Plant plant;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Plant createEntity(EntityManager em) {
        Plant plant = new Plant()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .location(DEFAULT_LOCATION)
            .sensorID(DEFAULT_SENSOR_ID)
        	.avgTemp(DEFAULT_AVG_TEMP)
        	.avgHumidity(DEFAULT_AVG_HUMIDITY)
        	.avgLight(DEFAULT_AVG_LIGHT)
        	.avgMoisture(DEFAULT_AVG_MOISTURE);
        return plant;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Plant createUpdatedEntity(EntityManager em) {
        Plant plant = new Plant()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .location(UPDATED_LOCATION)
            .sensorID(UPDATED_SENSOR_ID)
        	.avgTemp(UPDATED_AVG_TEMP)
        	.avgHumidity(UPDATED_AVG_HUMIDITY)
        	.avgLight(UPDATED_AVG_LIGHT)
        	.avgMoisture(UPDATED_AVG_MOISTURE);
        return plant;
    }

    @BeforeEach
    public void initTest() {
        plant = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlant() throws Exception {
        int databaseSizeBeforeCreate = plantRepository.findAll().size();

        // Create the Plant
        restPlantMockMvc.perform(post("/api/plants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plant)))
            .andExpect(status().isCreated());

        // Validate the Plant in the database
        List<Plant> plantList = plantRepository.findAll();
        assertThat(plantList).hasSize(databaseSizeBeforeCreate + 1);
        Plant testPlant = plantList.get(plantList.size() - 1);
        assertThat(testPlant.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPlant.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testPlant.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testPlant.getSensorID()).isEqualTo(DEFAULT_SENSOR_ID);
        assertThat(testPlant.getAvgTemp()).isEqualTo(DEFAULT_AVG_TEMP);
        assertThat(testPlant.getAvgHumidity()).isEqualTo(DEFAULT_AVG_HUMIDITY);
        assertThat(testPlant.getAvgLight()).isEqualTo(DEFAULT_AVG_LIGHT);
        assertThat(testPlant.getAvgMoisture()).isEqualTo(DEFAULT_AVG_MOISTURE);
    }

    @Test
    @Transactional
    public void createPlantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = plantRepository.findAll().size();

        // Create the Plant with an existing ID
        plant.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlantMockMvc.perform(post("/api/plants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plant)))
            .andExpect(status().isBadRequest());

        // Validate the Plant in the database
        List<Plant> plantList = plantRepository.findAll();
        assertThat(plantList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = plantRepository.findAll().size();
        // set the field null
        plant.setName(null);

        // Create the Plant, which fails.

        restPlantMockMvc.perform(post("/api/plants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plant)))
            .andExpect(status().isBadRequest());

        List<Plant> plantList = plantRepository.findAll();
        assertThat(plantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLocationIsRequired() throws Exception {
        int databaseSizeBeforeTest = plantRepository.findAll().size();
        // set the field null
        plant.setLocation(null);

        // Create the Plant, which fails.

        restPlantMockMvc.perform(post("/api/plants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plant)))
            .andExpect(status().isBadRequest());

        List<Plant> plantList = plantRepository.findAll();
        assertThat(plantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSensorIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = plantRepository.findAll().size();
        // set the field null
        plant.setSensorID(null);

        // Create the Plant, which fails.

        restPlantMockMvc.perform(post("/api/plants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plant)))
            .andExpect(status().isBadRequest());

        List<Plant> plantList = plantRepository.findAll();
        assertThat(plantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPlants() throws Exception {
        // Initialize the database
        plantRepository.saveAndFlush(plant);

        // Get all the plantList
        restPlantMockMvc.perform(get("/api/plants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plant.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION)))
            .andExpect(jsonPath("$.[*].sensorID").value(hasItem(DEFAULT_SENSOR_ID)))
            .andExpect(jsonPath("$.[*].avgTemp").value(hasItem(DEFAULT_AVG_TEMP.doubleValue())))
            .andExpect(jsonPath("$.[*].avgHumidity").value(hasItem(DEFAULT_AVG_HUMIDITY.doubleValue())))
            .andExpect(jsonPath("$.[*].avgLight").value(hasItem(DEFAULT_AVG_LIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].avgMoisture").value(hasItem(DEFAULT_AVG_MOISTURE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getPlant() throws Exception {
        // Initialize the database
        plantRepository.saveAndFlush(plant);

        // Get the plant
        restPlantMockMvc.perform(get("/api/plants/{id}", plant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(plant.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION))
            .andExpect(jsonPath("$.sensorID").value(DEFAULT_SENSOR_ID))
            .andExpect(jsonPath("$.avgTemp").value(DEFAULT_AVG_TEMP))
            .andExpect(jsonPath("$.avgHumidity").value(DEFAULT_AVG_HUMIDITY))
            .andExpect(jsonPath("$.avgLight").value(DEFAULT_AVG_LIGHT))
            .andExpect(jsonPath("$.avgMoisture").value(DEFAULT_AVG_MOISTURE));
    }

    @Test
    @Transactional
    public void getNonExistingPlant() throws Exception {
        // Get the plant
        restPlantMockMvc.perform(get("/api/plants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlant() throws Exception {
        // Initialize the database
        plantRepository.saveAndFlush(plant);

        int databaseSizeBeforeUpdate = plantRepository.findAll().size();

        // Update the plant
        Plant updatedPlant = plantRepository.findById(plant.getId()).get();
        // Disconnect from session so that the updates on updatedPlant are not directly saved in db
        em.detach(updatedPlant);
        updatedPlant
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .location(UPDATED_LOCATION)
            .sensorID(UPDATED_SENSOR_ID)
            .avgTemp(UPDATED_AVG_TEMP)
            .avgHumidity(UPDATED_AVG_HUMIDITY)
            .avgLight(UPDATED_AVG_LIGHT)
            .avgMoisture(UPDATED_AVG_MOISTURE);

        restPlantMockMvc.perform(put("/api/plants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlant)))
            .andExpect(status().isOk());

        // Validate the Plant in the database
        List<Plant> plantList = plantRepository.findAll();
        assertThat(plantList).hasSize(databaseSizeBeforeUpdate);
        Plant testPlant = plantList.get(plantList.size() - 1);
        assertThat(testPlant.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPlant.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPlant.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testPlant.getSensorID()).isEqualTo(UPDATED_SENSOR_ID);
        assertThat(testPlant.getAvgTemp()).isEqualTo(UPDATED_AVG_TEMP);
        assertThat(testPlant.getAvgHumidity()).isEqualTo(UPDATED_AVG_HUMIDITY);
        assertThat(testPlant.getAvgLight()).isEqualTo(UPDATED_AVG_LIGHT);
        assertThat(testPlant.getAvgMoisture()).isEqualTo(UPDATED_AVG_MOISTURE);
    }

    @Test
    @Transactional
    public void updateNonExistingPlant() throws Exception {
        int databaseSizeBeforeUpdate = plantRepository.findAll().size();

        // Create the Plant

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlantMockMvc.perform(put("/api/plants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plant)))
            .andExpect(status().isBadRequest());

        // Validate the Plant in the database
        List<Plant> plantList = plantRepository.findAll();
        assertThat(plantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlant() throws Exception {
        // Initialize the database
        plantRepository.saveAndFlush(plant);

        int databaseSizeBeforeDelete = plantRepository.findAll().size();

        // Delete the plant
        restPlantMockMvc.perform(delete("/api/plants/{id}", plant.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Plant> plantList = plantRepository.findAll();
        assertThat(plantList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
