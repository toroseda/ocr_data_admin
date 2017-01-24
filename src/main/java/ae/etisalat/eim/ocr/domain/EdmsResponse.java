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
 * A EdmsResponse.
 */
@Entity
@Table(name = "edms_response")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "edmsresponse")
public class EdmsResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "account_number")
    private String accountNumber;

    @Column(name = "sub_request_id")
    private String subRequestId;

    @Column(name = "request_doc_type")
    private String requestDocType;

    @Column(name = "error_code")
    private String errorCode;

    @Column(name = "error_description")
    private String errorDescription;

    @Column(name = "promised_directory")
    private String promisedDirectory;

    @Column(name = "response_doc_type")
    private String responseDocType;

    @Column(name = "response_sub_request_id")
    private String responseSubRequestId;

    @Column(name = "response_aea_code")
    private String responseAeaCode;

    @Column(name = "response_doc_count")
    private Integer responseDocCount;

    @Column(name = "directory_avilable_flg")
    private Integer directoryAvilableFlg;

    @Column(name = "file_count")
    private Integer fileCount;

    @Column(name = "created_by")
    private String createdBy;

    @OneToMany(mappedBy = "edmsResponse")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EdmsDownload> edmsDownloads = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public EdmsResponse accountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
        return this;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getSubRequestId() {
        return subRequestId;
    }

    public EdmsResponse subRequestId(String subRequestId) {
        this.subRequestId = subRequestId;
        return this;
    }

    public void setSubRequestId(String subRequestId) {
        this.subRequestId = subRequestId;
    }

    public String getRequestDocType() {
        return requestDocType;
    }

    public EdmsResponse requestDocType(String requestDocType) {
        this.requestDocType = requestDocType;
        return this;
    }

    public void setRequestDocType(String requestDocType) {
        this.requestDocType = requestDocType;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public EdmsResponse errorCode(String errorCode) {
        this.errorCode = errorCode;
        return this;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorDescription() {
        return errorDescription;
    }

    public EdmsResponse errorDescription(String errorDescription) {
        this.errorDescription = errorDescription;
        return this;
    }

    public void setErrorDescription(String errorDescription) {
        this.errorDescription = errorDescription;
    }

    public String getPromisedDirectory() {
        return promisedDirectory;
    }

    public EdmsResponse promisedDirectory(String promisedDirectory) {
        this.promisedDirectory = promisedDirectory;
        return this;
    }

    public void setPromisedDirectory(String promisedDirectory) {
        this.promisedDirectory = promisedDirectory;
    }

    public String getResponseDocType() {
        return responseDocType;
    }

    public EdmsResponse responseDocType(String responseDocType) {
        this.responseDocType = responseDocType;
        return this;
    }

    public void setResponseDocType(String responseDocType) {
        this.responseDocType = responseDocType;
    }

    public String getResponseSubRequestId() {
        return responseSubRequestId;
    }

    public EdmsResponse responseSubRequestId(String responseSubRequestId) {
        this.responseSubRequestId = responseSubRequestId;
        return this;
    }

    public void setResponseSubRequestId(String responseSubRequestId) {
        this.responseSubRequestId = responseSubRequestId;
    }

    public String getResponseAeaCode() {
        return responseAeaCode;
    }

    public EdmsResponse responseAeaCode(String responseAeaCode) {
        this.responseAeaCode = responseAeaCode;
        return this;
    }

    public void setResponseAeaCode(String responseAeaCode) {
        this.responseAeaCode = responseAeaCode;
    }

    public Integer getResponseDocCount() {
        return responseDocCount;
    }

    public EdmsResponse responseDocCount(Integer responseDocCount) {
        this.responseDocCount = responseDocCount;
        return this;
    }

    public void setResponseDocCount(Integer responseDocCount) {
        this.responseDocCount = responseDocCount;
    }

    public Integer getDirectoryAvilableFlg() {
        return directoryAvilableFlg;
    }

    public EdmsResponse directoryAvilableFlg(Integer directoryAvilableFlg) {
        this.directoryAvilableFlg = directoryAvilableFlg;
        return this;
    }

    public void setDirectoryAvilableFlg(Integer directoryAvilableFlg) {
        this.directoryAvilableFlg = directoryAvilableFlg;
    }

    public Integer getFileCount() {
        return fileCount;
    }

    public EdmsResponse fileCount(Integer fileCount) {
        this.fileCount = fileCount;
        return this;
    }

    public void setFileCount(Integer fileCount) {
        this.fileCount = fileCount;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public EdmsResponse createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Set<EdmsDownload> getEdmsDownloads() {
        return edmsDownloads;
    }

    public EdmsResponse edmsDownloads(Set<EdmsDownload> edmsDownloads) {
        this.edmsDownloads = edmsDownloads;
        return this;
    }

    public EdmsResponse addEdmsDownload(EdmsDownload edmsDownload) {
        edmsDownloads.add(edmsDownload);
        edmsDownload.setEdmsResponse(this);
        return this;
    }

    public EdmsResponse removeEdmsDownload(EdmsDownload edmsDownload) {
        edmsDownloads.remove(edmsDownload);
        edmsDownload.setEdmsResponse(null);
        return this;
    }

    public void setEdmsDownloads(Set<EdmsDownload> edmsDownloads) {
        this.edmsDownloads = edmsDownloads;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        EdmsResponse edmsResponse = (EdmsResponse) o;
        if (edmsResponse.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, edmsResponse.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "EdmsResponse{" +
            "id=" + id +
            ", accountNumber='" + accountNumber + "'" +
            ", subRequestId='" + subRequestId + "'" +
            ", requestDocType='" + requestDocType + "'" +
            ", errorCode='" + errorCode + "'" +
            ", errorDescription='" + errorDescription + "'" +
            ", promisedDirectory='" + promisedDirectory + "'" +
            ", responseDocType='" + responseDocType + "'" +
            ", responseSubRequestId='" + responseSubRequestId + "'" +
            ", responseAeaCode='" + responseAeaCode + "'" +
            ", responseDocCount='" + responseDocCount + "'" +
            ", directoryAvilableFlg='" + directoryAvilableFlg + "'" +
            ", fileCount='" + fileCount + "'" +
            ", createdBy='" + createdBy + "'" +
            '}';
    }
}
