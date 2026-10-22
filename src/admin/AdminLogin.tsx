import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';

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
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        sessionStorage.setItem('dcm_admin', 'authenticated');
        navigate('/admin/dashboard');
      } else {
        setError('Email atau password salah. Silakan coba lagi.');
      }
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-offwhite flex flex-col">
      {/* Back to website */}
      <div className="p-6">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-navy-400 hover:text-navy transition-colors text-sm font-medium group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Website
        </a>
      </div>

      {/* Login Card */}
      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-border p-8 md:p-10">
            {/* Brand */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-navy tracking-tight leading-none">
                CV DIGITAL
              </h1>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mt-1">
                Creative Media
              </p>

              {/* Lock icon */}
              <div className="mt-6 mx-auto w-14 h-14 bg-navy rounded-xl flex items-center justify-center shadow-md">
                <Lock size={24} className="text-white" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-navy">Admin Login</h2>
              <p className="text-navy-300 text-sm mt-1">Masuk untuk mengelola konten website</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 animate-fade-in">
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="admin-email" className="block text-sm font-semibold text-navy mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-300"
                  />
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@cvdigitalcreative.media"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-navy text-sm placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="admin-password" className="block text-sm font-semibold text-navy mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-300"
                  />
                  <input
                    id="admin-password"
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    required
                    className="w-full pl-10 pr-11 py-3 border border-border rounded-xl text-navy text-sm placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-300 hover:text-navy transition-colors"
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-navy text-white font-semibold rounded-xl hover:bg-navy-700 active:scale-[0.99] transition-all duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memverifikasi...
                  </>
                ) : (
                  'Masuk'
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-navy-300 mt-6">
            &copy; {new Date().getFullYear()} CV Digital Creative Media · Admin Panel
          </p>
        </div>
      </div>
    </div>
  );
}
