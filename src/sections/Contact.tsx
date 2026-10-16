import { useState } from 'react';
import { Mail, Phone, Instagram, MapPin, Send, Info, CheckCircle2, X, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export default function Contact() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [formState, setFormState] = useState({
    name: '',
    contact: '',
    type: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.contact) {
      alert('Mohon isi nama dan kontak Anda.');
      return;
    }
    setSubmitted(true);
  };

  const officialWhatsAppNumber = '6281234567890'; // Official number
  const waUrl = `https://wa.me/${officialWhatsAppNumber}?text=${encodeURIComponent(
    `Halo CV Digital Creative Media,\n\nSaya: ${formState.name || 'Calon Partner'}\nKontak: ${formState.contact || '-'}\nKategori Kebutuhan: ${formState.type || 'Partnership'}\n\nPesan:\n${formState.message || 'Saya ingin berdiskusi mengenai peluang kerjasama.'}`
  )}`;

  return (
    <section id="contact" className="py-20 md:py-28 bg-offwhite">
      <div className="container-max px-6 md:px-10 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label">Partnership & Contact</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-3 mb-4">
            Get in Touch.
          </h2>
          <p className="text-slate text-lg">
            Terbuka untuk peluang media partnership, paid promote, produksi kreatif, hingga kerja sama pengelolaan properti.
          </p>
        </div>

        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} grid lg:grid-cols-5 gap-8`}
        >
          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-4">
            {[
              {
                icon: Phone,
                label: 'WhatsApp Resmi',
                value: '+62 812-3456-7890',
                href: `https://wa.me/${officialWhatsAppNumber}?text=${encodeURIComponent('Halo CV Digital Creative Media, saya ingin berkolaborasi.')}`,
                actionText: 'Chat Langsung di WhatsApp →',
                isExternal: true,
              },
              {
                icon: Mail,
                label: 'Email',
                value: 'contact@digitalcreativemedia.id',
                href: 'mailto:contact@digitalcreativemedia.id',
                actionText: 'Kirim Email Resmi →',
                isExternal: false,
              },
              {
                icon: Instagram,
                label: 'Instagram',
                value: '@digitalcreativemedia',
                href: 'https://instagram.com/digitalcreativemedia',
                actionText: 'Kunjungi Profil Instagram →',
                isExternal: true,
              },
              {
                icon: MapPin,
                label: 'Kantor Operasional',
                value: 'Kota Malang, Jawa Timur',
                href: '#',
                actionText: 'Malang & Sekitarnya',
                isExternal: false,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-5 bg-white border border-border rounded-xl transition-all duration-200 hover:border-gold/60 hover:shadow-sm block group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/15 transition-colors">
                    <Icon className="w-5 h-5 text-navy group-hover:text-gold-700 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate text-xs uppercase tracking-wider font-semibold">{item.label}</p>
                    <p className="text-navy text-sm font-semibold mt-0.5">{item.value}</p>
                    <span className="text-gold text-xs font-medium inline-flex items-center gap-1 mt-1 group-hover:underline">
                      {item.actionText}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-border rounded-xl p-6 md:p-8 shadow-2xs">
              {/* Info banner */}
              <div className="flex items-start gap-3 p-4 bg-offwhite border border-border rounded-lg mb-6">
                <Info className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <p className="text-slate text-xs leading-relaxed">
                  Isi formulir di bawah ini untuk mengajukan media partner atau penawaran kerja sama. Anda juga bisa langsung melanjutkan pengiriman pesan via WhatsApp.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-navy mb-1.5">
                    Nama Lengkap / Organisasi <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-navy placeholder:text-slate/40 transition-all focus:outline-none focus:border-navy/30 focus:ring-2 focus:ring-navy/5"
                    placeholder="Contoh: BEM Universitas / Brand Manager"
                  />
                </div>

                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-navy mb-1.5">
                    Email atau Nomor WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    required
                    value={formState.contact}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-navy placeholder:text-slate/40 transition-all focus:outline-none focus:border-navy/30 focus:ring-2 focus:ring-navy/5"
                    placeholder="0812xxxxxxx atau email@domain.com"
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-navy mb-1.5">
                    Jenis Kebutuhan Kerjasama
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formState.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-navy transition-all focus:outline-none focus:border-navy/30 focus:ring-2 focus:ring-navy/5"
                  >
                    <option value="">Pilih opsi kebutuhan</option>
                    <option value="Media Partner Event Lari / Festival">Media Partner Event Lari / Festival</option>
                    <option value="Paid Promote & Brand Activation">Paid Promote & Brand Activation</option>
                    <option value="Produksi Konten & Dokumentasi Kreatif">Produksi Konten & Dokumentasi Kreatif</option>
                    <option value="Event Collaboration & Coverage">Event Collaboration & Coverage</option>
                    <option value="Pengelolaan & Listing Properti Kost">Pengelolaan & Listing Properti Kost</option>
                    <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-navy mb-1.5">
                    Pesan / Detail Kolaborasi
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-navy placeholder:text-slate/40 transition-all focus:outline-none focus:border-navy/30 focus:ring-2 focus:ring-navy/5 resize-none"
                    placeholder="Ceritakan gambaran acara, brand, atau kebutuhan properti Anda..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button type="submit" className="btn-primary flex-1">
                    Send Inquiry
                    <Send className="w-4 h-4" />
                  </button>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex-1 text-center text-sm"
                  >
                    Kirim via WhatsApp
                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Success Modal */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 border border-border shadow-2xl relative text-center">
            <button
              onClick={() => setSubmitted(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate hover:text-navy hover:bg-offwhite transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-navy mb-2">Inquiry Berhasil Dikirim!</h3>
            <p className="text-slate text-sm leading-relaxed mb-6">
              Terima kasih, <strong>{formState.name}</strong>. Tim CV Digital Creative Media akan segera meninjau pesan Anda dan merespons melalui <strong>{formState.contact}</strong>.
            </p>

            <div className="p-4 bg-offwhite border border-border rounded-xl text-left text-xs space-y-1.5 mb-6 text-slate">
              <p><strong className="text-navy">Kategori:</strong> {formState.type || 'General Partnership'}</p>
              <p><strong className="text-navy">Pesan:</strong> {formState.message || '-'}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormState({ name: '', contact: '', type: '', message: '' });
                }}
                className="btn-secondary text-sm py-2.5 px-5 flex-1 cursor-pointer"
              >
                Tutup
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm py-2.5 px-5 flex-1 text-center"
              >
                Lanjut ke WhatsApp
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
