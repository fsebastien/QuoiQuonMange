package io.florent.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.florent.domain.Semaine;

import io.florent.repository.SemaineRepository;
import io.florent.web.rest.errors.BadRequestAlertException;
import io.florent.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Semaine.
 */
@RestController
@RequestMapping("/api")
public class SemaineResource {

    private final Logger log = LoggerFactory.getLogger(SemaineResource.class);

    private static final String ENTITY_NAME = "semaine";

    private final SemaineRepository semaineRepository;

    public SemaineResource(SemaineRepository semaineRepository) {
        this.semaineRepository = semaineRepository;
    }

    /**
     * POST  /semaines : Create a new semaine.
     *
     * @param semaine the semaine to create
     * @return the ResponseEntity with status 201 (Created) and with body the new semaine, or with status 400 (Bad Request) if the semaine has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/semaines")
    @Timed
    public ResponseEntity<Semaine> createSemaine(@RequestBody Semaine semaine) throws URISyntaxException {
        log.debug("REST request to save Semaine : {}", semaine);
        if (semaine.getId() != null) {
            throw new BadRequestAlertException("A new semaine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Semaine result = semaineRepository.save(semaine);
        return ResponseEntity.created(new URI("/api/semaines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /semaines : Updates an existing semaine.
     *
     * @param semaine the semaine to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated semaine,
     * or with status 400 (Bad Request) if the semaine is not valid,
     * or with status 500 (Internal Server Error) if the semaine couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/semaines")
    @Timed
    public ResponseEntity<Semaine> updateSemaine(@RequestBody Semaine semaine) throws URISyntaxException {
        log.debug("REST request to update Semaine : {}", semaine);
        if (semaine.getId() == null) {
            return createSemaine(semaine);
        }
        Semaine result = semaineRepository.save(semaine);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, semaine.getId().toString()))
            .body(result);
    }

    /**
     * GET  /semaines : get all the semaines.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of semaines in body
     */
    @GetMapping("/semaines")
    @Timed
    public List<Semaine> getAllSemaines() {
        log.debug("REST request to get all Semaines");
        return semaineRepository.findAll();
        }

    /**
     * GET  /semaines/:id : get the "id" semaine.
     *
     * @param id the id of the semaine to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the semaine, or with status 404 (Not Found)
     */
    @GetMapping("/semaines/{id}")
    @Timed
    public ResponseEntity<Semaine> getSemaine(@PathVariable Long id) {
        log.debug("REST request to get Semaine : {}", id);
        Semaine semaine = semaineRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(semaine));
    }

    /**
     * DELETE  /semaines/:id : delete the "id" semaine.
     *
     * @param id the id of the semaine to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/semaines/{id}")
    @Timed
    public ResponseEntity<Void> deleteSemaine(@PathVariable Long id) {
        log.debug("REST request to delete Semaine : {}", id);
        semaineRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
