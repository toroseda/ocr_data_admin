package ae.etisalat.eim.ocr.repository.search;

import ae.etisalat.eim.ocr.domain.OcrSession;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data ElasticSearch repository for the OcrSession entity.
 */
public interface OcrSessionSearchRepository extends ElasticsearchRepository<OcrSession, Long> {
}
