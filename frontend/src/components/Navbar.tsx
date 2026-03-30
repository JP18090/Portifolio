import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "../i18n/LanguageContext"
import { translations, t } from "../i18n/translations"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  const links = [
    { label: t(translations.nav.about, language), href: "#sobre" },
    { label: t(translations.nav.experience, language), href: "#experiencias" },
    { label: t(translations.nav.certificates, language), href: "#certificados" },
    { label: t(translations.nav.projects, language), href: "#projetos" },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/50" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display text-xl font-bold text-foreground">
          <span className="text-primary">José Pedro Bitetti Tkatchuk</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors text-sm tracking-wide"
            >
              {link.label}
            </a>
          ))}

          {/* Language Toggle */}
          <div className="flex items-center border border-border rounded-md overflow-hidden text-sm">
            <button
              onClick={() => setLanguage("pt")}
              className={`px-3 py-1.5 font-medium transition-colors ${
                language === "pt"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              PT-BR
            </button>
            <span className="text-muted-foreground/50 px-0.5">/</span>
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1.5 font-medium transition-colors ${
                language === "en"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ENG
            </button>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile Language Toggle */}
              <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                <button
                  onClick={() => { setLanguage("pt"); setMobileOpen(false) }}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    language === "pt"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  PT-BR
                </button>
                <span className="text-muted-foreground/50">/</span>
                <button
                  onClick={() => { setLanguage("en"); setMobileOpen(false) }}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    language === "en"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  ENG
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
