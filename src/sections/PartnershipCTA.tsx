import { ArrowRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export default function PartnershipCTA() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="partnership" className="py-20 md:py-28 bg-white border-t border-border">
      <div className="container-max px-6 md:px-10 lg:px-16">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} max-w-3xl mx-auto text-center`}
        >
          <span className="section-label">Partnership</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-navy mt-3 mb-6">
            Let's Create Something Together.
          </h2>
          <p className="text-slate text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            We welcome opportunities to collaborate with brands, event organizers, businesses,
            communities, and property owners.
          </p>
          <a href="#contact" className="btn-primary">
            Start a Collaboration
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
