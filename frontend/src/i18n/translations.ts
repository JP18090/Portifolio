export type Language = "pt" | "en"

export const translations = {
  // Navbar
  nav: {
    about: { pt: "Sobre", en: "About" },
    experience: { pt: "Experiências", en: "Experience" },
    certificates: { pt: "Certificados", en: "Certificates" },
    projects: { pt: "Projetos", en: "Projects" },
  },

  // Hero
  hero: {
    subtitle: { pt: "Portfólio Pessoal", en: "Personal Portfolio" },
    role: { pt: "Developer", en: "Developer" },
    tagline: {
      pt: "Estagiário de TI · Automações · Power Automate & AWS",
      en: "IT Intern · Automation · Power Automate & AWS",
    },
    quote: {
      pt: '"Programar é como viver: você corrige erros, aprende com os desafios e evolui a cada nova linha de código." - José Pedro',
      en: '"Programming is like living: you fix bugs, learn from challenges, and evolve with every new line of code." - José Pedro',
    },
    aboutMe: { pt: "Sobre Mim", en: "About Me" },
    certificatesBtn: { pt: "Certificados", en: "Certificates" },
  },

  // About
  about: {
    sectionNumber: { pt: "01", en: "01" },
    title: { pt: "Sobre Mim", en: "About Me" },
    bio1: {
      pt: "Olá! Sou José, estudante de Sistemas de Informação",
      en: "Hello! I'm José, an Information Systems student",
    },
    bio1Link: {
      pt: "(6º semestre)",
      en: "(6th semester)",
    },
    bio1Rest: {
      pt: "na Universidade Presbiteriana Mackenzie, atualmente atuando como Estagiário de Compliance & OpRisk no Itaú Unibanco com forte atuação em tecnologia. Minha paixão está em resolver problemas complexos através da tecnologia, com foco em automação, dados e desenvolvimento de soluções integradas.",
      en: "at Mackenzie Presbyterian University, currently working as a Compliance & OpRisk Intern at Itaú Unibanco with strong involvement in technology initiatives. My passion is solving complex problems through technology, focusing on automation, data, and integrated solution development.",
    },
    bio2: {
      pt: "Atuo com mapeamento e documentação de processos, análise de dados regulatórios, consultas SQL, automações com Power Automate e VBA, além de organização de fluxos e informações em SharePoint e AWS. Acredito que desenvolvimento técnico exige disciplina, responsabilidade e visão sistêmica. Vamos crescer juntos? Explore meu portfólio!",
      en: "I work with process mapping and documentation, regulatory data analysis, SQL queries, automation with Power Automate and VBA, and workflow/information organization in SharePoint and AWS. I believe technical development requires discipline, responsibility, and systemic vision. Let's grow together? Explore my portfolio!",
    },
    location: { pt: "Localização", en: "Location" },
    locationValue: { pt: "São Paulo, Brasil", en: "São Paulo, Brazil" },
    email: { pt: "Email", en: "Email" },
    mainSkills: { pt: "Habilidades Principais", en: "Main Skills" },
    skills: {
      pt: ["Python", "Java", "SQL", "Power Automate", "AWS", "Power Automate", "SharePoint", "Power BI", "APIs REST", "Automação"],
      en: ["Python", "Java", "SQL", "Power Automate", "AWS", "Power Automate", "SharePoint", "Power BI", "REST APIs", "Automation"],
    },
  },

  // Experience
  experience: {
    sectionNumber: { pt: "02", en: "02" },
    title: { pt: "Experiências", en: "Experience" },
    viewMore: { pt: "Ver Detalhes", en: "View Details" },
    viewLess: { pt: "Ver Menos", en: "View Less" },
    hardSkills: { pt: "Hard Skills", en: "Hard Skills" },
    softSkills: { pt: "Soft Skills", en: "Soft Skills" },
    items: [
      {
        role: { pt: "Estagiário de Compliance & OpRisk (com atuação em TI)", en: "Compliance & OpRisk Intern (with IT focus)" },
        company: { pt: "Itaú Unibanco", en: "Itaú Unibanco" },
        period: { pt: "Jul 2026 — Presente", en: "Jul 2026 — Present" },
        description: {
          pt: "Condução de fluxos críticos com foco em governança no controle de pareceres e na gestão de informações em SharePoint e ambiente AWS. Atuação em levantamento e análise de dados regulatórios com Excel e SQL, com foco em automação ponta a ponta de rotinas por meio de Power Automate, Visual Basic e ferramentas correlatas, além da modernização de materiais de treinamento interativos em PowerPoint e da documentação desses processos no Visio.",
          en: "Management of critical workflows with a focus on governance for opinion control and information management in SharePoint and AWS environments. Work on collecting and analyzing regulatory data with Excel and SQL, focused on end-to-end process automation using Power Automate, Visual Basic, and related tools, as well as modernizing interactive training materials in PowerPoint and documenting these processes in Visio.",
        },
        hardSkills: {
          pt: ["Power Automate", "AWS", "SQL", "Excel", "Visual Basic", "Visio", "SharePoint"],
          en: ["Power Automate", "AWS", "SQL", "Excel", "Visual Basic", "Visio", "SharePoint"],
        },
        softSkills: {
          pt: ["Comunicação", "Resolução de Problemas", "Análise Crítica", "Organização", "Adaptabilidade"],
          en: ["Communication", "Problem Solving", "Critical Thinking", "Organization", "Adaptability"],
        },
      },
      {
        role: { pt: "Estagiário de TI", en: "IT Intern" },
        company: { pt: "Brasol", en: "Brasol" },
        period: { pt: "Mar 2026 — Jul 2026", en: "Mar 2026 — Jul 2026" },
        description: {
          pt: "Parametrização de ERP corporativo (Microsoft Dynamics), análise de bancos de dados, construção de consultas SQL e desenvolvimento de dashboards em Power BI. Automações em Python e contribuição para melhoria contínua de processos.",
          en: "Corporate ERP parameterization (Microsoft Dynamics), database analysis, SQL query building, and Power BI dashboard development. Python automations and contribution to continuous process improvement.",
        },
        hardSkills: {
          pt: ["SQL", "Python", "Power BI", "Microsoft Dynamics ERP", "Excel VBA", "Banco de Dados"],
          en: ["SQL", "Python", "Power BI", "Microsoft Dynamics ERP", "Excel VBA", "Database"],
        },
        softSkills: {
          pt: ["Comunicação", "Resolução de Problemas", "Análise Crítica", "Trabalho em Equipe", "Adaptabilidade"],
          en: ["Communication", "Problem Solving", "Critical Thinking", "Teamwork", "Adaptability"],
        },
      },
      {
        role: { pt: "Estagiário de TI", en: "IT Intern" },
        company: { pt: "Tech Rocket", en: "Tech Rocket" },
        period: { pt: "Jun 2025 — Fev 2026", en: "Jun 2025 — Feb 2026" },
        description: {
          pt: "Análise, desenvolvimento e manutenção de sistemas internos. Codificação em Python, testes funcionais e de qualidade, modelagem de banco de dados, integração de APIs, documentação técnica e suporte a usuários finais.",
          en: "Analysis, development, and maintenance of internal systems. Python coding, functional and quality testing, database modeling, API integration, technical documentation, and end-user support.",
        },
        hardSkills: {
          pt: ["Python", "Testes Unitários", "Modelagem de BD", "Integração de APIs", "Documentação Técnica"],
          en: ["Python", "Unit Testing", "DB Modeling", "API Integration", "Technical Documentation"],
        },
        softSkills: {
          pt: ["Atenção aos Detalhes", "Documentação", "Suporte ao Usuário", "Qualidade", "Iniciativa"],
          en: ["Attention to Detail", "Documentation", "User Support", "Quality", "Initiative"],
        },
      },
      {
        role: {
          pt: "Estudante de Sistemas de Informação",
          en: "Information Systems Student",
        },
        company: { pt: "Universidade Presbiteriana Mackenzie", en: "Mackenzie Presbyterian University" },
        period: { pt: "5º Semestre", en: "5th Semester" },
        description: {
          pt: "Formação acadêmica em Sistemas de Informação com foco em desenvolvimento de software, estruturas de dados, algoritmos, engenharia de requisitos e infraestrutura de TI.",
          en: "Academic background in Information Systems focused on software development, data structures, algorithms, requirements engineering, and IT infrastructure.",
        },
        hardSkills: {
          pt: ["Algoritmos", "Estrutura de Dados", "Java", "SQL", "Engenharia de Software"],
          en: ["Algorithms", "Data Structures", "Java", "SQL", "Software Engineering"],
        },
        softSkills: {
          pt: ["Pensamento Crítico", "Aprendizado Contínuo", "Pesquisa", "Rigor Técnico"],
          en: ["Critical Thinking", "Continuous Learning", "Research", "Technical Rigor"],
        },
      },
    ],
  },

  // Certificates
  certificates: {
    sectionNumber: { pt: "03", en: "03" },
    title: { pt: "Cursos & Certificados", en: "Courses & Certificates" },
    loading: {
      pt: "Aviso: os certificados estão sendo requisitados e já serão renderizados aqui...aguarde um instante",
      en: "Notice: certificates are being fetched and will be rendered here shortly...please wait",
    },
    empty: {
      pt: "Nenhum certificado disponível no momento.",
      en: "No certificates available at the moment.",
    },
    openCert: { pt: "Abrir certificado", en: "Open certificate" },
    issuerFallback: { pt: "Certificado", en: "Certificate" },
    mockTitles: [
      { pt: "CCNA: Introduction to Networks", en: "CCNA: Introduction to Networks" },
      { pt: "Python Essentials 1", en: "Python Essentials 1" },
      { pt: "Programação em Java do básico ao avançado", en: "Java Programming from Basics to Advanced" },
      { pt: "Programação em Java do básico ao avançado", en: "Java Programming from Basics to Advanced" },
      { pt: "Microsoft Power BI para Business Intelligence e Data Science", en: "Microsoft Power BI for Business Intelligence and Data Science" },
      { pt: "AWS Academy Cloud Foundations", en: "AWS Academy Cloud Foundations" },
      { pt: "Python Essentials 2", en: "Python Essentials 2" },
      { pt: "Docker Completo do Zero ao Avançado", en: "Docker Complete from Zero to Advanced" },
      { pt: "Introdução à IoT", en: "Introduction to IoT" },
      { pt: "AWS Academy Cloud Developing", en: "AWS Academy Cloud Developing" },
    ],
  },

  // Projects
  projects: {
    sectionNumber: { pt: "04", en: "04" },
    title: { pt: "Projetos", en: "Projects" },
    viewProject: { pt: "Ver Projeto", en: "View Project" },
    items: [
      {
        name: { pt: "Portfólio Pessoal", en: "Personal Portfolio" },
        description: {
          pt: "Website de portfólio desenvolvido com React, TypeScript e Tailwind CSS. Integração com backend Spring Boot e banco de dados H2.",
          en: "Portfolio website built with React, TypeScript, and Tailwind CSS. Integration with Spring Boot backend and H2 database.",
        },
      },
      {
        name: { pt: "Portal de Estágios", en: "Internship Portal" },
        description: {
          pt: "Plataforma web para gestão de vagas de estágio conectando estudantes, empresas e administradores. API REST com autenticação, dashboards e geração automática de currículo.",
          en: "Web platform for internship management connecting students, companies, and administrators. REST API with authentication, dashboards, and automatic resume generation.",
        },
      },
      {
        name: {
          pt: "Agente de IA Integrado ao HubSpot CRM",
          en: "AI Agent Integrated with HubSpot CRM",
        },
        description: {
          pt: "Agente de Inteligência Artificial conectado ao HubSpot com CRUD completo acessível via WhatsApp, permitindo consulta, criação e atualização de registros no CRM.",
          en: "AI Agent connected to HubSpot with full CRUD accessible via WhatsApp, enabling query, creation, and update of CRM records.",
        },
      },
      {
        name: { pt: "Automações em Python", en: "Python Automations" },
        description: {
          pt: "Scripts e ferramentas de automação para otimização de processos e integração com APIs externas, realizando processamento e manipulação de dados.",
          en: "Automation scripts and tools for process optimization and external API integration, performing data processing and manipulation.",
        },
      },
      {
        name: { pt: "CinemaApp", en: "CinemaApp" },
        description: {
          pt: "Sistema em Java para gestão de espetáculos e venda de ingressos com cadastro de clientes, controle de disponibilidade e menus interativos.",
          en: "Java system for show management and ticket sales with customer registration, availability control, and interactive menus.",
        },
      },
      {
        name: { pt: "Sistema de Estacionamento", en: "Parking System" },
        description: {
          pt: "Aplicação em Python para gerenciamento de estacionamento com controle de entradas e saídas, cálculo automático de tarifas e geração de relatórios.",
          en: "Python application for parking management with entry/exit control, automatic fare calculation, and report generation.",
        },
      },
    ],
  },

  // Footer
  footer: {
    role: { pt: "Desenvolvedor", en: "Developer" },
  },

  // Experience Details Modal
  experienceModal: {
    about: { pt: "Sobre", en: "About" },
    close: { pt: "Fechar", en: "Close" },
  },

  // NotFound page
  notFound: {
    title: { pt: "Página não encontrada", en: "Page not found" },
    description: {
      pt: "Desculpe, a página que você está procurando não existe.",
      en: "Sorry, the page you are looking for does not exist.",
    },
    backHome: { pt: "Voltar para Início", en: "Back to Home" },
  },

  // PDF Viewer
  pdfViewer: {
    openNewTab: { pt: "Abrir em nova aba", en: "Open in new tab" },
    close: { pt: "Fechar", en: "Close" },
    loading: { pt: "Carregando PDF...", en: "Loading PDF..." },
    ariaLabel: { pt: "Visualizador de PDF", en: "PDF Viewer" },
  },
} as const

export function t(
  obj: { pt: string; en: string } | undefined,
  lang: Language
): string {
  if (!obj) return ""
  return obj[lang]
}
