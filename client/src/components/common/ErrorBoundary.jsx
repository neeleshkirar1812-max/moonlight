import React from 'react';
import { RefreshCw, Home, ShieldAlert } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lumiere/Moonlight ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    try {
      if (typeof window !== 'undefined') {
        window.location.reload(true);
      }
    } catch (e) {
      window.location.reload();
    }
  };

  handleHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4 sm:p-6 text-neutral-900 font-sans">
          <div className="max-w-md w-full bg-white border border-amber-900/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-amber-500/15 border border-amber-600/30 flex items-center justify-center text-amber-800 mx-auto">
              <ShieldAlert className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-mono font-bold tracking-[0.25em] text-amber-700 block">
                Moonlight Production
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900">
                Experience Restored
              </h2>
              <p className="text-xs text-neutral-600 leading-relaxed">
                A newer version of the website is available. Please reload the page to load the latest high-definition assets.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full py-3 rounded-full bg-gold-gradient text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center shadow-md hover:brightness-105 active:scale-95 transition-all"
              >
                <RefreshCw className="w-4 h-4 mr-2" /> Reload Page
              </button>

              <button
                onClick={this.handleHome}
                className="w-full py-3 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 font-semibold text-xs uppercase tracking-wider flex items-center justify-center transition-all"
              >
                <Home className="w-4 h-4 mr-2" /> Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
