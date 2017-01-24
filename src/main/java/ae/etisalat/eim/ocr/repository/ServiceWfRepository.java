package ae.etisalat.eim.ocr.repository;

import ae.etisalat.eim.ocr.domain.ServiceWf;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ServiceWf entity.
 */
@SuppressWarnings("unused")
public interface ServiceWfRepository extends JpaRepository<ServiceWf,Long> {

}
