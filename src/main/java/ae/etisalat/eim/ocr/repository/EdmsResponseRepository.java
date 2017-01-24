package ae.etisalat.eim.ocr.repository;

import ae.etisalat.eim.ocr.domain.EdmsResponse;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the EdmsResponse entity.
 */
@SuppressWarnings("unused")
public interface EdmsResponseRepository extends JpaRepository<EdmsResponse,Long> {

}
