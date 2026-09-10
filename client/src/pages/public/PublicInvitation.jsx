import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/client';
import SEO from '../../components/common/SEO';
import InvitationRenderer from '../../components/invitations/engine/InvitationRenderer';
import { Heart, Sparkles, ArrowLeft, ShieldAlert } from 'lucide-react';

import { getTemplateById, invitationTemplates } from '../../data/invitationTemplates';

const PublicInvitation = ({ defaultSlug = 'emerald-noir' }) => {
  const { slug: rawSlug } = useParams();
  const slug = rawSlug && rawSlug !== 'undefined' ? rawSlug : defaultSlug;

  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSuspended, setIsSuspended] = useState(false);

  useEffect(() => {
    const fetchInvitation = async () => {
      setLoading(true);
      setError(null);
      const activeSlug = slug || 'emerald-noir';
      try {
        const res = await api.get(`/invitations/public/${activeSlug}`);
        if (res.status === 'SUSPENDED' || res.data?.status === 'SUSPENDED') {
          setIsSuspended(true);
          setLoading(false);
          return;
        }
        const data = res.data?.invitation || res.data?.data || res.data || res.invitation;
        if (data) {
          if (data.status === 'SUSPENDED') {
            setIsSuspended(true);
          } else {
            setInvitation(data);
          }
          setLoading(false);
          return;
        }
      } catch (err) {
        // If API fails or returns 404, check if slug is a template demo slug
      }

      // Check if slug corresponds to a known template or fallback to featured
      const matchedTemplate =
        invitationTemplates.find((t) => t.slug === activeSlug || t.id === activeSlug) ||
        invitationTemplates[0];

      if (matchedTemplate) {
        const cat = matchedTemplate.category;
        const id = matchedTemplate.id;

        // Dynamic names & copy based on category
        let names = 'Aarav & Kiara';
        let bride_name = 'Aarav';
        let groom_name = 'Kiara';
        let story_text = 'Two hearts, one lifelong promise under royal starry skies.';
        let message = 'Invite you to share in the joy of the beginning of their new life together.';
        let events = [
          {
            title: 'Mehendi & Sangeet Night',
            date: '2026-11-19',
            time: '06:00 PM',
            venue: 'The Leela Palace Courtyard',
            address: 'Udaipur, Rajasthan',
          },
          {
            title: 'The Royal Wedding & Pheras',
            date: '2026-11-20',
            time: '07:30 PM',
            venue: 'Grand Lawn, The Leela Palace',
            address: 'Udaipur, Rajasthan',
          },
          {
            title: 'Imperial Gala Reception',
            date: '2026-11-21',
            time: '08:00 PM',
            venue: 'The Royal Ballroom',
            address: 'Udaipur, Rajasthan',
          },
        ];

        if (id === 'modern-minimal') {
          names = 'Aisha Khan & Rohan Mehra';
          bride_name = 'Aisha';
          groom_name = 'Rohan';
        } else if (cat.includes('Birthday')) {
          names = id.includes('yuvraj') ? 'Prince Veer' : 'Aanya Sharma';
          bride_name = 'Veer';
          groom_name = 'Aanya';
          story_text = 'One year of endless smiles, tiny steps, and infinite blessings.';
          message = 'Cordially invites you to celebrate this magical 1st birthday milestone!';
          events = [
            {
              title: 'Welcome & Magic Show',
              date: '2026-11-20',
              time: '05:00 PM',
              venue: 'The Grand Pavilion',
              address: 'Bhopal, Madhya Pradesh',
            },
            {
              title: 'Cake Cutting Ceremony',
              date: '2026-11-20',
              time: '06:30 PM',
              venue: 'Celebration Arena',
              address: 'Bhopal, Madhya Pradesh',
            },
            {
              title: 'Gala Birthday Dinner',
              date: '2026-11-20',
              time: '08:00 PM',
              venue: 'Palace Banquets',
              address: 'Bhopal, Madhya Pradesh',
            },
          ];
        } else if (cat.includes('Griha Pravesh') || cat.includes('Housewarming')) {
          names = 'The Sharma Family';
          bride_name = 'Rajesh';
          groom_name = 'Sunita';
          story_text = 'With the divine blessings of Almighty, we step into our dream home.';
          message = 'Requests your esteemed presence & blessings for our Griha Pravesh Puja.';
          events = [
            {
              title: 'Ganesh Puja & Vastu Havan',
              date: '2026-11-20',
              time: '09:00 AM',
              venue: 'Our New Home (Aashirwad)',
              address: 'Arera Colony, Bhopal, MP',
            },
            {
              title: 'Griha Pravesh & Mahaprasad',
              date: '2026-11-20',
              time: '12:30 PM',
              venue: 'Courtyard & Terrace Lounge',
              address: 'Arera Colony, Bhopal, MP',
            },
            {
              title: 'Evening Blessings & Dinner',
              date: '2026-11-20',
              time: '07:30 PM',
              venue: 'Grand Dining Hall',
              address: 'Arera Colony, Bhopal, MP',
            },
          ];
        } else if (cat.includes('Baby Shower') || cat.includes('Naming')) {
          names = 'Pooja & Sameer';
          bride_name = 'Pooja';
          groom_name = 'Sameer';
          story_text = 'A little blessing sent from above, filling our hearts with joy and love.';
          message = 'Invite you to shower their little bundle of joy with love & blessings.';
          events = [
            {
              title: 'Godh Bharai Puja & Rituals',
              date: '2026-11-20',
              time: '11:00 AM',
              venue: 'The Heritage Hall',
              address: 'Indore, Madhya Pradesh',
            },
            {
              title: 'Blessings & Traditional Lunch',
              date: '2026-11-20',
              time: '01:00 PM',
              venue: 'Royal Orchid Banquets',
              address: 'Indore, Madhya Pradesh',
            },
          ];
        } else if (cat.includes('Anniversary')) {
          names = id.includes('50') || id.includes('jubilee') ? 'Ramesh & Kanta' : 'Vikram & Radhika';
          bride_name = 'Vikram';
          groom_name = 'Radhika';
          story_text = 'Decades of shared laughter, enduring love, and precious family memories.';
          message = 'Cordially invite you to celebrate their Milestone Wedding Anniversary.';
          events = [
            {
              title: 'Champagne Toast & Speeches',
              date: '2026-11-20',
              time: '07:00 PM',
              venue: 'The Imperial Crystal Ballroom',
              address: 'Bhopal, Madhya Pradesh',
            },
            {
              title: 'Gala Anniversary Dinner',
              date: '2026-11-20',
              time: '08:30 PM',
              venue: 'The Grand Lawn Terrace',
              address: 'Bhopal, Madhya Pradesh',
            },
          ];
        }

        const demoData = {
          _id: `demo-${matchedTemplate.id}`,
          id: `demo-${matchedTemplate.id}`,
          template_id: matchedTemplate.id,
          templateId: matchedTemplate.id,
          names,
          bride_name,
          groom_name,
          host_names: 'Together with their families',
          title: `${matchedTemplate.name} Demo`,
          eventType: matchedTemplate.category,
          date: '2026-11-20',
          time: '19:00',
          venue: 'The Leela Palace, Udaipur',
          venueAddress: 'Lake Pichola, Udaipur, Rajasthan 313001',
          story_text,
          message,
          welcome_text: message,
          scratch_reveal_text: 'YOU’RE INVITED ♡',
          scratch_enabled: true,
          rsvp_enabled: true,
          music_enabled: true,
          events,
          gallery_images: [
            'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
          ],
        };
        setInvitation(demoData);
      } else {
        setError('Invitation not found or has not been published yet.');
      }
      setLoading(false);
    };

    fetchInvitation();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A120B] flex flex-col items-center justify-center space-y-4 font-sans text-white">
        <div className="w-12 h-12 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
        <div className="text-center space-y-1">
          <span className="text-xs font-mono text-amber-300 tracking-[0.25em] uppercase font-bold block">
            Moonlight Production
          </span>
          <p className="text-[11px] text-neutral-400">Opening Digital Invitation Suite...</p>
        </div>
      </div>
    );
  }

  if (isSuspended) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center space-y-4 font-sans">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-neutral-900">Invitation Temporarily Unavailable</h1>
        <p className="text-xs text-neutral-600 max-w-sm">
          This digital invitation has been paused by the host or Moonlight Production administrator. Please check back later.
        </p>
        <Link
          to="/invitations"
          className="px-6 py-2.5 rounded-full bg-amber-900 hover:bg-amber-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore Moonlight Invitations</span>
        </Link>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center space-y-4 font-sans">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-neutral-900">Invitation Not Available</h1>
        <p className="text-xs text-neutral-600 max-w-sm">
          {error || 'This digital invitation is either in draft mode or the link has changed.'}
        </p>
        <Link
          to="/invitations"
          className="px-6 py-2.5 rounded-full bg-amber-900 hover:bg-amber-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore Moonlight Invitations</span>
        </Link>
      </div>
    );
  }

  const coupleNames =
    invitation.names || `${invitation.bride_name || 'Bride'} & ${invitation.groom_name || 'Groom'}`;
  const seoTitle = `${coupleNames} — Digital Wedding Invitation | Moonlight Production`;
  const seoDesc =
    invitation.message ||
    invitation.welcome_text ||
    `You are cordially invited to celebrate the royal wedding of ${coupleNames}.`;

  return (
    <div className="w-full min-h-screen">
      <SEO
        title={seoTitle}
        description={seoDesc}
        image={invitation.coverPhoto || invitation.cover_photo}
      />

      {/* Main Dynamic Template Engine Renderer */}
      <InvitationRenderer invitation={invitation} isPreview={false} />
    </div>
  );
};

export default PublicInvitation;
