package ae.etisalat.eim.ocr.repository.search;

import ae.etisalat.eim.ocr.domain.ServiceResp;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data ElasticSearch repository for the ServiceResp entity.
 */
public interface ServiceRespSearchRepository extends ElasticsearchRepository<ServiceResp, Long> {
}
