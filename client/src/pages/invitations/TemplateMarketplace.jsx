import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';
import SEO from '../../components/common/SEO';
import {
  Crown,
  Eye,
  ChevronDown,
  Sparkles,
  Heart,
  CheckCircle2,
  Lock,
} from 'lucide-react';

const invitationTypes = [
  { id: 'wedding', label: 'Wedding Invitation' },
  { id: 'hindi-invitations', label: 'हिंदी निमंत्रण / Hindi Invitations' },
  { id: 'engagement', label: 'Engagement Invitation' },
  { id: 'wedding-reception', label: 'Wedding & Reception Invitation' },
  { id: 'reception', label: 'Reception only invitation' },
  { id: 'birthday', label: 'Birthday Invitation' },
  { id: 'housewarming', label: 'Housewarming Invitations' },
  { id: 'baby-shower', label: 'Baby shower' },
  { id: 'anniversary', label: 'Anniversary Invitation' },
  { id: 'party', label: 'Party Invitations' },
  { id: 'opening-ceremony', label: 'Opening Ceremony Invitation' },
  { id: 'custom', label: 'Custom invitation' },
];

// All 15 Royal 4K Video Gate Templates + 3 Royal Hindi Templates
const royalTemplates = [
  {
    id: 'rose-gold-blush-royal',
    name: 'Royal Imperial',
    desc: 'Cinematic rose-gold opening with luxurious motion storytelling',
    video: '/videos/rose-gold-blush.mp4',
    tag: 'Cinematic 👑',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
  {
    id: 'royal-majesty',
    name: 'Royal Majesty',
    desc: 'Porcelain blue ballroom romance with painterly cinematic grandeur',
    video: '/videos/royal-majesty.mp4',
    tag: 'Palace Luxe',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
  {
    id: 'royal-elegance-royal',
    name: 'Royal Elegance',
    desc: 'Velvet cream and crimson cinematic experience with palace motifs',
    video: '/videos/royal-elegance-royal.mp4',
    tag: 'Crimson Velvet',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
  {
    id: 'royal-prestige',
    name: 'Royal Prestige',
    desc: 'Prestigious cinematic opening with refined elegance and grandeur',
    video: '/videos/royal-prestige.mp4',
    tag: 'Rose Gold',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
  {
    id: 'royal-heritage',
    name: 'Royal Heritage',
    desc: 'Timeless cinematic opening with regal heritage storytelling',
    video: '/videos/royal-heritage.mp4',
    tag: 'Regal Heritage',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
  {
    id: 'royal-grace',
    name: 'Royal Grace',
    desc: 'Sage garden serenity with pearl drapes and graceful cinematic reveal',
    video: '/videos/royal-grace.mp4',
    tag: 'Botanical',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
  {
    id: 'royal-crest',
    name: 'Royal Crest',
    desc: 'Warm ivory florals, antique burgundy wax seal, and lakeside cinematic romance',
    video: '/videos/royal-crest.mp4',
    tag: 'Lakeside',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
  {
    id: 'royal-legacy',
    name: 'Royal Legacy',
    desc: 'Burgundy velvet curtains, antique gold ornament, and a timeless cinematic reveal',
    video: '/videos/royal-legacy.mp4',
    tag: 'Velvet Drapes',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
  {
    id: 'emerald-noir-royal',
    name: 'Royal Emerald Noir',
    desc: '4K emerald green palace video gates with ornate gold inlay and royal symphony',
    video: '/videos/royal-legacy.mp4',
    videoFilter: 'hue-rotate(90deg) saturate(1.4) contrast(1.15) brightness(0.95)',
    tag: 'Emerald Palace',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
  {
    id: 'ivory-elegance-royal',
    name: 'Royal Ivory & Velvet Noir',
    desc: '4K obsidian and champagne gold antique palace video arch with grand orchestral romance',
    video: '/videos/rose-gold-blush.mp4',
    videoFilter: 'sepia(0.6) contrast(1.3) brightness(0.85) saturate(0.8)',
    tag: 'Obsidian Gold',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
  {
    id: 'royal-farman',
    name: 'Royal Shahi Farman',
    desc: 'Mughal & Rajputana royal scroll decree with crimson & gold velvet border, authentic shehnai & nagada audio',
    video: '/videos/rose-gold-blush.mp4',
    videoFilter: 'sepia(0.6) hue-rotate(-20deg) contrast(1.15)',
    tag: 'Shahi Farman 📜',
    tagColor: 'bg-red-700 text-white font-bold',
  },
  {
    id: 'royal-jharokha',
    name: 'Rajputana Jharokha Mandap',
    desc: 'Heritage palace stone arches, glowing diyas, marigold floral cascades, warm sandstone & desert sunset',
    video: '/videos/royal-legacy.mp4',
    videoFilter: 'sepia(0.4) saturate(1.4) contrast(1.1)',
    tag: 'Palace Arch 🪔',
    tagColor: 'bg-amber-600 text-white font-bold',
  },
  {
    id: 'royal-solitaire',
    name: 'Kohinoor Solitaire Luxe',
    desc: 'Platinum sapphire & diamond glimmer, crystal chandeliers, royal monogram crest',
    video: '/videos/royal-majesty.mp4',
    videoFilter: 'brightness(1.1) contrast(1.2) hue-rotate(10deg)',
    tag: 'Diamond Luxe 💎',
    tagColor: 'bg-sky-600 text-white font-bold',
  },
  {
    id: 'royal-emerald-sheesh',
    name: 'Sheesh Mahal Emerald',
    desc: 'Mirrored glass mosaic patterns, emerald-gold gemstone highlights, classical sitar symphony',
    video: '/videos/royal-crest.mp4',
    videoFilter: 'hue-rotate(60deg) saturate(1.3) contrast(1.1)',
    tag: 'Sheesh Mahal ✨',
    tagColor: 'bg-emerald-700 text-white font-bold',
  },
  {
    id: 'royal-destination',
    name: 'Royal Destination Lakefront',
    desc: 'Udaipur Pichola lakefront celebration, boat entry motif, sunset champagne glow',
    video: '/videos/royal-heritage.mp4',
    videoFilter: 'saturate(1.25) contrast(1.05)',
    tag: 'Destination 🏖️',
    tagColor: 'bg-blue-600 text-white font-bold',
  },
  // Royal Hindi
  {
    id: 'royal-shubh-vivah-hindi',
    name: 'राजसी शुभ विवाह (|| श्री गणेशाय नमः ||)',
    desc: 'शुद्ध देवनागरी कैलिग्राफी, गणेश वंदना श्लोक, मांगलिक पाणिग्रहण संस्कार एवं राजसी शहनाई मंगल गान।',
    video: '/videos/royal-elegance-royal.mp4',
    videoFilter: 'contrast(1.15) saturate(1.25)',
    tag: 'वैदिक पत्रिका 🕉️',
    tagColor: 'bg-red-700 text-white font-bold',
    isHindi: true,
  },
  {
    id: 'royal-rajwada-utsav-hindi',
    name: 'राजवाड़ा विवाह महोत्सव',
    desc: 'राजपूताना रजवाड़ी भाषा, शुभ लग्न महोत्सव, हल्दी-कुमकुम, बारात स्वागत एवं प्रीतिभोज का भव्य निमंत्रण।',
    video: '/videos/royal-grace.mp4',
    videoFilter: 'sepia(0.3) saturate(1.3)',
    tag: 'रजवाड़ी ठाठ 👑',
    tagColor: 'bg-amber-700 text-white font-bold',
    isHindi: true,
  },
  {
    id: 'royal-shahi-farman-hindi',
    name: 'शाही फरमान निमंत्रण पत्रिका',
    desc: 'शाही फरमान शैली में सजी देवनागरी पत्रिका, कुलदेवी आशीर्वाद एवं बड़े-बुजुर्गों के वंदनीय संदेश।',
    video: '/videos/rose-gold-blush.mp4',
    videoFilter: 'sepia(0.5) contrast(1.2)',
    tag: 'शाही फरमान 📜',
    tagColor: 'bg-rose-800 text-white font-bold',
    isHindi: true,
  },
];

// All 10 Classic 3D Gate Templates + 3 Classic Hindi Templates
const classicTemplates = [
  {
    id: 'emerald-noir',
    name: 'Emerald Mughal Jaali',
    desc: 'Deep green and gold with ornate corner accents and 3D double door swing opening',
    previewBg: 'bg-gradient-to-br from-[#0c2e1a] to-[#071f11]',
    accentText: 'text-amber-300',
    tag: 'Limited Edition',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
  {
    id: 'ivory-elegance',
    name: 'Crimson Royale Split',
    desc: 'Dark charcoal base with gold and deep red accents, sliding 3D double doors reveal',
    previewBg: 'bg-gradient-to-br from-[#1a1415] via-[#3a1518] to-[#120e0f]',
    accentText: 'text-amber-300',
    tag: 'Most Liked',
    tagColor: 'bg-[#e11d48] text-white font-bold',
  },
  {
    id: 'rose-gold-blush',
    name: 'Rose Gold Floral Arch',
    desc: 'Blush pink and rose gold with ornate floral 3D door swing animation',
    previewBg: 'bg-gradient-to-br from-[#241029] via-[#3d183f] to-[#1a0c1f]',
    accentText: 'text-rose-200',
    tag: 'Romantic',
    tagColor: 'bg-pink-600 text-white font-bold',
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal Sapphire',
    desc: 'Deep navy and gold with geometric patterns and architectural book-style opening',
    previewBg: 'bg-gradient-to-br from-[#0a1324] to-[#132242]',
    accentText: 'text-amber-300',
    tag: 'Contemporary',
    tagColor: 'bg-[#b8860b] text-white font-bold',
  },
  {
    id: 'royal-elegance',
    name: 'Majestic Velvet Drape',
    desc: 'Classic obsidian purple and gold with palace motifs and velvet curtain skew reveal',
    previewBg: 'bg-gradient-to-br from-[#190a29] to-[#2e1065]',
    accentText: 'text-amber-300',
    tag: 'Velvet Noir',
    tagColor: 'bg-[#b8860b] text-white font-bold',
  },
  {
    id: 'classic-farman-scroll',
    name: 'Royal Shahi 3D Scroll',
    desc: '3D vertical unrolling antique parchment scroll with gold tassels and royal wax seal break',
    previewBg: 'bg-gradient-to-br from-[#2b0c0c] to-[#1a0707]',
    accentText: 'text-amber-300',
    tag: '3D Scroll 📜',
    tagColor: 'bg-red-700 text-white font-bold',
  },
  {
    id: 'classic-velvet-envelope',
    name: 'Velvet Envelope Flap & Card',
    desc: '3D luxury velvet envelope with opening flap and smoothly rising gold-foil card',
    previewBg: 'bg-gradient-to-br from-[#2a0e22] to-[#130610]',
    accentText: 'text-amber-300',
    tag: '3D Envelope 💌',
    tagColor: 'bg-purple-700 text-white font-bold',
  },
  {
    id: 'classic-boarding-pass',
    name: 'Destination Luxe Passport',
    desc: 'Destination wedding passport cover & golden boarding ticket with flight code and itinerary',
    previewBg: 'bg-gradient-to-br from-[#061933] to-[#0c2e5c]',
    accentText: 'text-sky-200',
    tag: 'Passport ✈️',
    tagColor: 'bg-sky-600 text-white font-bold',
  },
  {
    id: 'classic-marigold-utsav',
    name: 'Marigold Temple Bells Gate',
    desc: 'Traditional brass temple bells & marigold flower garland curtains parting open with chimes',
    previewBg: 'bg-gradient-to-br from-[#3b1704] to-[#210c02]',
    accentText: 'text-amber-300',
    tag: 'Temple Bells 🔔',
    tagColor: 'bg-amber-600 text-white font-bold',
  },
  {
    id: 'classic-starlight-galaxy',
    name: 'Celestial Zodiac Harmony',
    desc: 'Deep midnight galaxy starfield with bride & groom zodiac constellations connecting',
    previewBg: 'bg-gradient-to-br from-[#070b24] to-[#12194a]',
    accentText: 'text-purple-200',
    tag: 'Galaxy 🌌',
    tagColor: 'bg-purple-800 text-white font-bold',
  },
  // Classic Hindi
  {
    id: 'classic-pavitra-bandhan-hindi',
    name: 'पवित्र बंधन विवाह पत्रिका',
    desc: '3D मंदिर द्वार उद्घाटन, शुभ-लाभ व स्वास्तिक सील, गणेश वंदना एवं परंपरागत हिंदी मांगलिक पत्रिका।',
    previewBg: 'bg-gradient-to-br from-[#380808] to-[#1c0404]',
    accentText: 'text-amber-300',
    tag: 'शुभ लाभ 卐',
    tagColor: 'bg-red-700 text-white font-bold',
    isHindi: true,
  },
  {
    id: 'classic-mandap-sandesh-hindi',
    name: 'मंगल मंडप संदेश',
    desc: 'गेंद के फूलों से सजा राजसी द्वार, मंगल कलश व दीप प्रज्वलन संदेश के साथ भव्य हिंदी निमंत्रण।',
    previewBg: 'bg-gradient-to-br from-[#361503] to-[#1a0a01]',
    accentText: 'text-amber-300',
    tag: 'स्वागताम् 🪔',
    tagColor: 'bg-amber-600 text-white font-bold',
    isHindi: true,
  },
  {
    id: 'classic-anand-utsav-hindi',
    name: 'आनंद उत्सव निमंत्रण',
    desc: 'रॉयल जालीदार स्वर्ण द्वार, शुद्ध हिंदी आमंत्रण, विनीत व दर्शनाभिलाषी परिवार व संपूर्ण वैवाहिक कार्यक्रम।',
    previewBg: 'bg-gradient-to-br from-[#1f0b33] to-[#10051a]',
    accentText: 'text-amber-300',
    tag: 'आनंद उत्सव ✨',
    tagColor: 'bg-purple-700 text-white font-bold',
    isHindi: true,
  },
];

const TemplateMarketplace = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [unlockedPlans, setUnlockedPlans] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('moonlight_unlocked_plans') || '[]');
      setUnlockedPlans(saved);
    } catch (e) {
      setUnlockedPlans([]);
    }
  }, []);

  const [activeTab, setActiveTab] = useState(
    searchParams.get('collection') === 'classic'
      ? 'classic'
      : searchParams.get('collection') === 'hindi'
      ? 'hindi'
      : 'royal'
  );
  const [selectedType, setSelectedType] = useState(
    searchParams.get('type') || 'wedding'
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isTemplateUnlocked = (templateId) => {
    if (user?.role === 'admin' || user?.role === 'superadmin') return true;
    const isRoyal =
      templateId.includes('royal') ||
      templateId.includes('pichola') ||
      templateId.includes('udaipur') ||
      templateId.includes('jaipur') ||
      templateId.includes('marigold') ||
      templateId.includes('sunset') ||
      templateId.includes('shubh-vivah') ||
      templateId.includes('rajwada') ||
      templateId.includes('shahi-farman');
    const category = isRoyal ? 'royal' : 'classic';
    const savedSingleTpls = JSON.parse(localStorage.getItem('moonlight_unlocked_templates') || '[]');
    return unlockedPlans.includes(category) || savedSingleTpls.includes(templateId);
  };

  const handleSelectDesign = async (templateId) => {
    // 1. If not logged in, prompt signup first with redirect to checkout!
    if (!user && !localStorage.getItem('moonlight_customer_email')) {
      addToast({
        title: 'Sign Up Required ✨',
        message: 'Please sign up or log in first to secure your invitation and complete payment.',
        type: 'info',
      });
      navigate(`/invitations/signup?redirect=/templates/${templateId}`);
      return;
    }

    // 2. If already unlocked (paid suite pass or paid single template)
    if (isTemplateUnlocked(templateId)) {
      try {
        const email = user?.email || localStorage.getItem('moonlight_customer_email') || 'couple@moonlight.com';
        const res = await api.post('/invitations/payments/verify', {
          razorpay_order_id: `pass_${Date.now()}`,
          razorpay_payment_id: `unlocked_pass_${Date.now()}`,
          razorpay_signature: 'pass_verified',
          templateId,
          customerEmail: email,
          customerName: user?.name || 'Valued Couple',
          couponCode: 'UNLOCKED_PASS_FREE',
        });
        const invId = res.data?.invitation?._id || res.data?.invitation?.id || templateId;
        navigate(`/invitations/create/${invId}`);
      } catch (e) {
        navigate(`/invitations/create/${templateId}`);
      }
    } else {
      // 3. If NOT paid yet, route to checkout for payment!
      navigate('/templates/' + templateId);
    }
  };

  const filteredHindiTemplates = useMemo(() => {
    return [
      ...royalTemplates.filter((t) => t.isHindi),
      ...classicTemplates.filter((t) => t.isHindi),
    ];
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 font-sans flex flex-col justify-between selection:bg-amber-200 selection:text-amber-900">
      <SEO
        title="Browse All Wedding & Event Invitation Templates - Moonlight Luxury Suites"
        description="Select from our Royal 4K Video Gates, Classic 3D Gate Suites, and Authentic Hindi Wedding Invitations."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 w-full flex-1">
        {/* Header Titles */}
        <div className="text-center space-y-2 mb-8">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-amber-700 font-bold block">
            THE DIGITAL SUITE COLLECTION
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-900 tracking-tight">
            Choose Your Design
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto font-sans">
            Select a theme to preview the opening door animations, interactive scratch card, maps, and live RSVP.
          </p>
        </div>

        {/* Category Dropdown Pill */}
        <div className="flex justify-center mb-8 relative z-30">
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center justify-between w-64 sm:w-72 px-4 py-2.5 rounded-full border border-neutral-300 bg-white text-xs sm:text-sm font-medium text-neutral-800 shadow-xs hover:border-amber-500 transition-colors cursor-pointer"
            >
              <span>{invitationTypes.find((t) => t.id === selectedType)?.label || 'Wedding Invitation'}</span>
              <ChevronDown className="w-4 h-4 text-neutral-500 ml-2" />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 right-0 mt-1.5 rounded-2xl bg-white border border-neutral-200 shadow-xl py-1 z-40 max-h-64 overflow-y-auto">
                {invitationTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => {
                      setSelectedType(type.id);
                      if (type.id === 'hindi-invitations') setActiveTab('hindi');
                      setDropdownOpen(false);
                    }}
                    className={'w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer ' +
                      (selectedType === type.id
                        ? 'bg-amber-50 text-amber-900 font-bold'
                        : 'text-neutral-700 hover:bg-neutral-50')}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Collection Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-full bg-[#EFEAE2] border border-[#E2DBD0] gap-1 flex-wrap justify-center">
            <button
              type="button"
              onClick={() => setActiveTab('royal')}
              className={'px-5 sm:px-7 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ' +
                (activeTab === 'royal'
                  ? 'bg-[#1C1814] text-white shadow-md font-bold'
                  : 'text-neutral-700 hover:text-neutral-900')}
            >
              👑 Royal Collection ({royalTemplates.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('classic')}
              className={'px-5 sm:px-7 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ' +
                (activeTab === 'classic'
                  ? 'bg-white text-neutral-900 shadow-md font-bold'
                  : 'text-neutral-700 hover:text-neutral-900')}
            >
              ✨ Classic 3D ({classicTemplates.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('hindi')}
              className={'px-5 sm:px-7 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ' +
                (activeTab === 'hindi'
                  ? 'bg-red-800 text-white shadow-md font-bold'
                  : 'text-red-900 hover:text-red-950 font-semibold')}
            >
              🕉️ हिंदी निमंत्रण ({filteredHindiTemplates.length})
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. ROYAL COLLECTION TAB */}
        {/* ========================================================================= */}
        {activeTab === 'royal' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {royalTemplates.map((template) => (
              <div
                key={template.id}
                className="group rounded-2xl overflow-hidden border border-neutral-200/80 bg-[#16120F] text-white shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Video Area */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-neutral-950">
                  {template.tag && (
                    <span className={'absolute top-2.5 left-2.5 z-20 px-2.5 py-0.5 rounded text-[10px] tracking-wide ' + template.tagColor}>
                      {template.tag}
                    </span>
                  )}

                  <video
                    src={template.video}
                    style={{ filter: template.videoFilter || 'none' }}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Preview Button */}
                  <Link
                    to={'/invite/demo?template=' + template.id + '&type=' + selectedType}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-x-0 bottom-3 z-20 flex items-center justify-center"
                  >
                    <span className="inline-flex items-center rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-medium text-white border border-white/20 shadow-md transition-transform active:scale-95">
                      <Eye className="w-3.5 h-3.5 mr-1.5 text-[#E5A83B]" />
                      Preview
                    </span>
                  </Link>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-serif text-base font-bold text-white tracking-wide">
                      {template.name}
                    </h3>
                    <p className="text-[11px] text-neutral-400 leading-relaxed line-clamp-2">
                      {template.desc}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectDesign(template.id)}
                    className={`w-full py-2.5 rounded-lg font-sans text-xs tracking-wider uppercase font-bold transition-all cursor-pointer shadow-sm ${
                      isTemplateUnlocked(template.id)
                        ? 'bg-gold-gradient text-neutral-950 hover:brightness-105 btn-shimmer'
                        : 'border border-amber-500/40 bg-neutral-900 hover:bg-neutral-800 text-amber-200'
                    }`}
                  >
                    {isTemplateUnlocked(template.id) ? (
                      <span className="flex items-center justify-center space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-neutral-950" />
                        <span>CREATE CARD (UNLOCKED PASS)</span>
                      </span>
                    ) : (
                      <span>USE THIS DESIGN (₹999)</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. CLASSIC COLLECTION TAB */}
        {/* ========================================================================= */}
        {activeTab === 'classic' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {classicTemplates.map((template) => (
              <div
                key={template.id}
                className="group rounded-2xl overflow-hidden border border-[#E8DFD1] bg-[#120E0B] text-white shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Card Header */}
                <div className={'relative h-44 sm:h-48 ' + template.previewBg + ' p-4 flex flex-col justify-between items-center text-center overflow-hidden border-b border-white/10'}>
                  {template.tag && (
                    <span className={'absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded text-[10px] tracking-wide ' + template.tagColor}>
                      {template.tag}
                    </span>
                  )}

                  {/* 3D Door Preview Simulation */}
                  <div className="my-auto px-2 flex flex-col items-center space-y-1.5 z-10">
                    <h4 className={'font-serif text-xl font-bold tracking-wide ' + template.accentText + ' drop-shadow-sm'}>
                      {template.name}
                    </h4>
                  </div>

                  {/* Preview Button */}
                  <Link
                    to={'/invite/demo?template=' + template.id + '&type=' + selectedType}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center z-10"
                  >
                    <span className="inline-flex items-center rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-medium text-white border border-white/20 shadow-md transition-transform active:scale-95">
                      <Eye className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
                      Preview
                    </span>
                  </Link>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between bg-[#16120F]">
                  <div className="space-y-1">
                    <h3 className="font-serif text-sm font-bold text-white">
                      {template.name}
                    </h3>
                    <p className="text-[11px] text-neutral-400 leading-relaxed line-clamp-2">
                      {template.desc}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectDesign(template.id)}
                    className={`w-full py-2.5 rounded-lg font-sans text-xs tracking-wider uppercase font-bold transition-all cursor-pointer shadow-sm ${
                      isTemplateUnlocked(template.id)
                        ? 'bg-gold-gradient text-neutral-950 hover:brightness-105 btn-shimmer'
                        : 'bg-[#E5A83B] hover:bg-[#d4962a] text-neutral-950'
                    }`}
                  >
                    {isTemplateUnlocked(template.id) ? (
                      <span className="flex items-center justify-center space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-neutral-950" />
                        <span>CREATE CARD (UNLOCKED PASS)</span>
                      </span>
                    ) : (
                      <span>USE THIS DESIGN (₹599)</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. 🕉️ HINDI INVITATIONS TAB */}
        {/* ========================================================================= */}
        {activeTab === 'hindi' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHindiTemplates.map((template) => (
              <div
                key={template.id}
                className="group rounded-2xl overflow-hidden border border-red-900/40 bg-[#1A0808] text-white shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Header Area */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-neutral-950">
                  {template.tag && (
                    <span className={'absolute top-2.5 left-2.5 z-20 px-2.5 py-0.5 rounded text-[10px] tracking-wide ' + template.tagColor}>
                      {template.tag}
                    </span>
                  )}

                  {template.video ? (
                    <video
                      src={template.video}
                      style={{ filter: template.videoFilter || 'none' }}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                  ) : (
                    <div className={'w-full h-full ' + template.previewBg + ' flex items-center justify-center p-4'}>
                      <span className="font-rozha text-2xl text-amber-300 drop-shadow">卐 शुभ विवाह 卐</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Preview Button */}
                  <Link
                    to={'/invite/demo?template=' + template.id + '&type=hindi-invitations'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-x-0 bottom-3 z-20 flex items-center justify-center"
                  >
                    <span className="inline-flex items-center rounded-full bg-red-950/80 hover:bg-red-900 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-amber-300 border border-amber-500/40 shadow-md transition-transform active:scale-95">
                      <Eye className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
                      प्रिव्यू / Preview
                    </span>
                  </Link>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-rozha text-base font-bold text-amber-300 tracking-wide">
                      {template.name}
                    </h3>
                    <p className="text-[11px] text-neutral-300 leading-relaxed line-clamp-2">
                      {template.desc}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectDesign(template.id)}
                    className={`w-full py-2.5 rounded-lg font-sans text-xs tracking-wider uppercase font-bold transition-all cursor-pointer shadow-md border ${
                      isTemplateUnlocked(template.id)
                        ? 'bg-gold-gradient text-neutral-950 border-amber-400 hover:brightness-105'
                        : 'bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-amber-200 border-amber-500/30'
                    }`}
                  >
                    {isTemplateUnlocked(template.id) ? (
                      <span className="flex items-center justify-center space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-neutral-950" />
                        <span>कार्ड बनाएं (पास अनलॉक है)</span>
                      </span>
                    ) : (
                      <span>{template.tier === 'royal' ? 'USE THIS DESIGN (₹999)' : 'USE THIS DESIGN (₹599)'}</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Minimal Notice */}
      <footer className="border-t border-neutral-200 bg-[#FAF8F5] py-8 text-center text-xs text-neutral-500 space-y-2">
        <p>© 2026 Moonlight Production · Digital Invitation Suites. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 pt-1 text-neutral-600">
          <Link to="/contact" className="hover:text-amber-700">Need Help?</Link>
          <span>·</span>
          <Link to="/faq" className="hover:text-amber-700">FAQ</Link>
          <span>·</span>
          <Link to="/terms" className="hover:text-amber-700">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
};

export default TemplateMarketplace;
