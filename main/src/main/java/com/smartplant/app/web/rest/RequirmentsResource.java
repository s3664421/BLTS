package com.smartplant.app.web.rest;

import com.smartplant.app.domain.Requirments;
import com.smartplant.app.repository.RequirmentsRepository;
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
 * REST controller for managing {@link com.smartplant.app.domain.Requirments}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RequirmentsResource {

    private final Logger log = LoggerFactory.getLogger(RequirmentsResource.class);

    private static final String ENTITY_NAME = "requirments";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RequirmentsRepository requirmentsRepository;

    public RequirmentsResource(RequirmentsRepository requirmentsRepository) {
        this.requirmentsRepository = requirmentsRepository;
    }

    /**
     * {@code POST  /requirments} : Create a new requirments.
     *
     * @param requirments the requirments to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new requirments, or with status {@code 400 (Bad Request)} if the requirments has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/requirments")
    public ResponseEntity<Requirments> createRequirments(@RequestBody Requirments requirments) throws URISyntaxException {
        log.debug("REST request to save Requirments : {}", requirments);
        if (requirments.getId() != null) {
            throw new BadRequestAlertException("A new requirments cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Requirments result = requirmentsRepository.save(requirments);
        return ResponseEntity.created(new URI("/api/requirments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /requirments} : Updates an existing requirments.
     *
     * @param requirments the requirments to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated requirments,
     * or with status {@code 400 (Bad Request)} if the requirments is not valid,
     * or with status {@code 500 (Internal Server Error)} if the requirments couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/requirments")
    public ResponseEntity<Requirments> updateRequirments(@RequestBody Requirments requirments) throws URISyntaxException {
        log.debug("REST request to update Requirments : {}", requirments);
        if (requirments.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Requirments result = requirmentsRepository.save(requirments);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, requirments.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /requirments} : get all the requirments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of requirments in body.
     */
    @GetMapping("/requirments")
    public List<Requirments> getAllRequirments() {
        log.debug("REST request to get all Requirments");
        return requirmentsRepository.findAll();
    }

    /**
     * {@code GET  /requirments/:id} : get the "id" requirments.
     *
     * @param id the id of the requirments to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the requirments, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/requirments/{id}")
    public ResponseEntity<Requirments> getRequirments(@PathVariable Long id) {
        log.debug("REST request to get Requirments : {}", id);
        Optional<Requirments> requirments = requirmentsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(requirments);
    }

    /**
     * {@code DELETE  /requirments/:id} : delete the "id" requirments.
     *
     * @param id the id of the requirments to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/requirments/{id}")
    public ResponseEntity<Void> deleteRequirments(@PathVariable Long id) {
        log.debug("REST request to delete Requirments : {}", id);
        requirmentsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
