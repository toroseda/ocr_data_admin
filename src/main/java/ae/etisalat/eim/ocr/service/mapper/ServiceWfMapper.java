package ae.etisalat.eim.ocr.service.mapper;

import ae.etisalat.eim.ocr.domain.*;
import ae.etisalat.eim.ocr.service.dto.ServiceWfDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity ServiceWf and its DTO ServiceWfDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ServiceWfMapper {

    ServiceWfDTO serviceWfToServiceWfDTO(ServiceWf serviceWf);

    List<ServiceWfDTO> serviceWfsToServiceWfDTOs(List<ServiceWf> serviceWfs);

    ServiceWf serviceWfDTOToServiceWf(ServiceWfDTO serviceWfDTO);

    List<ServiceWf> serviceWfDTOsToServiceWfs(List<ServiceWfDTO> serviceWfDTOs);
}
