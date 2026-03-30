import { motion } from "framer-motion"
import { User, MapPin, Mail } from "lucide-react"
import { useLanguage } from "../i18n/LanguageContext"
import { translations, t } from "../i18n/translations"

const AboutSection = () => {
  const { language } = useLanguage()

  return (
    <section id="sobre" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-body">{t(translations.about.sectionNumber, language)}</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            {t(translations.about.title, language)}
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
              {t(translations.about.bio1, language)}{" "}
              <a href="https://www.mackenzie.br/graduacao/sao-paulo-higienopolis/sistemas-de-informacao/matriz-curricular" className="text-primary underline" target="_blank" rel="noopener noreferrer">
                {t(translations.about.bio1Link, language)}
              </a>{" "}
              {t(translations.about.bio1Rest, language)}
            </p>
            <p className="text-foreground/80 leading-relaxed text-lg font-light mt-4">
              {t(translations.about.bio2, language)}
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
                <p className="text-muted-foreground text-sm">{t(translations.about.location, language)}</p>
                <p className="text-foreground font-medium">{t(translations.about.locationValue, language)}</p>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6 flex items-center gap-4">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-muted-foreground text-sm">{t(translations.about.email, language)}</p>
                <p className="text-foreground font-medium">pedrotkatchuk@gmail.com</p>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6">
              <p className="text-muted-foreground text-sm mb-3">{t(translations.about.mainSkills, language)}</p>
              <div className="flex flex-wrap gap-2">
                {translations.about.skills[language].map((skill) => (
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
