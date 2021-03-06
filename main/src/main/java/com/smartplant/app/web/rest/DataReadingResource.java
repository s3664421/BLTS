package com.smartplant.app.web.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.*;
import com.smartplant.app.domain.DataReading;
import com.smartplant.app.domain.Plant;
import com.smartplant.app.domain.PlantCase;
import com.smartplant.app.domain.PlantThresholds;
import com.smartplant.app.repository.DataReadingRepository;
import com.smartplant.app.repository.PlantCaseRepository;
import com.smartplant.app.repository.PlantRepository;
import com.smartplant.app.web.rest.errors.BadRequestAlertException;
import com.smartplant.app.domain.enumeration.AttentionItem;
import com.smartplant.app.domain.enumeration.CaseStatus;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.actuate.audit.AuditEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.scheduling.annotation.Scheduled;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
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
    @Autowired
    private PlantCaseRepository plantCaseRepository;
    
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

    /**
     * {@code GET  /data-readings/:plantID} : get all dataReadings for plant with "plantID"
     *
     * @param plantID the id of the plant for the dataReadings dataReading to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dataReadings, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("data-readings/sensor/{plantID}")
    public ResponseEntity<List<DataReading>> getDataReadingByPlantId(@PathVariable Long plantID) {
        log.debug("REST request to get all dataReadings for plant with ID : {}", plantID);
        Optional<List<DataReading>> dataReading = dataReadingRepository.findAllByPlantID(plantID);
        return ResponseUtil.wrapOrNotFound(dataReading);
    }
    
    /**
     * {@code GET  /data-readings} : get all dataReadings between the {@code fromDate} and {@code toDate}.
     *
     * @param fromDate the start of the time period of {@link DataReading} to get.
     * @param toDate the end of the time period of {@link DataReading} to get.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of {@link AuditEvent} in body.
     */
    @GetMapping("/data-readings/sensor/{plantID}/between/{fromDate}/{toDate}")
    public ResponseEntity<List<DataReading>> getDataReadingByPlantIdBetweenDates(
        @PathVariable String fromDate,
        @PathVariable String toDate,
        @PathVariable Long plantID) {
        log.debug("REST request to get all dataReadings for plant with ID : {} between {} and {}", plantID, fromDate, toDate);
        Optional<List<DataReading>> dataReading = dataReadingRepository.findAllByPlantIDAndTimeBetween(plantID, fromDate, toDate);
        return ResponseUtil.wrapOrNotFound(dataReading);
    }
    
    /**
     * Periodically calculate the average of all readings over a specified period (currently 6 hours) for each plant.
     * This value is used to determine whether or not a case needs to be generated, which should happen when this average
     * value falls below the threshold values for that plant and reading type.
     * 
     * TODO: Generate a case if the calculated average falls below the threshold.
     */
    // Test Schedule set to fire every minute, use this one for debugging.
    //@Scheduled(cron="0 * * ? * *")
    @Scheduled(cron="0 0 0/6 ? * *")
    public void calculateReadingAvgForAllPlants() {
    	int hoursToAvgOver = 6;
    	log.debug("Scheduled recalculation of data reading averages for all plants, currently occuring every {} hours.", hoursToAvgOver);
    	List<Plant> plants = plantRepository.findAll();
    	
    	for (int i = 0; i < plants.size(); i++) {
    		Plant currPlant = plants.get(i);
    		PlantThresholds thresholds = currPlant.getPlantthresholds();
    		Long plantID = currPlant.getId();
    		String toDate = Instant.now().toString();
    		toDate = toDate.substring(0, toDate.length()-1);
    		// 3600 seconds in an hour
    		String fromDate = Instant.now().minusSeconds(3600 * hoursToAvgOver).toString();
    		fromDate = fromDate.substring(0, fromDate.length()-1);
    		// Get all data Readings for this plant between now and 6 hours ago
    		Optional<List<DataReading>> dataReadingsWrap = dataReadingRepository.findAllByPlantIDAndTimeBetween(plantID, fromDate, toDate);
    		
    		if (dataReadingsWrap.isPresent()) {
    			List<DataReading> dataReadings = dataReadingsWrap.get();
    			//log.debug("There are {} readings for plant with ID: {}", dataReadings.size(), currPlant.getId());
    			Float divisor, temp, humidity, light, moisture;
    			divisor = (float) dataReadings.size();
    			
    			temp = 0f; humidity = 0f; light = 0f; moisture = 0f;
    			for (int j = 0; j < dataReadings.size(); j++) {
    				temp += dataReadings.get(j).getTemp();
    				humidity += dataReadings.get(j).getHumidity();
    				light += dataReadings.get(j).getLight();
    				moisture += dataReadings.get(j).getMoisture();
    			}
    			currPlant
	    			.avgTemp(temp/divisor)
	    			.avgHumidity(humidity/divisor)
	    			.avgLight(light/divisor)
	    			.avgMoisture(moisture/divisor);
    			
    			//log.debug("Plant averages: {}, {}, {}, {}", currPlant.getAvgTemp(), currPlant.getAvgHumidity(), currPlant.getAvgLight(), currPlant.getAvgMoisture());
    			//log.debug("Thresholds for this plant: {}", thresholds.toString());
    			
    			if (currPlant.getAvgTemp().compareTo(thresholds.getTempLow()) < 0) {
    				//Generate temp low case if an open or assigned one doesn't already exist
    				if (!(plantCaseRepository.findByStatusAndPlantAndNeedsAttention(CaseStatus.OPEN, plantID, AttentionItem.TEMP_LOW).isPresent()
    					|| plantCaseRepository.findByStatusAndPlantAndNeedsAttention(CaseStatus.ASSIGNED, plantID, AttentionItem.TEMP_LOW).isPresent())) {
    					PlantCase tlCase = new PlantCase();
        				tlCase.needsAttention(AttentionItem.TEMP_LOW)
        					.timeOpened(Instant.now())
        					.status(CaseStatus.OPEN)
        					.plant(currPlant);
        				
        				plantCaseRepository.save(tlCase);
    				}
    			} else if (currPlant.getAvgTemp().compareTo(thresholds.getTempHigh()) > 0) {
    				//Generate temp high case if an open or assigned one doesn't already exist
    				if (!(plantCaseRepository.findByStatusAndPlantAndNeedsAttention(CaseStatus.OPEN, plantID, AttentionItem.TEMP_HIGH).isPresent()
        					|| plantCaseRepository.findByStatusAndPlantAndNeedsAttention(CaseStatus.ASSIGNED, plantID, AttentionItem.TEMP_HIGH).isPresent())) {
	    				PlantCase thCase = new PlantCase();
	    				thCase.needsAttention(AttentionItem.TEMP_HIGH)
	    					.timeOpened(Instant.now())
	    					.status(CaseStatus.OPEN)
	    					.plant(currPlant);
	    				
	    				plantCaseRepository.save(thCase);
    				}
    			}
    			
    			if (currPlant.getAvgHumidity().compareTo(thresholds.getHumidityLow()) < 0) {
    				//Generate humidity low case if an open or assigned one doesn't already exist
    				if (!(plantCaseRepository.findByStatusAndPlantAndNeedsAttention(CaseStatus.OPEN, plantID, AttentionItem.HUMIDITY_LOW).isPresent()
        					|| plantCaseRepository.findByStatusAndPlantAndNeedsAttention(CaseStatus.ASSIGNED, plantID, AttentionItem.HUMIDITY_LOW).isPresent())) {
	    				PlantCase hlCase = new PlantCase();
	    				hlCase.needsAttention(AttentionItem.HUMIDITY_LOW)
	    					.timeOpened(Instant.now())
	    					.status(CaseStatus.OPEN)
	    					.plant(currPlant);
	    				
	    				plantCaseRepository.save(hlCase);
    				}
    			} else if (currPlant.getAvgHumidity().compareTo(thresholds.getHumidityHigh()) > 0) {
    				//Generate humidity high case if an open or assigned one doesn't already exist
    				if (!(plantCaseRepository.findByStatusAndPlantAndNeedsAttention(CaseStatus.OPEN, plantID, AttentionItem.HUMIDITY_HIGH).isPresent()
        					|| plantCaseRepository.findByStatusAndPlantAndNeedsAttention(CaseStatus.ASSIGNED, plantID, AttentionItem.HUMIDITY_HIGH).isPresent())) {
	    				PlantCase hhCase = new PlantCase();
	    				hhCase.needsAttention(AttentionItem.HUMIDITY_HIGH)
	    					.timeOpened(Instant.now())
	    					.status(CaseStatus.OPEN)
	    					.plant(currPlant);
	    				
	    				plantCaseRepository.save(hhCase);
    				}
    			}
    			
    			if (currPlant.getAvgLight().compareTo(thresholds.getLightLow()) < 0) {
    				//Generate light low case if an open or assigned one doesn't already exist
    				if (!(plantCaseRepository.findByStatusAndPlantAndNeedsAttention(CaseStatus.OPEN, plantID, AttentionItem.LIGHT_LOW).isPresent()
        					|| plantCaseRepository.findByStatusAndPlantAndNeedsAttention(CaseStatus.ASSIGNED, plantID, AttentionItem.LIGHT_LOW).isPresent())) {
	    				PlantCase llCase = new PlantCase();
	    				llCase.needsAttention(AttentionItem.LIGHT_LOW)
	    					.timeOpened(Instant.now())
	    					.status(CaseStatus.OPEN)
	    					.plant(currPlant);
	    				
	    				plantCaseRepository.save(llCase);
    				}
    			} else if (currPlant.getAvgLight().compareTo(thresholds.getLightHigh()) > 0) {
    				//Generate light high case if an open or assigned one doesn't already exist
    				if (!(plantCaseRepository.findByStatusAndPlantAndNeedsAttention(CaseStatus.OPEN, plantID, AttentionItem.LIGHT_HIGH).isPresent()
        					|| plantCaseRepository.findByStatusAndPlantAndNeedsAttention(CaseStatus.ASSIGNED, plantID, AttentionItem.LIGHT_HIGH).isPresent())) {
	    				PlantCase lhCase = new PlantCase();
	    				lhCase.needsAttention(AttentionItem.LIGHT_HIGH)
	    					.timeOpened(Instant.now())
	    					.status(CaseStatus.OPEN)
	    					.plant(currPlant);
	    				
	    				plantCaseRepository.save(lhCase);
    				}
    			}
    			
    			if (currPlant.getAvgMoisture().compareTo(thresholds.getMoistureLow()) < 0) {
    				//Generate moisture low case if an open or assigned one doesn't already exist
    				if (!(plantCaseRepository.findByStatusAndPlantAndNeedsAttention(CaseStatus.OPEN, plantID, AttentionItem.MOISTURE_LOW).isPresent()
        					|| plantCaseRepository.findByStatusAndPlantAndNeedsAttention(CaseStatus.ASSIGNED, plantID, AttentionItem.MOISTURE_LOW).isPresent())) {
	    				PlantCase mlCase = new PlantCase();
	    				mlCase.needsAttention(AttentionItem.MOISTURE_LOW)
	    					.timeOpened(Instant.now())
	    					.status(CaseStatus.OPEN)
	    					.plant(currPlant);
	    				
	    				plantCaseRepository.save(mlCase);
    				}
    			} else if (currPlant.getAvgMoisture().compareTo(thresholds.getMoistureHigh()) > 0) {
    				//Generate moisture high case if an open or assigned one doesn't already exist
    				if (!(plantCaseRepository.findByStatusAndPlantAndNeedsAttention(CaseStatus.OPEN, plantID, AttentionItem.MOISTURE_HIGH).isPresent()
        					|| plantCaseRepository.findByStatusAndPlantAndNeedsAttention(CaseStatus.ASSIGNED, plantID, AttentionItem.MOISTURE_HIGH).isPresent())) {
	    				PlantCase mhCase = new PlantCase();
	    				mhCase.needsAttention(AttentionItem.MOISTURE_HIGH)
	    					.timeOpened(Instant.now())
	    					.status(CaseStatus.OPEN)
	    					.plant(currPlant);
	    				
	    				plantCaseRepository.save(mhCase);
    				}
    			}
    		} else { log.debug("No readings for plant with ID: {}", currPlant.getId()); }
    	}
    }
    
    
}
