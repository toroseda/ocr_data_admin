package ae.etisalat.eim.ocr.service.dto;

import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;


/**
 * A DTO for the ServiceResp entity.
 */
public class ServiceRespDTO implements Serializable {

    private Long id;

    private String rawJson;

    @Lob
    private byte[] documentImage;

    private String documentImageContentType;
    private String createdBy;

    private ZonedDateTime startDate;

    private ZonedDateTime endDate;

    private String lastRunBy;

    private Integer lastRunDur;

    private ZonedDateTime lastRunDate;


    private Long serviceWfId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getRawJson() {
        return rawJson;
    }

    public void setRawJson(String rawJson) {
        this.rawJson = rawJson;
    }
    public byte[] getDocumentImage() {
        return documentImage;
    }

    public void setDocumentImage(byte[] documentImage) {
        this.documentImage = documentImage;
    }

    public String getDocumentImageContentType() {
        return documentImageContentType;
    }

    public void setDocumentImageContentType(String documentImageContentType) {
        this.documentImageContentType = documentImageContentType;
    }
    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }
    public ZonedDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(ZonedDateTime endDate) {
        this.endDate = endDate;
    }
    public String getLastRunBy() {
        return lastRunBy;
    }

    public void setLastRunBy(String lastRunBy) {
        this.lastRunBy = lastRunBy;
    }
    public Integer getLastRunDur() {
        return lastRunDur;
    }

    public void setLastRunDur(Integer lastRunDur) {
        this.lastRunDur = lastRunDur;
    }
    public ZonedDateTime getLastRunDate() {
        return lastRunDate;
    }

    public void setLastRunDate(ZonedDateTime lastRunDate) {
        this.lastRunDate = lastRunDate;
    }

    public Long getServiceWfId() {
        return serviceWfId;
    }

    public void setServiceWfId(Long serviceWfId) {
        this.serviceWfId = serviceWfId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ServiceRespDTO serviceRespDTO = (ServiceRespDTO) o;

        if ( ! Objects.equals(id, serviceRespDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ServiceRespDTO{" +
            "id=" + id +
            ", rawJson='" + rawJson + "'" +
            ", documentImage='" + documentImage + "'" +
            ", createdBy='" + createdBy + "'" +
            ", startDate='" + startDate + "'" +
            ", endDate='" + endDate + "'" +
            ", lastRunBy='" + lastRunBy + "'" +
            ", lastRunDur='" + lastRunDur + "'" +
            ", lastRunDate='" + lastRunDate + "'" +
            '}';
    }
}
