import { useState, useEffect } from 'react';
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
  Clock,
  Eye,
  Sparkles,
  ArrowRight,
  Bell,
  Search,
  Handshake,
} from 'lucide-react';
import { CollaborationRequest, RequestStatus } from '@/types/admin';
import { PortfolioItem } from '@/types/portfolio';
import { ArticleItem } from '@/types/article';
import { PartnerEvent } from '@/types/partner';
import {
  getRequests,
  updateRequestStatus,
  deleteRequest,
} from '@/services/requestsStorage';
import {
  getPortfolioItems,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} from '@/services/portfolioStorage';
import {
  getArticles,
  addArticle,
  updateArticle,
  deleteArticle,
} from '@/services/articlesStorage';
import {
  getPartners,
  addPartner,
  updatePartner,
  deletePartner,
} from '@/services/partnersStorage';
import CollaborationRequests from './CollaborationRequests';
import RequestDetailModal from './RequestDetailModal';
import PortfolioManagement from './PortfolioManagement';
import ArticlesManagement from './ArticlesManagement';
import PartnersManagement from './PartnersManagement';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'portfolio' | 'articles' | 'partners' | 'requests'
  >('dashboard');
  const [requests, setRequests] = useState<CollaborationRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<CollaborationRequest | null>(null);

  // Portfolio items state
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  // Articles items state
  const [articles, setArticles] = useState<ArticleItem[]>([]);

  // Partners items state
  const [partners, setPartners] = useState<PartnerEvent[]>([]);

  // Load data from storage
  useEffect(() => {
    setRequests(getRequests());
    setPortfolioItems(getPortfolioItems());
    setArticles(getArticles());
    setPartners(getPartners());
  }, []);

  const handleSignOut = () => {
    sessionStorage.removeItem('dcm_admin');
    navigate('/admin/login');
  };

  const handleAddPortfolio = (item: Omit<PortfolioItem, 'id'>) => {
    const updated = addPortfolioItem(item);
    setPortfolioItems(updated);
  };

  const handleUpdatePortfolio = (id: string, updatedData: Partial<PortfolioItem>) => {
    const updated = updatePortfolioItem(id, updatedData);
    setPortfolioItems(updated);
  };

  const handleDeletePortfolio = (id: string) => {
    const updated = deletePortfolioItem(id);
    setPortfolioItems(updated);
  };

  const handleAddArticle = (item: Omit<ArticleItem, 'id' | 'date' | 'createdAt'>) => {
    const updated = addArticle(item);
    setArticles(updated);
  };

  const handleUpdateArticle = (id: string, updatedData: Partial<ArticleItem>) => {
    const updated = updateArticle(id, updatedData);
    setArticles(updated);
  };

  const handleDeleteArticle = (id: string) => {
    const updated = deleteArticle(id);
    setArticles(updated);
  };

  const handleAddPartner = (item: Omit<PartnerEvent, 'id' | 'createdAt'>) => {
    const updated = addPartner(item);
    setPartners(updated);
  };

  const handleUpdatePartner = (id: string, updatedData: Partial<PartnerEvent>) => {
    const updated = updatePartner(id, updatedData);
    setPartners(updated);
  };

  const handleDeletePartner = (id: string) => {
    const updated = deletePartner(id);
    setPartners(updated);
  };

  const handleUpdateStatus = (id: string, newStatus: RequestStatus) => {
    const updated = updateRequestStatus(id, newStatus);
    setRequests(updated);
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest({ ...selectedRequest, status: newStatus });
    }
  };

  const handleDeleteRequest = (id: string) => {
    const updated = deleteRequest(id);
    setRequests(updated);
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest(null);
    }
  };

  // Metrics
  const totalRequests = requests.length;
  const pendingRequests = requests.filter((r) => r.status === 'Pending').length;
  const totalPortfolios = portfolioItems.length;
  const totalArticles = articles.length;
  const totalPartners = partners.length;

  const stats = [
    {
      label: 'Portfolio Items',
      value: String(totalPortfolios),
      badge: 'Active Works',
      icon: Briefcase,
      color: 'text-navy',
      bg: 'bg-navy/5',
      trend: `${totalPortfolios} projects showcase`,
    },
    {
      label: 'Partner Events',
      value: String(totalPartners),
      badge: 'Official',
      icon: Handshake,
      color: 'text-gold-700',
      bg: 'bg-gold/15',
      trend: `${totalPartners} event resmi`,
    },
    {
      label: 'Articles Published',
      value: String(totalArticles),
      badge: 'Live',
      icon: FileText,
      color: 'text-navy',
      bg: 'bg-navy/5',
      trend: `${totalArticles} latest articles`,
    },
    {
      label: 'Total Requests',
      value: String(totalRequests),
      badge: `${totalRequests} inbound`,
      icon: Inbox,
      color: 'text-navy',
      bg: 'bg-navy/5',
      trend: `${pendingRequests} belum direspon`,
    },
  ];

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'Pending':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: Clock,
          label: 'Pending',
        };
      case 'Read':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: Eye,
          label: 'Read',
        };
      case 'Responded':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: CheckCircle2,
          label: 'Responded',
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] flex font-sans text-navy">
      {/* Sidebar Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-navy-950/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 h-screen w-72 bg-[#09111E] text-white flex flex-col justify-between z-50 transition-transform duration-300 ease-out border-r border-white/5 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold via-gold-500 to-gold-600 text-navy font-bold flex items-center justify-center shadow-md shadow-gold/20">
                <span className="text-xs font-black tracking-wider">DCM</span>
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight text-white leading-none">
                  CV DIGITAL
                </h1>
                <p className="text-gold text-[10px] font-bold tracking-[0.2em] uppercase mt-1">
                  Creative Media
                </p>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-white/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Admin Panel v2.0</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden text-white/50 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav List */}
          <div className="px-4 py-6">
            <p className="px-3 text-[10px] uppercase font-bold tracking-[0.2em] text-white/30 mb-3">
              Menu Utama
            </p>
            <nav className="space-y-1.5">
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all group ${
                  activeTab === 'dashboard'
                    ? 'bg-gradient-to-r from-gold/20 to-gold/5 text-gold border border-gold/30 shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard
                    size={18}
                    className={activeTab === 'dashboard' ? 'text-gold' : 'text-white/40 group-hover:text-white'}
                  />
                  <span>Dashboard</span>
                </div>
                {activeTab === 'dashboard' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                )}
              </button>

              <button
                onClick={() => {
                  setActiveTab('portfolio');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all group ${
                  activeTab === 'portfolio'
                    ? 'bg-gradient-to-r from-gold/20 to-gold/5 text-gold border border-gold/30 shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Briefcase
                    size={18}
                    className={activeTab === 'portfolio' ? 'text-gold' : 'text-white/40 group-hover:text-white'}
                  />
                  <span>Portfolio</span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                  {totalPortfolios}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('articles');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all group ${
                  activeTab === 'articles'
                    ? 'bg-gradient-to-r from-gold/20 to-gold/5 text-gold border border-gold/30 shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText
                    size={18}
                    className={activeTab === 'articles' ? 'text-gold' : 'text-white/40 group-hover:text-white'}
                  />
                  <span>Articles</span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                  {totalArticles}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('partners');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all group ${
                  activeTab === 'partners'
                    ? 'bg-gradient-to-r from-gold/20 to-gold/5 text-gold border border-gold/30 shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Handshake
                    size={18}
                    className={activeTab === 'partners' ? 'text-gold' : 'text-white/40 group-hover:text-white'}
                  />
                  <span>Partnership</span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                  {totalPartners}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('requests');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all group ${
                  activeTab === 'requests'
                    ? 'bg-gradient-to-r from-gold/20 to-gold/5 text-gold border border-gold/30 shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Inbox
                    size={18}
                    className={activeTab === 'requests' ? 'text-gold' : 'text-white/40 group-hover:text-white'}
                  />
                  <span>Requests</span>
                </div>
                {totalRequests > 0 && (
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      pendingRequests > 0
                        ? 'bg-amber-500 text-navy font-black'
                        : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {totalRequests}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          {/* User info card */}
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold/20 text-gold font-bold text-xs flex items-center justify-center border border-gold/30 shrink-0">
              AD
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">Administrator</p>
              <p className="text-[11px] text-white/40 truncate">admin@cvdigitalcreative.media</p>
            </div>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            <ExternalLink size={16} />
            <span>Lihat Website Publik</span>
          </a>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all cursor-pointer"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-30 px-6 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-border text-navy-400 hover:text-navy hover:bg-offwhite"
            >
              <Menu size={20} />
            </button>

            <div>
              <p className="text-xs text-navy-300 flex items-center gap-1.5">
                <span>Selamat datang kembali,</span>
                <span className="font-semibold text-navy">admin@cvdigitalcreative.media</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('requests')}
              className="relative p-2.5 rounded-xl border border-border bg-white text-navy-400 hover:text-navy hover:border-gold/50 transition-all"
              title="Notifikasi Kolaborasi"
            >
              <Bell size={18} />
              {pendingRequests > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white" />
              )}
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navy-800 transition-all shadow-xs"
            >
              <ExternalLink size={14} />
              <span>Preview Web</span>
            </a>
          </div>
        </header>

        {/* Main Body */}
        <main className="p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto">
          {/* TAB: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              {/* Hero Banner inside Dashboard */}
              <div className="relative rounded-3xl bg-gradient-to-r from-navy-900 via-navy to-navy-800 p-6 md:p-8 text-white overflow-hidden shadow-lg">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent pointer-events-none" />

                <div className="relative z-10 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold text-xs font-semibold mb-3">
                    <Sparkles size={13} />
                    <span>Executive Overview</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                    Dashboard Administrasi
                  </h1>
                  <p className="text-white/70 text-sm mt-1.5 leading-relaxed">
                    Kelola seluruh konten, publikasi artikel, portfolio karya kreatif, serta tindak lanjuti permintaan kerja sama dari calon partner DCM secara real-time.
                  </p>
                </div>
              </div>

              {/* 4 Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  const isClickable =
                    stat.label === 'Portfolio Items' ||
                    stat.label === 'Partner Events' ||
                    stat.label === 'Articles Published' ||
                    stat.label === 'Total Requests' ||
                    stat.label === 'Pending Requests';

                  const handleClick = () => {
                    if (stat.label === 'Portfolio Items') setActiveTab('portfolio');
                    if (stat.label === 'Partner Events') setActiveTab('partners');
                    if (stat.label === 'Articles Published') setActiveTab('articles');
                    if (stat.label === 'Total Requests' || stat.label === 'Pending Requests')
                      setActiveTab('requests');
                  };

                  return (
                    <div
                      key={i}
                      onClick={handleClick}
                      className={`bg-white rounded-3xl border border-border/80 p-6 shadow-sm hover:shadow-xl hover:border-gold/40 hover:-translate-y-1 transition-all duration-200 group flex flex-col justify-between ${
                        isClickable ? 'cursor-pointer' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center transition-transform group-hover:scale-105`}
                        >
                          <Icon size={22} />
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-offwhite text-navy-400 border border-border">
                          {stat.badge}
                        </span>
                      </div>

                      <div>
                        <div className="text-3xl font-black text-navy tracking-tight">
                          {stat.value}
                        </div>
                        <p className="text-xs font-bold text-navy-400 mt-1">{stat.label}</p>
                        <p className="text-[11px] text-navy-300 mt-0.5">{stat.trend}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recent Collaboration Requests Section */}
              <div className="bg-white rounded-3xl border border-border/80 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-gradient-to-r from-offwhite/50 via-white to-offwhite/50">
                  <div>
                    <h2 className="text-lg font-bold text-navy tracking-tight">
                      Recent Collaboration Requests
                    </h2>
                    <p className="text-xs text-navy-300 mt-0.5">
                      Pengajuan kerja sama terbaru yang masuk melalui website
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('requests')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold/15 text-gold-700 hover:bg-gold/25 font-bold text-xs transition-all cursor-pointer group"
                  >
                    <span>View All</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {requests.length === 0 ? (
                  <div className="p-10 text-center text-navy-300">
                    <Inbox size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-semibold">Belum ada permintaan kolaborasi</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {requests.slice(0, 5).map((req) => {
                      const badge = getStatusBadge(req.status);
                      const BadgeIcon = badge.icon;
                      const initials = req.name
                        .split(' ')
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase();

                      return (
                        <div
                          key={req.id}
                          onClick={() => setSelectedRequest(req)}
                          className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-offwhite/60 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy to-navy-700 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                              {initials}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-navy capitalize truncate group-hover:text-gold-700 transition-colors">
                                {req.name}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-navy-300">
                                <span className="lowercase truncate">{req.email}</span>
                                {req.company && (
                                  <>
                                    <span>•</span>
                                    <span className="text-navy-400 font-medium">{req.company}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-13 sm:pl-0">
                            <span className="text-xs text-navy-300 font-medium">{req.date}</span>
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}
                            >
                              <BadgeIcon size={12} />
                              <span>{badge.label}</span>
                            </span>
                            <ArrowUpRight
                              size={16}
                              className="text-navy-200 group-hover:text-gold transition-colors hidden sm:block"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: REQUESTS (Collaboration Requests - Image 2) */}
          {activeTab === 'requests' && (
            <CollaborationRequests
              requests={requests}
              onSelectRequest={(req) => setSelectedRequest(req)}
              onUpdateStatus={handleUpdateStatus}
            />
          )}

          {/* TAB: PORTFOLIO (Portfolio Projects - Image 1) */}
          {activeTab === 'portfolio' && (
            <PortfolioManagement
              items={portfolioItems}
              onAdd={handleAddPortfolio}
              onUpdate={handleUpdatePortfolio}
              onDelete={handleDeletePortfolio}
            />
          )}

          {/* TAB: ARTICLES (Articles Management - Image 1) */}
          {activeTab === 'articles' && (
            <ArticlesManagement
              articles={articles}
              onAdd={handleAddArticle}
              onUpdate={handleUpdateArticle}
              onDelete={handleDeleteArticle}
            />
          )}

          {/* TAB: PARTNERS (Official Event Partnerships) */}
          {activeTab === 'partners' && (
            <PartnersManagement
              partners={partners}
              onAdd={handleAddPartner}
              onUpdate={handleUpdatePartner}
              onDelete={handleDeletePartner}
            />
          )}
        </main>
      </div>

      {/* DETAIL MODAL (Image 3) */}
      <RequestDetailModal
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDeleteRequest}
      />
    </div>
  );
}
