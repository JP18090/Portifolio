package com.portfolio.service;

import com.portfolio.model.Project;
import com.portfolio.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.Arrays;
import java.time.LocalDateTime;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    // Mock data para projetos
    private List<Project> getMockProjects() {
        return Arrays.asList(
            new Project(1L, "Portfólio Pessoal", 
                "Website de portfólio desenvolvido com React, TypeScript e Tailwind CSS. Integração com backend Spring Boot e banco de dados H2.",
                "https://via.placeholder.com/400x300?text=Portfolio", 
                "https://github.com/JP18090/Portifolio", 
                "https://portfolio-demo.com",
                "React, TypeScript, Tailwind CSS, Spring Boot, H2 Database", LocalDateTime.now()),
            
            new Project(2L, "Portal de Estágios",
                "Plataforma web para gestão de vagas de estágio conectando estudantes, empresas e administradores. API REST com autenticação, dashboards e geração automática de currículo.",
                "https://via.placeholder.com/400x300?text=Internship+Portal",
                "https://github.com/JP18090",
                null,
                "Java, Spring Boot, React, REST API, H2 Database, Swagger, BCrypt", LocalDateTime.now()),
            
            new Project(3L, "Agente de IA Integrado ao HubSpot CRM",
                "Agente de Inteligência Artificial conectado ao HubSpot com CRUD completo acessível via WhatsApp, permitindo consulta, criação e atualização de registros no CRM.",
                "https://via.placeholder.com/400x300?text=HubSpot+AI",
                "https://github.com/JP18090",
                null,
                "Python, HubSpot API, WhatsApp Integration, n8n, Automation, REST APIs", LocalDateTime.now()),
            
            new Project(4L, "Automações em Python",
                "Scripts e ferramentas de automação para otimização de processos e integração com APIs externas, realizando processamento e manipulação de dados.",
                "https://via.placeholder.com/400x300?text=Python+Automation",
                "https://github.com/JP18090",
                null,
                "Python, REST APIs, Pandas, Automation", LocalDateTime.now()),
            
            new Project(5L, "CinemaApp",
                "Sistema acadêmico em Java para gestão de espetáculos e venda de ingressos com cadastro de clientes, controle de disponibilidade e menus interativos.",
                "https://via.placeholder.com/400x300?text=CinemaApp",
                "https://github.com/JP18090",
                null,
                "Java, OOP, ArrayList, Business Logic", LocalDateTime.now()),
            
            new Project(6L, "Sistema de Estacionamento",
                "Aplicação em Python para gerenciamento de estacionamento com controle de entradas e saídas, cálculo automático de tarifas e geração de relatórios.",
                "https://via.placeholder.com/400x300?text=Parking+System",
                "https://github.com/JP18090",
                null,
                "Python, Data Structures, Business Logic, CLI Application", LocalDateTime.now())
        );
    }

    public List<Project> getAllProjects() {
        try {
            List<Project> projects = projectRepository.findAll();
            if (projects.isEmpty()) {
                return getMockProjects();
            }
            return projects;
        } catch (Exception e) {
            // Se houver erro no banco, retorna dados mockados
            return getMockProjects();
        }
    }

    public Optional<Project> getProjectById(Long id) {
        try {
            return projectRepository.findById(id);
        } catch (Exception e) {
            return getMockProjects().stream()
                    .filter(p -> p.getId().equals(id))
                    .findFirst();
        }
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project project) {
        return projectRepository.findById(id).map(existingProject -> {
            existingProject.setTitle(project.getTitle());
            existingProject.setDescription(project.getDescription());
            existingProject.setImageUrl(project.getImageUrl());
            existingProject.setRepositoryUrl(project.getRepositoryUrl());
            existingProject.setDeployedUrl(project.getDeployedUrl());
            existingProject.setTechnologies(project.getTechnologies());
            return projectRepository.save(existingProject);
        }).orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
    }

    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new RuntimeException("Project not found with id: " + id);
        }
        projectRepository.deleteById(id);
    }
}
