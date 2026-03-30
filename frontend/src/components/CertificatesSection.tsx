import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";
import { useLanguage } from "../i18n/LanguageContext";
import { translations, t } from "../i18n/translations";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  issuedAt: string;
  fileName?: string;
}

const mockCertificates: Certificate[] = [
  {
    id: 1,
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    issuedAt: "2026-08-05",
    fileName: "CCNAITNUpdated20260305-31-21404e.pdf",
  },
  {
    id: 2,
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    issuedAt: "2026-05-05",
    fileName: "PythonEssentials1Update20260305-31-6kt0f6.pdf",
  },
  {
    id: 3,
    title: "Fundamentos de Segurança Cibernética e de Dados",
    issuer: "Udemy",
    issuedAt: "2025-03-05",
    fileName: "UC-6675ff66-9547-4524-b382-ededd42431e6.pdf",
  },
  {
    id: 4,
    title: "Programação em Java do básico ao avançado",
    issuer: "Udemy",
    issuedAt: "2026-01-06",
    fileName: "UC-affc475a-cdd5-470b-8072-6b58a333d74f.pdf",
  },
  {
    id: 5,
    title: "Microsoft Power BI para Business Intelligence e Data Science",
    issuer: "Alura",
    issuedAt: "2024-07-31",
    fileName: "certificate-microsoft-power-bi-para-business-intelligence-e-data-science-6462fe1b2bb04988150abc99.pdf",
  },
  {
    id: 6,
    title: "AWS Academy Cloud Foundations",
    issuer: "AWS Academy",
    issuedAt: "2026-03-15",
    fileName: "AWS_Academy_Graduate___Cloud_Foundations___Training_Badge_Badge20260315-33-fl43ut.pdf",
  },
  {
    id: 7,
    title: "Python Essentials 2",
    issuer: "Cisco Networking Academy",
    issuedAt: "2026-03-15",
    fileName: "PythonEssentials2Update20260315-33-qox2vh.pdf",
  },
  {
    id: 8,
    title: "Docker Completo do Zero ao Avançado",
    issuer: "Udemy",
    issuedAt: "2026-03-17",
    fileName: "UC-62dfdd6e-bde0-4701-8703-00093a69756b.pdf",
  },
  {
    id: 9,
    title: "Introdução à IoT",
    issuer: "Cisco Networking Academy",
    issuedAt: "2026-03-19",
    fileName: "IntrotoIoTUpdate20260320-31-9ylk8p.pdf",
  },
];

const CertificatesSection = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    fetch(`${API_BASE_URL}/certificates`)
      .then((response) => {
        if (!response.ok) throw new Error("HTTP error");
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCertificates(data);
        } else {
          setCertificates(mockCertificates);
        }
      })
      .catch(() => {
        setCertificates(mockCertificates);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const parts = dateString.split("-");
    if (parts.length !== 3) return dateString;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  return (
    <section id="certificados" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-body">{t(translations.certificates.sectionNumber, language)}</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            {t(translations.certificates.title, language)}
          </h2>
          <div className="glow-line w-24 mb-12" />
        </motion.div>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 mb-6"
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl glass-card border border-primary/20">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-primary border-transparent" />
              <p className="text-muted-foreground text-sm">
                {t(translations.certificates.loading, language)}
              </p>
            </div>
          </motion.div>
        )}

        {!isLoading && certificates.length > 0 ? (
          <div className="space-y-4">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card rounded-xl overflow-hidden group flex items-center gap-4 p-6 hover:bg-secondary/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0">
                  <Award className="w-7 h-7 text-primary-foreground" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-foreground font-semibold text-base truncate">
                    {translations.certificates.mockTitles[index]
                      ? t(translations.certificates.mockTitles[index], language)
                      : cert.title}
                  </h3>
                  <p className="text-muted-foreground text-sm truncate">{cert.issuer || t(translations.certificates.issuerFallback, language)}</p>
                  <p className="text-muted-foreground text-xs mt-1">{formatDate(cert.issuedAt)}</p>
                </div>

                {cert.fileName && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href={`${API_BASE_URL}/certificates/file/${encodeURIComponent(cert.fileName)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-primary"
                      title={t(translations.certificates.openCert, language)}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : !isLoading ? (
          <div className="text-center py-16">
            <Award className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground">
              {t(translations.certificates.empty, language)}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default CertificatesSection;
