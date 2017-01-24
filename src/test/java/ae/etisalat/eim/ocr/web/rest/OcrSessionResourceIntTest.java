package ae.etisalat.eim.ocr.web.rest;

import ae.etisalat.eim.ocr.OcrDataAdminApp;

import ae.etisalat.eim.ocr.domain.OcrSession;
import ae.etisalat.eim.ocr.repository.OcrSessionRepository;
import ae.etisalat.eim.ocr.service.OcrSessionService;
import ae.etisalat.eim.ocr.repository.search.OcrSessionSearchRepository;
import ae.etisalat.eim.ocr.service.dto.OcrSessionDTO;
import ae.etisalat.eim.ocr.service.mapper.OcrSessionMapper;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the OcrSessionResource REST controller.
 *
 * @see OcrSessionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OcrDataAdminApp.class)
public class OcrSessionResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_STATUS_ID = 1;
    private static final Integer UPDATED_STATUS_ID = 2;

    private static final String DEFAULT_SERVER_FILE_PATH = "AAAAAAAAAA";
    private static final String UPDATED_SERVER_FILE_PATH = "BBBBBBBBBB";

    private static final String DEFAULT_FILENAME = "AAAAAAAAAA";
    private static final String UPDATED_FILENAME = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    @Inject
    private OcrSessionRepository ocrSessionRepository;

    @Inject
    private OcrSessionMapper ocrSessionMapper;

    @Inject
    private OcrSessionService ocrSessionService;

    @Inject
    private OcrSessionSearchRepository ocrSessionSearchRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restOcrSessionMockMvc;

    private OcrSession ocrSession;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        OcrSessionResource ocrSessionResource = new OcrSessionResource();
        ReflectionTestUtils.setField(ocrSessionResource, "ocrSessionService", ocrSessionService);
        this.restOcrSessionMockMvc = MockMvcBuilders.standaloneSetup(ocrSessionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OcrSession createEntity(EntityManager em) {
        OcrSession ocrSession = new OcrSession()
                .name(DEFAULT_NAME)
                .description(DEFAULT_DESCRIPTION)
                .statusId(DEFAULT_STATUS_ID)
                .serverFilePath(DEFAULT_SERVER_FILE_PATH)
                .filename(DEFAULT_FILENAME)
                .createdBy(DEFAULT_CREATED_BY)
                .updatedBy(DEFAULT_UPDATED_BY);
        return ocrSession;
    }

    @Before
    public void initTest() {
        ocrSessionSearchRepository.deleteAll();
        ocrSession = createEntity(em);
    }

    @Test
    @Transactional
    public void createOcrSession() throws Exception {
        int databaseSizeBeforeCreate = ocrSessionRepository.findAll().size();

        // Create the OcrSession
        OcrSessionDTO ocrSessionDTO = ocrSessionMapper.ocrSessionToOcrSessionDTO(ocrSession);

        restOcrSessionMockMvc.perform(post("/api/ocr-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ocrSessionDTO)))
            .andExpect(status().isCreated());

        // Validate the OcrSession in the database
        List<OcrSession> ocrSessionList = ocrSessionRepository.findAll();
        assertThat(ocrSessionList).hasSize(databaseSizeBeforeCreate + 1);
        OcrSession testOcrSession = ocrSessionList.get(ocrSessionList.size() - 1);
        assertThat(testOcrSession.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testOcrSession.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testOcrSession.getStatusId()).isEqualTo(DEFAULT_STATUS_ID);
        assertThat(testOcrSession.getServerFilePath()).isEqualTo(DEFAULT_SERVER_FILE_PATH);
        assertThat(testOcrSession.getFilename()).isEqualTo(DEFAULT_FILENAME);
        assertThat(testOcrSession.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testOcrSession.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);

        // Validate the OcrSession in ElasticSearch
        OcrSession ocrSessionEs = ocrSessionSearchRepository.findOne(testOcrSession.getId());
        assertThat(ocrSessionEs).isEqualToComparingFieldByField(testOcrSession);
    }

    @Test
    @Transactional
    public void createOcrSessionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ocrSessionRepository.findAll().size();

        // Create the OcrSession with an existing ID
        OcrSession existingOcrSession = new OcrSession();
        existingOcrSession.setId(1L);
        OcrSessionDTO existingOcrSessionDTO = ocrSessionMapper.ocrSessionToOcrSessionDTO(existingOcrSession);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOcrSessionMockMvc.perform(post("/api/ocr-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingOcrSessionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<OcrSession> ocrSessionList = ocrSessionRepository.findAll();
        assertThat(ocrSessionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOcrSessions() throws Exception {
        // Initialize the database
        ocrSessionRepository.saveAndFlush(ocrSession);

        // Get all the ocrSessionList
        restOcrSessionMockMvc.perform(get("/api/ocr-sessions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ocrSession.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].statusId").value(hasItem(DEFAULT_STATUS_ID)))
            .andExpect(jsonPath("$.[*].serverFilePath").value(hasItem(DEFAULT_SERVER_FILE_PATH.toString())))
            .andExpect(jsonPath("$.[*].filename").value(hasItem(DEFAULT_FILENAME.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())));
    }

    @Test
    @Transactional
    public void getOcrSession() throws Exception {
        // Initialize the database
        ocrSessionRepository.saveAndFlush(ocrSession);

        // Get the ocrSession
        restOcrSessionMockMvc.perform(get("/api/ocr-sessions/{id}", ocrSession.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ocrSession.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.statusId").value(DEFAULT_STATUS_ID))
            .andExpect(jsonPath("$.serverFilePath").value(DEFAULT_SERVER_FILE_PATH.toString()))
            .andExpect(jsonPath("$.filename").value(DEFAULT_FILENAME.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOcrSession() throws Exception {
        // Get the ocrSession
        restOcrSessionMockMvc.perform(get("/api/ocr-sessions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOcrSession() throws Exception {
        // Initialize the database
        ocrSessionRepository.saveAndFlush(ocrSession);
        ocrSessionSearchRepository.save(ocrSession);
        int databaseSizeBeforeUpdate = ocrSessionRepository.findAll().size();

        // Update the ocrSession
        OcrSession updatedOcrSession = ocrSessionRepository.findOne(ocrSession.getId());
        updatedOcrSession
                .name(UPDATED_NAME)
                .description(UPDATED_DESCRIPTION)
                .statusId(UPDATED_STATUS_ID)
                .serverFilePath(UPDATED_SERVER_FILE_PATH)
                .filename(UPDATED_FILENAME)
                .createdBy(UPDATED_CREATED_BY)
                .updatedBy(UPDATED_UPDATED_BY);
        OcrSessionDTO ocrSessionDTO = ocrSessionMapper.ocrSessionToOcrSessionDTO(updatedOcrSession);

        restOcrSessionMockMvc.perform(put("/api/ocr-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ocrSessionDTO)))
            .andExpect(status().isOk());

        // Validate the OcrSession in the database
        List<OcrSession> ocrSessionList = ocrSessionRepository.findAll();
        assertThat(ocrSessionList).hasSize(databaseSizeBeforeUpdate);
        OcrSession testOcrSession = ocrSessionList.get(ocrSessionList.size() - 1);
        assertThat(testOcrSession.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testOcrSession.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testOcrSession.getStatusId()).isEqualTo(UPDATED_STATUS_ID);
        assertThat(testOcrSession.getServerFilePath()).isEqualTo(UPDATED_SERVER_FILE_PATH);
        assertThat(testOcrSession.getFilename()).isEqualTo(UPDATED_FILENAME);
        assertThat(testOcrSession.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testOcrSession.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);

        // Validate the OcrSession in ElasticSearch
        OcrSession ocrSessionEs = ocrSessionSearchRepository.findOne(testOcrSession.getId());
        assertThat(ocrSessionEs).isEqualToComparingFieldByField(testOcrSession);
    }

    @Test
    @Transactional
    public void updateNonExistingOcrSession() throws Exception {
        int databaseSizeBeforeUpdate = ocrSessionRepository.findAll().size();

        // Create the OcrSession
        OcrSessionDTO ocrSessionDTO = ocrSessionMapper.ocrSessionToOcrSessionDTO(ocrSession);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOcrSessionMockMvc.perform(put("/api/ocr-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ocrSessionDTO)))
            .andExpect(status().isCreated());

        // Validate the OcrSession in the database
        List<OcrSession> ocrSessionList = ocrSessionRepository.findAll();
        assertThat(ocrSessionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOcrSession() throws Exception {
        // Initialize the database
        ocrSessionRepository.saveAndFlush(ocrSession);
        ocrSessionSearchRepository.save(ocrSession);
        int databaseSizeBeforeDelete = ocrSessionRepository.findAll().size();

        // Get the ocrSession
        restOcrSessionMockMvc.perform(delete("/api/ocr-sessions/{id}", ocrSession.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate ElasticSearch is empty
        boolean ocrSessionExistsInEs = ocrSessionSearchRepository.exists(ocrSession.getId());
        assertThat(ocrSessionExistsInEs).isFalse();

        // Validate the database is empty
        List<OcrSession> ocrSessionList = ocrSessionRepository.findAll();
        assertThat(ocrSessionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchOcrSession() throws Exception {
        // Initialize the database
        ocrSessionRepository.saveAndFlush(ocrSession);
        ocrSessionSearchRepository.save(ocrSession);

        // Search the ocrSession
        restOcrSessionMockMvc.perform(get("/api/_search/ocr-sessions?query=id:" + ocrSession.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ocrSession.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].statusId").value(hasItem(DEFAULT_STATUS_ID)))
            .andExpect(jsonPath("$.[*].serverFilePath").value(hasItem(DEFAULT_SERVER_FILE_PATH.toString())))
            .andExpect(jsonPath("$.[*].filename").value(hasItem(DEFAULT_FILENAME.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())));
    }
}
