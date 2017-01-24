package ae.etisalat.eim.ocr.service.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;


/**
 * A DTO for the EdmsDownload entity.
 */
public class EdmsDownloadDTO implements Serializable {

    private Long id;

    private String actualDirectory;

    private String actualFilename;

    private String createdBy;


    private Long edmsResponseId;
    
    private Long serviceRespId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getActualDirectory() {
        return actualDirectory;
    }

    public void setActualDirectory(String actualDirectory) {
        this.actualDirectory = actualDirectory;
    }
    public String getActualFilename() {
        return actualFilename;
    }

    public void setActualFilename(String actualFilename) {
        this.actualFilename = actualFilename;
    }
    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Long getEdmsResponseId() {
        return edmsResponseId;
    }

    public void setEdmsResponseId(Long edmsResponseId) {
        this.edmsResponseId = edmsResponseId;
    }

    public Long getServiceRespId() {
        return serviceRespId;
    }

    public void setServiceRespId(Long serviceRespId) {
        this.serviceRespId = serviceRespId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EdmsDownloadDTO edmsDownloadDTO = (EdmsDownloadDTO) o;

        if ( ! Objects.equals(id, edmsDownloadDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "EdmsDownloadDTO{" +
            "id=" + id +
            ", actualDirectory='" + actualDirectory + "'" +
            ", actualFilename='" + actualFilename + "'" +
            ", createdBy='" + createdBy + "'" +
            '}';
    }
}
