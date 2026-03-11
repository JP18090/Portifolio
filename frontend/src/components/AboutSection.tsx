import { motion } from "framer-motion"
import { User, MapPin, Mail } from "lucide-react"

const AboutSection = () => {
  return (
    <section id="sobre" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-body">01</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Sobre Mim
          </h2>
          <div className="glow-line w-24 mb-12" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-card rounded-2xl p-8 md:p-10"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-6">
              <User className="w-8 h-8 text-primary" />
            </div>
            <p className="text-foreground/80 leading-relaxed text-lg font-light">
              Olá! Sou José, estudante de Sistemas de Informação <a href="https://www.mackenzie.br/graduacao/sao-paulo-higienopolis/sistemas-de-informacao/matriz-curricular" className="text-primary underline" target="_blank" rel="noopener noreferrer">(5º semestre)</a> na Universidade Presbiteriana Mackenzie,
              atualmente atuando como Estagiário de TI na Brasol. Minha paixão está em resolver problemas complexos através da tecnologia,
              com foco em arquitetura de dados, automação e desenvolvimento de soluções integradas.
            </p>
            <p className="text-foreground/80 leading-relaxed text-lg font-light mt-4">
              Trabalho com ERP, análise de bancos de dados, desenvolvimento em Python e Java, criação de dashboards em Power BI
              e IA para otimização operacional. Acredito que desenvolvimento técnico exige disciplina, responsabilidade e visão sistêmica.
              Vamos crescer juntos? Explore meu portfólio!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-xl p-6 flex items-center gap-4">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-muted-foreground text-sm">Localização</p>
                <p className="text-foreground font-medium">São Paulo, Brasil</p>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6 flex items-center gap-4">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-muted-foreground text-sm">Email</p>
                <p className="text-foreground font-medium">pedrotkatchuk@gmail.com</p>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6">
              <p className="text-muted-foreground text-sm mb-3">Habilidades Principais</p>
              <div className="flex flex-wrap gap-2">
                {["Python", "Java", "JavaSpring-boot", "SQL", "Power BI", "ERP", "APIs REST", "React", "Automação"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
