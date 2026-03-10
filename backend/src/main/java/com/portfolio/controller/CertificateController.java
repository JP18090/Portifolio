package com.portfolio.controller;

import com.portfolio.dto.CertificateDTO;
import com.portfolio.model.Certificate;
import com.portfolio.service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/certificates")
@CrossOrigin(origins = "http://localhost:3000")
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    @GetMapping
    public ResponseEntity<List<CertificateDTO>> getAllCertificates() {
        List<Certificate> certificates = certificateService.getAllCertificates();
        List<CertificateDTO> dtos = certificates.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CertificateDTO> getCertificateById(@PathVariable Long id) {
        return certificateService.getCertificateById(id)
                .map(cert -> ResponseEntity.ok(convertToDTO(cert)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> downloadCertificate(@PathVariable Long id) throws IOException {
        Optional<Certificate> certificate = certificateService.getCertificateById(id);
        
        if (certificate.isPresent()) {
            try {
                String filename = certificate.get().getFileName();
                byte[] fileContent = certificateService.getCertificateFileContent(id);
                
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(certificate.get().getContentType()))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + filename)
                        .body(fileContent);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/upload")
    public ResponseEntity<CertificateDTO> uploadCertificate(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("issuer") String issuer,
            @RequestParam("issuedAt") String issuedAt) {
        try {
            Certificate certificate = certificateService.uploadCertificate(title, issuer, issuedAt, file);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(convertToDTO(certificate));
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CertificateDTO> updateCertificate(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("issuer") String issuer,
            @RequestParam("issuedAt") String issuedAt) {
        try {
            Certificate certificate = certificateService.updateCertificate(id, title, issuer, issuedAt);
            return ResponseEntity.ok(convertToDTO(certificate));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCertificate(@PathVariable Long id) {
        try {
            certificateService.deleteCertificate(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    private CertificateDTO convertToDTO(Certificate certificate) {
        return CertificateDTO.builder()
                .id(certificate.getId())
                .title(certificate.getTitle())
                .issuer(certificate.getIssuer())
                .issuedAt(certificate.getIssuedAt())
                .fileName(certificate.getFileName())
                .contentType(certificate.getContentType())
                .fileSize(certificate.getFileSize())
                .createdAt(certificate.getCreatedAt().toString())
                .build();
    }
}
