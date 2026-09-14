import React from 'react';
import { RefreshCw, Home, ShieldAlert, AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lumiere/Moonlight ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    try {
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    } catch (e) {
      window.location.reload();
    }
  };

  handleHome = () => {
    window.location.href = '/invitations/templates';
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

            {this.state.error && (
              <details className="text-left bg-stone-50 border border-stone-200 rounded-xl p-3 text-[11px] font-mono text-red-800 break-all cursor-pointer">
                <summary className="font-bold cursor-pointer text-stone-700 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Technical details (click to expand)</span>
                </summary>
                <div className="mt-2 space-y-1 text-[10px] leading-tight text-neutral-700 select-all overflow-x-auto">
                  <p className="font-bold text-red-600">{this.state.error?.toString()}</p>
                  <pre className="text-[9px] text-neutral-500 whitespace-pre-wrap">{this.state.error?.stack}</pre>
                </div>
              </details>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 mr-2" /> RELOAD PAGE
              </button>

              <button
                onClick={this.handleHome}
                className="w-full py-3 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 font-semibold text-xs uppercase tracking-wider flex items-center justify-center transition-all cursor-pointer"
              >
                <Home className="w-4 h-4 mr-2" /> BROWSE TEMPLATES
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
