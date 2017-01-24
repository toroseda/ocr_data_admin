package ae.etisalat.eim.ocr.service.mapper;

import ae.etisalat.eim.ocr.domain.*;
import ae.etisalat.eim.ocr.service.dto.EdmsRequestDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity EdmsRequest and its DTO EdmsRequestDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EdmsRequestMapper {

    @Mapping(source = "ocrSession.id", target = "ocrSessionId")
    @Mapping(source = "requestWf.id", target = "requestWfId")
    @Mapping(source = "edmsResponse.id", target = "edmsResponseId")
    EdmsRequestDTO edmsRequestToEdmsRequestDTO(EdmsRequest edmsRequest);

    List<EdmsRequestDTO> edmsRequestsToEdmsRequestDTOs(List<EdmsRequest> edmsRequests);

    @Mapping(source = "ocrSessionId", target = "ocrSession")
    @Mapping(source = "requestWfId", target = "requestWf")
    @Mapping(source = "edmsResponseId", target = "edmsResponse")
    EdmsRequest edmsRequestDTOToEdmsRequest(EdmsRequestDTO edmsRequestDTO);

    List<EdmsRequest> edmsRequestDTOsToEdmsRequests(List<EdmsRequestDTO> edmsRequestDTOs);

    default OcrSession ocrSessionFromId(Long id) {
        if (id == null) {
            return null;
        }
        OcrSession ocrSession = new OcrSession();
        ocrSession.setId(id);
        return ocrSession;
    }

    default RequestWf requestWfFromId(Long id) {
        if (id == null) {
            return null;
        }
        RequestWf requestWf = new RequestWf();
        requestWf.setId(id);
        return requestWf;
    }

    default EdmsResponse edmsResponseFromId(Long id) {
        if (id == null) {
            return null;
        }
        EdmsResponse edmsResponse = new EdmsResponse();
        edmsResponse.setId(id);
        return edmsResponse;
    }
}
