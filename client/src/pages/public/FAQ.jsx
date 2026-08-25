import React, { useState } from 'react';
import { ChevronDown, Sparkles, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    q: 'How early should we book Moonlight Production for our wedding?',
    a: 'Due to our exclusive commitment to covering limited grand wedding commissions per wedding season to maintain high artistic quality, we recommend inquiring 4 to 8 months in advance, especially for auspicious muhurat dates in Udaipur, Jaipur, Maheshwar, Bhopal, and Goa.',
  },
  {
    q: 'Do you travel across India for destination weddings?',
    a: 'Yes! We regularly travel for destination celebrations across Rajasthan (Udaipur, Jaipur, Jodhpur), Madhya Pradesh (Maheshwar Ghats, Bhopal heritage resorts), Goa, Mumbai, Delhi, and South India with our dedicated full-frame cinema kits and 4K drone gear.',
  },
  {
    q: 'How are our high-resolution private galleries delivered and protected?',
    a: 'Every couple receives an exclusive client sanctuary portal featuring PIN-protected private galleries (Default PIN: 2026). You can view full-resolution photos, select favorites for luxury photo albums, and download without compression.',
  },
  {
    q: 'What is your turnaround time for wedding films and photo deliverables?',
    a: 'We deliver social media teaser reels and photos within 72 hours of your wedding festivities. The complete master color-graded high-resolution photos and 4K docu-film are delivered within 90 days (3 months).',
  },
  {
    q: 'What are your payment terms and booking schedule?',
    a: 'We require a 30% advance booking fee to block and lock your dates exclusively. 50% is due prior to wedding commencement, and the remaining 20% balance upon final deliverable handover.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen bg-obsidian text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-gold-400 font-semibold block">
            Frequently Inquired
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">Client Questions & Information</h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl mx-auto">
            Everything you need to know about Moonlight Production, our Indian wedding shoot workflows, and deliverables.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="luxury-card rounded-2xl border border-white/10 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between space-x-4"
              >
                <h3 className="font-serif text-lg font-bold text-white">{faq.q}</h3>
                <ChevronDown className={`w-5 h-5 text-gold-400 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6 text-xs text-neutral-300 font-light leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-8 rounded-3xl bg-obsidian-400 border border-gold-500/30 text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold text-white">Have Questions About Your Wedding Dates?</h3>
          <p className="text-xs text-neutral-300 font-light max-w-md mx-auto">
            Our creative directors are available directly on WhatsApp and phone consultations.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <a
              href="https://api.whatsapp.com/send?phone=919229229323"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5" /> WhatsApp: +91 92292 29323
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle"
            >
              Contact Studio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
