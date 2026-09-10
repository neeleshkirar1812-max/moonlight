/**
 * Moonlight Production - iCalendar (.ics) Generator
 * Generates standards-compliant RFC 5545 iCalendar files for 1-click addition to
 * Apple Calendar, Google Calendar, Outlook, and Android devices.
 */

export const generateIcsContent = ({
  title,
  description,
  venue,
  address,
  date,
  time,
  url,
}) => {
  if (!date) return null;

  // Format start datetime (YYYYMMDDTHHMMSS)
  const [year, month, day] = date.split('-');
  const [hour = '18', minute = '00'] = (time || '18:00').split(':');

  const startFormatted = `${year}${month}${day}T${hour}${minute}00`;
  
  // Approximate 4 hours duration
  const endHour = String((Number(hour) + 4) % 24).padStart(2, '0');
  const endFormatted = `${year}${month}${day}T${endHour}${minute}00`;

  const location = [venue, address].filter(Boolean).join(', ') || 'Celebration Venue';
  const eventUrl = url || window.location.href;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Moonlight Production//Digital Invitations//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:moonlight-${Date.now()}@moonlightproduction.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${startFormatted}`,
    `DTEND:${endFormatted}`,
    `SUMMARY:${title || 'Wedding Celebration'}`,
    `DESCRIPTION:${(description || 'You are cordially invited to celebrate with us.').replace(/\n/g, '\\n')}\\n\\nLive Invitation: ${eventUrl}`,
    `LOCATION:${location}`,
    `URL:${eventUrl}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Wedding & Celebration tomorrow!',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return ics;
};

export const downloadIcsFile = (eventData) => {
  const icsContent = generateIcsContent(eventData);
  if (!icsContent) return;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute(
    'download',
    `${(eventData.title || 'event').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.ics`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
