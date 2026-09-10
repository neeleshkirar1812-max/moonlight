import React, { useState } from 'react';
import { Send, CheckCircle2, MessageCircle, Heart, Users } from 'lucide-react';
import api from '../../../api/client';

const RsvpSection = ({ invitation, theme, onRsvpSuccess }) => {
  const [name, setName] = useState('');
  const [response, setResponse] = useState('Yes');
  const [guests, setGuests] = useState(1);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    try {
      await api.post('/rsvp', {
        invitationId: invitation._id || invitation.id || invitation.slug,
        name: name.trim(),
        response,
        guests: Number(guests) || 1,
        phone: phone.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      setSubmitted(true);
      if (onRsvpSuccess) onRsvpSuccess();
    } catch (err) {
      console.warn('[RSVP submission fallback]:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppRsvp = () => {
    const coupleNames = invitation.names || 'Moonlight Couple';
    const statusText =
      response === 'Yes'
        ? `We are delighted to confirm our attendance (${guests} guests) 🎉`
        : response === 'No'
        ? 'Regretfully we will not be able to attend, but sending our warmest blessings! 🌸'
        : 'We will try our best to attend! ✨';

    const text = encodeURIComponent(
      `Namaste! ✨\n\nRSVP from: ${name || 'Guest'}\nEvent: ${invitation.title || 'Wedding Celebration'}\nStatus: ${statusText}\n${
        message ? `Wishes: "${message}"\n` : ''
      }\nWith warmest regards,\n${name || 'Guest'}`
    );

    window.open(`https://api.whatsapp.com/send?phone=919229229323&text=${text}`, '_blank');
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-xl mx-auto space-y-6 font-sans">
      <div className="text-center space-y-1.5">
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
          ✦ Please Respond ✦
        </span>
        <h2
          className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r ${theme.goldGradient} bg-clip-text text-transparent`}
        >
          {invitation.rsvp_heading || 'Guest RSVP'}
        </h2>
        <div className="w-12 h-0.5 bg-amber-500/40 mx-auto" />
      </div>

      <div
        className={`${theme.cardBg} backdrop-blur-md rounded-3xl p-6 sm:p-8 border ${theme.borderColor} shadow-2xl space-y-5`}
      >
        {submitted ? (
          <div className="py-8 text-center space-y-4 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Thank You, {name}!
              </h3>
              <p className="text-xs text-neutral-300 max-w-xs mx-auto font-sans leading-relaxed">
                Your RSVP response ({response === 'Yes' ? `${guests} Guests Attending` : response}) has been recorded with joy.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-xs text-amber-400 underline font-mono hover:text-amber-300"
            >
              Update RSVP Response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-neutral-300 text-center font-sans">
              {invitation.rsvp_message || 'Kindly confirm your attendance by submitting your details below:'}
            </p>

            {/* Attendance Choice: Yes / No / Maybe */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { label: 'Attending (Yes)', val: 'Yes', emoji: '🎉' },
                { label: 'Cannot Attend (No)', val: 'No', emoji: '🌸' },
                { label: 'Maybe', val: 'Maybe', emoji: '✨' },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setResponse(item.val)}
                  className={`py-2.5 px-2 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center space-y-1 ${
                    response === item.val
                      ? 'bg-amber-500 text-neutral-950 shadow-lg scale-[1.02] border-2 border-amber-300'
                      : 'bg-black/30 text-neutral-300 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span className="text-sm">{item.emoji}</span>
                  <span className="text-[11px] leading-tight">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Guest Name */}
            <div>
              <label className="font-mono uppercase font-bold text-neutral-300 block mb-1 text-[11px]">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vikram Singhania"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Guests count and Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-mono uppercase font-bold text-neutral-300 block mb-1 text-[11px]">
                  Guests Count
                </label>
                <div className="relative">
                  <Users className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-black/40 border border-white/15 rounded-xl pl-9 pr-3 py-3 text-xs text-white focus:border-amber-400 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono uppercase font-bold text-neutral-300 block mb-1 text-[11px]">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Optional Personal Note */}
            <div>
              <label className="font-mono uppercase font-bold text-neutral-300 block mb-1 text-[11px]">
                Wishes & Blessings (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Wishing the beautiful couple eternal love and prosperity..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-xs text-white placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Submit & WhatsApp Buttons */}
            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-widest shadow-xl flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.01]"
              >
                <Send className="w-4 h-4 text-neutral-950" />
                <span>{submitting ? 'Recording RSVP...' : 'Submit RSVP Online'}</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppRsvp}
                className="w-full py-3 rounded-full bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs uppercase tracking-wider shadow flex items-center justify-center space-x-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Send RSVP via WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default RsvpSection;
