package ae.etisalat.eim.ocr.service.mapper;

import ae.etisalat.eim.ocr.domain.*;
import ae.etisalat.eim.ocr.service.dto.ServiceRespDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity ServiceResp and its DTO ServiceRespDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ServiceRespMapper {

    @Mapping(source = "serviceWf.id", target = "serviceWfId")
    ServiceRespDTO serviceRespToServiceRespDTO(ServiceResp serviceResp);

    List<ServiceRespDTO> serviceRespsToServiceRespDTOs(List<ServiceResp> serviceResps);

    @Mapping(source = "serviceWfId", target = "serviceWf")
    ServiceResp serviceRespDTOToServiceResp(ServiceRespDTO serviceRespDTO);

    List<ServiceResp> serviceRespDTOsToServiceResps(List<ServiceRespDTO> serviceRespDTOs);

    default ServiceWf serviceWfFromId(Long id) {
        if (id == null) {
            return null;
        }
        ServiceWf serviceWf = new ServiceWf();
        serviceWf.setId(id);
        return serviceWf;
    }
}
