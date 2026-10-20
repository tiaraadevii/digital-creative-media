import { useState, useEffect } from 'react';
import { X, Send, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
}

export default function FloatingWhatsApp({ phoneNumber = '6281295129528' }: FloatingWhatsAppProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  // Show friendly tooltip after 3 seconds on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const openWhatsApp = (message: string) => {
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const quickOptions = [
    {
      id: 'partner',
      icon: '🎟️',
      title: 'Media Partner & Event',
      desc: 'Ajukan publikasi & liputan event',
      message: 'Halo CV Digital Creative Media, saya ingin mengajukan kerjasama media partner & publikasi untuk event kami.',
    },
    {
      id: 'property',
      icon: '🏠',
      title: 'Info Kost & Properti',
      desc: 'Tanya ketersediaan kamar / kelola kost',
      message: 'Halo CV Digital Creative Media, saya ingin menanyakan ketersediaan kamar kost dan informasi sewa.',
    },
    {
      id: 'brand',
      icon: '📢',
      title: 'Promosi Brand & Iklan',
      desc: 'Paid promote & kampanye digital',
      message: 'Halo CV Digital Creative Media, saya tertarik untuk promosi brand / paid promote produk di jaringan media DCM.',
    },
    {
      id: 'general',
      icon: '💬',
      title: 'Pertanyaan Umum',
      desc: 'Diskusi peluang kerjasama lainnya',
      message: 'Halo CV Digital Creative Media, saya ingin berdiskusi mengenai peluang kolaborasi.',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Mini Tooltip Bubble (Appears if chat is closed) */}
      {!isOpen && showTooltip && (
        <div className="mb-3 bg-white border border-border shadow-xl rounded-2xl p-3.5 max-w-xs animate-fade-in relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-slate hover:text-navy p-1 rounded-full cursor-pointer"
            aria-label="Tutup pesan"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-start gap-2.5 pr-4">
            <span className="flex h-2.5 w-2.5 relative mt-1 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <div>
              <p className="text-xs font-semibold text-navy">Butuh respon cepat?</p>
              <p className="text-[11px] text-slate mt-0.5 leading-snug">
                Konsultasikan event, promosi, atau info kost langsung via WhatsApp kami!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Interactive Chat Popup */}
      {isOpen && (
        <div className="mb-4 w-[340px] sm:w-[380px] bg-white rounded-2xl border border-border shadow-2xl overflow-hidden animate-fade-in flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3.5 right-3.5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Tutup WhatsApp widget"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white text-emerald-700 font-bold flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                DCM
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">CV Digital Creative Media</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  <span className="text-[11px] text-emerald-100 font-medium">Online · Siap Melayani</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#f9fafb] max-h-[360px] overflow-y-auto space-y-3">
            {/* DCM Bot Greeting Bubble */}
            <div className="bg-white p-3 rounded-2xl rounded-tl-sm border border-border/80 shadow-2xs max-w-[92%]">
              <p className="text-xs text-navy leading-relaxed">
                Halo! 👋 Selamat datang di <strong>CV Digital Creative Media</strong>.
              </p>
              <p className="text-[11px] text-slate mt-1.5 leading-relaxed">
                Pilih topik di bawah ini untuk langsung terhubung dengan tim kami via WhatsApp:
              </p>
            </div>

            {/* Quick Option Cards */}
            <div className="space-y-2 pt-1">
              {quickOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => openWhatsApp(opt.message)}
                  className="w-full text-left p-2.5 bg-white hover:bg-emerald-50/70 border border-border/90 hover:border-emerald-500/50 rounded-xl transition-all duration-200 flex items-center justify-between group cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg flex-shrink-0">{opt.icon}</span>
                    <div>
                      <span className="text-xs font-semibold text-navy block group-hover:text-emerald-700 transition-colors">
                        {opt.title}
                      </span>
                      <span className="text-[10px] text-slate block">{opt.desc}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Custom Message Input Footer */}
          <div className="p-3 bg-white border-t border-border flex items-center gap-2">
            <input
              type="text"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && customMessage.trim()) {
                  openWhatsApp(customMessage);
                  setCustomMessage('');
                }
              }}
              placeholder="Atau ketik pesan custom..."
              className="flex-1 text-xs py-2 px-3 border border-border rounded-lg focus:outline-none focus:border-emerald-500 bg-offwhite"
            />
            <button
              type="button"
              onClick={() => {
                const msg = customMessage.trim() || 'Halo CV Digital Creative Media, saya ingin berdiskusi.';
                openWhatsApp(msg);
                setCustomMessage('');
              }}
              className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer flex-shrink-0"
              aria-label="Kirim ke WhatsApp"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        className={`flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ${
          isOpen
            ? 'bg-navy text-white hover:bg-navy-900'
            : 'bg-[#25D366] text-white hover:bg-[#20ba59]'
        }`}
        aria-label="Chat WhatsApp"
      >
        {isOpen ? (
          <>
            <X className="w-5 h-5" />
            <span className="text-xs font-semibold">Tutup</span>
          </>
        ) : (
          <>
            {/* Official WhatsApp SVG Icon */}
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span className="text-xs font-semibold tracking-wide">Chat Kami</span>
          </>
        )}
      </button>
    </div>
  );
}
