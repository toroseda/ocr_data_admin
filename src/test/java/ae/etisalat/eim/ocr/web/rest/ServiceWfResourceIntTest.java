package ae.etisalat.eim.ocr.web.rest;

import ae.etisalat.eim.ocr.OcrDataAdminApp;

import ae.etisalat.eim.ocr.domain.ServiceWf;
import ae.etisalat.eim.ocr.repository.ServiceWfRepository;
import ae.etisalat.eim.ocr.service.ServiceWfService;
import ae.etisalat.eim.ocr.repository.search.ServiceWfSearchRepository;
import ae.etisalat.eim.ocr.service.dto.ServiceWfDTO;
import ae.etisalat.eim.ocr.service.mapper.ServiceWfMapper;

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
 * Test class for the ServiceWfResource REST controller.
 *
 * @see ServiceWfResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OcrDataAdminApp.class)
public class ServiceWfResourceIntTest {

    private static final Integer DEFAULT_STATUS_ID = 1;
    private static final Integer UPDATED_STATUS_ID = 2;

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    @Inject
    private ServiceWfRepository serviceWfRepository;

    @Inject
    private ServiceWfMapper serviceWfMapper;

    @Inject
    private ServiceWfService serviceWfService;

    @Inject
    private ServiceWfSearchRepository serviceWfSearchRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restServiceWfMockMvc;

    private ServiceWf serviceWf;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ServiceWfResource serviceWfResource = new ServiceWfResource();
        ReflectionTestUtils.setField(serviceWfResource, "serviceWfService", serviceWfService);
        this.restServiceWfMockMvc = MockMvcBuilders.standaloneSetup(serviceWfResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceWf createEntity(EntityManager em) {
        ServiceWf serviceWf = new ServiceWf()
                .statusId(DEFAULT_STATUS_ID)
                .createdBy(DEFAULT_CREATED_BY)
                .updatedBy(DEFAULT_UPDATED_BY);
        return serviceWf;
    }

    @Before
    public void initTest() {
        serviceWfSearchRepository.deleteAll();
        serviceWf = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceWf() throws Exception {
        int databaseSizeBeforeCreate = serviceWfRepository.findAll().size();

        // Create the ServiceWf
        ServiceWfDTO serviceWfDTO = serviceWfMapper.serviceWfToServiceWfDTO(serviceWf);

        restServiceWfMockMvc.perform(post("/api/service-wfs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceWfDTO)))
            .andExpect(status().isCreated());

        // Validate the ServiceWf in the database
        List<ServiceWf> serviceWfList = serviceWfRepository.findAll();
        assertThat(serviceWfList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceWf testServiceWf = serviceWfList.get(serviceWfList.size() - 1);
        assertThat(testServiceWf.getStatusId()).isEqualTo(DEFAULT_STATUS_ID);
        assertThat(testServiceWf.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testServiceWf.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);

        // Validate the ServiceWf in ElasticSearch
        ServiceWf serviceWfEs = serviceWfSearchRepository.findOne(testServiceWf.getId());
        assertThat(serviceWfEs).isEqualToComparingFieldByField(testServiceWf);
    }

    @Test
    @Transactional
    public void createServiceWfWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceWfRepository.findAll().size();

        // Create the ServiceWf with an existing ID
        ServiceWf existingServiceWf = new ServiceWf();
        existingServiceWf.setId(1L);
        ServiceWfDTO existingServiceWfDTO = serviceWfMapper.serviceWfToServiceWfDTO(existingServiceWf);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceWfMockMvc.perform(post("/api/service-wfs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingServiceWfDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<ServiceWf> serviceWfList = serviceWfRepository.findAll();
        assertThat(serviceWfList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllServiceWfs() throws Exception {
        // Initialize the database
        serviceWfRepository.saveAndFlush(serviceWf);

        // Get all the serviceWfList
        restServiceWfMockMvc.perform(get("/api/service-wfs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceWf.getId().intValue())))
            .andExpect(jsonPath("$.[*].statusId").value(hasItem(DEFAULT_STATUS_ID)))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())));
    }

    @Test
    @Transactional
    public void getServiceWf() throws Exception {
        // Initialize the database
        serviceWfRepository.saveAndFlush(serviceWf);

        // Get the serviceWf
        restServiceWfMockMvc.perform(get("/api/service-wfs/{id}", serviceWf.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(serviceWf.getId().intValue()))
            .andExpect(jsonPath("$.statusId").value(DEFAULT_STATUS_ID))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingServiceWf() throws Exception {
        // Get the serviceWf
        restServiceWfMockMvc.perform(get("/api/service-wfs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceWf() throws Exception {
        // Initialize the database
        serviceWfRepository.saveAndFlush(serviceWf);
        serviceWfSearchRepository.save(serviceWf);
        int databaseSizeBeforeUpdate = serviceWfRepository.findAll().size();

        // Update the serviceWf
        ServiceWf updatedServiceWf = serviceWfRepository.findOne(serviceWf.getId());
        updatedServiceWf
                .statusId(UPDATED_STATUS_ID)
                .createdBy(UPDATED_CREATED_BY)
                .updatedBy(UPDATED_UPDATED_BY);
        ServiceWfDTO serviceWfDTO = serviceWfMapper.serviceWfToServiceWfDTO(updatedServiceWf);

        restServiceWfMockMvc.perform(put("/api/service-wfs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceWfDTO)))
            .andExpect(status().isOk());

        // Validate the ServiceWf in the database
        List<ServiceWf> serviceWfList = serviceWfRepository.findAll();
        assertThat(serviceWfList).hasSize(databaseSizeBeforeUpdate);
        ServiceWf testServiceWf = serviceWfList.get(serviceWfList.size() - 1);
        assertThat(testServiceWf.getStatusId()).isEqualTo(UPDATED_STATUS_ID);
        assertThat(testServiceWf.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testServiceWf.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);

        // Validate the ServiceWf in ElasticSearch
        ServiceWf serviceWfEs = serviceWfSearchRepository.findOne(testServiceWf.getId());
        assertThat(serviceWfEs).isEqualToComparingFieldByField(testServiceWf);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceWf() throws Exception {
        int databaseSizeBeforeUpdate = serviceWfRepository.findAll().size();

        // Create the ServiceWf
        ServiceWfDTO serviceWfDTO = serviceWfMapper.serviceWfToServiceWfDTO(serviceWf);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restServiceWfMockMvc.perform(put("/api/service-wfs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceWfDTO)))
            .andExpect(status().isCreated());

        // Validate the ServiceWf in the database
        List<ServiceWf> serviceWfList = serviceWfRepository.findAll();
        assertThat(serviceWfList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteServiceWf() throws Exception {
        // Initialize the database
        serviceWfRepository.saveAndFlush(serviceWf);
        serviceWfSearchRepository.save(serviceWf);
        int databaseSizeBeforeDelete = serviceWfRepository.findAll().size();

        // Get the serviceWf
        restServiceWfMockMvc.perform(delete("/api/service-wfs/{id}", serviceWf.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate ElasticSearch is empty
        boolean serviceWfExistsInEs = serviceWfSearchRepository.exists(serviceWf.getId());
        assertThat(serviceWfExistsInEs).isFalse();

        // Validate the database is empty
        List<ServiceWf> serviceWfList = serviceWfRepository.findAll();
        assertThat(serviceWfList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchServiceWf() throws Exception {
        // Initialize the database
        serviceWfRepository.saveAndFlush(serviceWf);
        serviceWfSearchRepository.save(serviceWf);

        // Search the serviceWf
        restServiceWfMockMvc.perform(get("/api/_search/service-wfs?query=id:" + serviceWf.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceWf.getId().intValue())))
            .andExpect(jsonPath("$.[*].statusId").value(hasItem(DEFAULT_STATUS_ID)))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())));
    }
}
