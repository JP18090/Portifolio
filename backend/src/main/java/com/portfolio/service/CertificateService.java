package com.portfolio.service;

import com.portfolio.model.Certificate;
import com.portfolio.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
            createMockCertificate(1L, 
            "CCNA: Introduction to Networks (ITN)", 
            "Cisco Networking Academy", 
            "2026-03-05",
            "CCNAITNUpdated20260305-31-21404e.pdf", 
            "CCNAITNUpdated20260305-31-21404e.pdf"
            ),

            createMockCertificate(2L, 
                "Python Essentials 1", 
                "Cisco Networking Academy", 
                "2026-03-05",
                "PythonEssentials1Update20260305-31-6kt0f6.pdf", 
                "PythonEssentials1Update20260305-31-6kt0f6.pdf"
            ),

            createMockCertificate(3L, 
                "Programação em Java do básico ao avançado", 
                "Udemy", 
                "2025-08-10",
                "UC-6675ff66-9547-4524-b382-ededd42431e6.pdf", 
                "UC-6675ff66-9547-4524-b382-ededd42431e6.pdf"
            ),

            createMockCertificate(4L, 
                "Programação em Java do básico ao avançado", 
                "Udemy", 
                "2025-06-05",
                "UC-affc475a-cdd5-470b-8072-6b58a333d74f.pdf", 
                "UC-affc475a-cdd5-470b-8072-6b58a333d74f.pdf"
            ),

            createMockCertificate(5L, 
                "Microsoft Power BI para Business Intelligence e Data Science", 
                "Data Science Academy", 
                "2024-07-31",
                "certificate-microsoft-power-bi-para-business-intelligence-e-data-science-6462fe1b2bb04988150abc99.pdf",
                "certificate-microsoft-power-bi-para-business-intelligence-e-data-science-6462fe1b2bb04988150abc99.pdf"
            ),

            createMockCertificate(6L, 
                "AWS Academy Cloud Foundations", 
                "AWS Academy", 
                "2026-03-15",
                "AWS_Academy_Graduate___Cloud_Foundations___Training_Badge_Badge20260315-33-fl43ut.pdf",
                "AWS_Academy_Graduate___Cloud_Foundations___Training_Badge_Badge20260315-33-fl43ut.pdf"
            ),

            createMockCertificate(7L, 
                "Python Essentials 2", 
                "Cisco Networking Academy", 
                "2026-03-15",
                "PythonEssentials2Update20260315-33-qox2vh.pdf", 
                "PythonEssentials2Update20260315-33-qox2vh.pdf"
            ),

            createMockCertificate(8L, 
                "Introduction to Internet of Things", 
                "Cisco Networking Academy", 
                "2026-03-19",
                "IntrotoIoTUpdate20260320-31-9ylk8p.pdf", 
                "IntrotoIoTUpdate20260320-31-9ylk8p.pdf"
            ),

            createMockCertificate(9L, 
                "Docker Completo do Zero ao Avançado", 
                "Udemy", 
                "2026-03-17",
                "UC-62dfdd6e-bde0-4701-8703-00093a69756b.pdf", 
                "UC-62dfdd6e-bde0-4701-8703-00093a69756b.pdf"
            )
        );
    }

    private Certificate createMockCertificate(Long id, String title, String issuer, String issuedAt,
                                              String fileName, String storedFileName) {
        return Certificate.builder()
                .id(id)
                .title(title)
                .issuer(issuer)
                .issuedAt(issuedAt)
                .fileName(fileName)
                .storedFileName(storedFileName)
                .contentType("application/pdf")
                .fileSize(resolveFileSize(fileName, storedFileName))
                .build();
    }

    private long resolveFileSize(String fileName, String storedFileName) {
        Optional<Long> sizeByStoredName = tryGetFileSize(storedFileName);
        if (sizeByStoredName.isPresent()) {
            return sizeByStoredName.get();
        }

        Optional<Long> sizeByOriginalName = tryGetFileSize(fileName);
        return sizeByOriginalName.orElse(0L);
    }

    private Optional<Long> tryGetFileSize(String candidateFileName) {
        if (candidateFileName == null || candidateFileName.isBlank()) {
            return Optional.empty();
        }

        // 1. Classpath (resources/certificados)
        try {
            ClassPathResource resource = new ClassPathResource("certificados/" + candidateFileName);
            if (resource.exists()) {
                try (InputStream is = resource.getInputStream()) {
                    return Optional.of((long) is.readAllBytes().length);
                }
            }
        } catch (Exception e) {
            // fallback para filesystem
        }

        // 2. Filesystem (uploadDir)
        try {
            Path filePath = Paths.get(uploadDir).resolve(candidateFileName);
            if (Files.exists(filePath)) {
                return Optional.of(Files.size(filePath));
            }
        } catch (Exception e) {
            return Optional.empty();
        }

        return Optional.empty();
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
