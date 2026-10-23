import { useState, useEffect } from 'react';
import {
  Handshake,
  Sparkles,
  ArrowRight,
  Quote,
  CheckCircle2,
  X,
  Megaphone,
  Camera,
  MapPin,
  Flame,
  Music,
  Compass,
  Activity,
  Palette,
  Briefcase,
  Eye,
  Calendar,
  Image as ImageIcon
} from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

import { PartnerEvent } from '@/types/partner';
import { getPartners, syncPartnersFromCloud, INITIAL_PARTNERS } from '@/services/partnersStorage';

export type { PartnerEvent };

const verifiedPartners: PartnerEvent[] = INITIAL_PARTNERS;

const testimonials = [
  {
    quote:
      'Kerja sama publikasi media bersama CV Digital Creative Media sangat membantu meningkatkan visibilitas event lari kami di Malang Raya. Materi promosi rapi, estetik, dan respon tim sangat cepat.',
    name: 'Race Committee',
    role: 'Penyelenggara Event Lari',
    event: 'Malang Run Fest 2027',
  },
  {
    quote:
      'Jangkauan promosi untuk rute Sumber Jenon dan Puncak Gunungronggo sangat efektif menjangkau komunitas pelari trail Jawa Timur. Koordinasi publikasi sangat memuaskan.',
    name: 'Tim Pelaksana GTR 2026',
    role: 'Organizer',
    event: 'Gunung Ronggo Trail Run 2026',
  },
  {
    quote:
      'Exposure panggung konser musik kami tersampaikan dengan sangat dinamis ke audiens pemuda Malang Raya. Kolaborasi peliputan media yang solid dan berdampak nyata.',
    name: 'Festival Organizing Team',
    role: 'Event Director',
    event: 'Kickfest & Music Festival Series',
  },
  {
    quote:
      'Publikasi event musik di UMM Dome berjalan lancar dan menjangkau target audiens mahasiswa serta penikmat musik lokal secara tepat sasaran. Partner media yang sangat profesional.',
    name: 'Media Relations Team',
    role: 'Event & Festival Partner',
    event: 'Live Arena Malang',
  },
];

export default function Partners() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [eventPartners, setEventPartners] = useState<PartnerEvent[]>(() => {
    if (typeof window !== 'undefined') {
      return getPartners();
    }
    return INITIAL_PARTNERS;
  });

  useEffect(() => {
    const sync = () => {
      setEventPartners(getPartners());
    };
    sync();
    syncPartnersFromCloud();

    window.addEventListener('storage', sync);
    window.addEventListener('dcm_partners_updated', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('dcm_partners_updated', sync);
    };
  }, []);
  const [activeCategory, setActiveCategory] = useState<
    'all' | 'music' | 'sport' | 'trail' | 'arts' | 'community' | 'business'
  >('all');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosterEvent, setSelectedPosterEvent] = useState<PartnerEvent | null>(null);

  const filteredEvents =
    activeCategory === 'all'
      ? eventPartners
      : eventPartners.filter((e) => {
          if (activeCategory === 'community') {
            return e.category === 'community' || e.category === 'business';
          }
          return e.category === activeCategory;
        });

  return (
    <section id="partnership" className="py-20 md:py-28 bg-white border-t border-border relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max px-6 md:px-10 lg:px-16 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gold/10 border border-gold/30 rounded-full mb-4">
            <Handshake className="w-4 h-4 text-gold-600" />
            <span className="text-navy font-semibold text-xs tracking-wider uppercase">
              Official Event Partnerships
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-navy leading-tight mb-4">
            Dipercaya Oleh 20+ Event Olahraga, Konser Musik & Festival Terkemuka.
          </h2>
          <p className="text-slate text-base md:text-lg leading-relaxed">
            CV Digital Creative Media bangga telah menjadi mitra media dan publikasi resmi bagi festival musik akbar,
            agenda lari bergengsi (fun run & trail run), standup comedy show, expo ekonomi kreatif, hingga kompetisi seni di Malang Raya dan Jawa Timur.
          </p>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-14">
          {[
            { number: `${eventPartners.length}+`, label: 'Event Resmi Terdaftar', desc: 'Konser musik, fun run, trail, expo & seni' },
            { number: '85K+', label: 'Total Peserta & Penonton', desc: 'Akumulasi jangkauan event aktif' },
            { number: '100%', label: 'Dedicated Media Coverage', desc: 'Publikasi feed, story, & on-ground report' },
            { number: 'Malang & Jawa Timur', label: 'Fokus Wilayah Strategis', desc: 'Koneksi komunitas pemuda, pelari & kreatif' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-5 md:p-6 bg-offwhite border border-border rounded-xl transition-all duration-300 hover:border-gold/50 hover:shadow-xs"
            >
              <span className="text-2xl md:text-3xl font-bold text-navy block mb-1 tracking-tight">{stat.number}</span>
              <h3 className="text-navy font-semibold text-sm mb-1">{stat.label}</h3>
              <p className="text-slate text-xs leading-normal">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Verified Event Marquee Logo Ticker */}
        <div className="mb-14 bg-offwhite/70 border-y border-border py-4 overflow-hidden -mx-6 md:-mx-10 lg:-mx-16 px-4">
          <div className="flex items-center gap-3 mb-2 px-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs uppercase font-semibold tracking-wider text-slate">
              Official Partner Logos & Visual Collaborations ({eventPartners.length} Events)
            </span>
          </div>
          <div className="flex overflow-hidden select-none">
            <div className="animate-marquee flex items-center gap-6 py-2">
              {[...eventPartners, ...eventPartners].map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  onClick={() => setSelectedPosterEvent(item)}
                  className="flex items-center gap-3.5 px-4 py-2 bg-white rounded-xl border border-border shadow-2xs whitespace-nowrap hover:border-gold transition-colors cursor-pointer group"
                >
                  {item.logoUrl ? (
                    <div
                      className={`w-10 h-10 rounded-lg ${
                        item.logoBg || 'bg-offwhite'
                      } border border-border/80 flex items-center justify-center p-1 overflow-hidden flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}
                    >
                      <img
                        src={item.logoUrl}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  ) : item.posterUrl ? (
                    <div className="w-10 h-10 rounded-lg bg-offwhite border border-border/80 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      <img
                        src={item.posterUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.accentGradient} text-white flex items-center justify-center text-xs font-bold shadow-xs flex-shrink-0`}
                    >
                      {item.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-bold text-navy block leading-none group-hover:text-gold transition-colors">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-slate block mt-1">{item.collabType}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
          {[
            { key: 'all', label: `Semua Event (${eventPartners.length})`, icon: Flame },
            { key: 'music', label: 'Festival Musik', icon: Music },
            { key: 'sport', label: 'Sport & Fun Run', icon: Activity },
            { key: 'trail', label: 'Trail Running', icon: Compass },
            { key: 'arts', label: 'Seni & Pertunjukan', icon: Palette },
            { key: 'community', label: 'Bisnis & Komunitas', icon: Briefcase },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-navy text-white shadow-sm'
                    : 'bg-offwhite text-slate hover:text-navy hover:bg-slate/10 border border-border'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-slate'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Partner Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="card p-6 flex flex-col justify-between group hover:border-gold/60 transition-all duration-300 hover:-translate-y-1 relative"
            >
              <div>
                {/* Header: Logo / Visual & Category Badge */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  {event.logoUrl ? (
                    <div
                      className={`h-20 w-20 ${
                        event.logoBg || 'bg-white'
                      } border border-border rounded-xl p-2 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform`}
                    >
                      <img
                        src={event.logoUrl}
                        alt={`${event.name} Official Logo`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  ) : event.posterUrl ? (
                    <div
                      onClick={() => setSelectedPosterEvent(event)}
                      className="h-20 w-20 border border-border rounded-xl overflow-hidden flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform cursor-pointer relative"
                    >
                      <img
                        src={event.posterUrl}
                        alt={`${event.name} Visual`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-navy/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-5 h-5 text-white drop-shadow" />
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`h-20 w-20 rounded-xl bg-gradient-to-br ${event.accentGradient} text-white flex flex-col items-center justify-center p-2 text-center shadow-xs flex-shrink-0`}
                    >
                      <span className="text-[9px] tracking-widest uppercase font-semibold text-white/80">LIVE</span>
                      <Music className="w-5 h-5 text-gold my-1" />
                      <span className="text-[11px] font-bold leading-tight">ARENA</span>
                    </div>
                  )}

                  <div className="text-right">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border inline-block ${event.badgeColor}`}>
                      {event.categoryLabel}
                    </span>
                    <span className="text-[11px] text-slate font-medium block mt-1.5 flex items-center justify-end gap-1">
                      <Calendar className="w-3 h-3 text-slate/70" />
                      {event.dateOrYear}
                    </span>
                  </div>
                </div>

                {/* Event Title */}
                <h4 className="font-bold text-navy text-lg leading-snug group-hover:text-gold transition-colors mb-1">
                  {event.name}
                </h4>
                <p className="text-gold-700 text-xs font-semibold mb-3">
                  {event.collabType}
                </p>

                {/* Tagline / Subtitle */}
                <p className="text-navy/90 text-xs font-medium italic mb-3">
                  "{event.tagline}"
                </p>

                {/* Description */}
                <p className="text-slate text-sm leading-relaxed mb-4">{event.desc}</p>

                {/* Location & Venue */}
                <div className="flex items-start gap-2 text-xs text-slate mb-4 p-2.5 bg-offwhite rounded-lg border border-border/60">
                  <MapPin className="w-3.5 h-3.5 text-navy flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-navy">{event.venue}</span>
                    <span className="block text-slate text-[11px]">{event.location}</span>
                  </div>
                </div>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {event.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-sm bg-navy/5 text-navy/80 border border-navy/10"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Poster Preview Button if Poster Exists */}
                {event.posterUrl && (
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => setSelectedPosterEvent(event)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-offwhite hover:bg-gold/15 text-navy text-xs font-semibold rounded-lg border border-border/80 hover:border-gold/50 transition-colors cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-gold-600" />
                      Lihat Poster & Visual Resmi Event
                    </button>
                  </div>
                )}
              </div>

              {/* Card Footer: Verified Badge */}
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{event.impactBadge}</span>
                </div>
                <span className="text-[11px] text-slate/70 font-medium">Verified Partner</span>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Quote Box */}
        <div className="bg-offwhite rounded-2xl border border-border p-6 md:p-10 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Quote className="w-6 h-6 text-gold" />
              <span className="section-label">Apresiasi Mitra Penyelenggara</span>
            </div>

            <div className="relative min-h-[140px] flex flex-col justify-between">
              <div>
                <p className="text-navy text-lg md:text-xl font-medium leading-relaxed italic mb-6">
                  "{testimonials[activeTestimonial].quote}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy text-gold flex items-center justify-center font-bold text-sm">
                    {testimonials[activeTestimonial].event.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-semibold text-navy text-sm">
                      {testimonials[activeTestimonial].name}
                    </h5>
                    <p className="text-slate text-xs">
                      {testimonials[activeTestimonial].role} —{' '}
                      <span className="font-medium text-navy/80">
                        {testimonials[activeTestimonial].event}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Switcher Dots */}
                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                        activeTestimonial === i ? 'w-8 bg-gold' : 'w-2.5 bg-border hover:bg-slate'
                      }`}
                      aria-label={`Testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Action Banner */}
        <div className="rounded-2xl bg-gradient-to-br from-navy via-navy-800 to-navy-900 text-white p-8 md:p-12 border border-navy-700 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-2 inline-block">
                Kolaborasi Event & Media
              </span>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-3">
                Ingin Event Lari, Konser, atau Brand Anda Dipublikasikan Bersama Kami?
              </h3>
              <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
                Dapatkan paket publikasi media partner resmi, liputan on-ground & aftermovie, paid promote tertarget ke komunitas pemuda & pelari, hingga live streaming liputan.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <a
                href="#contact"
                className="btn-gold text-center text-sm py-3 px-6 shadow-md"
              >
                Ajukan Media Partner
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium rounded-lg text-sm transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-gold" />
                Format & Skema Kerjasama
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Skema Kerjasama */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto border border-border shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate hover:text-navy hover:bg-offwhite transition-colors cursor-pointer"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full mb-3">
              <Handshake className="w-3.5 h-3.5 text-gold-600" />
              <span className="text-navy font-semibold text-xs uppercase tracking-wider">
                Panduan Media Partner & Kolaborasi
              </span>
            </div>

            <h3 className="text-2xl font-semibold text-navy mb-2">Benefit & Format Media Partner</h3>
            <p className="text-slate text-sm mb-6">
              Jalur dukungan kolaborasi yang kami sediakan untuk event olahraga, festival, dan brand activation:
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  icon: Megaphone,
                  title: '1. Official Media Partner (Event Publikasi)',
                  desc: 'Penyebaran flyer/poster resmi ke jaringan media sosial, broadcast Instagram Story & Reels, penempatan logo media partner di seluruh materi promosi event.',
                  badge: 'Barter Value / Paket Kerjasama',
                },
                {
                  icon: Camera,
                  title: '2. On-Ground Coverage & Dokumentasi Kreatif',
                  desc: 'Tim peliputan langsung hari-H acara, pembuatan video highlight/aftermovie beresolusi tinggi, live story suasana race village & konser.',
                  badge: 'Dokumentasi & Live',
                },
                {
                  icon: Activity,
                  title: '3. Paid Promote & Race Registration Blast',
                  desc: 'Amplifikasi pengumuman pendaftaran peserta (Early Bird, Normal, Last Call) untuk memaksimalkan okupansi slot tiket lari atau konser.',
                  badge: 'Aktivasi Penjualan Tiket',
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-4 bg-offwhite border border-border rounded-xl">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-navy text-white flex items-center justify-center">
                          <Icon className="w-4 h-4 text-gold" />
                        </div>
                        <h4 className="font-semibold text-navy text-sm">{item.title}</h4>
                      </div>
                      <span className="text-[10px] font-semibold text-gold-700 bg-gold/15 px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-slate text-xs leading-relaxed pl-9">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-border">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn-secondary text-sm py-2.5 px-5 cursor-pointer"
              >
                Tutup
              </button>
              <a
                href="#contact"
                onClick={() => setIsModalOpen(false)}
                className="btn-primary text-sm py-2.5 px-5 text-center"
              >
                Lanjut ke Formulir Kontak
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modal Poster & Event Detail Preview */}
      {selectedPosterEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/85 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedPosterEvent(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-border shadow-2xl relative flex flex-col md:flex-row overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPosterEvent(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-navy shadow-md transition-colors cursor-pointer"
              aria-label="Tutup preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Poster / Visual Column */}
            <div className="md:w-1/2 bg-neutral-900 flex items-center justify-center p-4 min-h-[320px] md:min-h-[480px]">
              <img
                src={selectedPosterEvent.posterUrl || selectedPosterEvent.logoUrl}
                alt={selectedPosterEvent.officialTitle}
                className="max-h-[60vh] md:max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-md"
              />
            </div>

            {/* Event Information Column */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {selectedPosterEvent.logoUrl && (
                    <div className="w-10 h-10 rounded-lg border border-border p-1 bg-white overflow-hidden flex-shrink-0">
                      <img
                        src={selectedPosterEvent.logoUrl}
                        alt="Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border inline-block ${selectedPosterEvent.badgeColor}`}>
                      {selectedPosterEvent.categoryLabel}
                    </span>
                    <span className="text-[11px] text-slate font-medium block">
                      {selectedPosterEvent.dateOrYear}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-navy mb-1 leading-snug">
                  {selectedPosterEvent.name}
                </h3>
                <p className="text-gold-700 text-xs font-semibold mb-3">
                  {selectedPosterEvent.collabType}
                </p>

                <p className="text-navy text-xs font-medium italic mb-3">
                  "{selectedPosterEvent.tagline}"
                </p>

                <p className="text-slate text-xs md:text-sm leading-relaxed mb-4">
                  {selectedPosterEvent.desc}
                </p>

                <div className="p-3 bg-offwhite rounded-xl border border-border/70 mb-4 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-navy font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                    <span>{selectedPosterEvent.venue}</span>
                  </div>
                  <div className="text-slate pl-5.5 text-[11px]">
                    Wilayah: {selectedPosterEvent.location}
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-slate block mb-2">
                    Highlight & Cakupan:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPosterEvent.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-sm bg-navy/5 text-navy/80 border border-navy/10"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{selectedPosterEvent.impactBadge}</span>
                </div>
                <a
                  href="#contact"
                  onClick={() => setSelectedPosterEvent(null)}
                  className="btn-primary text-xs py-2 px-3.5 inline-flex items-center gap-1.5"
                >
                  Ajukan Partner Serupa
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
