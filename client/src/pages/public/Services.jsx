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
      'Multi-Camera 4K Live Stream for Global Relatives',
      'Signature Velvet Memory Box with Master Flash Drive',
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
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-gold-700 font-bold block">
            Moonlight Production Packages
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900">
            Indian Wedding Photography & Cinema Tiers
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base font-light max-w-xl mx-auto">
            From regal palace ceremonies to intimate destination rendezvous, every commission is executed with master craftsmanship.
          </p>
        </div>

        {/* Services List */}
        {loading ? (
          <CardSkeleton count={4} height="h-96" />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.iconName] || Camera;
              return (
                <div
                  key={service._id || index}
                  className="bg-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden border border-neutral-200 shadow-xl hover:shadow-2xl transition-all"
                >
                  {service.isPopular && (
                    <div className="absolute top-6 right-6">
                      <span className="px-3.5 py-1 rounded-full bg-gold-100 border border-gold-400 text-gold-900 font-bold text-[10px] uppercase tracking-widest shadow-sm">
                        Signature Royal Tier
                      </span>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-700 shadow-sm">
                      <IconComponent className="w-7 h-7" />
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                        {service.fullDescription || service.shortDescription}
                      </p>
                    </div>

                    {/* Features & Deliverables */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-gold-800 font-bold mb-3">
                          Coverage Inclusions
                        </h4>
                        <ul className="space-y-2 text-xs text-neutral-700">
                          {service.features?.map((f, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-gold-800 font-bold mb-3">
                          Master Deliverables
                        </h4>
                        <ul className="space-y-2 text-xs text-neutral-700">
                          {service.deliverables?.map((d, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <Sparkles className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono block">Investment Guide</span>
                      <div className="flex items-baseline space-x-2">
                        <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-800">
                          ₹{service.startingPrice?.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-neutral-500 font-sans">{service.priceUnit || 'onwards'}</span>
                      </div>
                    </div>

                    <Link
                      to="/enquiry"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-neutral-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
                    >
                      Book This Tier <ArrowRight className="w-3.5 h-3.5 ml-2 text-gold-400" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FAQ Section (Light Theme) */}
        <div className="mt-20 pt-16 border-t border-neutral-200 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-gold-700 font-bold">Common Queries</span>
            <h2 className="font-serif text-3xl text-neutral-900 font-bold">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-md space-y-2">
              <h4 className="font-serif text-base text-neutral-900 font-bold">How far in advance should we book our wedding dates?</h4>
              <p className="text-neutral-600 font-light leading-relaxed">
                Because Moonlight Production reserves exclusive dates for one major wedding per weekend, auspicious wedding muhurat dates (October to March) are usually blocked 4 to 8 months in advance.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-md space-y-2">
              <h4 className="font-serif text-base text-neutral-900 font-bold">Do you travel across India for destination weddings?</h4>
              <p className="text-neutral-600 font-light leading-relaxed">
                Yes! We frequently film destination weddings across Udaipur, Jaipur, Jodhpur, Maheshwar, Bhopal, Goa, Mumbai, Delhi, and Kerala. Our dedicated cinematography and drone team handles all on-location gear logistics.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-md space-y-2">
              <h4 className="font-serif text-base text-neutral-900 font-bold">What is your delivery timeline and terms?</h4>
              <p className="text-neutral-600 font-light leading-relaxed">
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
