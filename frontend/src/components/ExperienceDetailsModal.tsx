import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft } from "lucide-react"

interface ExperienceDetails {
  role: string
  company: string
  period: string
  description: string
  hardSkills: string[]
  softSkills: string[]
}

interface ExperienceDetailsModalProps {
  isOpen: boolean
  experience: ExperienceDetails | null
  onClose: () => void
}

const ExperienceDetailsModal = ({ isOpen, experience, onClose }: ExperienceDetailsModalProps) => {
  if (!experience) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-background overflow-y-auto"
        >
          {/* Header Sticky */}
          <div className="sticky top-0 z-50 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border backdrop-blur-sm">
            <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 flex items-start justify-between gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex-1 min-w-0"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                  {experience.role}
                </h2>
                <p className="text-primary font-medium text-lg">{experience.company}</p>
                <p className="text-muted-foreground text-sm mt-1">{experience.period}</p>
              </motion.div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0 md:hidden"
              >
                <ChevronLeft className="w-6 h-6 text-foreground" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0 hidden md:block"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="space-y-12"
            >
              {/* Description */}
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Sobre</h3>
                <p className="text-foreground/70 leading-relaxed text-lg">
                  {experience.description}
                </p>
              </div>

              {/* Hard Skills */}
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">Hard Skills</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {experience.hardSkills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg hover:border-primary/50 hover:bg-primary/10 transition-all"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-foreground font-medium">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">Soft Skills</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {experience.softSkills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-3 p-4 bg-accent/5 border border-accent/20 rounded-lg hover:border-accent/50 hover:bg-accent/10 transition-all"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-foreground font-medium">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Close button at bottom */}
              <div className="pt-8 flex justify-center">
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ExperienceDetailsModal
