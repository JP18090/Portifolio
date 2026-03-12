import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  id: number
  name?: string
  title?: string
  description: string
  technologies: string | string[]
  github?: string
  repositoryUrl?: string
  liveUrl?: string
  deployedUrl?: string
  image?: string
  imageUrl?: string
}

const defaultProjects: Project[] = [
  {
    id: 1,
    name: "Portfólio Pessoal",
    description: "Website de portfólio desenvolvido com React, TypeScript e Tailwind CSS. Integração com backend Spring Boot e banco de dados H2.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Spring Boot", "H2 Database"],
    github: "https://github.com/JP18090/Portifolio",
    liveUrl: "https://portifolio-1-grk0.onrender.com/",
  },
  {
    id: 2,
    name: "Portal de Estágios",
    description: "Plataforma web para gestão de vagas de estágio conectando estudantes, empresas e administradores. API REST com autenticação, dashboards e geração automática de currículo.",
    technologies: ["Java", "Spring Boot", "React", "REST API", "H2 Database", "Swagger", "BCrypt"],
    github: "https://github.com/Danibart54/Projeto-Ps2",
  },
  {
    id: 3,
    name: "Agente de IA Integrado ao HubSpot CRM",
    description: "Agente de Inteligência Artificial conectado ao HubSpot com CRUD completo acessível via WhatsApp, permitindo consulta, criação e atualização de registros no CRM.",
    technologies: ["Python", "HubSpot API", "WhatsApp Integration", "n8n", "Automation"],
  },
  {
    id: 4,
    name: "Automações em Python",
    description: "Scripts e ferramentas de automação para otimização de processos e integração com APIs externas, realizando processamento e manipulação de dados.",
    technologies: ["Python", "REST APIs", "Pandas", "Automation"],
  },
  {
    id: 5,
    name: "CinemaApp",
    description: "Sistema em Java para gestão de espetáculos e venda de ingressos com cadastro de clientes, controle de disponibilidade e menus interativos.",
    technologies: ["Java", "POO", "ArrayList", "Business Logic"],
    github: "https://github.com/JP18090/Cineminha",
  },
  {
    id: 6,
    name: "Sistema de Estacionamento",
    description: "Aplicação em Python para gerenciamento de estacionamento com controle de entradas e saídas, cálculo automático de tarifas e geração de relatórios.",
    technologies: ["Python", "Data Structures", "Business Logic", "CLI Application"],
    github: "https://github.com/JP18090/ProjPython",
  },
]

const ProjectsSection = () => {
  const projects = defaultProjects

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="projetos" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-body">04</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Projetos
          </h2>
          <div className="glow-line w-24 mb-12" />
        </motion.div>

        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <div className="group glass-card rounded-xl p-6 h-full flex flex-col hover:border-primary/50 transition-colors">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-lg md:text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/70 text-sm leading-relaxed flex-1 mb-4">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(project.technologies) 
                        ? project.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                            >
                              {tech}
                            </span>
                          ))
                        : typeof project.technologies === "string"
                        ? project.technologies.split(",").map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                            >
                              {tech.trim()}
                            </span>
                          ))
                        : null}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-4 border-t border-border/50">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-background transition-colors text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Ver Projeto
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection
