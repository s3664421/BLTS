package com.smartplant.app.web.rest;

import com.smartplant.app.domain.PlantThresholds;
import com.smartplant.app.repository.PlantThresholdsRepository;
import com.smartplant.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.smartplant.app.domain.PlantThresholds}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PlantThresholdsResource {

    private final Logger log = LoggerFactory.getLogger(PlantThresholdsResource.class);

    private static final String ENTITY_NAME = "plantThresholds";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlantThresholdsRepository plantThresholdsRepository;

    public PlantThresholdsResource(PlantThresholdsRepository plantThresholdsRepository) {
        this.plantThresholdsRepository = plantThresholdsRepository;
    }

    /**
     * {@code POST  /plant-thresholds} : Create a new plantThresholds.
     *
     * @param plantThresholds the plantThresholds to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new plantThresholds, or with status {@code 400 (Bad Request)} if the plantThresholds has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/plant-thresholds")
    public ResponseEntity<PlantThresholds> createPlantThresholds(@Valid @RequestBody PlantThresholds plantThresholds) throws URISyntaxException {
        log.debug("REST request to save PlantThresholds : {}", plantThresholds);
        if (plantThresholds.getId() != null) {
            throw new BadRequestAlertException("A new plantThresholds cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlantThresholds result = plantThresholdsRepository.save(plantThresholds);
        return ResponseEntity.created(new URI("/api/plant-thresholds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /plant-thresholds} : Updates an existing plantThresholds.
     *
     * @param plantThresholds the plantThresholds to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated plantThresholds,
     * or with status {@code 400 (Bad Request)} if the plantThresholds is not valid,
     * or with status {@code 500 (Internal Server Error)} if the plantThresholds couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/plant-thresholds")
    public ResponseEntity<PlantThresholds> updatePlantThresholds(@Valid @RequestBody PlantThresholds plantThresholds) throws URISyntaxException {
        log.debug("REST request to update PlantThresholds : {}", plantThresholds);
        if (plantThresholds.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlantThresholds result = plantThresholdsRepository.save(plantThresholds);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, plantThresholds.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /plant-thresholds} : get all the plantThresholds.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of plantThresholds in body.
     */
    @GetMapping("/plant-thresholds")
    public List<PlantThresholds> getAllPlantThresholds(@RequestParam(required = false) String filter) {
        if ("plant-is-null".equals(filter)) {
            log.debug("REST request to get all PlantThresholdss where plant is null");
            return StreamSupport
                .stream(plantThresholdsRepository.findAll().spliterator(), false)
                .filter(plantThresholds -> plantThresholds.getPlant() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all PlantThresholds");
        return plantThresholdsRepository.findAll();
    }

    /**
     * {@code GET  /plant-thresholds/:id} : get the "id" plantThresholds.
     *
     * @param id the id of the plantThresholds to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the plantThresholds, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/plant-thresholds/{id}")
    public ResponseEntity<PlantThresholds> getPlantThresholds(@PathVariable Long id) {
        log.debug("REST request to get PlantThresholds : {}", id);
        Optional<PlantThresholds> plantThresholds = plantThresholdsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(plantThresholds);
    }

    /**
     * {@code DELETE  /plant-thresholds/:id} : delete the "id" plantThresholds.
     *
     * @param id the id of the plantThresholds to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/plant-thresholds/{id}")
    public ResponseEntity<Void> deletePlantThresholds(@PathVariable Long id) {
        log.debug("REST request to delete PlantThresholds : {}", id);
        plantThresholdsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
