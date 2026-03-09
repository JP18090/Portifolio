import { motion } from "framer-motion";
import { Upload, Award, ExternalLink, Lock, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  issuedAt: string;
  fileName: string;
}

interface PendingCertificate {
  file: File;
  title: string;
  issuer: string;
  issuedAt: string;
  previewUrl: string;
  isUploading?: boolean;
}

const CertificatesSection = () => {
  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    try {
      const saved = localStorage.getItem("portfolio-certificates");
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      // Normalizar IDs antigos (UUID) para números
      return parsed.map((cert: any, idx: number) => ({
        ...cert,
        id: typeof cert.id === 'number' ? cert.id : idx + 1
      }));
    } catch {
      return [];
    }
  });
  const [pendingCerts, setPendingCerts] = useState<PendingCertificate[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Carregar certificados do backend quando o componente é montado
  useEffect(() => {
    fetch("/api/certificates")
      .then((response) => response.json())
      .then((data) => {
        setCertificates(data);
        saveCertificates(data);
      })
      .catch((err) => console.error("Erro ao carregar certificados:", err));
  }, []);

  const saveCertificates = (certs: Certificate[]) => {
    setCertificates(certs);
    localStorage.setItem("portfolio-certificates", JSON.stringify(certs));
  };

  const handleUploadClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      setShowAuthModal(false);
      setPassword("");
      setError(null);
      fileInputRef.current?.click();
    } else {
      setError("Senha incorreta");
      setPassword("");
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPending: PendingCertificate[] = [];
    Array.from(files).forEach((file) => {
      const previewUrl = URL.createObjectURL(file);
      newPending.push({
        file,
        title: file.name.replace(/\.[^/.]+$/, ""),
        issuer: "",
        issuedAt: "",
        previewUrl,
      });
    });

    setPendingCerts((prev) => [...prev, ...newPending]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleConfirmUpload = (index: number) => {
    const pending = pendingCerts[index];
    if (!pending.title.trim()) {
      setError("Título é obrigatório");
      return;
    }

    // Marcar como enviando
    setPendingCerts((prev) =>
      prev.map((cert, i) => (i === index ? { ...cert, isUploading: true } : cert))
    );

    const formData = new FormData();
    formData.append("file", pending.file);
    formData.append("title", pending.title);
    formData.append("issuer", pending.issuer);
    formData.append("issuedAt", pending.issuedAt || new Date().toISOString().split("T")[0]);

    fetch("/api/certificates/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao fazer upload");
        return response.json();
      })
      .then((data) => {
        const newCert: Certificate = {
          id: data.id,
          title: data.title,
          issuer: data.issuer,
          issuedAt: data.issuedAt,
          fileName: data.fileName,
        };
        const updated = [...certificates, newCert];
        saveCertificates(updated);
        setPendingCerts((prev) => prev.filter((_, i) => i !== index));
        setError(null);
      })
      .catch((err) => {
        setError("Erro ao fazer upload: " + err.message);
        setPendingCerts((prev) =>
          prev.map((cert, i) => (i === index ? { ...cert, isUploading: false } : cert))
        );
      });
  };

  const handleCancelUpload = (index: number) => {
    URL.revokeObjectURL(pendingCerts[index].previewUrl);
    setPendingCerts((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePendingCert = (index: number, field: "title" | "issuer" | "issuedAt", value: string) => {
    setPendingCerts((prev) =>
      prev.map((cert, i) => (i === index ? { ...cert, [field]: value } : cert))
    );
  };

  const removeCertificate = (id: number) => {
    fetch(`/api/certificates/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao deletar certificado");
        const updated = certificates.filter((c) => c.id !== id);
        setCertificates(updated);
        saveCertificates(updated);
      })
      .catch((err) => {
        setError("Erro ao deletar certificado: " + err.message);
      });
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <section id="certificados" className="section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-body">03</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Cursos & Certificados
            </h2>
            <div className="glow-line w-24 mb-12" />
          </motion.div>

          {/* Upload area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <button
              onClick={handleUploadClick}
              className="w-full glass-card rounded-2xl border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors p-10 flex flex-col items-center justify-center cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <p className="text-foreground font-medium mb-1">
                Clique para fazer upload dos certificados
              </p>
              <p className="text-muted-foreground text-sm">
                PNG, JPG ou PDF — Múltiplos arquivos
              </p>
              <input
                ref={fileInputRef}
                id="cert-upload"
                type="file"
                accept="image/*,.pdf"
                multiple
                className="hidden"
                onChange={handleUpload}
              />
            </button>
          </motion.div>

          {/* Pending Certificates Form */}
          {pendingCerts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl p-6 mb-8 border border-primary/20"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Edite os detalhes dos certificados
              </h3>
              <div className="space-y-4">
                {pendingCerts.map((cert, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-4 p-4 bg-secondary/20 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">{cert.file.name}</span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Título do Certificado *
                        </label>
                        <input
                          type="text"
                          value={cert.title}
                          onChange={(e) => updatePendingCert(idx, "title", e.target.value)}
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="Ex: React Advanced"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Escola / Instituição
                        </label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => updatePendingCert(idx, "issuer", e.target.value)}
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="Ex: Udemy"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Data de Realização
                        </label>
                        <input
                          type="date"
                          value={cert.issuedAt}
                          onChange={(e) => updatePendingCert(idx, "issuedAt", e.target.value)}
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleCancelUpload(idx)}
                        className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50"
                        disabled={cert.isUploading}
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleConfirmUpload(idx)}
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                        disabled={cert.isUploading}
                      >
                        {cert.isUploading ? "Enviando..." : "Confirmar Upload"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Error display */}
          {error && !showAuthModal && (
            <div className="text-center py-4 mb-4">
              <p className="text-destructive">{error}</p>
            </div>
          )}

          {/* Certificates list */}
          {certificates.length > 0 ? (
            <div className="space-y-4">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="glass-card rounded-xl overflow-hidden group flex items-center gap-4 p-6 hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0">
                    <Award className="w-7 h-7 text-primary-foreground" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-foreground font-semibold text-base truncate">{cert.title}</h3>
                    <p className="text-muted-foreground text-sm truncate">{cert.issuer || "Certificado"}</p>
                    <p className="text-muted-foreground text-xs mt-1">{formatDate(cert.issuedAt)}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href={`/api/certificates/${cert.id}/download`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-primary"
                      title="Abrir certificado"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <button
                      onClick={() => removeCertificate(cert.id)}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-destructive"
                      title="Remover certificado"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Award className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Nenhum certificado adicionado ainda. Faça upload acima!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card rounded-xl p-8 max-w-sm w-full border border-primary/20"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Lock className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground font-display">Autenticação</h2>
            </div>
            <p className="text-muted-foreground text-sm mb-6 text-center">
              Digite a senha para fazer upload de certificados
            </p>
            {error && (
              <p className="text-destructive text-sm text-center mb-4">{error}</p>
            )}
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                placeholder="Digite a senha"
                autoFocus
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAuthModal(false);
                    setPassword("");
                    setError(null);
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default CertificatesSection;
