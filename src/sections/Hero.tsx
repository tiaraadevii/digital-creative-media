import { ArrowRight } from 'lucide-react';

const heroImage = 'https://images.pexels.com/photos/21405617/pexels-photo-21405617.jpeg?auto=compress&cs=tinysrgb&h=900&w=600';

export default function Hero() {
  return (
    <section id="home" className="relative pt-28 md:pt-32 pb-16 md:pb-24 bg-offwhite overflow-hidden">
      {/* Subtle decorative element */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-white/40 blur-3xl pointer-events-none" />

      <div className="container-max px-6 md:px-10 lg:px-16 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="reveal is-visible">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-6 h-px bg-gold" />
              <span className="section-label">Creative · Media · Partnership</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold text-navy leading-[1.1] mb-6">
              Connecting Ideas,<br />
              Creating Opportunities.
            </h1>
            <p className="text-slate text-lg leading-relaxed mb-8 max-w-xl">
              CV Digital Creative Media menghadirkan solusi digital media, promosi, layanan kreatif,
              kolaborasi event, dan pengelolaan properti untuk menghubungkan brand, bisnis, serta masyarakat.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#portfolio" className="btn-primary">
                Explore Our Work
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#partnership" className="btn-secondary">
                Let's Collaborate
              </a>
            </div>
          </div>

          {/* Right - Editorial Image */}
          <div className="relative hidden lg:block">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-border shadow-md">
              <img
                src={heroImage}
                alt="Creative media workspace with laptop displaying social media content for event promotion"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            {/* Gold accent frame */}
            <div className="absolute -bottom-5 -left-5 w-28 h-28 border-2 border-gold rounded-2xl pointer-events-none" />
            {/* Floating badge */}
            <div className="absolute top-6 -left-6 bg-white border border-border rounded-lg px-4 py-3 shadow-md">
              <p className="text-navy font-semibold text-sm">Digital Media</p>
              <p className="text-slate text-xs mt-0.5">Promotion · Creative · Property</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
