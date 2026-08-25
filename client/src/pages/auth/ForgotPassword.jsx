import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    addToast({
      title: 'Reset Link Dispatched',
      message: `Password reset instructions sent to ${email}`,
      type: 'success',
    });
  };

  return (
    <div className="min-h-screen bg-obsidian text-white pt-28 pb-20 px-4 flex items-center justify-center relative">
      <div className="max-w-md w-full bg-obsidian-400 border border-gold-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl font-bold text-white">Reset Credentials</h2>
          <p className="text-xs text-neutral-400">Enter your registered email address to receive password recovery instructions.</p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
            <p className="text-xs text-emerald-300">
              Please check your inbox. We've sent a secure reset link to <strong>{email}</strong>.
            </p>
            <Link to="/login" className="text-xs text-gold-400 font-semibold hover:underline block">
              Return to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold uppercase">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white focus:border-gold-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gold-gradient text-black font-bold uppercase tracking-wider shadow-gold-subtle"
            >
              Send Reset Instructions
            </button>
          </form>
        )}

        <div className="text-center pt-2">
          <Link to="/login" className="inline-flex items-center text-xs text-neutral-400 hover:text-white">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
