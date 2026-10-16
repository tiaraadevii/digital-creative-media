import { ArrowRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const aboutImage = 'https://images.pexels.com/photos/7693692/pexels-photo-7693692.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export default function About() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="container-max px-6 md:px-10 lg:px-16">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} grid md:grid-cols-2 gap-12 lg:gap-16 items-center`}
        >
          {/* Image */}
          <div className="relative order-2 md:order-1">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-sm">
              <img
                src={aboutImage}
                alt="Business professionals collaborating in a meeting with charts and documents"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/10 rounded-xl -z-10" />
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <span className="section-label">About Us</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-3 mb-5">
              More Than a Creative Company.
            </h2>
            <p className="text-slate text-lg leading-relaxed mb-8">
              CV Digital Creative Media berfokus pada pengembangan layanan digital media, promosi,
              kreativitas, kolaborasi, serta pengelolaan properti. Kami membantu menghubungkan ide,
              brand, bisnis, dan peluang melalui pendekatan yang kreatif dan terarah.
            </p>
            <a href="#services" className="btn-secondary">
              Discover More
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
