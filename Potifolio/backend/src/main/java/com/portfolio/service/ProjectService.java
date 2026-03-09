package com.portfolio.service;

import com.portfolio.model.Project;
import com.portfolio.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
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
