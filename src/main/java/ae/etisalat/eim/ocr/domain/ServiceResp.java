package ae.etisalat.eim.ocr.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A ServiceResp.
 */
@Entity
@Table(name = "service_resp")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "serviceresp")
public class ServiceResp implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "raw_json")
    private String rawJson;

    @Lob
    @Column(name = "document_image")
    private byte[] documentImage;

    @Column(name = "document_image_content_type")
    private String documentImageContentType;

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

    @OneToOne
    @JoinColumn(unique = true)
    private ServiceWf serviceWf;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRawJson() {
        return rawJson;
    }

    public ServiceResp rawJson(String rawJson) {
        this.rawJson = rawJson;
        return this;
    }

    public void setRawJson(String rawJson) {
        this.rawJson = rawJson;
    }

    public byte[] getDocumentImage() {
        return documentImage;
    }

    public ServiceResp documentImage(byte[] documentImage) {
        this.documentImage = documentImage;
        return this;
    }

    public void setDocumentImage(byte[] documentImage) {
        this.documentImage = documentImage;
    }

    public String getDocumentImageContentType() {
        return documentImageContentType;
    }

    public ServiceResp documentImageContentType(String documentImageContentType) {
        this.documentImageContentType = documentImageContentType;
        return this;
    }

    public void setDocumentImageContentType(String documentImageContentType) {
        this.documentImageContentType = documentImageContentType;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public ServiceResp createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public ServiceResp startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getEndDate() {
        return endDate;
    }

    public ServiceResp endDate(ZonedDateTime endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(ZonedDateTime endDate) {
        this.endDate = endDate;
    }

    public String getLastRunBy() {
        return lastRunBy;
    }

    public ServiceResp lastRunBy(String lastRunBy) {
        this.lastRunBy = lastRunBy;
        return this;
    }

    public void setLastRunBy(String lastRunBy) {
        this.lastRunBy = lastRunBy;
    }

    public Integer getLastRunDur() {
        return lastRunDur;
    }

    public ServiceResp lastRunDur(Integer lastRunDur) {
        this.lastRunDur = lastRunDur;
        return this;
    }

    public void setLastRunDur(Integer lastRunDur) {
        this.lastRunDur = lastRunDur;
    }

    public ZonedDateTime getLastRunDate() {
        return lastRunDate;
    }

    public ServiceResp lastRunDate(ZonedDateTime lastRunDate) {
        this.lastRunDate = lastRunDate;
        return this;
    }

    public void setLastRunDate(ZonedDateTime lastRunDate) {
        this.lastRunDate = lastRunDate;
    }

    public ServiceWf getServiceWf() {
        return serviceWf;
    }

    public ServiceResp serviceWf(ServiceWf serviceWf) {
        this.serviceWf = serviceWf;
        return this;
    }

    public void setServiceWf(ServiceWf serviceWf) {
        this.serviceWf = serviceWf;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ServiceResp serviceResp = (ServiceResp) o;
        if (serviceResp.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, serviceResp.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ServiceResp{" +
            "id=" + id +
            ", rawJson='" + rawJson + "'" +
            ", documentImage='" + documentImage + "'" +
            ", documentImageContentType='" + documentImageContentType + "'" +
            ", createdBy='" + createdBy + "'" +
            ", startDate='" + startDate + "'" +
            ", endDate='" + endDate + "'" +
            ", lastRunBy='" + lastRunBy + "'" +
            ", lastRunDur='" + lastRunDur + "'" +
            ", lastRunDate='" + lastRunDate + "'" +
            '}';
    }
}
