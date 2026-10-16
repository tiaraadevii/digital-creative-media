import { Megaphone, Handshake, Palette, Calendar, Building2 } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const services = [
  {
    icon: Megaphone,
    title: 'Digital Media & Promotion',
    desc: 'Layanan promosi digital, publikasi, dan komunikasi brand.',
  },
  {
    icon: Handshake,
    title: 'Paid Promote & Media Partnership',
    desc: 'Kolaborasi promosi, publikasi media, dan dukungan untuk event atau campaign.',
  },
  {
    icon: Palette,
    title: 'Creative Services',
    desc: 'Produksi konten dan dukungan kreatif untuk kebutuhan komunikasi brand.',
  },
  {
    icon: Calendar,
    title: 'Event Collaboration',
    desc: 'Kolaborasi publikasi, dokumentasi, dan dukungan kreatif untuk kegiatan dan acara.',
  },
  {
    icon: Building2,
    title: 'Kost & Property Management',
    desc: 'Publikasi properti, informasi kost, serta peluang kerja sama pengelolaan properti.',
  },
];

export default function Services() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="services" className="py-20 md:py-28 bg-white border-t border-border">
      <div className="container-max px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-3 mb-4">
            Creative Solutions, Meaningful Connections.
          </h2>
          <p className="text-slate text-lg">
            Integrated services to support brands, events, and property opportunities.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} grid sm:grid-cols-2 lg:grid-cols-3 gap-6`}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isWide = index === 0;
            return (
              <div
                key={service.title}
                className={`card p-7 group ${isWide ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-gold/10">
                  <Icon className="w-6 h-6 text-navy group-hover:text-gold transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">{service.title}</h3>
                <p className="text-slate text-sm leading-relaxed">{service.desc}</p>
              </div>
            );
          })}

          {/* Filler card for grid alignment */}
          <div className="hidden lg:flex items-center justify-center p-7 bg-offwhite rounded-xl border border-dashed border-border">
            <div className="text-center">
              <p className="text-navy font-semibold text-sm">Need a custom solution?</p>
              <a href="#contact" className="text-gold text-sm font-medium mt-2 inline-block hover:text-gold-600 transition-colors">
                Talk to us →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
