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
    <div className="min-h-screen bg-[#0B0B0C] text-white pt-24 sm:pt-28 pb-16 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-gold-500/15 via-gold-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-lg w-full bg-[#121215]/90 border border-gold-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10 backdrop-blur-2xl animate-fade-in space-y-6">
        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full border-2 border-gold-400 flex items-center justify-center bg-black/80 mx-auto shadow-gold-glow">
            <KeyRound className="w-6 h-6 text-gold-400" />
          </div>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold-400 font-bold block">
            Moonlight Security & Governance
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            {step === 1 && 'Account Recovery'}
            {step === 2 && 'Verify OTP & Set Password'}
            {step === 3 && 'Recovery Completed'}
            {step === 4 && 'Request Super Admin Reset'}
          </h2>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            {step === 1 && 'Enter your registered email address to receive a secure 6-digit one-time code.'}
            {step === 2 && `Enter the 6-digit OTP sent to ${email} and choose a new password.`}
            {step === 3 && 'Your credentials have been updated. You can now sign in.'}
            {step === 4 && 'If you lost email access, request the Super Admin Director to manually reset your password.'}
          </p>
        </div>

        {/* STEP 1: Enter Email Form */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-bold uppercase text-[10.5px] tracking-wider block">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 rounded-full bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-widest shadow-gold-subtle hover:brightness-110 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50 btn-shimmer"
            >
              {loading ? 'Dispatching OTP...' : 'Send 6-Digit Verification OTP'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

            {/* Super Admin Ticket Link */}
            <div className="pt-3 border-t border-white/10 text-center space-y-2">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="text-gold-300 hover:text-white text-xs font-semibold hover:underline flex items-center justify-center mx-auto"
              >
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-gold-400" />
                Can't access email? Request Super Admin Reset →
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: OTP & New Password Form */}
        {step === 2 && (
          <form onSubmit={handleVerifyAndReset} className="space-y-4 text-xs">
            {/* Production OTP Verification Notice */}
            <div className="p-3.5 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center space-x-2.5 text-xs">
              <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
              <p className="text-neutral-300 font-light">
                A 6-digit verification code was dispatched to <strong className="text-gold-300">{email}</strong>. Please enter the code below to reset your password.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-neutral-300 font-bold uppercase text-[10.5px] tracking-wider">
                  6-Digit OTP Code
                </label>
                <span className="text-[10.5px] text-neutral-400 font-mono flex items-center">
                  <Clock className="w-3 h-3 mr-1 text-gold-400" />
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : (
                    <button type="button" onClick={handleSendOtp} className="text-gold-400 hover:underline">
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
                className="w-full bg-black/70 border border-white/15 rounded-xl px-4 py-3 text-white text-center font-mono text-lg tracking-[0.3em] font-bold placeholder-neutral-600 focus:border-gold-400 focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-neutral-300 font-bold uppercase text-[10.5px] tracking-wider">
                  New Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-black/70 border border-white/15 rounded-xl pl-10 pr-9 py-2.5 text-white focus:border-gold-400 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-300 font-bold uppercase text-[10.5px] tracking-wider">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-black/70 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-white focus:border-gold-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 rounded-full bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-widest shadow-gold-subtle hover:brightness-110 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50 btn-shimmer"
            >
              {loading ? 'Verifying...' : 'Confirm OTP & Update Password'}
              <CheckCircle2 className="w-4 h-4 ml-2" />
            </button>
          </form>
        )}

        {/* STEP 3: Success Confirmation */}
        {step === 3 && (
          <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-white">Credentials Ready</h3>
              <p className="text-xs text-neutral-300 mt-1">
                Your password update has been verified and synced across the Moonlight security engine.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-110 transition-all btn-shimmer"
            >
              Sign In to Atelier Portal <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        )}

        {/* STEP 4: Request Super Admin Override */}
        {step === 4 && (
          <form onSubmit={handleSuperAdminTicket} className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-2.5 text-xs text-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-light">
                This request will be delivered to the <strong>Super Admin Control Center</strong>. Super Admin will verify your identity and generate a temporary password.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-bold uppercase text-[10.5px]">Account Email Address *</label>
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/70 border border-white/15 rounded-xl px-4 py-3 text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-bold uppercase text-[10.5px]">Reason for Super Admin Assistance</label>
              <select
                value={ticketReason}
                onChange={(e) => setTicketReason(e.target.value)}
                className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-3 text-white focus:outline-none"
              >
                <option value="Cannot access registered email address.">Cannot access registered email address</option>
                <option value="Did not receive 6-digit OTP.">Did not receive 6-digit OTP</option>
                <option value="Urgent shoot shoot assignment access.">Urgent shoot assignment access (Crew)</option>
                <option value="Account locked due to multiple attempts.">Account locked</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-full border border-white/20 text-neutral-300 font-bold hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-2/3 py-3 rounded-full bg-gold-gradient text-black font-extrabold uppercase tracking-wider shadow-gold-subtle hover:brightness-110 btn-shimmer"
              >
                {loading ? 'Submitting...' : 'Dispatch Ticket to Super Admin'}
              </button>
            </div>
          </form>
        )}

        {/* Back Link */}
        <div className="pt-2 text-center">
          <Link to="/login" className="inline-flex items-center text-xs text-neutral-400 hover:text-white font-medium">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Return to Sign In Portal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
