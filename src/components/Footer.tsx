import { Instagram, Mail, Phone, ArrowUpRight } from 'lucide-react';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Partnership', href: '#partnership' },
  { label: 'News', href: '#news' },
  { label: 'Kost & Property', href: '#property' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/digitalcreativemedia' },
  { icon: Mail, label: 'Email', href: 'mailto:contact@digitalcreativemedia.id' },
  { icon: Phone, label: 'WhatsApp', href: 'https://wa.me/6281234567890?text=Halo%20CV%20Digital%20Creative%20Media' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-max px-6 md:px-10 lg:px-16 py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center">
                <span className="text-navy font-bold text-xs tracking-wider">DCM</span>
              </div>
              <span className="text-white font-semibold text-sm">CV Digital Creative Media</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              Connecting ideas, brands, and communities through digital media, creative services,
              and property management.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4">
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 text-sm hover:text-gold transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-3">
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">Connect</h4>
            <ul className="space-y-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className="inline-flex items-center gap-2.5 text-white/50 text-sm hover:text-gold transition-colors duration-150"
                    >
                      <Icon className="w-4 h-4" />
                      {social.label}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            CV Digital Creative Media. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Placeholder content — replace with official information.
          </p>
        </div>
      </div>
    </footer>
  );
}
