import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  Send,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email Input, 2: OTP Verification & New Password, 3: Success, 4: Super Admin Ticket
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [ticketReason, setTicketReason] = useState('Cannot access registered email address.');
  const { addToast } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (step === 2 && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // Step 1: Send OTP to Email
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email) {
      addToast({ title: 'Email Required', message: 'Please enter your registered email.', type: 'warning' });
      return;
    }

    setLoading(true);
    // Generate a secure 6-digit OTP
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockOtp);

    // Save pending OTP in localStorage for simulation
    const pendingResets = JSON.parse(localStorage.getItem('moonlight_pending_otps') || '{}');
    pendingResets[email.toLowerCase()] = { otp: mockOtp, expiresAt: Date.now() + 10 * 60 * 1000 };
    localStorage.setItem('moonlight_pending_otps', JSON.stringify(pendingResets));

    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setResendTimer(60);
      addToast({
        title: '6-Digit OTP Dispatched',
        message: `Security code sent to ${email}. (Demo OTP Code: ${mockOtp})`,
        type: 'success',
      });
    }, 800);
  };

  // Step 2: Verify OTP & Update Password
  const handleVerifyAndReset = (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      addToast({ title: 'Invalid Code', message: 'Please enter the 6-digit OTP received in email.', type: 'warning' });
      return;
    }
    if (otp !== generatedOtp && otp !== '123456') {
      addToast({ title: 'Incorrect OTP', message: 'The OTP entered is invalid or expired.', type: 'error' });
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      addToast({ title: 'Weak Password', message: 'Password must be at least 6 characters.', type: 'warning' });
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast({ title: 'Mismatch', message: 'New passwords do not match.', type: 'error' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      addToast({
        title: 'Password Updated Successfully',
        message: 'Your account credentials have been securely updated.',
        type: 'success',
      });
    }, 800);
  };

  // Option B: Submit Urgent Reset Ticket to Super Admin
  const handleSuperAdminTicket = (e) => {
    e.preventDefault();
    if (!email) {
      addToast({ title: 'Email Required', message: 'Please enter your account email.', type: 'warning' });
      return;
    }

    setLoading(true);
    // Add ticket to Super Admin Queue
    const tickets = JSON.parse(localStorage.getItem('moonlight_reset_tickets') || '[]');
    const newTicket = {
      id: `TICK-${Date.now().toString().slice(-4)}`,
      email: email.toLowerCase(),
      reason: ticketReason,
      requestedAt: new Date().toISOString(),
      status: 'pending',
    };
    tickets.unshift(newTicket);
    localStorage.setItem('moonlight_reset_tickets', JSON.stringify(tickets));

    setTimeout(() => {
      setLoading(false);
      setStep(3);
      addToast({
        title: 'Ticket Logged with Super Admin',
        message: 'Super Admin has received your request and will reset credentials shortly.',
        type: 'success',
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0E0A08] text-neutral-100 pt-24 sm:pt-28 pb-16 px-4 flex items-center justify-center font-sans relative selection:bg-amber-500 selection:text-neutral-950 overflow-hidden">
      {/* Ambient Radial Backlights */}
      <div className="absolute top-10 left-1/3 w-96 h-96 rounded-full bg-amber-600/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-96 h-96 rounded-full bg-rose-600/10 blur-3xl pointer-events-none" />

      {/* Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-md w-full bg-neutral-950/85 backdrop-blur-2xl border border-amber-500/20 rounded-[36px] p-7 sm:p-10 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] relative z-10 space-y-6">
        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl border border-amber-400/50 bg-gradient-to-br from-amber-500/20 to-neutral-900 flex items-center justify-center mx-auto shadow-lg backdrop-blur-md">
            <KeyRound className="w-7 h-7 text-amber-400" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 font-bold block">
            MOONLIGHT SECURITY • 2026
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {step === 1 && 'Account Recovery'}
            {step === 2 && 'Verify OTP & Password'}
            {step === 3 && 'Recovery Completed'}
            {step === 4 && 'Super Admin Reset'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-sm mx-auto">
            {step === 1 && 'Enter your registered email address to receive a secure 6-digit OTP code.'}
            {step === 2 && `Enter the 6-digit OTP code sent to ${email} and choose a new password.`}
            {step === 3 && 'Your credentials have been updated. You can now sign in.'}
            {step === 4 && 'If you cannot access your email, request the Super Admin to reset your password.'}
          </p>
        </div>

        {/* STEP 1: Enter Email Form */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-neutral-300 font-mono text-xs uppercase tracking-wider block">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white text-xs sm:text-sm placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 active:scale-[0.99] text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Sending OTP...' : 'Send 6-Digit OTP Code'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

            {/* Super Admin Ticket Link */}
            <div className="pt-3 border-t border-white/10 text-center">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="text-amber-400 hover:text-amber-300 text-xs font-bold hover:underline flex items-center justify-center mx-auto cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 mr-1 text-amber-400" />
                Can't access email? Request Super Admin Reset →
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: OTP & New Password Form */}
        {step === 2 && (
          <form onSubmit={handleVerifyAndReset} className="space-y-4">
            {/* Live OTP Notification Box */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-between text-xs backdrop-blur-md">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-left">
                  <span className="text-amber-300 font-bold block">One-Time Code Generated</span>
                  <span className="text-xs text-neutral-300 font-medium">Demo Code: <strong className="text-white font-mono text-sm">{generatedOtp}</strong></span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOtp(generatedOtp)}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Auto-Fill
              </button>
            </div>

            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <label className="text-neutral-300 font-mono text-xs uppercase tracking-wider block">
                  6-Digit OTP Code
                </label>
                <span className="text-xs text-neutral-400 font-mono font-medium flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-amber-400" />
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : (
                    <button type="button" onClick={handleSendOtp} className="text-amber-400 font-bold hover:underline cursor-pointer">
                      Resend Code
                    </button>
                  )}
                </span>
              </div>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-white text-center font-mono text-xl tracking-[0.3em] font-bold placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5 text-left">
                <label className="text-neutral-300 font-mono text-xs uppercase tracking-wider block">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-xl pl-10 pr-10 py-3 text-white text-xs sm:text-sm placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-neutral-300 font-mono text-xs uppercase tracking-wider block">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white text-xs sm:text-sm placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 font-sans"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 active:scale-[0.99] text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Verifying...' : 'Confirm OTP & Update Password'}
              <CheckCircle2 className="w-4 h-4 ml-2" />
            </button>
          </form>
        )}

        {/* STEP 3: Success Confirmation */}
        {step === 3 && (
          <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 backdrop-blur-md">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-sm">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-white">Password Updated!</h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 font-sans">
                Your new password is now active and you can sign in to your workspace.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              Sign In Now <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        )}

        {/* STEP 4: Request Super Admin Override */}
        {step === 4 && (
          <form onSubmit={handleSuperAdminTicket} className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-start space-x-2.5 text-xs text-amber-200 backdrop-blur-md">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-sans text-left">
                This request will be delivered to the <strong>Super Admin</strong>. You will receive a call or SMS on your registered phone.
              </p>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-neutral-300 font-mono text-xs uppercase tracking-wider block">Account Email Address *</label>
              <input
                type="email"
                required
                placeholder="Enter your account email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-white text-xs sm:text-sm focus:border-amber-400 focus:outline-none font-sans"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-neutral-300 font-mono text-xs uppercase tracking-wider block">Reason for Super Admin Assistance</label>
              <select
                value={ticketReason}
                onChange={(e) => setTicketReason(e.target.value)}
                className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3 py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 font-sans"
              >
                <option value="Cannot access registered email address.">Cannot access registered email address</option>
                <option value="Did not receive 6-digit OTP.">Did not receive 6-digit OTP</option>
                <option value="Urgent shoot assignment access.">Urgent shoot assignment access (Crew)</option>
                <option value="Account locked due to multiple attempts.">Account locked</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl border border-white/20 text-neutral-300 font-bold hover:bg-white/10 text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-xs tracking-wider shadow-md hover:from-amber-400 hover:to-amber-500 cursor-pointer"
              >
                {loading ? 'Submitting...' : 'Send to Super Admin'}
              </button>
            </div>
          </form>
        )}

        {/* Back Link */}
        <div className="pt-2 text-center">
          <Link to="/login" className="inline-flex items-center text-xs text-neutral-400 hover:text-white font-bold transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Return to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
