import { useState } from 'react';
import { ArrowRight, Calendar, X, User, Share2 } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

interface Article {
  image: string;
  category: string;
  title: string;
  desc: string;
  content: string[];
  date: string;
  author: string;
  isDemo: boolean;
}

const articles: Article[] = [
  {
    image: 'https://images.pexels.com/photos/33411321/pexels-photo-33411321.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Event Highlights',
    title: 'Behind the Scenes of Event Coverage',
    desc: 'Melihat lebih dekat bagaimana tim kami menangkap dan mempublikasikan momen-momen acara secara presisi dan sinematik.',
    content: [
      'Menghadiri sebuah festival musik atau kompetisi lari adalah tentang menangkap atmosfer dan energi murni para peserta. Di balik setiap video aftermovie berdurasi satu menit yang viral, terdapat perencanaan matang mulai dari penentuan titik strategis kamera, pencahayaan panggung, hingga alur koordinasi cepat untuk live story di media sosial.',
      'Melalui integrasi liputan langsung dan produksi kreatif, tim CV Digital Creative Media memastikan momen puncak acara dapat dinikmati bukan hanya oleh mereka yang hadir di venue, melainkan juga audiens digital di seluruh Indonesia.',
    ],
    date: '12 Apr 2026',
    author: 'DCM Media Production Team',
    isDemo: true,
  },
  {
    image: 'https://images.pexels.com/photos/7661590/pexels-photo-7661590.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Partnership Updates',
    title: 'Building Meaningful Brand Partnerships',
    desc: 'Pendekatan strategis kami dalam menghubungkan brand komersial dengan komunitas pemuda dan mahasiswa.',
    content: [
      'Kemitraan yang berhasil bukan sekadar menaruh logo di poster acara. Kemitraan yang bernilai tinggi menciptakan pengalaman relevan bagi audiens target—mulai dari aktivasi booth interaktif, sampling produk, hingga kolaborasi kampanye konten digital yang mengedukasi.',
      'CV Digital Creative Media bertindak sebagai jembatan yang menghubungkan visi brand dengan kultur lokal, menghadirkan interaksi autentik yang menghasilkan loyalitas jangka panjang bagi para mitra.',
    ],
    date: '8 Apr 2026',
    author: 'Partnership Lead DCM',
    isDemo: true,
  },
  {
    image: 'https://images.pexels.com/photos/17608520/pexels-photo-17608520.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Digital & Creative Insights',
    title: 'Digital Media Trends to Watch in 2026',
    desc: 'Menjelajahi tren mutakhir dalam strategi konten media digital, video pendek, dan komunikasi visual.',
    content: [
      'Format video vertikal (Reels, TikTok, Shorts) kini memegang peranan mutlak dalam pengambilan keputusan konsumen muda, terutama di sektor kuliner, gaya hidup, dan pencarian hunian kost mahasiswa.',
      'Memahami algoritma dan preferensi visual audiens generasi baru adalah kunci bagi brand dan pengelola properti untuk tetap relevan dan kompetitif di era digital.',
    ],
    date: '2 Apr 2026',
    author: 'Creative Director DCM',
    isDemo: true,
  },
];

export default function NewsPreview() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="news" className="py-20 md:py-28 bg-white border-t border-border">
      <div className="container-max px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <span className="section-label">Latest Updates</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-3">
              Stories, Insights & Updates.
            </h2>
            <p className="text-slate text-base mt-2">
              Kabar terbaru, sorotan event, dan wawasan industri kreatif dari tim CV Digital Creative Media.
            </p>
          </div>
        </div>

        {/* Notice */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-offwhite border border-gold/30 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-gold" />
          <p className="text-slate text-xs font-medium">Klik pada kartu berita untuk membaca artikel lengkap.</p>
        </div>

        {/* Cards */}
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} grid md:grid-cols-2 lg:grid-cols-3 gap-6`}
        >
          {articles.map((article) => (
            <article
              key={article.title}
              onClick={() => setSelectedArticle(article)}
              className="card group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-offwhite relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-xs text-navy text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                      Baca Artikel
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-gold text-xs font-semibold uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-slate/60 text-xs">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-gold transition-colors duration-200 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-slate text-sm leading-relaxed mb-4 line-clamp-2">{article.desc}</p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <span className="inline-flex items-center gap-1.5 text-navy text-sm font-medium group-hover:text-gold transition-colors duration-200">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#contact" className="btn-secondary">
            View All News
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Selected Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden border border-border shadow-2xl relative max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-navy hover:bg-white shadow-md transition-colors cursor-pointer"
              aria-label="Tutup artikel"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-56 md:h-64 overflow-hidden relative flex-shrink-0">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-gold text-navy text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs text-white/80 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedArticle.date}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold leading-tight">
                  {selectedArticle.title}
                </h3>
              </div>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate pb-4 border-b border-border">
                <User className="w-3.5 h-3.5 text-gold" />
                <span>Ditulis oleh: <strong>{selectedArticle.author}</strong></span>
              </div>

              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx} className="text-navy text-sm md:text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-border">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="btn-secondary text-sm py-2.5 px-5 cursor-pointer"
                >
                  Tutup
                </button>
                <a
                  href="#contact"
                  onClick={() => setSelectedArticle(null)}
                  className="btn-primary text-sm py-2.5 px-5 text-center"
                >
                  Konsultasi Bersama Tim Kami
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
