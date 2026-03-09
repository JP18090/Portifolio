import React, { useState } from 'react'
import { X, Download, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface PDFViewerProps {
  url: string
  title: string
  onClose: () => void
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url, title, onClose }) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleDownload = async () => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `${title}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error('Erro ao baixar PDF:', error)
      // Fallback: abrir download direto
      const link = document.createElement('a')
      link.href = url
      link.download = `${title}.pdf`
      link.click()
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="pdf-viewer-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          key="pdf-viewer-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="w-full max-w-4xl h-[80vh] bg-card rounded-lg shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground truncate">{title}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                title="Download"
                aria-label="Download PDF"
              >
                <Download className="w-5 h-5 text-primary" />
              </button>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                title="Abrir em nova aba"
                aria-label="Abrir em nova aba"
              >
                <ExternalLink className="w-5 h-5 text-primary" />
              </a>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                title="Fechar"
                aria-label="Fechar"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 overflow-auto bg-muted">
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                  <p className="text-muted-foreground">Carregando PDF...</p>
                </div>
              </div>
            )}
            <iframe
              src={`${url}#toolbar=1&navpanes=0&scrollbar=1`}
              className="w-full h-full border-0"
              onLoad={() => setIsLoading(false)}
              title={title}
              aria-label={`Visualizador de PDF: ${title}`}
              sandbox="allow-same-origin"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PDFViewer