import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const projects = [
  {
    image: 'https://images.pexels.com/photos/2177813/pexels-photo-2177813.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Event & Media Partnership',
    title: 'Event Collaboration Highlights',
    desc: 'Publikasi dan dokumentasi acara dengan jangkauan media yang strategis.',
    isDemo: true,
  },
  {
    image: 'https://images.pexels.com/photos/7661590/pexels-photo-7661590.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Brand Promotion',
    title: 'Brand Promotion Campaign',
    desc: 'Kampanye promosi brand yang terarah untuk meningkatkan visibilitas dan engagement.',
    isDemo: true,
  },
  {
    image: 'https://images.pexels.com/photos/4499737/pexels-photo-4499737.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Creative Projects',
    title: 'Creative Content Production',
    desc: 'Produksi konten kreatif untuk kebutuhan komunikasi brand yang berkesan.',
    isDemo: true,
  },
];

export default function PortfolioPreview() {
  const { ref, visible } = useReveal<HTMLDivElement>();

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

        {/* Demo Notice */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white border border-gold/30 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-gold" />
          <p className="text-slate text-xs font-medium">Demo content — showcase examples, not actual client work.</p>
        </div>

        {/* Cards */}
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} grid md:grid-cols-2 lg:grid-cols-3 gap-6`}
        >
          {projects.map((project) => (
            <div key={project.title} className="card group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden bg-offwhite">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <p className="text-gold text-xs font-medium uppercase tracking-wider mb-2">
                  {project.category}
                </p>
                <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-gold transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-slate text-sm leading-relaxed mb-4">{project.desc}</p>
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
    </section>
  );
}
