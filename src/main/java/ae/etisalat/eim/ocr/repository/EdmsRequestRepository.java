package ae.etisalat.eim.ocr.repository;

import ae.etisalat.eim.ocr.domain.EdmsRequest;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the EdmsRequest entity.
 */
@SuppressWarnings("unused")
public interface EdmsRequestRepository extends JpaRepository<EdmsRequest,Long> {

}
