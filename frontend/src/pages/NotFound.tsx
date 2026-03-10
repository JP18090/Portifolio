import { motion } from "framer-motion"
import { Home } from "lucide-react"

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-8"
        >
          <h1 className="text-9xl font-display font-bold text-primary mb-4">404</h1>
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
          Página não encontrada
        </h2>
        
        <p className="text-muted-foreground text-lg mb-8">
          Desculpe, a página que você está procurando não existe.
        </p>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          <Home className="w-5 h-5" />
          Voltar para Início
        </motion.a>
      </motion.div>
    </div>
  )
}

export default NotFound
