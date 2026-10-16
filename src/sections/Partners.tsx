import { useState } from 'react';
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
  Activity
} from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

interface PartnerEvent {
  id: string;
  name: string;
  officialTitle: string;
  category: 'sport' | 'trail' | 'music';
  categoryLabel: string;
  collabType: string;
  dateOrYear: string;
  location: string;
  venue: string;
  tagline: string;
  desc: string;
  highlights: string[];
  impactBadge: string;
  logoUrl?: string; // Path to official uploaded logo
  logoBg?: string; // Optional background color to match logo
  accentGradient: string;
  badgeColor: string;
}

const verifiedPartners: PartnerEvent[] = [
  {
    id: 'malang-run-fest',
    name: 'Malang Run Fest 2027',
    officialTitle: 'Malang Run Festival 2027',
    category: 'sport',
    categoryLabel: 'Sportainment & Fun Run',
    collabType: 'Official Media Partner & Publikasi',
    dateOrYear: '7 Februari 2027',
    location: 'Kota Malang',
    venue: 'Taman Krida Budaya Malang',
    tagline: 'Sportainment 5K Fun Run, Festival Kuliner UMKM & Panggung Musik',
    desc: 'Kolaborasi publikasi media dan aktivasi promosi event lari tematik kebanggaan kota Malang dengan lambang Singo Edan yang memadukan olahraga, bazar UMKM lokal, dan panggung musik spektakuler.',
    highlights: ['Kategori 5K Fun Run', 'Festival Kuliner & Musik', 'Karakter Singo Edan Malang'],
    impactBadge: '3.500+ Pelari & Pengunjung',
    logoUrl: '/logos/malang-run-fest.jpg',
    logoBg: 'bg-white',
    accentGradient: 'from-blue-600 via-red-600 to-amber-500',
    badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
  },
  {
    id: 'color-run-indonesia',
    name: 'Color Run Indonesia',
    officialTitle: 'The Color Run™ Indonesia',
    category: 'sport',
    categoryLabel: 'Mega Fun Run Festival',
    collabType: 'Media Partner & Digital Campaign',
    dateOrYear: 'National Event Circuit',
    location: 'Indonesia',
    venue: 'Sirkuit Lari Nasional',
    tagline: 'The Happiest 5K on the Planet',
    desc: 'Dukungan kampanye media digital dan publikasi festival lari warna legendaris internasional, menghubungkan puluhan ribu pelari dalam kegembiraan sportainment dan pesta warna.',
    highlights: ['The Happiest 5K on the Planet', 'Color Festival Celebration', 'Komunitas Pelari Nasional'],
    impactBadge: '10.000+ Peserta',
    logoUrl: '/logos/color-run-indonesia.jpg',
    logoBg: 'bg-black',
    accentGradient: 'from-stone-900 via-neutral-800 to-black',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
  },
  {
    id: 'royal-trail-run',
    name: 'Royal Trail Run 2026',
    officialTitle: 'Royal Trail Run 2026 (Kota Wisata Batu)',
    category: 'trail',
    categoryLabel: 'Mountain & Forest Trail',
    collabType: 'Official Media Partner & Race Coverage',
    dateOrYear: '20 Desember 2026',
    location: 'Kota Wisata Batu',
    venue: 'Royal Hotel & Villa Batu (Pine Park)',
    tagline: 'Menjelajahi Jalur Pine Park & Perbukitan Sejuk Kota Batu',
    desc: 'Kolaborasi media partner ajang lari lintas alam bergengsi di kawasan pegunungan sejuk Kota Wisata Batu, berkolaborasi dengan Royal Hotel & Villa Batu serta Batu Runners.',
    highlights: ['Kategori 10K Umum & Pelajar', 'Elevation Gain ±390m', 'Pine Park & Mountain View'],
    impactBadge: '10K Trail Run Podium & Finisher',
    logoUrl: '/logos/royal-trail-run.jpg',
    logoBg: 'bg-[#0E0E42]',
    accentGradient: 'from-blue-900 via-indigo-900 to-slate-900',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  {
    id: 'begawan-fun-run',
    name: 'Begawan Fun Run 2026',
    officialTitle: 'Begawan Fun Run · Summer Ground',
    category: 'sport',
    categoryLabel: 'Urban Fun Run & Community',
    collabType: 'Official Media Partner & Aktivasi Komunitas',
    dateOrYear: 'Agustus 2026',
    location: 'Kota Malang',
    venue: 'Begawan Apartment & Plaza (Tlogomas)',
    tagline: 'Lari Sehat & Festival Seru di Jantung Kota Malang',
    desc: 'Publikasi dan liputan resmi rangkaian agenda lari 5K rekreasi di kawasan Begawan Plaza Malang, dilengkapi dengan sesi Zumba, hiburan live music, games, dan bazar kuliner.',
    highlights: ['Kategori 5K Fun Run', 'Summer Ground Festival', 'Rute Strategis Tlogomas Malang'],
    impactBadge: '1.500+ Pelari Fun Run',
    logoUrl: '/logos/begawan-fun-run.jpg',
    logoBg: 'bg-white',
    accentGradient: 'from-blue-600 via-yellow-500 to-sky-700',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
  },
  {
    id: 'gunung-ronggo-trail-run',
    name: 'Gunung Ronggo Trail Run 2026',
    officialTitle: 'Gunungronggo Trail Run (GTR 2026)',
    category: 'trail',
    categoryLabel: 'Trail Running Championship',
    collabType: 'Official Media Partner & Creative Coverage',
    dateOrYear: '1 November 2026',
    location: 'Tajinan, Kab. Malang',
    venue: 'Sumber Jenon & Puncak Gunungronggo',
    tagline: 'Run Beyond The Trail',
    desc: 'Publikasi dan dokumentasi ajang lari lintas alam (trail run) spektakuler yang melintasi pesona mata air purba Sumber Jenon, persawahan desa asri, dan Puncak Gunungronggo.',
    highlights: ['Kategori 7K Explorer (EG ±224m)', 'Kategori 17K Challenger (EG ±526m)', 'Eksplorasi Wisata Sumber Jenon'],
    impactBadge: 'Official Race Partner',
    logoUrl: '/logos/gunung-ronggo-gtr.jpg',
    logoBg: 'bg-[#141414]',
    accentGradient: 'from-neutral-900 via-stone-800 to-neutral-950',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  {
    id: 'live-arena',
    name: 'Live Arena Festival',
    officialTitle: 'Live Arena Festival 2026 Malang',
    category: 'music',
    categoryLabel: 'Music & Concert Festival',
    collabType: 'Official Media Partner & Live Coverage',
    dateOrYear: '16 Oktober 2026',
    location: 'Malang',
    venue: 'UMM Dome Malang',
    tagline: 'International Sound Experience Supported by JBL Indonesia',
    desc: 'Publikasi media dan peliputan langsung festival musik akbar dengan tata suara kelas dunia dari JBL, menghadirkan musisi papan atas nasional seperti Tulus, Idgitaf, Coldiac, dan Lomba Sihir.',
    highlights: ['Supported by JBL Indonesia', 'Lineup: Tulus, Idgitaf, Coldiac, Lomba Sihir', 'UMM Dome Arena'],
    impactBadge: '5.000+ Penonton Konser',
    accentGradient: 'from-cyan-600 to-blue-900',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
];

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
      'Visual promosi dan exposure event kami di Kota Wisata Batu tersampaikan dengan sangat elegan dan tepat ke target komunitas pelari.',
    name: 'Batu Runners & Royal Hotel',
    role: 'Event Coordinator',
    event: 'Royal Trail Run 2026',
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
  const [activeCategory, setActiveCategory] = useState<'all' | 'sport' | 'trail' | 'music'>('all');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredEvents =
    activeCategory === 'all'
      ? verifiedPartners
      : verifiedPartners.filter((e) => e.category === activeCategory);

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
            Dipercaya Oleh Event Olahraga & Festival Terkemuka.
          </h2>
          <p className="text-slate text-base md:text-lg leading-relaxed">
            CV Digital Creative Media bangga telah menjadi mitra media dan promosi resmi bagi festival lari bergengsi,
            trail running alam bebas, hingga konser musik akbar berskala nasional.
          </p>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-14">
          {[
            { number: '6', label: 'Event Resmi Terdaftar', desc: 'Run fest, trail run, & festival musik' },
            { number: '25K+', label: 'Total Peserta & Penonton', desc: 'Akumulasi jangkauan event aktif' },
            { number: '100%', label: 'Dedicated Media Coverage', desc: 'Publikasi feed, story, & on-ground report' },
            { number: 'Malang & Jatim', label: 'Fokus Wilayah Strategis', desc: 'Koneksi komunitas pemuda & pelari' },
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
              Official Logos & Event Collaborations
            </span>
          </div>
          <div className="flex overflow-hidden select-none">
            <div className="animate-marquee flex items-center gap-6 py-2">
              {[...verifiedPartners, ...verifiedPartners].map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex items-center gap-3.5 px-4 py-2 bg-white rounded-xl border border-border shadow-2xs whitespace-nowrap hover:border-gold transition-colors"
                >
                  {item.logoUrl ? (
                    <div
                      className={`w-10 h-10 rounded-lg ${
                        item.logoBg || 'bg-offwhite'
                      } border border-border/80 flex items-center justify-center p-1 overflow-hidden flex-shrink-0 shadow-2xs`}
                    >
                      <img
                        src={item.logoUrl}
                        alt={item.name}
                        className="w-full h-full object-contain"
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
                    <span className="text-xs font-bold text-navy block leading-none">{item.name}</span>
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
            { key: 'all', label: `Semua Event (${verifiedPartners.length})`, icon: Flame },
            { key: 'sport', label: 'Sport & Fun Run', icon: Activity },
            { key: 'trail', label: 'Trail Running', icon: Compass },
            { key: 'music', label: 'Festival Musik', icon: Music },
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
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16`}
        >
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="card p-6 flex flex-col justify-between group hover:border-gold/60 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Header: Logo / Badge & Category */}
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
                      />
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
                    <span className="text-[11px] text-slate font-medium block mt-1.5">{event.dateOrYear}</span>
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
    </section>
  );
}
