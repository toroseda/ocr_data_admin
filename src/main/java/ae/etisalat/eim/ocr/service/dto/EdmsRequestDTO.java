package ae.etisalat.eim.ocr.service.dto;

import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;


/**
 * A DTO for the EdmsRequest entity.
 */
public class EdmsRequestDTO implements Serializable {

    private Long id;

    private String accountNumber;

    private String subRequestId;

    private String areaCode;

    private String createdBy;

    private ZonedDateTime startDate;

    private ZonedDateTime endDate;

    private String lastRunBy;

    private Integer lastRunDur;

    private ZonedDateTime lastRunDate;


    private Long ocrSessionId;
    
    private Long requestWfId;
    
    private Long edmsResponseId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }
    public String getSubRequestId() {
        return subRequestId;
    }

    public void setSubRequestId(String subRequestId) {
        this.subRequestId = subRequestId;
    }
    public String getAreaCode() {
        return areaCode;
    }

    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
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

    public Long getOcrSessionId() {
        return ocrSessionId;
    }

    public void setOcrSessionId(Long ocrSessionId) {
        this.ocrSessionId = ocrSessionId;
    }

    public Long getRequestWfId() {
        return requestWfId;
    }

    public void setRequestWfId(Long requestWfId) {
        this.requestWfId = requestWfId;
    }

    public Long getEdmsResponseId() {
        return edmsResponseId;
    }

    public void setEdmsResponseId(Long edmsResponseId) {
        this.edmsResponseId = edmsResponseId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EdmsRequestDTO edmsRequestDTO = (EdmsRequestDTO) o;

        if ( ! Objects.equals(id, edmsRequestDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "EdmsRequestDTO{" +
            "id=" + id +
            ", accountNumber='" + accountNumber + "'" +
            ", subRequestId='" + subRequestId + "'" +
            ", areaCode='" + areaCode + "'" +
            ", createdBy='" + createdBy + "'" +
            ", startDate='" + startDate + "'" +
            ", endDate='" + endDate + "'" +
            ", lastRunBy='" + lastRunBy + "'" +
            ", lastRunDur='" + lastRunDur + "'" +
            ", lastRunDate='" + lastRunDate + "'" +
            '}';
    }
}
