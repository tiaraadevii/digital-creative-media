import { ArrowRight, Building2, Home } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const propertyImage = 'https://images.pexels.com/photos/6782479/pexels-photo-6782479.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export default function PropertyPreview() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="property" className="py-20 md:py-28 bg-offwhite">
      <div className="container-max px-6 md:px-10 lg:px-16">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} grid md:grid-cols-2 gap-12 lg:gap-16 items-center`}
        >
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-sm">
              <img
                src={propertyImage}
                alt="Modern minimalist bedroom with pillows, blanket, and shelves near curtains"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating tag */}
            <div className="absolute bottom-6 -right-4 md:-right-6 bg-white border border-border rounded-lg px-5 py-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                  <Home className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-navy font-semibold text-sm">Property Listing</p>
                  <p className="text-slate text-xs">Preview coming soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="section-label">Property & Living</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-3 mb-5">
              Property Opportunities, Connected.
            </h2>
            <p className="text-slate text-lg leading-relaxed mb-8">
              Explore kost information, property opportunities, and management collaboration
              with CV Digital Creative Media.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Building2, text: 'Publikasi dan informasi kost untuk calon penyewa' },
                { icon: Home, text: 'Peluang kerja sama pengelolaan properti' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-navy/5 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-navy" />
                    </div>
                    <p className="text-slate text-sm">{item.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="btn-primary">
                Explore Kost
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="btn-secondary">
                Property Management
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
