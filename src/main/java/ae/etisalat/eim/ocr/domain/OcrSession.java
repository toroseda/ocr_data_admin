package ae.etisalat.eim.ocr.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A OcrSession.
 */
@Entity
@Table(name = "ocr_session")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "ocrsession")
public class OcrSession implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "status_id")
    private Integer statusId;

    @Column(name = "server_file_path")
    private String serverFilePath;

    @Column(name = "filename")
    private String filename;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "updated_by")
    private String updatedBy;

    @OneToMany(mappedBy = "ocrSession")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SessionWf> sessionWfs = new HashSet<>();

    @OneToMany(mappedBy = "ocrSession")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EdmsRequest> edmsRequests = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public OcrSession name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public OcrSession description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStatusId() {
        return statusId;
    }

    public OcrSession statusId(Integer statusId) {
        this.statusId = statusId;
        return this;
    }

    public void setStatusId(Integer statusId) {
        this.statusId = statusId;
    }

    public String getServerFilePath() {
        return serverFilePath;
    }

    public OcrSession serverFilePath(String serverFilePath) {
        this.serverFilePath = serverFilePath;
        return this;
    }

    public void setServerFilePath(String serverFilePath) {
        this.serverFilePath = serverFilePath;
    }

    public String getFilename() {
        return filename;
    }

    public OcrSession filename(String filename) {
        this.filename = filename;
        return this;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public OcrSession createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public OcrSession updatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
        return this;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Set<SessionWf> getSessionWfs() {
        return sessionWfs;
    }

    public OcrSession sessionWfs(Set<SessionWf> sessionWfs) {
        this.sessionWfs = sessionWfs;
        return this;
    }

    public OcrSession addSessionWf(SessionWf sessionWf) {
        sessionWfs.add(sessionWf);
        sessionWf.setOcrSession(this);
        return this;
    }

    public OcrSession removeSessionWf(SessionWf sessionWf) {
        sessionWfs.remove(sessionWf);
        sessionWf.setOcrSession(null);
        return this;
    }

    public void setSessionWfs(Set<SessionWf> sessionWfs) {
        this.sessionWfs = sessionWfs;
    }

    public Set<EdmsRequest> getEdmsRequests() {
        return edmsRequests;
    }

    public OcrSession edmsRequests(Set<EdmsRequest> edmsRequests) {
        this.edmsRequests = edmsRequests;
        return this;
    }

    public OcrSession addEdmsRequest(EdmsRequest edmsRequest) {
        edmsRequests.add(edmsRequest);
        edmsRequest.setOcrSession(this);
        return this;
    }

    public OcrSession removeEdmsRequest(EdmsRequest edmsRequest) {
        edmsRequests.remove(edmsRequest);
        edmsRequest.setOcrSession(null);
        return this;
    }

    public void setEdmsRequests(Set<EdmsRequest> edmsRequests) {
        this.edmsRequests = edmsRequests;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        OcrSession ocrSession = (OcrSession) o;
        if (ocrSession.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, ocrSession.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "OcrSession{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", description='" + description + "'" +
            ", statusId='" + statusId + "'" +
            ", serverFilePath='" + serverFilePath + "'" +
            ", filename='" + filename + "'" +
            ", createdBy='" + createdBy + "'" +
            ", updatedBy='" + updatedBy + "'" +
            '}';
    }
}
