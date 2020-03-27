package com.smartplant.app.web.rest;

import com.smartplant.app.domain.Plant;
import com.smartplant.app.repository.PlantRepository;
import com.smartplant.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.smartplant.app.domain.Plant}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PlantResource {

    private final Logger log = LoggerFactory.getLogger(PlantResource.class);

    private static final String ENTITY_NAME = "plant";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlantRepository plantRepository;

    public PlantResource(PlantRepository plantRepository) {
        this.plantRepository = plantRepository;
    }

    /**
     * {@code POST  /plants} : Create a new plant.
     *
     * @param plant the plant to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new plant, or with status {@code 400 (Bad Request)} if the plant has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/plants")
    public ResponseEntity<Plant> createPlant(@Valid @RequestBody Plant plant) throws URISyntaxException {
        log.debug("REST request to save Plant : {}", plant);
        if (plant.getId() != null) {
            throw new BadRequestAlertException("A new plant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Plant result = plantRepository.save(plant);
        return ResponseEntity.created(new URI("/api/plants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /plants} : Updates an existing plant.
     *
     * @param plant the plant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated plant,
     * or with status {@code 400 (Bad Request)} if the plant is not valid,
     * or with status {@code 500 (Internal Server Error)} if the plant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/plants")
    public ResponseEntity<Plant> updatePlant(@Valid @RequestBody Plant plant) throws URISyntaxException {
        log.debug("REST request to update Plant : {}", plant);
        if (plant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Plant result = plantRepository.save(plant);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, plant.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /plants} : get all the plants.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of plants in body.
     */
    @GetMapping("/plants")
    public ResponseEntity<List<Plant>> getAllPlants(Pageable pageable) {
        log.debug("REST request to get a page of Plants");
        Page<Plant> page = plantRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /plants/:id} : get the "id" plant.
     *
     * @param id the id of the plant to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the plant, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/plants/{id}")
    public ResponseEntity<Plant> getPlant(@PathVariable Long id) {
        log.debug("REST request to get Plant : {}", id);
        Optional<Plant> plant = plantRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(plant);
    }

    /**
     * {@code DELETE  /plants/:id} : delete the "id" plant.
     *
     * @param id the id of the plant to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/plants/{id}")
    public ResponseEntity<Void> deletePlant(@PathVariable Long id) {
        log.debug("REST request to delete Plant : {}", id);
        plantRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
    
    /**
     * {@code GET  /plants/:sensorID} : get the "sensorID" plant.
     *
     * @param id the sensor id of the plant to retrieve.
     * @return the Plant object with the specified sensor ID.
     */
    @GetMapping("/plants/{sensorid}")
    public Plant getPlantBySensorId(@PathVariable String sensorID) {
        log.debug("REST request to get by sensor ID Plant : {}", sensorID);
        Optional<Plant> plant = plantRepository.findBySensorId(sensorID);
        if (plant.isPresent()) {
        	return plant.get();
        } else {
        	return null;
        }
    }
}
