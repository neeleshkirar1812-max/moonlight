import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/client';
import SEO from '../../components/common/SEO';
import InvitationRenderer from '../../components/invitations/engine/InvitationRenderer';
import { Heart, Sparkles, ArrowLeft } from 'lucide-react';

const PublicInvitation = () => {
  const { slug } = useParams();

  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvitation = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/invitations/public/${slug}`);
        const data = res.data?.invitation || res.data?.data || res.data;
        if (data) {
          setInvitation(data);
        } else {
          setError('Invitation not found or has not been published yet.');
        }
      } catch (err) {
        setError(err.message || 'Unable to load invitation.');
      } finally {
        setLoading(false);
      }
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
