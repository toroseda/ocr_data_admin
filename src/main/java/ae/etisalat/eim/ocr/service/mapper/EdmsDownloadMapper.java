package ae.etisalat.eim.ocr.service.mapper;

import ae.etisalat.eim.ocr.domain.*;
import ae.etisalat.eim.ocr.service.dto.EdmsDownloadDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity EdmsDownload and its DTO EdmsDownloadDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EdmsDownloadMapper {

    @Mapping(source = "edmsResponse.id", target = "edmsResponseId")
    @Mapping(source = "serviceResp.id", target = "serviceRespId")
    EdmsDownloadDTO edmsDownloadToEdmsDownloadDTO(EdmsDownload edmsDownload);

    List<EdmsDownloadDTO> edmsDownloadsToEdmsDownloadDTOs(List<EdmsDownload> edmsDownloads);

    @Mapping(source = "edmsResponseId", target = "edmsResponse")
    @Mapping(source = "serviceRespId", target = "serviceResp")
    EdmsDownload edmsDownloadDTOToEdmsDownload(EdmsDownloadDTO edmsDownloadDTO);

    List<EdmsDownload> edmsDownloadDTOsToEdmsDownloads(List<EdmsDownloadDTO> edmsDownloadDTOs);

    default EdmsResponse edmsResponseFromId(Long id) {
        if (id == null) {
            return null;
        }
        EdmsResponse edmsResponse = new EdmsResponse();
        edmsResponse.setId(id);
        return edmsResponse;
    }

    default ServiceResp serviceRespFromId(Long id) {
        if (id == null) {
            return null;
        }
        ServiceResp serviceResp = new ServiceResp();
        serviceResp.setId(id);
        return serviceResp;
    }
}
