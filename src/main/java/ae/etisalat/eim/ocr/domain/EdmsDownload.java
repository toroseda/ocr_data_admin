package ae.etisalat.eim.ocr.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A EdmsDownload.
 */
@Entity
@Table(name = "edms_download")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "edmsdownload")
public class EdmsDownload implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "actual_directory")
    private String actualDirectory;

    @Column(name = "actual_filename")
    private String actualFilename;

    @Column(name = "created_by")
    private String createdBy;

    @ManyToOne
    private EdmsResponse edmsResponse;

    @OneToOne
    @JoinColumn(unique = true)
    private ServiceResp serviceResp;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getActualDirectory() {
        return actualDirectory;
    }

    public EdmsDownload actualDirectory(String actualDirectory) {
        this.actualDirectory = actualDirectory;
        return this;
    }

    public void setActualDirectory(String actualDirectory) {
        this.actualDirectory = actualDirectory;
    }

    public String getActualFilename() {
        return actualFilename;
    }

    public EdmsDownload actualFilename(String actualFilename) {
        this.actualFilename = actualFilename;
        return this;
    }

    public void setActualFilename(String actualFilename) {
        this.actualFilename = actualFilename;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public EdmsDownload createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public EdmsResponse getEdmsResponse() {
        return edmsResponse;
    }

    public EdmsDownload edmsResponse(EdmsResponse edmsResponse) {
        this.edmsResponse = edmsResponse;
        return this;
    }

    public void setEdmsResponse(EdmsResponse edmsResponse) {
        this.edmsResponse = edmsResponse;
    }

    public ServiceResp getServiceResp() {
        return serviceResp;
    }

    public EdmsDownload serviceResp(ServiceResp serviceResp) {
        this.serviceResp = serviceResp;
        return this;
    }

    public void setServiceResp(ServiceResp serviceResp) {
        this.serviceResp = serviceResp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        EdmsDownload edmsDownload = (EdmsDownload) o;
        if (edmsDownload.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, edmsDownload.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "EdmsDownload{" +
            "id=" + id +
            ", actualDirectory='" + actualDirectory + "'" +
            ", actualFilename='" + actualFilename + "'" +
            ", createdBy='" + createdBy + "'" +
            '}';
    }
}
