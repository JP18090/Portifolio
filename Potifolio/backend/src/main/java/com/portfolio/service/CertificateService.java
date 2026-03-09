package com.portfolio.service;

import com.portfolio.model.Certificate;
import com.portfolio.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CertificateService {

    @Autowired
    private CertificateRepository certificateRepository;

    @Value("${certificate.upload.dir:certificados}")
    private String uploadDir;

    public List<Certificate> getAllCertificates() {
        return certificateRepository.findAll();
    }

    public Optional<Certificate> getCertificateById(Long id) {
        return certificateRepository.findById(id);
    }

    public Certificate uploadCertificate(String title, String issuer, String issuedAt, MultipartFile file) throws IOException {
        // Criar diretório se não existir
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Gerar nome único para o arquivo
        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename != null ? originalFilename.substring(originalFilename.lastIndexOf(".")) : "";
        String uniqueFilename = UUID.randomUUID().toString() + fileExtension;

        // Salvar arquivo em disco
        Path filePath = uploadPath.resolve(uniqueFilename);
        Files.write(filePath, file.getBytes());

        // Salvar metadados no banco de dados
        Certificate certificate = Certificate.builder()
                .title(title)
                .issuer(issuer)
                .issuedAt(issuedAt)
                .fileName(originalFilename)
                .storedFileName(uniqueFilename)
                .contentType(file.getContentType())
                .fileSize(file.getSize())
                .build();

        return certificateRepository.save(certificate);
    }

    public void deleteCertificate(Long id) {
        Optional<Certificate> certificate = certificateRepository.findById(id);
        if (certificate.isPresent()) {
            // Deletar arquivo físico
            try {
                Path filePath = Paths.get(uploadDir).resolve(certificate.get().getStoredFileName());
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                System.err.println("Erro ao deletar arquivo: " + e.getMessage());
            }
            // Deletar registro do banco
            certificateRepository.deleteById(id);
        }
    }

    public byte[] getCertificateFileContent(Long id) throws IOException {
        Optional<Certificate> certificate = certificateRepository.findById(id);
        if (certificate.isPresent()) {
            Path filePath = Paths.get(uploadDir).resolve(certificate.get().getStoredFileName());
            return Files.readAllBytes(filePath);
        }
        throw new RuntimeException("Certificate not found");
    }

    public Certificate updateCertificate(Long id, String title, String issuer, String issuedAt) {
        Optional<Certificate> optional = certificateRepository.findById(id);
        if (optional.isPresent()) {
            Certificate certificate = optional.get();
            certificate.setTitle(title);
            certificate.setIssuer(issuer);
            certificate.setIssuedAt(issuedAt);
            return certificateRepository.save(certificate);
        }
        throw new RuntimeException("Certificate not found");
    }
}
