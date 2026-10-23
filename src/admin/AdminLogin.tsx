import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const ADMIN_EMAIL = 'admin@cvdigitalcreative.media';
const ADMIN_PASSWORD = 'Dcm2026admin';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
        sessionStorage.setItem('dcm_admin', 'authenticated');
        localStorage.setItem('dcm_admin', 'authenticated');
        navigate('/admin/dashboard');
      } else {
        setError('Email atau password tidak sesuai. Silakan periksa kembali.');
      }
      setLoading(false);
    }, 600);
  };

  const handleFillDemo = () => {
    setEmail(ADMIN_EMAIL);
    setPassword(ADMIN_PASSWORD);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#070D18] text-white flex flex-col justify-between relative overflow-hidden font-sans selection:bg-gold selection:text-navy">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-10 p-6 md:p-8 flex items-center justify-between max-w-7xl mx-auto w-full">
        <a
          href="/"
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all text-xs font-semibold backdrop-blur-md group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Website Utama</span>
        </a>

        <div className="hidden sm:flex items-center gap-2 text-xs text-white/50">
          <ShieldCheck size={14} className="text-gold" />
          <span>Secure Admin Gateway</span>
        </div>
      </header>

      {/* Center Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md animate-fade-in">
          {/* Card Frame */}
          <div className="relative rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 sm:p-10 overflow-hidden">
            {/* Top decorative gold line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

            {/* Brand Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 via-gold/10 to-transparent border border-gold/40 text-gold mb-4 shadow-lg shadow-gold/10">
                <Lock size={24} />
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">
                CV DIGITAL
              </h1>
              <p className="text-gold text-[11px] font-bold tracking-[0.25em] uppercase mt-0.5">
                Creative Media
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/70">
                <Sparkles size={11} className="text-gold" />
                <span>Admin Portal Login</span>
              </div>
            </div>

            {/* Error banner */}
            {error && (
              <div className="mb-6 flex items-start gap-2.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl p-3.5 animate-slide-down">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@cvdigitalcreative.media"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    id="admin-password"
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-2xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-gold-500 via-gold to-gold-400 text-navy font-bold text-sm hover:opacity-95 active:scale-[0.99] transition-all shadow-lg shadow-gold/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                    <span>Memverifikasi Akun...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk ke Dashboard</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Quick helper badge */}
            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-white/40">Isi otomatis akun:</span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-gold hover:text-gold-300 font-semibold underline underline-offset-4 transition-colors"
              >
                Gunakan Kredensial Admin
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-white/30 mt-6">
            &copy; {new Date().getFullYear()} CV Digital Creative Media · Sistem Administrasi Terpusat
          </p>
        </div>
      </main>

      <footer className="relative z-10 p-4 text-center text-xs text-white/30">
        Malang, Jawa Timur — Indonesia
      </footer>
    </div>
  );
}
