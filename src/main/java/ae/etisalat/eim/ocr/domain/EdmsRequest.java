package ae.etisalat.eim.ocr.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A EdmsRequest.
 */
@Entity
@Table(name = "edms_request")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "edmsrequest")
public class EdmsRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "account_number")
    private String accountNumber;

    @Column(name = "sub_request_id")
    private String subRequestId;

    @Column(name = "area_code")
    private String areaCode;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "start_date")
    private ZonedDateTime startDate;

    @Column(name = "end_date")
    private ZonedDateTime endDate;

    @Column(name = "last_run_by")
    private String lastRunBy;

    @Column(name = "last_run_dur")
    private Integer lastRunDur;

    @Column(name = "last_run_date")
    private ZonedDateTime lastRunDate;

    @ManyToOne
    private OcrSession ocrSession;

    @OneToOne
    @JoinColumn(unique = true)
    private RequestWf requestWf;

    @OneToOne
    @JoinColumn(unique = true)
    private EdmsResponse edmsResponse;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public EdmsRequest accountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
        return this;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getSubRequestId() {
        return subRequestId;
    }

    public EdmsRequest subRequestId(String subRequestId) {
        this.subRequestId = subRequestId;
        return this;
    }

    public void setSubRequestId(String subRequestId) {
        this.subRequestId = subRequestId;
    }

    public String getAreaCode() {
        return areaCode;
    }

    public EdmsRequest areaCode(String areaCode) {
        this.areaCode = areaCode;
        return this;
    }

    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public EdmsRequest createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public EdmsRequest startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getEndDate() {
        return endDate;
    }

    public EdmsRequest endDate(ZonedDateTime endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(ZonedDateTime endDate) {
        this.endDate = endDate;
    }

    public String getLastRunBy() {
        return lastRunBy;
    }

    public EdmsRequest lastRunBy(String lastRunBy) {
        this.lastRunBy = lastRunBy;
        return this;
    }

    public void setLastRunBy(String lastRunBy) {
        this.lastRunBy = lastRunBy;
    }

    public Integer getLastRunDur() {
        return lastRunDur;
    }

    public EdmsRequest lastRunDur(Integer lastRunDur) {
        this.lastRunDur = lastRunDur;
        return this;
    }

    public void setLastRunDur(Integer lastRunDur) {
        this.lastRunDur = lastRunDur;
    }

    public ZonedDateTime getLastRunDate() {
        return lastRunDate;
    }

    public EdmsRequest lastRunDate(ZonedDateTime lastRunDate) {
        this.lastRunDate = lastRunDate;
        return this;
    }

    public void setLastRunDate(ZonedDateTime lastRunDate) {
        this.lastRunDate = lastRunDate;
    }

    public OcrSession getOcrSession() {
        return ocrSession;
    }

    public EdmsRequest ocrSession(OcrSession ocrSession) {
        this.ocrSession = ocrSession;
        return this;
    }

    public void setOcrSession(OcrSession ocrSession) {
        this.ocrSession = ocrSession;
    }

    public RequestWf getRequestWf() {
        return requestWf;
    }

    public EdmsRequest requestWf(RequestWf requestWf) {
        this.requestWf = requestWf;
        return this;
    }

    public void setRequestWf(RequestWf requestWf) {
        this.requestWf = requestWf;
    }

    public EdmsResponse getEdmsResponse() {
        return edmsResponse;
    }

    public EdmsRequest edmsResponse(EdmsResponse edmsResponse) {
        this.edmsResponse = edmsResponse;
        return this;
    }

    public void setEdmsResponse(EdmsResponse edmsResponse) {
        this.edmsResponse = edmsResponse;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        EdmsRequest edmsRequest = (EdmsRequest) o;
        if (edmsRequest.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, edmsRequest.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "EdmsRequest{" +
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
