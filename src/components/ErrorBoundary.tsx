import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReset = () => {
    // Clear potentially corrupted local state if needed
    window.location.reload();
  };

  private handleClearAndReload = () => {
    try {
      // Clear storage if stuck
      sessionStorage.clear();
    } catch {}
    window.location.href = '/admin/login';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070D18] text-white flex items-center justify-center p-6 font-sans">
          <div className="max-w-lg w-full bg-white/[0.05] border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>

            <h1 className="text-xl font-bold tracking-tight text-white mb-2">
              {this.props.fallbackTitle || 'Terjadi Kendala Memuat Halaman'}
            </h1>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              Sistem mendeteksi error pada saat me-render dashboard. Anda dapat memuat ulang halaman ini atau kembali ke halaman login.
            </p>

            {this.state.error && (
              <div className="mb-6 p-4 rounded-xl bg-black/40 border border-white/5 text-left overflow-x-auto text-xs font-mono text-rose-300 max-h-40">
                <p className="font-bold text-rose-400">{this.state.error.toString()}</p>
                {this.state.errorInfo?.componentStack && (
                  <pre className="text-[10px] text-white/40 mt-2">
                    {this.state.errorInfo.componentStack.slice(0, 500)}
                  </pre>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-gold-500 via-gold to-gold-400 text-navy font-bold text-sm hover:opacity-95 transition-all shadow-md cursor-pointer"
              >
                <RefreshCw size={16} />
                <span>Muat Ulang Halaman</span>
              </button>

              <button
                type="button"
                onClick={this.handleClearAndReload}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-all border border-white/10 cursor-pointer"
              >
                <Home size={16} />
                <span>Ke Halaman Login</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
