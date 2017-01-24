package ae.etisalat.eim.ocr.repository.search;

import ae.etisalat.eim.ocr.domain.EdmsRequest;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data ElasticSearch repository for the EdmsRequest entity.
 */
public interface EdmsRequestSearchRepository extends ElasticsearchRepository<EdmsRequest, Long> {
}
