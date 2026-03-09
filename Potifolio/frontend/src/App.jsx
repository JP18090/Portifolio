import { useState, useEffect } from 'react'
import { projectAPI } from './api'
import './App.css'

export default function App() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    repositoryUrl: '',
    deployedUrl: '',
    technologies: '',
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await projectAPI.getAllProjects()
      setProjects(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to load projects. Make sure the backend is running.')
      console.error('Error fetching projects:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await projectAPI.createProject(formData)
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        repositoryUrl: '',
        deployedUrl: '',
        technologies: '',
      })
      fetchProjects()
    } catch (err) {
      setError('Failed to create project')
      console.error('Error creating project:', err)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await projectAPI.deleteProject(id)
        fetchProjects()
      } catch (err) {
        setError('Failed to delete project')
        console.error('Error deleting project:', err)
      }
    }
  }

  return (
    <>
      <header>
        <h1>📁 My Portfolio</h1>
      </header>

      <main>
        {error && <div className="error">{error}</div>}

        <div className="add-project-form">
          <h2>Add New Project</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Project Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="imageUrl">Image URL</label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="technologies">Technologies (comma-separated)</label>
              <input
                type="text"
                id="technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleInputChange}
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div className="form-group">
              <label htmlFor="repositoryUrl">Repository URL</label>
              <input
                type="url"
                id="repositoryUrl"
                name="repositoryUrl"
                value={formData.repositoryUrl}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="deployedUrl">Deployed URL</label>
              <input
                type="url"
                id="deployedUrl"
                name="deployedUrl"
                value={formData.deployedUrl}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <button type="submit">Add Project</button>
            </div>
          </form>
        </div>

        {loading ? (
          <div className="loading">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="loading">No projects yet. Add your first project above!</div>
        ) : (
          <div className="container">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                {project.imageUrl && (
                  <div className="project-image">
                    <img src={project.imageUrl} alt={project.title} />
                  </div>
                )}
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.technologies && (
                    <div className="technologies">
                      {project.technologies.split(',').map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech.trim()}</span>
                      ))}
                    </div>
                  )}
                  <div className="project-links">
                    {project.repositoryUrl && (
                      <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                        Repository
                      </a>
                    )}
                    {project.deployedUrl && (
                      <a href={project.deployedUrl} target="_blank" rel="noreferrer">
                        Live Demo
                      </a>
                    )}
                    <button
                      onClick={() => handleDelete(project.id)}
                      style={{
                        flex: 1,
                        padding: '0.7rem',
                        background: '#ff6b6b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer>
        <p>&copy; 2026 Portfolio. Built with React & Spring Boot.</p>
      </footer>
    </>
  )
}
