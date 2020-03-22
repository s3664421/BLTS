package com.smartplant.app.web.rest;

import com.smartplant.app.domain.PlantCase;
import com.smartplant.app.repository.PlantCaseRepository;
import com.smartplant.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.smartplant.app.domain.PlantCase}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PlantCaseResource {

    private final Logger log = LoggerFactory.getLogger(PlantCaseResource.class);

    private static final String ENTITY_NAME = "plantCase";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlantCaseRepository plantCaseRepository;

    public PlantCaseResource(PlantCaseRepository plantCaseRepository) {
        this.plantCaseRepository = plantCaseRepository;
    }

    /**
     * {@code POST  /plant-cases} : Create a new plantCase.
     *
     * @param plantCase the plantCase to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new plantCase, or with status {@code 400 (Bad Request)} if the plantCase has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/plant-cases")
    public ResponseEntity<PlantCase> createPlantCase(@RequestBody PlantCase plantCase) throws URISyntaxException {
        log.debug("REST request to save PlantCase : {}", plantCase);
        if (plantCase.getId() != null) {
            throw new BadRequestAlertException("A new plantCase cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlantCase result = plantCaseRepository.save(plantCase);
        return ResponseEntity.created(new URI("/api/plant-cases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /plant-cases} : Updates an existing plantCase.
     *
     * @param plantCase the plantCase to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated plantCase,
     * or with status {@code 400 (Bad Request)} if the plantCase is not valid,
     * or with status {@code 500 (Internal Server Error)} if the plantCase couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/plant-cases")
    public ResponseEntity<PlantCase> updatePlantCase(@RequestBody PlantCase plantCase) throws URISyntaxException {
        log.debug("REST request to update PlantCase : {}", plantCase);
        if (plantCase.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlantCase result = plantCaseRepository.save(plantCase);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, plantCase.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /plant-cases} : get all the plantCases.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of plantCases in body.
     */
    @GetMapping("/plant-cases")
    public List<PlantCase> getAllPlantCases() {
        log.debug("REST request to get all PlantCases");
        return plantCaseRepository.findAll();
    }

    /**
     * {@code GET  /plant-cases/:id} : get the "id" plantCase.
     *
     * @param id the id of the plantCase to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the plantCase, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/plant-cases/{id}")
    public ResponseEntity<PlantCase> getPlantCase(@PathVariable Long id) {
        log.debug("REST request to get PlantCase : {}", id);
        Optional<PlantCase> plantCase = plantCaseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(plantCase);
    }

    /**
     * {@code DELETE  /plant-cases/:id} : delete the "id" plantCase.
     *
     * @param id the id of the plantCase to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/plant-cases/{id}")
    public ResponseEntity<Void> deletePlantCase(@PathVariable Long id) {
        log.debug("REST request to delete PlantCase : {}", id);
        plantCaseRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
