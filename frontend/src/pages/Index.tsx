import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import ExperienceSection from "@/components/ExperienceSection"
import CertificatesSection from "@/components/CertificatesSection"
import ProjectsSection from "@/components/ProjectsSection"
import { useLanguage } from "../i18n/LanguageContext"
import { translations, t } from "../i18n/translations"

const Index = () => {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <CertificatesSection />
      <ProjectsSection />
      <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border">
        <p>José Pedro Bitetti Tkatchuk · {t(translations.footer.role, language)}</p>
        <p className="mt-2 text-xs">São Paulo, Brasil · <a href="mailto:pedrotkatchuk@gmail.com" className="text-primary hover:text-accent transition-colors">Email</a> · <a href="https://www.linkedin.com/in/jos%C3%A9-pedro-bitetti-tkatchuk-584aba303" className="text-primary hover:text-accent transition-colors">LinkedIn</a> · <a href="https://github.com/JP18090" className="text-primary hover:text-accent transition-colors">GitHub</a></p>
      </footer>
    </div>
  )
}

export default Index
