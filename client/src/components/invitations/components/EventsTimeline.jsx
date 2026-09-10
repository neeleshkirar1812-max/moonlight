import React from 'react';
import { Calendar, Clock, MapPin, Navigation, CalendarPlus, Sparkles } from 'lucide-react';
import { downloadIcsFile } from '../../../utils/calendarGenerator';

const EventsTimeline = ({ events = [], invitation, theme }) => {
  // If no custom events list provided, fallback to main event or standard sample sequence
  const displayEvents =
    events && events.length > 0
      ? events
      : [
          {
            id: 'ev-1',
            title: 'Haldi & Chooda Ceremony',
            date: invitation.event_date || invitation.date || '2026-11-19',
            time: '10:00 AM',
            venue: invitation.venue_name || invitation.venue || 'Jehan Numa Palace Courtyard',
            address: invitation.venue_address || invitation.venueAddress || '152 Shamla Hills, Bhopal',
            description: 'Vibrant yellow florals, turmeric blessings, and traditional marigold festivities.',
            image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
          },
          {
            id: 'ev-2',
            title: 'Royal Sangeet & Musical Evening',
            date: invitation.event_date || invitation.date || '2026-11-19',
            time: '07:00 PM',
            venue: invitation.venue_name || invitation.venue || 'Grand Ballroom, Jehan Numa Palace',
            address: invitation.venue_address || invitation.venueAddress || '152 Shamla Hills, Bhopal',
            description: 'An evening of dance performances, celebratory beats, and royal banquet dinner.',
            image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
          },
          {
            id: 'ev-3',
            title: 'The Wedding Ceremony (Pheras)',
            date: invitation.event_date || invitation.date || '2026-11-20',
            time: invitation.event_time || invitation.time || '07:00 PM',
            venue: invitation.venue_name || invitation.venue || 'Lakeside Palace Gardens',
            address: invitation.venue_address || invitation.venueAddress || '152 Shamla Hills, Bhopal',
            description: 'Baraat procession followed by sacred Vedic vows under the royal mandap.',
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
          },
          {
            id: 'ev-4',
            title: 'Gala Grand Reception',
            date: '2026-11-21',
            time: '08:00 PM',
            venue: invitation.venue_name || invitation.venue || 'The Palace Lawns',
            address: invitation.venue_address || invitation.venueAddress || '152 Shamla Hills, Bhopal',
            description: 'An opulent gala night celebrating the newlyweds with live orchestra and gourmet dinner.',
            image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
          },
        ];

  const handleOpenMap = (event) => {
    const query = encodeURIComponent(`${event.venue || ''}, ${event.address || ''}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleAddToCalendar = (event) => {
    downloadIcsFile({
      title: `${invitation.names || 'Wedding'} - ${event.title}`,
      description: event.description,
      venue: event.venue,
      address: event.address,
      date: event.date,
      time: event.time,
      url: window.location.href,
    });
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-xl mx-auto space-y-6 font-sans">
      <div className="text-center space-y-1.5">
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
          ✦ Ceremony Schedule ✦
        </span>
        <h2
          className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r ${theme.goldGradient} bg-clip-text text-transparent`}
        >
          Events & Celebrations
        </h2>
        <div className="w-12 h-0.5 bg-amber-500/40 mx-auto" />
      </div>

      <div className="space-y-6">
        {displayEvents.map((ev, index) => (
          <div
            key={ev.id || index}
            className={`${theme.cardBg} backdrop-blur-md rounded-3xl overflow-hidden border ${theme.borderColor} shadow-xl hover:border-amber-500/40 transition-all flex flex-col justify-between`}
          >
            {/* Event Header Image if present */}
            {ev.image && (
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-full object-cover brightness-[0.85] hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase font-bold text-amber-300">
                  Event 0{index + 1}
                </div>
              </div>
            )}

            <div className="p-5 sm:p-6 space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                  {ev.title}
                </h3>
                {ev.description && (
                  <p className="text-xs text-neutral-300 leading-relaxed pt-1 font-sans">
                    {ev.description}
                  </p>
                )}
              </div>

              {/* Event Timings & Venue Details */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-xs text-neutral-200">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-mono">
                    {ev.date ? new Date(ev.date).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'Date TBD'}
                  </span>
                  <span className="text-neutral-500">•</span>
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-mono">{ev.time || '18:00'}</span>
                </div>

                <div className="flex items-start space-x-2 pt-1 border-t border-white/5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-medium">{ev.venue || 'Venue TBD'}</strong>
                    {ev.address && <span className="text-[11px] text-neutral-400 block">{ev.address}</span>}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Get Directions & Add to Calendar */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleOpenMap(ev)}
                  className="py-2.5 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>Get Directions</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddToCalendar(ev)}
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-white" />
                  <span>Add to Calendar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsTimeline;
