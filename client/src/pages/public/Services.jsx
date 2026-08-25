import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { CardSkeleton } from '../../components/common/SkeletonLoader';
import { Camera, Film, Compass, Plane, BookOpen, Tv, CheckCircle2, ArrowRight, Sparkles, Phone } from 'lucide-react';

const iconMap = {
  Camera,
  Film,
  Compass,
  Plane,
  BookOpen,
  Tv,
};

const defaultServices = [
  {
    _id: 'srv-1',
    title: 'The Royal Indian Wedding Suite',
    iconName: 'Camera',
    shortDescription: 'Full 3-Day royal Indian celebration coverage including Mehendi, Sangeet Night, Haldi, Baraat, Pheras, and Grand Reception.',
    features: [
      'Comprehensive 3-Day Photo & Video Coverage',
      'Dual Lead Cinematographers & Senior Portrait Photographers',
      '4K Cinematic Teaser + Full Wedding Docu-Film',
      'Ultra-HD 4K Drone Aerial Sweeps',
    ],
    deliverables: [
      '800+ Master Color-Graded High-Res Photos',
      '1x 4K Cinematic Wedding Feature Film (15-25 min)',
      '1x 1-Min Instagram Reel Teaser (within 72 hrs)',
      '2x Handcrafted Luxury Flush-Mount Photo Albums',
    ],
    startingPrice: 500000,
    priceUnit: 'for 3-day royal celebrations',
    isPopular: true,
  },
  {
    _id: 'srv-2',
    title: 'Cinematic Pre-Wedding Shoot',
    iconName: 'Film',
    shortDescription: 'Bespoke cinematic romance shoot in Maheshwar Ghats, Udaipur Palaces, Bhopal Heritage, or Mumbai Seasides.',
    features: [
      '1-2 Full Days On-Location Creative Direction',
      '3-4 Wardrobe Changes & Theme Styling',
      '4K Drone Aerial Architecture Shots',
      'Live Song Scoring & Audio Direction',
    ],
    deliverables: [
      '60+ Fine-Art Color-Graded Portraits',
      '1x 4K Cinematic Music Video / Trailer (3-5 min)',
      'High-Res Digital Gallery for Wedding Invitations',
    ],
    startingPrice: 150000,
    priceUnit: 'per destination shoot',
    isPopular: false,
  },
  {
    _id: 'srv-3',
    title: 'Destination Wedding Master Commission',
    iconName: 'Plane',
    shortDescription: 'All-inclusive coverage for destination weddings in Goa, Rajasthan forts, Kerala backwaters, or Central India heritage resorts.',
    features: [
      'Full Crew Travel & Insured Cinema Kit Bundled',
      'Pre-Wedding Sunset Shoot in Destination City',
      'Multi-Camera 4K Live Stream for Relatives',
      'Signature Memory Box with Master Flash Drive',
    ],
    deliverables: [
      '1200+ Master High-Resolution Photos',
      '1x 4K Royal Destination Docu-Cinema',
      '1x 4K Drone Aerial Cinematic Archive',
      'Private PIN-Protected Cloud Gallery for 6 Months',
    ],
    startingPrice: 850000,
    priceUnit: 'complete package',
    isPopular: false,
  },
  {
    _id: 'srv-4',
    title: 'Intimate Wedding & Engagement Suite',
    iconName: 'Sparkles',
    shortDescription: 'Designed for intimate ceremonies, temple weddings, and ring ceremony / engagement celebrations with family.',
    features: [
      '1-2 Day Candid & Traditional Coverage',
      '1 Lead Photographer + 1 Cinematographer',
      'Express Delivery for Social Media Announcements',
    ],
    deliverables: [
      '400+ High-Resolution Graded Photographs',
      '1x 4K Emotional Highlight Film (5-10 min)',
      '1x Premium Photo Storybook Album',
    ],
    startingPrice: 250000,
    priceUnit: 'starting investment',
    isPopular: false,
  },
];

const Services = () => {
  const [services, setServices] = useState(defaultServices);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        if (res.data && res.data.length > 0) {
          setServices(res.data);
        }
      } catch (err) {
        console.error('Error loading services, using defaults', err);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-mono tracking-[0.35em] text-gold-400 font-bold block">
            Moonlight Production Packages
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white">
            Indian Wedding Photography & Cinema Tiers
          </h1>
          <p className="text-neutral-300 text-xs sm:text-base font-light max-w-xl mx-auto">
            From regal palace ceremonies to intimate destination rendezvous, every commission is executed with master craftsmanship.
          </p>
        </div>

        {/* Services List */}
        {loading ? (
          <CardSkeleton count={4} height="h-96" />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.iconName] || Camera;
              return (
                <div
                  key={service._id || index}
                  className="bg-[#141418] rounded-3xl p-6 sm:p-10 flex flex-col justify-between space-y-6 sm:space-y-8 relative overflow-hidden border border-white/10 hover:border-gold-500/50 shadow-2xl transition-all"
                >
                  {service.isPopular && (
                    <div className="absolute top-5 right-5 sm:top-6 sm:right-6">
                      <span className="px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 font-bold text-[9.5px] sm:text-[10px] uppercase tracking-widest shadow-sm">
                        Signature Royal Tier
                      </span>
                    </div>
                  )}

                  <div className="space-y-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gold-500/15 border border-gold-500/40 flex items-center justify-center text-gold-400 shadow-sm">
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                        {service.fullDescription || service.shortDescription}
                      </p>
                    </div>

                    {/* Features & Deliverables */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-white/10">
                      <div>
                        <h4 className="text-[11px] uppercase font-mono tracking-wider text-gold-400 font-bold mb-2.5">
                          Coverage Inclusions
                        </h4>
                        <ul className="space-y-2 text-xs text-neutral-300 font-light">
                          {service.features?.map((f, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-[11px] uppercase font-mono tracking-wider text-gold-400 font-bold mb-2.5">
                          Master Deliverables
                        </h4>
                        <ul className="space-y-2 text-xs text-neutral-300 font-light">
                          {service.deliverables?.map((d, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-mono block">Investment Guide</span>
                      <div className="flex items-baseline space-x-2">
                        <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-300">
                          ₹{service.startingPrice?.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-neutral-400 font-sans">{service.priceUnit || 'onwards'}</span>
                      </div>
                    </div>

                    <Link
                      to="/enquiry"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-gold-subtle hover:brightness-110 active:scale-95 btn-shimmer"
                    >
                      Book This Tier <ArrowRight className="w-3.5 h-3.5 ml-2 text-black" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-16 pt-12 border-t border-white/10 max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs uppercase font-mono tracking-[0.2em] text-gold-400 font-bold">Common Queries</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#141418] border border-white/10 shadow-md space-y-1.5">
              <h4 className="font-serif text-base text-white font-bold">How far in advance should we book our wedding dates?</h4>
              <p className="text-neutral-300 font-light leading-relaxed">
                Because Moonlight Production reserves exclusive dates for one major wedding per weekend, auspicious wedding muhurat dates (October to March) are usually blocked 4 to 8 months in advance.
              </p>
            </div>
            <div className="p-5 sm:p-6 rounded-2xl bg-[#141418] border border-white/10 shadow-md space-y-1.5">
              <h4 className="font-serif text-base text-white font-bold">Do you travel across India for destination weddings?</h4>
              <p className="text-neutral-300 font-light leading-relaxed">
                Yes! We frequently film destination weddings across Udaipur, Jaipur, Jodhpur, Maheshwar, Bhopal, Goa, Mumbai, Delhi, and Kerala. Our dedicated cinematography and drone team handles all on-location gear logistics.
              </p>
            </div>
            <div className="p-5 sm:p-6 rounded-2xl bg-[#141418] border border-white/10 shadow-md space-y-1.5">
              <h4 className="font-serif text-base text-white font-bold">What is your delivery timeline and terms?</h4>
              <p className="text-neutral-300 font-light leading-relaxed">
                Teaser photographs and reels are shared within 72 hours. The complete color-graded high-resolution photos and 4K cinema films are delivered within 90 days (3 months). 30% advance booking is required to reserve dates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
