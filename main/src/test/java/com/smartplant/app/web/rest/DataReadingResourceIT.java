package com.smartplant.app.web.rest;

import com.smartplant.app.MainApp;
import com.smartplant.app.domain.DataReading;
import com.smartplant.app.repository.DataReadingRepository;

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

/**
 * Integration tests for the {@link DataReadingResource} REST controller.
 */
@SpringBootTest(classes = MainApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class DataReadingResourceIT {

    private static final Instant DEFAULT_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Float DEFAULT_TEMP = 1F;
    private static final Float UPDATED_TEMP = 2F;

    private static final Float DEFAULT_HUMIDITY = 1F;
    private static final Float UPDATED_HUMIDITY = 2F;

    private static final Float DEFAULT_LIGHT = 1F;
    private static final Float UPDATED_LIGHT = 2F;

    private static final Float DEFAULT_MOISTURE = 1F;
    private static final Float UPDATED_MOISTURE = 2F;

    @Autowired
    private DataReadingRepository dataReadingRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDataReadingMockMvc;

    private DataReading dataReading;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DataReading createEntity(EntityManager em) {
        DataReading dataReading = new DataReading()
            .time(DEFAULT_TIME)
            .temp(DEFAULT_TEMP)
            .humidity(DEFAULT_HUMIDITY)
            .light(DEFAULT_LIGHT)
            .moisture(DEFAULT_MOISTURE);
        return dataReading;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DataReading createUpdatedEntity(EntityManager em) {
        DataReading dataReading = new DataReading()
            .time(UPDATED_TIME)
            .temp(UPDATED_TEMP)
            .humidity(UPDATED_HUMIDITY)
            .light(UPDATED_LIGHT)
            .moisture(UPDATED_MOISTURE);
        return dataReading;
    }

    @BeforeEach
    public void initTest() {
        dataReading = createEntity(em);
    }

    @Test
    @Transactional
    public void createDataReading() throws Exception {
        int databaseSizeBeforeCreate = dataReadingRepository.findAll().size();

        // Create the DataReading
        restDataReadingMockMvc.perform(post("/api/data-readings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dataReading)))
            .andExpect(status().isCreated());

        // Validate the DataReading in the database
        List<DataReading> dataReadingList = dataReadingRepository.findAll();
        assertThat(dataReadingList).hasSize(databaseSizeBeforeCreate + 1);
        DataReading testDataReading = dataReadingList.get(dataReadingList.size() - 1);
        assertThat(testDataReading.getTime()).isEqualTo(DEFAULT_TIME);
        assertThat(testDataReading.getTemp()).isEqualTo(DEFAULT_TEMP);
        assertThat(testDataReading.getHumidity()).isEqualTo(DEFAULT_HUMIDITY);
        assertThat(testDataReading.getLight()).isEqualTo(DEFAULT_LIGHT);
        assertThat(testDataReading.getMoisture()).isEqualTo(DEFAULT_MOISTURE);
    }

    @Test
    @Transactional
    public void createDataReadingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dataReadingRepository.findAll().size();

        // Create the DataReading with an existing ID
        dataReading.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDataReadingMockMvc.perform(post("/api/data-readings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dataReading)))
            .andExpect(status().isBadRequest());

        // Validate the DataReading in the database
        List<DataReading> dataReadingList = dataReadingRepository.findAll();
        assertThat(dataReadingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = dataReadingRepository.findAll().size();
        // set the field null
        dataReading.setTime(null);

        // Create the DataReading, which fails.

        restDataReadingMockMvc.perform(post("/api/data-readings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dataReading)))
            .andExpect(status().isBadRequest());

        List<DataReading> dataReadingList = dataReadingRepository.findAll();
        assertThat(dataReadingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTempIsRequired() throws Exception {
        int databaseSizeBeforeTest = dataReadingRepository.findAll().size();
        // set the field null
        dataReading.setTemp(null);

        // Create the DataReading, which fails.

        restDataReadingMockMvc.perform(post("/api/data-readings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dataReading)))
            .andExpect(status().isBadRequest());

        List<DataReading> dataReadingList = dataReadingRepository.findAll();
        assertThat(dataReadingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHumidityIsRequired() throws Exception {
        int databaseSizeBeforeTest = dataReadingRepository.findAll().size();
        // set the field null
        dataReading.setHumidity(null);

        // Create the DataReading, which fails.

        restDataReadingMockMvc.perform(post("/api/data-readings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dataReading)))
            .andExpect(status().isBadRequest());

        List<DataReading> dataReadingList = dataReadingRepository.findAll();
        assertThat(dataReadingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLightIsRequired() throws Exception {
        int databaseSizeBeforeTest = dataReadingRepository.findAll().size();
        // set the field null
        dataReading.setLight(null);

        // Create the DataReading, which fails.

        restDataReadingMockMvc.perform(post("/api/data-readings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dataReading)))
            .andExpect(status().isBadRequest());

        List<DataReading> dataReadingList = dataReadingRepository.findAll();
        assertThat(dataReadingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMoistureIsRequired() throws Exception {
        int databaseSizeBeforeTest = dataReadingRepository.findAll().size();
        // set the field null
        dataReading.setMoisture(null);

        // Create the DataReading, which fails.

        restDataReadingMockMvc.perform(post("/api/data-readings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dataReading)))
            .andExpect(status().isBadRequest());

        List<DataReading> dataReadingList = dataReadingRepository.findAll();
        assertThat(dataReadingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDataReadings() throws Exception {
        // Initialize the database
        dataReadingRepository.saveAndFlush(dataReading);

        // Get all the dataReadingList
        restDataReadingMockMvc.perform(get("/api/data-readings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dataReading.getId().intValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())))
            .andExpect(jsonPath("$.[*].temp").value(hasItem(DEFAULT_TEMP.doubleValue())))
            .andExpect(jsonPath("$.[*].humidity").value(hasItem(DEFAULT_HUMIDITY.doubleValue())))
            .andExpect(jsonPath("$.[*].light").value(hasItem(DEFAULT_LIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].moisture").value(hasItem(DEFAULT_MOISTURE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getDataReading() throws Exception {
        // Initialize the database
        dataReadingRepository.saveAndFlush(dataReading);

        // Get the dataReading
        restDataReadingMockMvc.perform(get("/api/data-readings/{id}", dataReading.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(dataReading.getId().intValue()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME.toString()))
            .andExpect(jsonPath("$.temp").value(DEFAULT_TEMP.doubleValue()))
            .andExpect(jsonPath("$.humidity").value(DEFAULT_HUMIDITY.doubleValue()))
            .andExpect(jsonPath("$.light").value(DEFAULT_LIGHT.doubleValue()))
            .andExpect(jsonPath("$.moisture").value(DEFAULT_MOISTURE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDataReading() throws Exception {
        // Get the dataReading
        restDataReadingMockMvc.perform(get("/api/data-readings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDataReading() throws Exception {
        // Initialize the database
        dataReadingRepository.saveAndFlush(dataReading);

        int databaseSizeBeforeUpdate = dataReadingRepository.findAll().size();

        // Update the dataReading
        DataReading updatedDataReading = dataReadingRepository.findById(dataReading.getId()).get();
        // Disconnect from session so that the updates on updatedDataReading are not directly saved in db
        em.detach(updatedDataReading);
        updatedDataReading
            .time(UPDATED_TIME)
            .temp(UPDATED_TEMP)
            .humidity(UPDATED_HUMIDITY)
            .light(UPDATED_LIGHT)
            .moisture(UPDATED_MOISTURE);

        restDataReadingMockMvc.perform(put("/api/data-readings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDataReading)))
            .andExpect(status().isOk());

        // Validate the DataReading in the database
        List<DataReading> dataReadingList = dataReadingRepository.findAll();
        assertThat(dataReadingList).hasSize(databaseSizeBeforeUpdate);
        DataReading testDataReading = dataReadingList.get(dataReadingList.size() - 1);
        assertThat(testDataReading.getTime()).isEqualTo(UPDATED_TIME);
        assertThat(testDataReading.getTemp()).isEqualTo(UPDATED_TEMP);
        assertThat(testDataReading.getHumidity()).isEqualTo(UPDATED_HUMIDITY);
        assertThat(testDataReading.getLight()).isEqualTo(UPDATED_LIGHT);
        assertThat(testDataReading.getMoisture()).isEqualTo(UPDATED_MOISTURE);
    }

    @Test
    @Transactional
    public void updateNonExistingDataReading() throws Exception {
        int databaseSizeBeforeUpdate = dataReadingRepository.findAll().size();

        // Create the DataReading

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDataReadingMockMvc.perform(put("/api/data-readings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dataReading)))
            .andExpect(status().isBadRequest());

        // Validate the DataReading in the database
        List<DataReading> dataReadingList = dataReadingRepository.findAll();
        assertThat(dataReadingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDataReading() throws Exception {
        // Initialize the database
        dataReadingRepository.saveAndFlush(dataReading);

        int databaseSizeBeforeDelete = dataReadingRepository.findAll().size();

        // Delete the dataReading
        restDataReadingMockMvc.perform(delete("/api/data-readings/{id}", dataReading.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DataReading> dataReadingList = dataReadingRepository.findAll();
        assertThat(dataReadingList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
