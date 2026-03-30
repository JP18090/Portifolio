import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "../i18n/LanguageContext"
import { translations, t } from "../i18n/translations"

const HeroSection = () => {
  const { language } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden pt-20">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-6"
        >
          {t(translations.hero.subtitle, language)}
        </motion.p>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6">
          <span className="text-foreground">José </span>
          <span className="text-gradient">Pedro</span>
          <br />
        </h1>
        <h3><span className="text-foreground">{t(translations.hero.role, language)}</span></h3>

        
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">
          {t(translations.hero.tagline, language)}
        </p>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">
          {t(translations.hero.quote, language)}
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <a
            href="#sobre"
            className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            {t(translations.hero.aboutMe, language)}
          </a>
          <a
            href="#certificados"
            className="px-8 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-secondary transition-colors"
          >
            {t(translations.hero.certificatesBtn, language)}
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#sobre"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
      >
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </motion.a>
    </section>
  )
}

export default HeroSection
