package com.smartplant.app.web.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.*;
import com.smartplant.app.domain.DataReading;
import com.smartplant.app.domain.Plant;
import com.smartplant.app.repository.DataReadingRepository;
import com.smartplant.app.repository.PlantRepository;
import com.smartplant.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.smartplant.app.domain.DataReading}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DataReadingResource {

    private final Logger log = LoggerFactory.getLogger(DataReadingResource.class);

    private static final String ENTITY_NAME = "dataReading";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Autowired
	private PlantRepository plantRepository;
    private final DataReadingRepository dataReadingRepository;

    public DataReadingResource(DataReadingRepository dataReadingRepository) {
        this.dataReadingRepository = dataReadingRepository;
    }

    /**
     * {@code POST  /data-readings} : Create a new dataReading.
     *
     * @param dataReading the dataReading to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dataReading, or with status {@code 400 (Bad Request)} if the dataReading has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/data-readings")
    public ResponseEntity<DataReading> createDataReading(@Valid @RequestBody String jsonDataReading) throws URISyntaxException {
    	ObjectMapper mapper = new ObjectMapper();
    	DataReading dataReading = new DataReading();
    	try {
			JsonNode jsonNode = mapper.readTree(jsonDataReading);
			String sensorIDString = jsonNode.get("sensorID").toString().replace("\"", "");
	    	dataReading.time(Instant.now())
	    		.temp((float) jsonNode.get("temp").asDouble())
	    		.humidity((float) jsonNode.get("humidity").asDouble())
	    		.light((float) jsonNode.get("light").asDouble())
	    		.moisture((float) jsonNode.get("moisture").asDouble())
	    		.plant(plantRepository.findBySensorID(sensorIDString).get());
	        log.debug("REST request to save DataReading : {}", dataReading);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        if (dataReading.getId() != null) {
            throw new BadRequestAlertException("A new dataReading cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DataReading result = dataReadingRepository.save(dataReading);
        return ResponseEntity.created(new URI("/api/data-readings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /data-readings} : Updates an existing dataReading.
     *
     * @param dataReading the dataReading to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dataReading,
     * or with status {@code 400 (Bad Request)} if the dataReading is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dataReading couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/data-readings")
    public ResponseEntity<DataReading> updateDataReading(@Valid @RequestBody DataReading dataReading) throws URISyntaxException {
        log.debug("REST request to update DataReading : {}", dataReading);
        if (dataReading.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DataReading result = dataReadingRepository.save(dataReading);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, dataReading.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /data-readings} : get all the dataReadings.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dataReadings in body.
     */
    @GetMapping("/data-readings")
    public List<DataReading> getAllDataReadings() {
        log.debug("REST request to get all DataReadings");
        return dataReadingRepository.findAll();
    }

    /**
     * {@code GET  /data-readings/:id} : get the "id" dataReading.
     *
     * @param id the id of the dataReading to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dataReading, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/data-readings/{id}")
    public ResponseEntity<DataReading> getDataReading(@PathVariable Long id) {
        log.debug("REST request to get DataReading : {}", id);
        Optional<DataReading> dataReading = dataReadingRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dataReading);
    }

    /**
     * {@code DELETE  /data-readings/:id} : delete the "id" dataReading.
     *
     * @param id the id of the dataReading to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/data-readings/{id}")
    public ResponseEntity<Void> deleteDataReading(@PathVariable Long id) {
        log.debug("REST request to delete DataReading : {}", id);
        dataReadingRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("data-readings/sensor/{plantID}")
    public ResponseEntity<List<DataReading>> getDataReadingByPlantId(@PathVariable Long plantID) {
        log.debug("REST request to get all dataReadings for plant with ID : {}", plantID);
        Optional<List<DataReading>> dataReading = dataReadingRepository.findAllByPlantID(plantID);
        return ResponseUtil.wrapOrNotFound(dataReading);
    }
    
}
