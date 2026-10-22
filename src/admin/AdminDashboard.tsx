import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Inbox,
  TrendingUp,
  ExternalLink,
  LogOut,
  ArrowUpRight,
  Menu,
  X,
  CheckCircle2,
} from 'lucide-react';

interface RequestItem {
  id: string;
  name: string;
  email: string;
  date: string;
  status: 'Responded' | 'Pending';
  message?: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'portfolio' | 'articles' | 'requests'>('dashboard');

  const handleSignOut = () => {
    sessionStorage.removeItem('dcm_admin');
    navigate('/admin/login');
  };

  const stats = [
    {
      label: 'Portfolio Items',
      value: '4',
      icon: Briefcase,
      color: 'text-navy',
      bg: 'bg-navy-50',
    },
    {
      label: 'Articles Published',
      value: '2',
      icon: FileText,
      color: 'text-navy',
      bg: 'bg-navy-50',
    },
    {
      label: 'Total Requests',
      value: '1',
      icon: Inbox,
      color: 'text-navy',
      bg: 'bg-navy-50',
    },
    {
      label: 'Pending Requests',
      value: '0',
      icon: TrendingUp,
      color: 'text-gold',
      bg: 'bg-gold-50',
    },
  ];

  const recentRequests: RequestItem[] = [
    {
      id: '1',
      name: 'eca',
      email: 'keren@gmail.com',
      date: 'Oct 16',
      status: 'Responded',
    },
  ];

  return (
    <div className="min-h-screen bg-offwhite flex font-sans">
      {/* Sidebar Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 h-screen w-64 bg-navy-900 text-white flex flex-col justify-between z-50 transition-transform duration-200 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand */}
          <div className="p-6 border-b border-navy-700/60 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white leading-none">
                CV DIGITAL
              </h1>
              <p className="text-gold text-[10px] font-bold tracking-[0.2em] uppercase mt-1">
                Creative Media
              </p>
              <span className="inline-block text-[11px] text-navy-300 mt-2 font-medium">
                Admin Panel
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden text-navy-300 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-navy-700 text-white shadow-sm'
                  : 'text-navy-200 hover:text-white hover:bg-navy-800'
              }`}
            >
              <LayoutDashboard size={18} className={activeTab === 'dashboard' ? 'text-gold' : ''} />
              Dashboard
            </button>

            <button
              onClick={() => {
                setActiveTab('portfolio');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'portfolio'
                  ? 'bg-navy-700 text-white shadow-sm'
                  : 'text-navy-200 hover:text-white hover:bg-navy-800'
              }`}
            >
              <Briefcase size={18} />
              Portfolio
            </button>

            <button
              onClick={() => {
                setActiveTab('articles');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'articles'
                  ? 'bg-navy-700 text-white shadow-sm'
                  : 'text-navy-200 hover:text-white hover:bg-navy-800'
              }`}
            >
              <FileText size={18} />
              Articles
            </button>

            <button
              onClick={() => {
                setActiveTab('requests');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'requests'
                  ? 'bg-navy-700 text-white shadow-sm'
                  : 'text-navy-200 hover:text-white hover:bg-navy-800'
              }`}
            >
              <Inbox size={18} />
              Requests
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-navy-700/60 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-navy-200 hover:text-white hover:bg-navy-800 transition-all"
          >
            <ExternalLink size={18} />
            View Website
          </a>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-navy-800 transition-all"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-border sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-navy-400 hover:text-navy"
            >
              <Menu size={22} />
            </button>
            <p className="text-xs sm:text-sm text-navy-300">
              Welcome back,{' '}
              <span className="font-semibold text-navy">admin@cvdigitalcreative.media</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/20 text-navy font-bold text-xs flex items-center justify-center border border-gold/30">
              AD
            </div>
          </div>
        </header>

        {/* Body Container */}
        <main className="p-6 md:p-8 flex-1 max-w-6xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              {/* Header Title */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-navy tracking-tight">
                  Dashboard
                </h1>
                <p className="text-navy-300 text-sm mt-1">
                  Overview of your website content and activity.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={i}
                      className="bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-md hover:border-gold/40 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-11 h-11 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}
                        >
                          <Icon size={20} />
                        </div>
                        <ArrowUpRight
                          size={18}
                          className="text-navy-200 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                        />
                      </div>
                      <div className="mt-5">
                        <div className="text-3xl font-bold text-navy tracking-tight">
                          {stat.value}
                        </div>
                        <p className="text-xs text-navy-300 font-medium mt-1">{stat.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recent Collaboration Requests */}
              <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                  <h2 className="text-lg font-bold text-navy">Recent Collaboration Requests</h2>
                  <button
                    onClick={() => setActiveTab('requests')}
                    className="text-gold hover:text-gold-600 text-sm font-semibold transition-colors"
                  >
                    View All
                  </button>
                </div>

                <div className="divide-y divide-border">
                  {recentRequests.map((req) => (
                    <div
                      key={req.id}
                      className="px-6 py-4 flex items-center justify-between hover:bg-offwhite/50 transition-colors"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-navy capitalize">{req.name}</p>
                          <p className="text-xs text-navy-300 lowercase">{req.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-xs text-navy-300 font-medium">{req.date}</span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
                          <CheckCircle2 size={12} />
                          {req.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'dashboard' && (
            <div className="bg-white rounded-2xl border border-border p-12 text-center animate-fade-in">
              <div className="max-w-md mx-auto">
                <div className="w-14 h-14 bg-navy-50 text-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {activeTab === 'portfolio' && <Briefcase size={26} />}
                  {activeTab === 'articles' && <FileText size={26} />}
                  {activeTab === 'requests' && <Inbox size={26} />}
                </div>
                <h3 className="text-xl font-bold text-navy capitalize">{activeTab} Management</h3>
                <p className="text-navy-300 text-sm mt-2">
                  Halaman ini siap untuk diintegrasikan sesuai dengan kebutuhan konten yang akan kamu
                  berikan nanti.
                </p>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white text-xs font-semibold rounded-xl hover:bg-navy-700 transition-all"
                >
                  Kembali ke Dashboard
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
