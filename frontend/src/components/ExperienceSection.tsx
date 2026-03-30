import { motion } from "framer-motion"
import { Briefcase, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "../i18n/LanguageContext"
import { translations, t } from "../i18n/translations"

const ExperienceSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const { language } = useLanguage()

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const expItems = translations.experience.items

  return (
    <section id="experiencias" className="section-padding bg-secondary/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-body">{t(translations.experience.sectionNumber, language)}</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            {t(translations.experience.title, language)}
          </h2>
          <div className="glow-line w-24 mb-12" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {expItems.map((exp, index) => (
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

                {/* Main Card - Always Visible */}
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full text-left group hover:scale-102 transition-transform"
                >
                  <div className="glass-card rounded-xl p-6 md:p-8">
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                          {t(exp.role, language)}
                        </h3>
                        <p className="text-primary font-medium flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          {t(exp.company, language)}
                        </p>
                      </div>
                      <span className="text-muted-foreground text-sm bg-muted px-3 py-1 rounded-full whitespace-nowrap">
                        {t(exp.period, language)}
                      </span>
                    </div>
                    <p className="text-foreground/70 font-light leading-relaxed mb-4">
                      {t(exp.description, language)}
                    </p>

                    {/* Skills Preview */}
                    {expandedIndex !== index && (
                      <div className="space-y-3 pt-4 border-t border-border/50">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{t(translations.experience.hardSkills, language)}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.hardSkills[language].slice(0, 3).map((skill, idx) => (
                              <span key={idx} className="px-2 py-1 text-xs rounded bg-primary/10 text-primary">
                                {skill}
                              </span>
                            ))}
                            {exp.hardSkills[language].length > 3 && (
                              <span className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground">
                                +{exp.hardSkills[language].length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Toggle Indicator */}
                    <div className="mt-4 flex items-center text-primary text-sm font-medium">
                      {expandedIndex === index ? (
                        <>{t(translations.experience.viewLess, language)} <ChevronUp className="w-4 h-4 ml-1" /></>
                      ) : (
                        <>{t(translations.experience.viewMore, language)} <ChevronDown className="w-4 h-4 ml-1" /></>
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded Content - Accordion */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: expandedIndex === index ? 1 : 0,
                    height: expandedIndex === index ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="glass-card rounded-xl p-6 md:p-8 mt-4 border border-primary/20">
                    {/* Hard Skills */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-foreground mb-4">{t(translations.experience.hardSkills, language)}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {exp.hardSkills[language].map((skill, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg hover:border-primary/50 hover:bg-primary/10 transition-all"
                          >
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                            <span className="text-foreground text-sm font-medium">{skill}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Soft Skills */}
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">{t(translations.experience.softSkills, language)}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {exp.softSkills[language].map((skill, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-center gap-3 p-3 bg-accent/5 border border-accent/20 rounded-lg hover:border-accent/50 hover:bg-accent/10 transition-all"
                          >
                            <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                            <span className="text-foreground text-sm font-medium">{skill}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
