import React, { useState } from 'react';
import {
  Shirt,
  Building,
  Car,
  Plane,
  CloudSun,
  Gift,
  Phone,
  Sparkles,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';

const ThingsToKnow = ({ invitation, theme }) => {
  const [openAccordion, setOpenAccordion] = useState('dress-code');

  const dressCode = invitation.dress_code || {
    title: 'Royal Ethnic & Pastel Glamour',
    description: 'We encourage our guests to dress in celebratory traditional Indian attire or formal evening wear.',
    palette: [
      { event: 'Haldi', colors: 'Turmeric Yellow, Mustard & Floral White' },
      { event: 'Mehendi', colors: 'Mint Green, Sage, Emerald & Rose Gold' },
      { event: 'Sangeet', colors: 'Sequins, Shimmering Gold & Royal Blue' },
      { event: 'Wedding', colors: 'Regal Ivory, Crimson Velvet & Gold' },
    ],
  };

  const accommodation = invitation.accommodation_info || {
    hotel: 'Jehan Numa Palace & Jehan Numa Retreat',
    address: '152 Shamla Hills, Bhopal, Madhya Pradesh 462013',
    details: 'Complimentary luxury room arrangements and hospitality desk available for all out-of-town guests from Nov 19 to Nov 22.',
  };

  const parking = invitation.parking_info || {
    valet: 'Complimentary Valet Parking Available',
    instructions: 'Please pull up to the main Palace Portico where our valet attendants will assist you.',
  };

  const weather = invitation.weather_info || {
    summary: 'Pleasant & Cool (16°C – 26°C)',
    note: 'Bhopal evenings in late November are delightfully crisp. Light evening shawls or jackets are recommended for open-air lawn ceremonies.',
  };

  const giftInfo = invitation.gift_info || 'Your presence, blessings, and warm wishes are the greatest gifts we could ever ask for.';

  const modules = [
    {
      id: 'dress-code',
      icon: <Shirt className="w-4 h-4 text-amber-400" />,
      title: 'Dress Code & Palette',
      summary: dressCode.title || 'Royal Indian Attire',
      content: (
        <div className="space-y-3 pt-2">
          <p className="text-xs text-neutral-300 leading-relaxed font-sans">{dressCode.description}</p>
          {dressCode.palette && (
            <div className="space-y-1.5 pt-1">
              {dressCode.palette.map((p, i) => (
                <div key={i} className="flex items-center justify-between text-[11px] p-2 rounded-xl bg-black/30 border border-white/5">
                  <span className="font-bold text-amber-300">{p.event}:</span>
                  <span className="text-neutral-300 text-right">{p.colors}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'accommodation',
      icon: <Building className="w-4 h-4 text-amber-400" />,
      title: 'Accommodation & Stay',
      summary: accommodation.hotel || 'Hospitality Arrangements',
      content: (
        <div className="space-y-2 pt-2 text-xs text-neutral-300 font-sans">
          <p className="font-bold text-white">{accommodation.hotel}</p>
          <p className="text-[11px] text-neutral-400">{accommodation.address}</p>
          <p className="pt-1 text-neutral-300 leading-relaxed">{accommodation.details}</p>
        </div>
      ),
    },
    {
      id: 'parking',
      icon: <Car className="w-4 h-4 text-amber-400" />,
      title: 'Valet & Parking',
      summary: parking.valet || 'Valet Service Available',
      content: (
        <div className="space-y-2 pt-2 text-xs text-neutral-300 font-sans">
          <p className="font-bold text-white">{parking.valet}</p>
          <p className="leading-relaxed">{parking.instructions}</p>
        </div>
      ),
    },
    {
      id: 'weather',
      icon: <CloudSun className="w-4 h-4 text-amber-400" />,
      title: 'Weather & Climate',
      summary: weather.summary || 'Pleasant & Crisp Evenings',
      content: (
        <div className="space-y-2 pt-2 text-xs text-neutral-300 font-sans">
          <p className="font-bold text-amber-300">{weather.summary}</p>
          <p className="leading-relaxed">{weather.note}</p>
        </div>
      ),
    },
    {
      id: 'gifts',
      icon: <Gift className="w-4 h-4 text-amber-400" />,
      title: 'Blessings & Gifts',
      summary: 'No Boxed Gifts Requested',
      content: (
        <div className="pt-2 text-xs text-neutral-300 leading-relaxed font-sans italic">
          "{giftInfo}"
        </div>
      ),
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 max-w-xl mx-auto space-y-6 font-sans">
      <div className="text-center space-y-1.5">
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
          ✦ Essential Details ✦
        </span>
        <h2
          className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r ${theme.goldGradient} bg-clip-text text-transparent`}
        >
          Things To Know
        </h2>
        <div className="w-12 h-0.5 bg-amber-500/40 mx-auto" />
      </div>

      <div className="space-y-3">
        {modules.map((m) => {
          const isOpen = openAccordion === m.id;
          return (
            <div
              key={m.id}
              className={`${theme.cardBg} backdrop-blur-md rounded-2xl border ${theme.borderColor} overflow-hidden shadow-md transition-all`}
            >
              <button
                type="button"
                onClick={() => setOpenAccordion(isOpen ? null : m.id)}
                className="w-full p-4 text-left flex items-center justify-between transition-colors hover:bg-white/5"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
                    {m.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-white">{m.title}</h3>
                    <p className="text-[11px] text-amber-200/70 truncate max-w-[220px] sm:max-w-xs font-sans">
                      {m.summary}
                    </p>
                  </div>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-amber-400 transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-white/5 animate-fade-in">
                  {m.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ThingsToKnow;
