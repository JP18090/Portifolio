package com.portfolio.dto;

public class CertificateDTO {
    private Long id;
    private String title;
    private String issuer;
    private String issuedAt;
    private String contentType;
    private String fileName;
    private Long fileSize;
    private String createdAt;

    public CertificateDTO() {}

    public CertificateDTO(Long id, String title, String issuer, String issuedAt,
                         String contentType, String fileName, Long fileSize, String createdAt) {
        this.id = id;
        this.title = title;
        this.issuer = issuer;
        this.issuedAt = issuedAt;
        this.contentType = contentType;
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.createdAt = createdAt;
    }

    public static CertificateDTOBuilder builder() {
        return new CertificateDTOBuilder();
    }

    public static class CertificateDTOBuilder {
        private Long id;
        private String title;
        private String issuer;
        private String issuedAt;
        private String contentType;
        private String fileName;
        private Long fileSize;
        private String createdAt;

        public CertificateDTOBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public CertificateDTOBuilder title(String title) {
            this.title = title;
            return this;
        }

        public CertificateDTOBuilder issuer(String issuer) {
            this.issuer = issuer;
            return this;
        }

        public CertificateDTOBuilder issuedAt(String issuedAt) {
            this.issuedAt = issuedAt;
            return this;
        }

        public CertificateDTOBuilder contentType(String contentType) {
            this.contentType = contentType;
            return this;
        }

        public CertificateDTOBuilder fileName(String fileName) {
            this.fileName = fileName;
            return this;
        }

        public CertificateDTOBuilder fileSize(Long fileSize) {
            this.fileSize = fileSize;
            return this;
        }

        public CertificateDTOBuilder createdAt(String createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public CertificateDTO build() {
            return new CertificateDTO(id, title, issuer, issuedAt, contentType, fileName, fileSize, createdAt);
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

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
