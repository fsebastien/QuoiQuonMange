package io.florent.web.rest;

import io.florent.QuoiQuonMangeApp;

import io.florent.domain.Recette;
import io.florent.repository.RecetteRepository;
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
 * Test class for the RecetteResource REST controller.
 *
 * @see RecetteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = QuoiQuonMangeApp.class)
public class RecetteResourceIntTest {

    private static final String DEFAULT_INTITULE = "AAAAAAAAAA";
    private static final String UPDATED_INTITULE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private RecetteRepository recetteRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRecetteMockMvc;

    private Recette recette;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RecetteResource recetteResource = new RecetteResource(recetteRepository);
        this.restRecetteMockMvc = MockMvcBuilders.standaloneSetup(recetteResource)
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
    public static Recette createEntity(EntityManager em) {
        Recette recette = new Recette()
            .intitule(DEFAULT_INTITULE)
            .description(DEFAULT_DESCRIPTION);
        return recette;
    }

    @Before
    public void initTest() {
        recette = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecette() throws Exception {
        int databaseSizeBeforeCreate = recetteRepository.findAll().size();

        // Create the Recette
        restRecetteMockMvc.perform(post("/api/recettes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recette)))
            .andExpect(status().isCreated());

        // Validate the Recette in the database
        List<Recette> recetteList = recetteRepository.findAll();
        assertThat(recetteList).hasSize(databaseSizeBeforeCreate + 1);
        Recette testRecette = recetteList.get(recetteList.size() - 1);
        assertThat(testRecette.getIntitule()).isEqualTo(DEFAULT_INTITULE);
        assertThat(testRecette.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createRecetteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recetteRepository.findAll().size();

        // Create the Recette with an existing ID
        recette.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecetteMockMvc.perform(post("/api/recettes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recette)))
            .andExpect(status().isBadRequest());

        // Validate the Recette in the database
        List<Recette> recetteList = recetteRepository.findAll();
        assertThat(recetteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRecettes() throws Exception {
        // Initialize the database
        recetteRepository.saveAndFlush(recette);

        // Get all the recetteList
        restRecetteMockMvc.perform(get("/api/recettes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recette.getId().intValue())))
            .andExpect(jsonPath("$.[*].intitule").value(hasItem(DEFAULT_INTITULE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getRecette() throws Exception {
        // Initialize the database
        recetteRepository.saveAndFlush(recette);

        // Get the recette
        restRecetteMockMvc.perform(get("/api/recettes/{id}", recette.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(recette.getId().intValue()))
            .andExpect(jsonPath("$.intitule").value(DEFAULT_INTITULE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRecette() throws Exception {
        // Get the recette
        restRecetteMockMvc.perform(get("/api/recettes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecette() throws Exception {
        // Initialize the database
        recetteRepository.saveAndFlush(recette);
        int databaseSizeBeforeUpdate = recetteRepository.findAll().size();

        // Update the recette
        Recette updatedRecette = recetteRepository.findOne(recette.getId());
        // Disconnect from session so that the updates on updatedRecette are not directly saved in db
        em.detach(updatedRecette);
        updatedRecette
            .intitule(UPDATED_INTITULE)
            .description(UPDATED_DESCRIPTION);

        restRecetteMockMvc.perform(put("/api/recettes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRecette)))
            .andExpect(status().isOk());

        // Validate the Recette in the database
        List<Recette> recetteList = recetteRepository.findAll();
        assertThat(recetteList).hasSize(databaseSizeBeforeUpdate);
        Recette testRecette = recetteList.get(recetteList.size() - 1);
        assertThat(testRecette.getIntitule()).isEqualTo(UPDATED_INTITULE);
        assertThat(testRecette.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingRecette() throws Exception {
        int databaseSizeBeforeUpdate = recetteRepository.findAll().size();

        // Create the Recette

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRecetteMockMvc.perform(put("/api/recettes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recette)))
            .andExpect(status().isCreated());

        // Validate the Recette in the database
        List<Recette> recetteList = recetteRepository.findAll();
        assertThat(recetteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRecette() throws Exception {
        // Initialize the database
        recetteRepository.saveAndFlush(recette);
        int databaseSizeBeforeDelete = recetteRepository.findAll().size();

        // Get the recette
        restRecetteMockMvc.perform(delete("/api/recettes/{id}", recette.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Recette> recetteList = recetteRepository.findAll();
        assertThat(recetteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Recette.class);
        Recette recette1 = new Recette();
        recette1.setId(1L);
        Recette recette2 = new Recette();
        recette2.setId(recette1.getId());
        assertThat(recette1).isEqualTo(recette2);
        recette2.setId(2L);
        assertThat(recette1).isNotEqualTo(recette2);
        recette1.setId(null);
        assertThat(recette1).isNotEqualTo(recette2);
    }
}
