package io.florent.web.rest;

import io.florent.QuoiQuonMangeApp;

import io.florent.domain.Semaine;
import io.florent.repository.SemaineRepository;
import io.florent.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static io.florent.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SemaineResource REST controller.
 *
 * @see SemaineResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = QuoiQuonMangeApp.class)
public class SemaineResourceIntTest {

    @Autowired
    private SemaineRepository semaineRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSemaineMockMvc;

    private Semaine semaine;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SemaineResource semaineResource = new SemaineResource(semaineRepository);
        this.restSemaineMockMvc = MockMvcBuilders.standaloneSetup(semaineResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Semaine createEntity(EntityManager em) {
        Semaine semaine = new Semaine();
        return semaine;
    }

    @Before
    public void initTest() {
        semaine = createEntity(em);
    }

    @Test
    @Transactional
    public void createSemaine() throws Exception {
        int databaseSizeBeforeCreate = semaineRepository.findAll().size();

        // Create the Semaine
        restSemaineMockMvc.perform(post("/api/semaines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(semaine)))
            .andExpect(status().isCreated());

        // Validate the Semaine in the database
        List<Semaine> semaineList = semaineRepository.findAll();
        assertThat(semaineList).hasSize(databaseSizeBeforeCreate + 1);
        Semaine testSemaine = semaineList.get(semaineList.size() - 1);
    }

    @Test
    @Transactional
    public void createSemaineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = semaineRepository.findAll().size();

        // Create the Semaine with an existing ID
        semaine.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSemaineMockMvc.perform(post("/api/semaines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(semaine)))
            .andExpect(status().isBadRequest());

        // Validate the Semaine in the database
        List<Semaine> semaineList = semaineRepository.findAll();
        assertThat(semaineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSemaines() throws Exception {
        // Initialize the database
        semaineRepository.saveAndFlush(semaine);

        // Get all the semaineList
        restSemaineMockMvc.perform(get("/api/semaines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(semaine.getId().intValue())));
    }

    @Test
    @Transactional
    public void getSemaine() throws Exception {
        // Initialize the database
        semaineRepository.saveAndFlush(semaine);

        // Get the semaine
        restSemaineMockMvc.perform(get("/api/semaines/{id}", semaine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(semaine.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSemaine() throws Exception {
        // Get the semaine
        restSemaineMockMvc.perform(get("/api/semaines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSemaine() throws Exception {
        // Initialize the database
        semaineRepository.saveAndFlush(semaine);
        int databaseSizeBeforeUpdate = semaineRepository.findAll().size();

        // Update the semaine
        Semaine updatedSemaine = semaineRepository.findOne(semaine.getId());
        // Disconnect from session so that the updates on updatedSemaine are not directly saved in db
        em.detach(updatedSemaine);

        restSemaineMockMvc.perform(put("/api/semaines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSemaine)))
            .andExpect(status().isOk());

        // Validate the Semaine in the database
        List<Semaine> semaineList = semaineRepository.findAll();
        assertThat(semaineList).hasSize(databaseSizeBeforeUpdate);
        Semaine testSemaine = semaineList.get(semaineList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingSemaine() throws Exception {
        int databaseSizeBeforeUpdate = semaineRepository.findAll().size();

        // Create the Semaine

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSemaineMockMvc.perform(put("/api/semaines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(semaine)))
            .andExpect(status().isCreated());

        // Validate the Semaine in the database
        List<Semaine> semaineList = semaineRepository.findAll();
        assertThat(semaineList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSemaine() throws Exception {
        // Initialize the database
        semaineRepository.saveAndFlush(semaine);
        int databaseSizeBeforeDelete = semaineRepository.findAll().size();

        // Get the semaine
        restSemaineMockMvc.perform(delete("/api/semaines/{id}", semaine.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Semaine> semaineList = semaineRepository.findAll();
        assertThat(semaineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Semaine.class);
        Semaine semaine1 = new Semaine();
        semaine1.setId(1L);
        Semaine semaine2 = new Semaine();
        semaine2.setId(semaine1.getId());
        assertThat(semaine1).isEqualTo(semaine2);
        semaine2.setId(2L);
        assertThat(semaine1).isNotEqualTo(semaine2);
        semaine1.setId(null);
        assertThat(semaine1).isNotEqualTo(semaine2);
    }
}
