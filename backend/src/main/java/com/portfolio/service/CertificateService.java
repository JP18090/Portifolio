package com.portfolio.service;

import com.portfolio.model.Certificate;
import com.portfolio.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.Arrays;

import org.springframework.core.io.ClassPathResource;

@Service
public class CertificateService {

    @Autowired
    private CertificateRepository certificateRepository;

    @Value("${certificate.upload.dir:certificados}")
    private String uploadDir;

    // Mock data para certificados - apontando para os PDFs reais em resources/certificados/
    private List<Certificate> getMockCertificates() {
        return Arrays.asList(
            Certificate.builder()
                .id(1L)
                .title("CCNA: Introduction to Networks (ITN)")
                .issuer("Cisco Networking Academy")
                .issuedAt("2026-03-05")
                .fileName("CCNAITNUpdated20260305-31-21404e.pdf")
                .storedFileName("CCNAITNUpdated20260305-31-21404e.pdf")
                .contentType("application/pdf")
                .fileSize(2048000L)
                .build(),
            
            Certificate.builder()
                .id(2L)
                .title("Python Essentials 1")
                .issuer("Cisco Networking Academy")
                .issuedAt("2026-03-05")
                .fileName("PythonEssentials1Update20260305-31-6kt0f6.pdf")
                .storedFileName("PythonEssentials1Update20260305-31-6kt0f6.pdf")
                .contentType("application/pdf")
                .fileSize(1512000L)
                .build(),
            
            Certificate.builder()
                .id(3L)
                .title("Desenvolvimento Full Stack")
                .issuer("Udemy")
                .issuedAt("2025-08-10")
                .fileName("UC-6675ff66-9547-4524-b382-ededd42431e6.pdf")
                .storedFileName("UC-6675ff66-9547-4524-b382-ededd42431e6.pdf")
                .contentType("application/pdf")
                .fileSize(1024000L)
                .build(),
            
            Certificate.builder()
                .id(4L)
                .title("Programação Avançada")
                .issuer("Udemy")
                .issuedAt("2025-06-05")
                .fileName("UC-affc475a-cdd5-470b-8072-6b58a333d74f.pdf")
                .storedFileName("UC-affc475a-cdd5-470b-8072-6b58a333d74f.pdf")
                .contentType("application/pdf")
                .fileSize(768000L)
                .build(),
            
            Certificate.builder()
                .id(5L)
                .title("Microsoft Power BI para Business Intelligence e Data Science")
                .issuer("Alura")
                .issuedAt("2024-07-31")
                .fileName("certificate-microsoft-power-bi-para-business-intelligence-e-data-science-6462fe1b2bb04988150abc99.pdf")
                .storedFileName("certificate-microsoft-power-bi-para-business-intelligence-e-data-science-6462fe1b2bb04988150abc99.pdf")
                .contentType("application/pdf")
                .fileSize(1256000L)
                .build(),

            Certificate.builder()
                .id(6L)
                .title("AWS Academy Cloud Foundations")
                .issuer("AWS Academy")
                .issuedAt("2026-03-15")
                .fileName("AWS_Academy_Graduate___Cloud_Foundations___Training_Badge_Badge20260315-33-fl43ut.pdf")
                .storedFileName("AWS_Academy_Graduate___Cloud_Foundations___Training_Badge_Badge20260315-33-fl43ut.pdf")
                .contentType("application/pdf")
                .fileSize(1024000L)
                .build(),
            Certificate.builder()
                .id(7L)
                .title("Python Essentials 2")
                .issuer("Cisco Networking Academy")
                .issuedAt("2026-03-15")
                .fileName("PythonEssentials2Update20260315-33-qox2vh.pdf")
                .storedFileName("PythonEssentials2Update20260315-33-qox2vh.pdf")
                .contentType("application/pdf")
                .fileSize(1512000L)
                .build(),
        );
    }

    public List<Certificate> getAllCertificates() {
        try {
            List<Certificate> certificates = certificateRepository.findAll();
            if (certificates.isEmpty()) {
                return getMockCertificates();
            }
            return certificates;
        } catch (Exception e) {
            // Se houver erro no banco, retorna dados mockados
            return getMockCertificates();
        }
    }

    public Optional<Certificate> getCertificateById(Long id) {
        try {
            return certificateRepository.findById(id);
        } catch (Exception e) {
            return getMockCertificates().stream()
                    .filter(c -> c.getId().equals(id))
                    .findFirst();
        }
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
        // Tentar do banco de dados primeiro
        Optional<Certificate> certificate;
        try {
            certificate = certificateRepository.findById(id);
        } catch (Exception e) {
            certificate = Optional.empty();
        }

        // Se não encontrou no banco, buscar nos mocks
        if (!certificate.isPresent()) {
            certificate = getMockCertificates().stream()
                    .filter(c -> c.getId().equals(id))
                    .findFirst();
        }

        if (certificate.isPresent()) {
            String storedFileName = certificate.get().getStoredFileName();

            // 1. Tentar ler do filesystem (uploadDir)
            Path filePath = Paths.get(uploadDir).resolve(storedFileName);
            if (Files.exists(filePath)) {
                return Files.readAllBytes(filePath);
            }

            // 2. Tentar ler do classpath (resources/certificados/)
            try {
                ClassPathResource resource = new ClassPathResource("certificados/" + storedFileName);
                if (resource.exists()) {
                    try (InputStream is = resource.getInputStream()) {
                        return is.readAllBytes();
                    }
                }
            } catch (Exception e) {
                // fallback
            }

            return createEmptyPDF();
        }
        throw new RuntimeException("Certificate not found");
    }

    public byte[] getCertificateFileByName(String fileName) throws IOException {
        // 1. Tentar do classpath (resources/certificados/)
        try {
            ClassPathResource resource = new ClassPathResource("certificados/" + fileName);
            if (resource.exists()) {
                try (InputStream is = resource.getInputStream()) {
                    return is.readAllBytes();
                }
            }
        } catch (Exception e) {
            // fallback
        }

        // 2. Tentar do filesystem (uploadDir)
        Path filePath = Paths.get(uploadDir).resolve(fileName);
        if (Files.exists(filePath)) {
            return Files.readAllBytes(filePath);
        }

        return null;
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

    // Método auxiliar para criar um PDF vazio como fallback
    private byte[] createEmptyPDF() {
        String minimalPdf = "%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n" +
                "2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n" +
                "3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R>>endobj\n" +
                "xref\n0 4\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n0\n%%EOF";
        return minimalPdf.getBytes();
    }
}
