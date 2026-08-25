import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Award, Camera, Film, ShieldCheck, Heart, ArrowRight, Phone, Instagram } from 'lucide-react';

const teamMembers = [
  {
    name: 'Executive Studio Director',
    role: 'Founder & Principal Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Dedicated to immortalizing raw emotions, royal Indian wedding grandeur, and cinematic storytelling across central India and heritage destinations.',
  },
  {
    name: 'Lead Candid Master',
    role: 'Head of Royal Portraiture',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    bio: 'Renowned for authentic couple chemistry, mastering natural light depth, and capturing intimate candid moments without intrusion.',
  },
  {
    name: 'Senior Cinema Director',
    role: 'Director of 4K Feature Films',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'Pioneered emotionally immersive wedding documentary films scored with bespoke traditional and modern Indian musical scores.',
  },
  {
    name: 'Master Aerial Cinematographer',
    role: 'Director of Aerial Sweeps & Drones',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    bio: 'Certified commercial drone pilot crafting grand architectural sweeps over historic forts, river ghats, and royal palaces.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-black pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">
        {/* Hero Narrative */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-gold-800 font-black block">
            Our Heritage & Philosophy
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-black leading-tight">
            Moonlight Production & Films
          </h1>
          <p className="text-neutral-800 text-sm sm:text-base font-semibold leading-relaxed">
            Moonlight Production was founded on a singular conviction: that a wedding is not a sequence of posed checkboxes, but a sacred, once-in-a-lifetime tapestry of human emotion.
          </p>
        </div>

        {/* Brand Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-neutral-300 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
              alt="Moonlight Production Experience"
              className="w-full h-full object-cover filter brightness-95"
            />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h2 className="font-serif text-2xl sm:text-4xl text-black font-black">
              The Unobtrusive Art of Quiet Observation
            </h2>
            <p className="text-xs sm:text-sm text-neutral-800 font-medium leading-relaxed">
              We reject chaotic camera crews and harsh artificial lights that interrupt sacred moments. Our masters move with the discretion of shadows, observing the subtle glances, the sacred Vedic pheras, and the unspoken tears of parents.
            </p>
            <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed">
              Each frame is thoughtfully composed with painterly regard for light, architecture, and texture. Back at our studio, our senior colorists and editors spend hundreds of hours sculpting custom color grades and scoring emotional compositions tailored to each couple.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t-2 border-neutral-200">
              <div className="p-4 rounded-2xl bg-white border-2 border-neutral-300 shadow-sm">
                <Award className="w-6 h-6 text-gold-700 mb-2" />
                <h4 className="font-serif text-base font-black text-black">Award-Winning</h4>
                <p className="text-xs text-neutral-700 font-medium mt-1">Featured across leading Indian wedding publications</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border-2 border-neutral-300 shadow-sm">
                <Camera className="w-6 h-6 text-gold-700 mb-2" />
                <h4 className="font-serif text-base font-black text-black">Flagship Optics</h4>
                <p className="text-xs text-neutral-700 font-medium mt-1">Full-frame mirrorless & 4K cinema systems</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Showcase */}
        <div className="space-y-8 sm:space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-mono tracking-[0.2em] text-gold-800 font-black">The Masters</span>
            <h2 className="font-serif text-2xl sm:text-4xl text-black font-black">Meet Our Creative Team</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 text-center space-y-3 border-2 border-neutral-300 shadow-lg group hover:shadow-2xl transition-all">
                <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-black group-hover:scale-105 transition-transform shadow-md">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-black text-black">{member.name}</h3>
                  <p className="text-[11px] text-gold-800 uppercase tracking-wider font-mono font-black mt-0.5">{member.role}</p>
                </div>
                <p className="text-xs text-neutral-700 font-medium leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-6 space-y-4">
          <Link
            to="/enquiry"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-widest shadow-xl hover:brightness-110 transition-all btn-shimmer"
          >
            Commission Your Wedding Shoot With Moonlight Production <ArrowRight className="w-4 h-4 ml-2 text-gold-400" />
          </Link>

          <div className="flex justify-center space-x-6 pt-2 text-xs font-mono text-neutral-800 font-bold">
            <a href="https://api.whatsapp.com/send?phone=919229229323" target="_blank" rel="noreferrer" className="text-emerald-700 hover:text-emerald-900 flex items-center font-black">
              <Phone className="w-3.5 h-3.5 mr-1" /> +91 92292 29323
            </a>
            <a href="https://instagram.com/moonlight_production__" target="_blank" rel="noreferrer" className="text-pink-700 hover:text-pink-900 flex items-center font-black">
              <Instagram className="w-3.5 h-3.5 mr-1" /> @moonlight_production__
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
