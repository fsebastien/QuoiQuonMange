package io.florent.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.florent.domain.Recette;

import io.florent.repository.RecetteRepository;
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
 * REST controller for managing Recette.
 */
@RestController
@RequestMapping("/api")
public class RecetteResource {

    private final Logger log = LoggerFactory.getLogger(RecetteResource.class);

    private static final String ENTITY_NAME = "recette";

    private final RecetteRepository recetteRepository;

    public RecetteResource(RecetteRepository recetteRepository) {
        this.recetteRepository = recetteRepository;
    }

    /**
     * POST  /recettes : Create a new recette.
     *
     * @param recette the recette to create
     * @return the ResponseEntity with status 201 (Created) and with body the new recette, or with status 400 (Bad Request) if the recette has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/recettes")
    @Timed
    public ResponseEntity<Recette> createRecette(@RequestBody Recette recette) throws URISyntaxException {
        log.debug("REST request to save Recette : {}", recette);
        if (recette.getId() != null) {
            throw new BadRequestAlertException("A new recette cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Recette result = recetteRepository.save(recette);
        return ResponseEntity.created(new URI("/api/recettes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /recettes : Updates an existing recette.
     *
     * @param recette the recette to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated recette,
     * or with status 400 (Bad Request) if the recette is not valid,
     * or with status 500 (Internal Server Error) if the recette couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/recettes")
    @Timed
    public ResponseEntity<Recette> updateRecette(@RequestBody Recette recette) throws URISyntaxException {
        log.debug("REST request to update Recette : {}", recette);
        if (recette.getId() == null) {
            return createRecette(recette);
        }
        Recette result = recetteRepository.save(recette);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, recette.getId().toString()))
            .body(result);
    }

    /**
     * GET  /recettes : get all the recettes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of recettes in body
     */
    @GetMapping("/recettes")
    @Timed
    public List<Recette> getAllRecettes() {
        log.debug("REST request to get all Recettes");
        return recetteRepository.findAll();
        }

    /**
     * GET  /recettes/:id : get the "id" recette.
     *
     * @param id the id of the recette to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the recette, or with status 404 (Not Found)
     */
    @GetMapping("/recettes/{id}")
    @Timed
    public ResponseEntity<Recette> getRecette(@PathVariable Long id) {
        log.debug("REST request to get Recette : {}", id);
        Recette recette = recetteRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(recette));
    }

    /**
     * DELETE  /recettes/:id : delete the "id" recette.
     *
     * @param id the id of the recette to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/recettes/{id}")
    @Timed
    public ResponseEntity<Void> deleteRecette(@PathVariable Long id) {
        log.debug("REST request to delete Recette : {}", id);
        recetteRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
