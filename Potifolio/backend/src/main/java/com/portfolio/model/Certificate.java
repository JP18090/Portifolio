package com.portfolio.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "certificates")
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String issuer;

    @Column(nullable = false)
    private String issuedAt;

    @Transient
    private byte[] fileContent;

    @Column(nullable = false)
    private String contentType;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String storedFileName;

    @Column(nullable = false)
    private Long fileSize;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Constructors
    public Certificate() {}

    public Certificate(String title, String issuer, String issuedAt, byte[] fileContent, 
                      String contentType, String fileName, Long fileSize) {
        this.title = title;
        this.issuer = issuer;
        this.issuedAt = issuedAt;
        this.fileContent = fileContent;
        this.contentType = contentType;
        this.fileName = fileName;
        this.fileSize = fileSize;
    }

    // Builder pattern
    public static CertificateBuilder builder() {
        return new CertificateBuilder();
    }

    public static class CertificateBuilder {
        private Long id;
        private String title;
        private String issuer;
        private String issuedAt;
        private byte[] fileContent;
        private String contentType;
        private String fileName;
        private String storedFileName;
        private Long fileSize;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public CertificateBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public CertificateBuilder title(String title) {
            this.title = title;
            return this;
        }

        public CertificateBuilder issuer(String issuer) {
            this.issuer = issuer;
            return this;
        }

        public CertificateBuilder issuedAt(String issuedAt) {
            this.issuedAt = issuedAt;
            return this;
        }

        public CertificateBuilder fileContent(byte[] fileContent) {
            this.fileContent = fileContent;
            return this;
        }

        public CertificateBuilder contentType(String contentType) {
            this.contentType = contentType;
            return this;
        }

        public CertificateBuilder fileName(String fileName) {
            this.fileName = fileName;
            return this;
        }

        public CertificateBuilder storedFileName(String storedFileName) {
            this.storedFileName = storedFileName;
            return this;
        }

        public CertificateBuilder fileSize(Long fileSize) {
            this.fileSize = fileSize;
            return this;
        }

        public CertificateBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public CertificateBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public Certificate build() {
            Certificate cert = new Certificate();
            cert.id = this.id;
            cert.title = this.title;
            cert.issuer = this.issuer;
            cert.issuedAt = this.issuedAt;
            cert.fileContent = this.fileContent;
            cert.contentType = this.contentType;
            cert.fileName = this.fileName;
            cert.storedFileName = this.storedFileName;
            cert.fileSize = this.fileSize;
            cert.createdAt = this.createdAt;
            cert.updatedAt = this.updatedAt;
            return cert;
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIssuer() {
        return issuer;
    }

    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

    public String getIssuedAt() {
        return issuedAt;
    }

    public void setIssuedAt(String issuedAt) {
        this.issuedAt = issuedAt;
    }

    public byte[] getFileContent() {
        return fileContent;
    }

    public void setFileContent(byte[] fileContent) {
        this.fileContent = fileContent;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getStoredFileName() {
        return storedFileName;
    }

    public void setStoredFileName(String storedFileName) {
        this.storedFileName = storedFileName;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
