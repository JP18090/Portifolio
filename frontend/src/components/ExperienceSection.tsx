import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

const experiences = [
  {
    role: "Estagiário de TI",
    company: "Brasol",
    period: "Mar 2026 — Presente",
    description: "Parametrização de ERP corporativo (Microsoft Dynamics), análise de bancos de dados, construção de consultas SQL e desenvolvimento de dashboards em Power BI. Automações em Python e contribuição para melhoria contínua de processos.",
  },
  {
    role: "Estagiário de TI",
    company: "Tech Rocket",
    period: "Jun 2025 — Fev 2026",
    description: "Análise, desenvolvimento e manutenção de sistemas internos. Codificação em Python, testes funcionais e de qualidade, modelagem de banco de dados, integração de APIs, documentação técnica e suporte a usuários finais.",
  },
  {
    role: "Estudante de Sistemas de Informação",
    company: "Universidade Presbiteriana Mackenzie",
    period: "5º Semestre",
    description: "Formação acadêmica em Sistemas de Informação com foco em desenvolvimento de software, estruturas de dados, algoritmos, engenharia de requisitos e infraestrutura de TI.",
  },
]

const ExperienceSection = () => {
  return (
    <section id="experiencias" className="section-padding bg-secondary/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-body">02</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Experiências
          </h2>
          <div className="glow-line w-24 mb-12" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative pl-16 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-6 top-6 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                <div className="glass-card rounded-xl p-6 md:p-8">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-display font-semibold text-foreground">
                        {exp.role}
                      </h3>
                      <p className="text-primary font-medium flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-muted-foreground text-sm bg-muted px-3 py-1 rounded-full">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-foreground/70 font-light leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
