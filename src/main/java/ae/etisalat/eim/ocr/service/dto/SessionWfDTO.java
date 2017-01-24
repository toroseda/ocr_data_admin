package ae.etisalat.eim.ocr.service.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;


/**
 * A DTO for the SessionWf entity.
 */
public class SessionWfDTO implements Serializable {

    private Long id;

    private Integer statusId;

    private Integer wfTypeId;

    private String createdBy;

    private String updatedBy;


    private Long ocrSessionId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public Integer getStatusId() {
        return statusId;
    }

    public void setStatusId(Integer statusId) {
        this.statusId = statusId;
    }
    public Integer getWfTypeId() {
        return wfTypeId;
    }

    public void setWfTypeId(Integer wfTypeId) {
        this.wfTypeId = wfTypeId;
    }
    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Long getOcrSessionId() {
        return ocrSessionId;
    }

    public void setOcrSessionId(Long ocrSessionId) {
        this.ocrSessionId = ocrSessionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SessionWfDTO sessionWfDTO = (SessionWfDTO) o;

        if ( ! Objects.equals(id, sessionWfDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "SessionWfDTO{" +
            "id=" + id +
            ", statusId='" + statusId + "'" +
            ", wfTypeId='" + wfTypeId + "'" +
            ", createdBy='" + createdBy + "'" +
            ", updatedBy='" + updatedBy + "'" +
            '}';
    }
}
