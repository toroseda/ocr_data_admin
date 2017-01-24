package ae.etisalat.eim.ocr.repository;

import ae.etisalat.eim.ocr.domain.SessionWf;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the SessionWf entity.
 */
@SuppressWarnings("unused")
public interface SessionWfRepository extends JpaRepository<SessionWf,Long> {

}
