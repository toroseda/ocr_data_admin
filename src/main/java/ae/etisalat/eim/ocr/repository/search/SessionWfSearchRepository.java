package ae.etisalat.eim.ocr.repository.search;

import ae.etisalat.eim.ocr.domain.SessionWf;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data ElasticSearch repository for the SessionWf entity.
 */
public interface SessionWfSearchRepository extends ElasticsearchRepository<SessionWf, Long> {
}
