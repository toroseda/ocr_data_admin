package ae.etisalat.eim.ocr.repository;

import ae.etisalat.eim.ocr.domain.OcrSession;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the OcrSession entity.
 */
@SuppressWarnings("unused")
public interface OcrSessionRepository extends JpaRepository<OcrSession,Long> {

}
