import { useState, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, X, Sparkles, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { getPortfolioItems } from '@/services/portfolioStorage';
import { PortfolioItem } from '@/types/portfolio';

export default function PortfolioPreview() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    const sync = () => {
      setItems(getPortfolioItems());
    };
    sync();
    window.addEventListener('storage', sync);
    window.addEventListener('dcm_portfolio_updated', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('dcm_portfolio_updated', sync);
    };
  }, []);

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-offwhite">
      <div className="container-max px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <span className="section-label">Selected Works</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-3 mb-4">
              Projects & Collaborations.
            </h2>
            <p className="text-slate text-lg">
              Explore our creative projects, event collaborations, brand promotions, and property initiatives.
            </p>
          </div>
        </div>

        {/* Notice */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white border border-gold/30 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-gold" />
          <p className="text-slate text-xs font-medium">Klik pada kartu proyek untuk melihat detail lengkap dan cakupan kerja.</p>
        </div>

        {/* Cards */}
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} grid md:grid-cols-2 lg:grid-cols-3 gap-6`}
        >
          {items.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="card group cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden bg-offwhite relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/90 backdrop-blur-xs text-navy text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                    Buka Detail Proyek
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gold text-xs font-medium uppercase tracking-wider mb-2">
                  {project.category}
                </p>
                <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-gold transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-slate text-sm leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>
                <span className="inline-flex items-center gap-1 text-navy text-sm font-medium group-hover:text-gold transition-colors duration-200">
                  View Project
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#contact" className="btn-secondary">
            Explore All Projects
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Selected Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden border border-border shadow-2xl relative max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-navy hover:bg-white shadow-md transition-colors cursor-pointer"
              aria-label="Tutup detail proyek"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-56 md:h-64 overflow-hidden relative flex-shrink-0">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-gold text-xs font-semibold uppercase tracking-wider block mb-1">
                  {selectedProject.category}
                </span>
                <h3 className="text-xl md:text-2xl font-bold leading-tight">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate mb-2">Deskripsi Proyek</h4>
                <p className="text-navy text-sm md:text-base leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {selectedProject.client && (
                <div className="p-4 bg-offwhite rounded-xl border border-border">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-navy mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-gold" />
                    Klien / Partner
                  </h4>
                  <p className="text-sm font-semibold text-navy">{selectedProject.client}</p>
                </div>
              )}

              {selectedProject.projectUrl && (
                <div className="flex items-center justify-between p-3.5 bg-gold-50 border border-gold-200 rounded-lg text-gold-900 text-xs font-medium">
                  <span>Tautan Proyek Resmi:</span>
                  <a
                    href={selectedProject.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-navy hover:underline"
                  >
                    Kunjungi Website
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="btn-secondary text-sm py-2.5 px-5 cursor-pointer"
                >
                  Tutup
                </button>
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="btn-primary text-sm py-2.5 px-5 text-center"
                >
                  Konsultasikan Proyek Serupa
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
