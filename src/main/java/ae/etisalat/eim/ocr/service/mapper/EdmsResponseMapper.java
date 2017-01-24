package ae.etisalat.eim.ocr.service.mapper;

import ae.etisalat.eim.ocr.domain.*;
import ae.etisalat.eim.ocr.service.dto.EdmsResponseDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity EdmsResponse and its DTO EdmsResponseDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EdmsResponseMapper {

    EdmsResponseDTO edmsResponseToEdmsResponseDTO(EdmsResponse edmsResponse);

    List<EdmsResponseDTO> edmsResponsesToEdmsResponseDTOs(List<EdmsResponse> edmsResponses);

    @Mapping(target = "edmsDownloads", ignore = true)
    EdmsResponse edmsResponseDTOToEdmsResponse(EdmsResponseDTO edmsResponseDTO);

    List<EdmsResponse> edmsResponseDTOsToEdmsResponses(List<EdmsResponseDTO> edmsResponseDTOs);
}
