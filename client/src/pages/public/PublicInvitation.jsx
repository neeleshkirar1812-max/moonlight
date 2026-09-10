import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/client';
import SEO from '../../components/common/SEO';
import InvitationRenderer from '../../components/invitations/engine/InvitationRenderer';
import { Heart, Sparkles, ArrowLeft, ShieldAlert } from 'lucide-react';

import { getTemplateById, invitationTemplates } from '../../data/invitationTemplates';

const PublicInvitation = () => {
  const { slug } = useParams();

  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSuspended, setIsSuspended] = useState(false);

  useEffect(() => {
    const fetchInvitation = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/invitations/public/${slug}`);
        if (res.status === 'SUSPENDED' || res.data?.status === 'SUSPENDED') {
          setIsSuspended(true);
          return;
        }
        const data = res.data?.invitation || res.data?.data || res.data || res.invitation;
        if (data) {
          if (data.status === 'SUSPENDED') {
            setIsSuspended(true);
          } else {
            setInvitation(data);
          }
          return;
        }
      } catch (err) {
        // If API fails or returns 404, check if slug is a template demo slug
      }

      // Check if slug corresponds to a known template
      const matchedTemplate = invitationTemplates.find(
        (t) => t.slug === slug || t.id === slug
      );

      if (matchedTemplate) {
        const isModern = matchedTemplate.id === 'modern-minimal';
        const demoData = {
          _id: `demo-${matchedTemplate.id}`,
          id: `demo-${matchedTemplate.id}`,
          template_id: matchedTemplate.id,
          templateId: matchedTemplate.id,
          names: isModern ? 'Aisha Khan & Rohan Mehra' : 'Aarav & Kiara',
          bride_name: isModern ? 'Aisha Khan' : 'Aarav Singhania',
          groom_name: isModern ? 'Rohan Mehra' : 'Kiara Advani',
          host_names: 'Together with their families',
          title: `${matchedTemplate.name} Demo`,
          eventType: matchedTemplate.category,
          date: '2026-11-20',
          time: '19:00',
          venue: isModern ? 'The Leela Palace, Udaipur' : 'Jehan Numa Palace, Bhopal',
          venueAddress: isModern ? 'Lake Pichola, Udaipur, Rajasthan' : '152 Shamla Hills, Bhopal, Madhya Pradesh',
          story_text: 'Two hearts, one lifelong promise under royal starry skies.',
          message: 'Invite you to share in the joy of the beginning of their new life together.',
          welcome_text: 'Invite you to share in the joy of the beginning of their new life together.',
          scratch_reveal_text: 'YOU’RE INVITED ♡',
          scratch_enabled: true,
          rsvp_enabled: true,
          music_enabled: true,
          events: [
            {
              title: 'Mehendi Ceremony',
              date: '2026-11-19',
              time: '06:00 PM',
              venue: 'The Leela Palace, Courtyard',
              address: 'Udaipur, Rajasthan',
            },
            {
              title: 'Sangeet Night',
              date: '2026-11-19',
              time: '07:30 PM',
              venue: 'The Royal Ballroom',
              address: 'Udaipur, Rajasthan',
            },
            {
              title: 'Wedding Reception',
              date: '2026-11-20',
              time: '08:00 PM',
              venue: 'Grand Lawn, The Leela Palace',
              address: 'Udaipur, Rajasthan',
            },
          ],
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
