import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Award, Camera, Film, ShieldCheck, Heart, ArrowRight, Phone, Instagram } from 'lucide-react';

const teamMembers = [
  {
    name: 'Lead Director',
    role: 'Founder & Executive Creative Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Dedicated to immortalizing emotions, royal wedding grandeur, and cinematic storytelling across India and worldwide destinations.',
  },
  {
    name: 'Master Lead Photographer',
    role: 'Head of Royal Portraiture',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    bio: 'Renowned for authentic couple chemistry, mastering medium-format depth, and capturing candid moments without intrusion.',
  },
  {
    name: 'Senior Cinema Director',
    role: 'Director of 4K Docu-Films',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'Pioneered slow-burn, emotionally immersive wedding docu-films scored with bespoke emotional sound tracks.',
  },
  {
    name: 'Aerial Master Cinematographer',
    role: 'Director of Aerial Sweeps & Drones',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    bio: 'Certified commercial drone pilot crafting grand architectural sweeps over iconic palaces, resorts, and celebrations.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-obsidian text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Hero Narrative */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-[0.35em] text-gold-400 font-semibold block">
            Our Heritage & Philosophy
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Moonlight Production & Films
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
            Moonlight Production was founded on a singular conviction: that a wedding is not a sequence of posed checkboxes, but a sacred, once-in-a-lifetime tapestry of human emotion.
          </p>
        </div>

        {/* Brand Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
              alt="Moonlight Production Experience"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60" />
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold">
              The Unobtrusive Art of Quiet Observation
            </h2>
            <p className="text-sm text-neutral-300 font-light leading-relaxed">
              We reject chaotic camera crews and harsh artificial lights that interrupt sacred moments. Our masters move with the discretion of shadows, observing the subtle glances, the trembling hands during vows, and the unspoken tears of parents.
            </p>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              Each frame is thoughtfully composed with painterly regard for light, architecture, and texture. Back at our studio, our senior colorists and editors spend hundreds of hours sculpting custom color grades and scoring emotional compositions tailored to each couple.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-xl bg-obsidian-400 border border-white/10">
                <Award className="w-6 h-6 text-gold-400 mb-2" />
                <h4 className="font-serif text-sm font-bold text-white">Award-Winning</h4>
                <p className="text-xs text-neutral-400">Featured across wedding platforms & prestigious celebrations</p>
              </div>
              <div className="p-4 rounded-xl bg-obsidian-400 border border-white/10">
                <Camera className="w-6 h-6 text-gold-400 mb-2" />
                <h4 className="font-serif text-sm font-bold text-white">Flagship Optics</h4>
                <p className="text-xs text-neutral-400">Full-frame mirrorless & 4K cinema systems</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Showcase */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-gold-400 font-semibold">The Masters</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold">Meet Our Creative Team</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="luxury-card rounded-2xl p-6 text-center space-y-4 group">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-gold-500/50 group-hover:scale-105 transition-transform">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-xs text-gold-400 uppercase tracking-wider font-mono mt-0.5">{member.role}</p>
                </div>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-8 space-y-4">
          <Link
            to="/enquiry"
            className="inline-flex items-center px-8 py-4 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-widest shadow-gold-glow hover:brightness-110 transition-all btn-shimmer"
          >
            Commission Your Wedding Story With Moonlight Production <ArrowRight className="w-4 h-4 ml-2" />
          </Link>

          <div className="flex justify-center space-x-6 pt-4 text-xs font-mono text-neutral-400">
            <a href="https://api.whatsapp.com/send?phone=919229229323" target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-white flex items-center">
              <Phone className="w-3.5 h-3.5 mr-1" /> +91 92292 29323
            </a>
            <a href="https://instagram.com/moonlight_production__" target="_blank" rel="noreferrer" className="text-pink-400 hover:text-white flex items-center">
              <Instagram className="w-3.5 h-3.5 mr-1" /> @moonlight_production__
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
