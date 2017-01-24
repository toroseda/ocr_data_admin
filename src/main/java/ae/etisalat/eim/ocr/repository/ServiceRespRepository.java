package ae.etisalat.eim.ocr.repository;

import ae.etisalat.eim.ocr.domain.ServiceResp;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ServiceResp entity.
 */
@SuppressWarnings("unused")
public interface ServiceRespRepository extends JpaRepository<ServiceResp,Long> {

}
