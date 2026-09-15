import { useContentProtection } from '../../hooks/useContentProtection';
import ContentProtectionBanner from '../../components/common/ContentProtectionBanner';
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import api from '../../api/client';
import SEO from '../../components/common/SEO';
import InvitationRenderer from '../../components/invitations/engine/InvitationRenderer';
import { Crown, Sparkles, ChevronDown, Check, ArrowRight } from 'lucide-react';
import { getTemplateById, invitationTemplates } from '../../data/invitationTemplates';

// 20 Distinct Presets for each Royal and Classic Template
export const templateDemoDataMap = {
  // ==========================================
  // 👑 8 ROYAL VIDEO SUITES
  // ==========================================
  'rose-gold-blush-royal': {
    names: 'Aarav Singhania & Kiara Malhotra',
    groom_name: 'Aarav Singhania',
    bride_name: 'Kiara Malhotra',
    groom_parents: 'Son of Mrs. Sunita & Mr. Rajesh Singhania',
    bride_parents: 'Daughter of Mrs. Poonam & Mr. Anand Malhotra',
    host_names: 'Singhania & Malhotra Families',
    title: 'The Royal Imperial Wedding',
    eventType: 'Wedding Invitation',
    date: '2026-11-20',
    time: '19:00',
    venue: 'The Leela Palace Courtyard, Udaipur',
    venueAddress: 'Lake Pichola, Udaipur, Rajasthan 313001',
    story_text: 'Two royal hearts united under the starry skies of Lake Pichola. A timeless fairytale of love, grace and eternal devotion.',
    message: 'Request the honor of your presence to witness and bless the auspicious wedding ceremony of their children.',
    welcome_text: 'With immense joy and gratitude, we invite you to share our happiest moments.',
    scratch_reveal_text: 'YOU’RE INVITED TO THE ROYAL WEDDING ♡',
    events: [
      { title: 'The Royal Mehendi & Sangeet', date: '2026-11-19', time: '06:00 PM', venue: 'The Leela Palace Poolside', address: 'Lake Pichola, Udaipur, Rajasthan' },
      { title: 'Shubh Vivah & Pheras', date: '2026-11-20', time: '07:30 PM', venue: 'Grand Lawn, The Leela Palace', address: 'Lake Pichola, Udaipur, Rajasthan' },
      { title: 'Imperial Royal Reception', date: '2026-11-21', time: '08:00 PM', venue: 'The Crystal Ballroom', address: 'Lake Pichola, Udaipur, Rajasthan' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'royal-majesty': {
    names: 'Kabir Rathore & Meera Suryavanshi',
    groom_name: 'Kabir Rathore',
    bride_name: 'Meera Suryavanshi',
    groom_parents: 'Son of Rajmata Gayatri Devi & Thakur Vikram Singh',
    bride_parents: 'Daughter of Mrs. Shweta & Dr. Harish Suryavanshi',
    host_names: 'Rathore & Suryavanshi Dynasties',
    title: 'The Royal Majesty Celestial Wedding',
    eventType: 'Wedding Invitation',
    date: '2026-12-15',
    time: '18:30',
    venue: 'Taj Umaid Bhawan Palace, Jodhpur',
    venueAddress: 'Circuit House Rd, Jodhpur, Rajasthan 342006',
    story_text: 'Like moonlight meeting the golden sands of Marwar, our souls found home in one another.',
    message: 'Cordially invite you to celebrate the joyous matrimony of Kabir and Meera.',
    welcome_text: 'Welcome to the royal celebrations of our auspicious union.',
    scratch_reveal_text: 'SAVE THE DATE • DEC 15, 2026 ♡',
    events: [
      { title: 'Royal Haldi & Rajasthani Ghoomar', date: '2026-12-14', time: '11:00 AM', venue: 'Baradari Gardens, Umaid Bhawan', address: 'Jodhpur, Rajasthan' },
      { title: 'Sangeet Under The Stars', date: '2026-12-14', time: '07:30 PM', venue: 'Marwar Hall, Umaid Bhawan Palace', address: 'Jodhpur, Rajasthan' },
      { title: 'The Grand Royal Pheras', date: '2026-12-15', time: '07:00 PM', venue: 'Central Dome Pavillion', address: 'Jodhpur, Rajasthan' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'royal-elegance-royal': {
    names: 'Ranveer Kapoor & Deepika Shekhawat',
    groom_name: 'Ranveer Kapoor',
    bride_name: 'Deepika Shekhawat',
    groom_parents: 'Son of Mrs. Neetu & Mr. Rishi Kapoor',
    bride_parents: 'Daughter of Mrs. Ujjwala & Mr. Prakash Shekhawat',
    host_names: 'Kapoor & Shekhawat Families',
    title: 'The Royal Elegance Crimson Gala',
    eventType: 'Wedding Invitation',
    date: '2026-12-08',
    time: '19:30',
    venue: 'Rambagh Palace, Jaipur',
    venueAddress: 'Bhawani Singh Rd, Jaipur, Rajasthan 302005',
    story_text: 'Draped in crimson velvet and lit by royal chandeliers, two hearts begin a majestic chapter of shared dreams.',
    message: 'Solicit your gracious presence on the auspicious wedding reception of Ranveer and Deepika.',
    welcome_text: 'We await your warm presence and blessings as we embark on this sacred journey.',
    scratch_reveal_text: 'CELEBRATE WITH US • DEC 08, 2026 ♡',
    events: [
      { title: 'Sufi Sangeet Night', date: '2026-12-07', time: '07:00 PM', venue: 'Naksha Garden, Rambagh Palace', address: 'Jaipur, Rajasthan' },
      { title: 'The Royal Baraat & Varmala', date: '2026-12-08', time: '06:30 PM', venue: 'Mubarak Mahal Lawn', address: 'Jaipur, Rajasthan' },
      { title: 'Gala Dinner & Musical Night', date: '2026-12-08', time: '08:30 PM', venue: 'Jaipur Grand Ballroom', address: 'Jaipur, Rajasthan' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544078741-7ea0e0cb5b81?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'royal-prestige': {
    names: 'Rohan Mehra & Sanjana Singhal',
    groom_name: 'Rohan Mehra',
    bride_name: 'Sanjana Singhal',
    groom_parents: 'Son of Mrs. Renu & Mr. Deepak Mehra',
    bride_parents: 'Daughter of Mrs. Vandana & Mr. Suresh Singhal',
    host_names: 'Mehra & Singhal Families',
    title: 'The Royal Prestige Blush Romance',
    eventType: 'Wedding Invitation',
    date: '2026-11-28',
    time: '18:00',
    venue: 'Suryagarh Palace, Jaisalmer',
    venueAddress: 'Kahala Phata, Sam Road, Jaisalmer, Rajasthan 345001',
    story_text: 'Blush pink hues and golden palace spires celebrate two best friends stepping into forever.',
    message: 'Warmly invite you to share our joy on our sacred wedding day.',
    welcome_text: 'Welcome to our desert palace celebration!',
    scratch_reveal_text: 'YOU’RE CORDIALLY INVITED ♡',
    events: [
      { title: 'Dunes Sundowner & Cocktails', date: '2026-11-27', time: '05:30 PM', venue: 'The Thar Sunset Dunes', address: 'Jaisalmer, Rajasthan' },
      { title: 'Royal Wedding & Phere', date: '2026-11-28', time: '06:00 PM', venue: 'Suryagarh Courtyard', address: 'Jaisalmer, Rajasthan' },
      { title: 'Midnight Starlit Afterparty', date: '2026-11-28', time: '10:00 PM', venue: 'Bagh Lawn', address: 'Jaisalmer, Rajasthan' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'royal-heritage': {
    names: 'Yuvraj Devendra & Rajkumari Ananya',
    groom_name: 'Devendra Singh',
    bride_name: 'Ananya Rathore',
    groom_parents: 'Son of Maharajadhiraj Gaj Singh & Maharani Hemlata',
    bride_parents: 'Daughter of Maharaj Jai Singh & Maharani Suniti',
    host_names: 'Royal Houses of Mewar & Marwar',
    title: 'The Royal Heritage Dynasty Union',
    eventType: 'Wedding Invitation',
    date: '2026-12-22',
    time: '19:00',
    venue: 'City Palace Zenana Mahal, Udaipur',
    venueAddress: 'Old City, Udaipur, Rajasthan 313001',
    story_text: 'Five centuries of royal heritage embrace two souls destined for a timeless legacy.',
    message: 'Request the honor of your august presence at the Royal Vivah Mahotsav.',
    welcome_text: 'Shubh Swagatam to the Royal Heritage Celebration.',
    scratch_reveal_text: 'ROYAL HERITAGE WEDDING • DEC 22 ♡',
    events: [
      { title: 'Shahi Mayra & Tel Baan', date: '2026-12-21', time: '10:30 AM', venue: 'Manek Chowk, City Palace', address: 'Udaipur, Rajasthan' },
      { title: 'The Royal Vivah & Pheras', date: '2026-12-22', time: '07:00 PM', venue: 'Zenana Mahal Courtyard', address: 'Udaipur, Rajasthan' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1544078741-7ea0e0cb5b81?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'royal-grace': {
    names: 'Arjun Oberoi & Tara Deshmukh',
    groom_name: 'Arjun Oberoi',
    bride_name: 'Tara Deshmukh',
    groom_parents: 'Son of Mrs. Sharmila & Mr. Prithvi Oberoi',
    bride_parents: 'Daughter of Mrs. Rohini & Mr. Vilas Deshmukh',
    host_names: 'Oberoi & Deshmukh Families',
    title: 'The Royal Grace Botanical Splendor',
    eventType: 'Wedding Invitation',
    date: '2026-11-14',
    time: '18:00',
    venue: 'Samode Palace & Bagh, Rajasthan',
    venueAddress: 'Samode Village, Chomu, Rajasthan 303806',
    story_text: 'Amidst sage gardens and fragrant blossoms, we promise each other a lifetime of love and laughter.',
    message: 'Cordially invite you to celebrate the joyous marriage of Arjun and Tara.',
    welcome_text: 'Welcome to our botanical fairytale in the Aravalli hills.',
    scratch_reveal_text: 'JOIN OUR CELEBRATION • NOV 14 ♡',
    events: [
      { title: 'Botanical High Tea & Mehendi', date: '2026-11-13', time: '03:30 PM', venue: 'Samode Bagh Fountains', address: 'Samode, Rajasthan' },
      { title: 'Sunset Nuptials & Dinner', date: '2026-11-14', time: '06:00 PM', venue: 'The Sheesh Mahal Lawn', address: 'Samode, Rajasthan' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'royal-crest': {
    names: 'Aditya Vardhan & Gayatri Sen',
    groom_name: 'Aditya Vardhan',
    bride_name: 'Gayatri Sen',
    groom_parents: 'Son of Mrs. Madhavi & Mr. Alok Vardhan',
    bride_parents: 'Daughter of Mrs. Meenakshi & Mr. Debashis Sen',
    host_names: 'Vardhan & Sen Families',
    title: 'The Royal Crest Heritage Suite',
    eventType: 'Wedding Invitation',
    date: '2026-12-05',
    time: '19:00',
    venue: 'Jai Mahal Palace, Jaipur',
    venueAddress: 'Jacob Rd, Civil Lines, Jaipur, Rajasthan 302006',
    story_text: 'Sealed with an antique wax crest and timeless affection, our journey begins.',
    message: 'Invite you to bless their union with your esteemed presence.',
    welcome_text: 'Welcome to our sacred wedding celebrations.',
    scratch_reveal_text: 'YOU’RE CORDIALLY INVITED ♡',
    events: [
      { title: 'Royal Haldi & Sangeet', date: '2026-12-04', time: '06:00 PM', venue: 'Lotus Pond Pavillion', address: 'Jaipur, Rajasthan' },
      { title: 'Sacred Wedding Ceremony', date: '2026-12-05', time: '07:00 PM', venue: 'Palace Gardens Lawn', address: 'Jaipur, Rajasthan' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'royal-legacy': {
    names: 'Maharaja Vikramaditya & Maharani Radhika',
    groom_name: 'Vikramaditya',
    bride_name: 'Radhika',
    groom_parents: 'Son of Rajmata Padmavati & Maharaja Karni Singh',
    bride_parents: 'Daughter of Thakurani Uma & Thakur Raghavendra',
    host_names: 'The Royal Riyasat',
    title: 'The Royal Legacy Rajputana Vivah',
    eventType: 'Wedding Invitation',
    date: '2026-12-18',
    time: '19:30',
    venue: 'Laxmi Niwas Palace, Bikaner',
    venueAddress: 'Lal Garh Campus, Bikaner, Rajasthan 334001',
    story_text: 'Under antique gold arches and crimson velvet drapes, a legendary love story continues.',
    message: 'Request your auspicious presence at the Shahi Vivah Mahotsav.',
    welcome_text: 'Shubh Aagman to the Royal Legacy celebration.',
    scratch_reveal_text: 'THE ROYAL LEGACY • DEC 18 ♡',
    events: [
      { title: 'The Royal Shahi Barat', date: '2026-12-18', time: '06:00 PM', venue: 'Laxmi Niwas Grand Courtyard', address: 'Bikaner, Rajasthan' },
      { title: 'Imperial Vivah & Banquet', date: '2026-12-18', time: '08:00 PM', venue: 'Swarna Mahal Hall', address: 'Bikaner, Rajasthan' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
    ],
  },
    'emerald-noir-royal': {
    names: 'Kabir Mirza & Noor-e-Zehra',
    groom_name: 'Kabir Mirza',
    bride_name: 'Noor-e-Zehra',
    groom_parents: 'Son of Begum Fatima & Nawab Asif Mirza',
    bride_parents: 'Daughter of Begum Shahnaaz & Nawab Tariq Zehra',
    host_names: 'Mirza & Zehra Families',
    title: 'Royal Mughal Nikah & Walima of Kabir & Noor',
    eventType: 'Wedding Invitation',
    date: '2026-12-25',
    time: '19:30',
    venue: 'The Oberoi Rajvilas, Jaipur',
    venueAddress: 'Babaji Ka Thikana, Goner Road, Jaipur, Rajasthan',
    story_text: 'From childhood promises under moonlit jasmine arches to uniting two historic lineages in regal splendour.',
    message: 'Request the honor of your gracious presence to celebrate our sacred Shahi Nikah.',
    welcome_text: 'With immense grace and joy, we invite you to share our happiest moments.',
    scratch_reveal_text: 'ROYAL EMERALD NIKAH • DEC 25 ♡',
    events: [
      { title: 'Shahi Dastarkhwan & Qawwali', date: '2026-12-24', time: '08:00 PM', venue: 'Charbagh Courtyard', address: 'The Oberoi Rajvilas, Jaipur' },
      { title: 'Qubool Hai - Royal Nikah', date: '2026-12-25', time: '07:30 PM', venue: 'Mughal Pavilion', address: 'The Oberoi Rajvilas, Jaipur' },
      { title: 'Grand Walima Reception', date: '2026-12-26', time: '08:30 PM', venue: 'The Grand Ballroom', address: 'The Oberoi Rajvilas, Jaipur' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'ivory-elegance-royal': {
    names: 'Siddharth Mehra & Radhika Singhania',
    groom_name: 'Siddharth Mehra',
    bride_name: 'Radhika Singhania',
    groom_parents: 'Son of Mrs. Nalini & Mr. Ashok Mehra',
    bride_parents: 'Daughter of Mrs. Sunita & Mr. Rajesh Singhania',
    host_names: 'Mehra & Singhania Families',
    title: 'The Grand Velvet Royal Wedding',
    eventType: 'Wedding Invitation',
    date: '2026-11-28',
    time: '18:00',
    venue: 'Rambagh Palace, Jaipur',
    venueAddress: 'Bhawani Singh Road, Jaipur, Rajasthan',
    story_text: 'A timeless union forged in pure gold, framed by velvet crimson drapes and grand orchestral romance.',
    message: 'Solicit your gracious presence on the auspicious wedding ceremony of Siddharth and Radhika.',
    welcome_text: 'Welcome to the royal celebrations of our sacred union.',
    scratch_reveal_text: 'SAVE THE DATE • NOV 28 ♡',
    events: [
      { title: 'Sangeet Symphony & Velvet Gala', date: '2026-11-27', time: '07:30 PM', venue: 'Palace Gardens', address: 'Rambagh Palace, Jaipur' },
      { title: 'Shubh Vivah & Royal Pheras', date: '2026-11-28', time: '06:00 PM', venue: 'Kesar Bagh Mandap', address: 'Rambagh Palace, Jaipur' },
      { title: 'Imperial Banquet Reception', date: '2026-11-29', time: '08:00 PM', venue: 'Maharani Ballroom', address: 'Rambagh Palace, Jaipur' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
    ],
  },

  // ==========================================
  // ✨ 12 CLASSIC SUITES
  // ==========================================
  'emerald-noir': {
    names: 'Aryan & Eva',
    groom_name: 'ARYAN',
    bride_name: 'EVA',
    groom_parents: 'Son of Mrs. Sunita & Mr. Rajesh Singhania',
    bride_parents: 'Daughter of Mrs. Poonam & Mr. Anand Malhotra',
    host_names: 'Singhania & Malhotra Families',
    title: 'Emerald Mughal Jaali Royal Celebration',
    eventType: 'Wedding Invitation',
    date: '2026-11-20',
    time: '19:00',
    venue: 'Taj Lake Palace, Udaipur',
    venueAddress: 'Pichola, Udaipur, Rajasthan 313001',
    story_text: 'Like moonlight meeting emerald waters, two souls unite in timeless love.',
    message: 'Request the pleasure of your company to celebrate the wedding ceremony of',
    welcome_text: 'You are cordially invited to join us in celebrating the wedding of Aryan and Eva.',
    scratch_reveal_text: 'SAVE THE DATE • NOV 20, 2026 ♡',
    events: [
      { title: 'The Royal Welcome & Mehendi', date: '2026-11-19', time: '04:00 PM', venue: 'Lakefront Deck, Taj Lake Palace', address: 'Udaipur, Rajasthan' },
      { title: 'Sangeet & Sufi Night', date: '2026-11-19', time: '07:30 PM', venue: 'Mewar Ballroom', address: 'Udaipur, Rajasthan' },
      { title: 'The Grand Pheras & Gala Dinner', date: '2026-11-20', time: '07:00 PM', venue: 'Central Courtyard', address: 'Udaipur, Rajasthan' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544078741-7ea0e0cb5b81?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'ivory-elegance': {
    names: 'Veer & Zara',
    groom_name: 'Veer',
    bride_name: 'Zara',
    groom_parents: 'Son of Mrs. Simran & Mr. Harpreet Ahluwalia',
    bride_parents: 'Daughter of Mrs. Neena & Mr. Rajiv Batra',
    host_names: 'Ahluwalia & Batra Families',
    title: 'Crimson Royale Split Gate Celebration',
    eventType: 'Wedding Invitation',
    date: '2026-11-25',
    time: '18:00',
    venue: 'The Leela Palace, New Delhi',
    venueAddress: 'Diplomatic Enclave, Chanakyapuri, New Delhi 110023',
    story_text: 'Bound by destiny and celebrated in royal splendor, a timeless love story begins.',
    message: 'Cordially invite you to celebrate the wedding ceremony of',
    welcome_text: 'You are cordially invited to join us in celebrating the wedding of Veer and Zara.',
    scratch_reveal_text: 'ROYAL WEDDING • NOV 25, 2026 ♡',
    events: [
      { title: 'Cocktails & Sangeet Bash', date: '2026-11-24', time: '07:30 PM', venue: 'The Grand Pavilion', address: 'New Delhi' },
      { title: 'Anand Karaj & Pheras', date: '2026-11-25', time: '11:30 AM', venue: 'Poolside Amphitheatre', address: 'New Delhi' },
      { title: 'Gala Wedding Reception', date: '2026-11-25', time: '08:00 PM', venue: 'Bharat Ballroom', address: 'New Delhi' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544078741-7ea0e0cb5b81?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'rose-gold-blush': {
    names: 'Vihaan & Myra',
    groom_name: 'Vihaan',
    bride_name: 'Myra',
    groom_parents: 'Son of Mrs. Sunita & Mr. Deepak Kapoor',
    bride_parents: 'Daughter of Mrs. Sharmila & Mr. Subhash Mehra',
    host_names: 'Kapoor & Mehra Families',
    title: 'Rose Gold Blush Floral Wedding',
    eventType: 'Wedding Invitation',
    date: '2026-12-02',
    time: '17:30',
    venue: 'JW Marriott Resort & Spa, Goa',
    venueAddress: 'Vagator Beach Rd, Bardez, Goa 403509',
    story_text: 'Sun-kissed romance, floral dreams, and an eternal promise of companionship.',
    message: 'With joyous hearts, we invite you to celebrate the wedding of',
    welcome_text: 'You are cordially invited to join us in celebrating the wedding celebration of Vihaan & Myra.',
    scratch_reveal_text: 'BEACH WEDDING • DEC 02, 2026 ♡',
    events: [
      { title: 'Sunset Welcome Sundowner', date: '2026-12-01', time: '05:00 PM', venue: 'Vagator Beach Lawn', address: 'Goa' },
      { title: 'Floral Pheras at Sunset', date: '2026-12-02', time: '05:30 PM', venue: 'The Cliffside Deck', address: 'Goa' },
      { title: 'Starlit Beach Afterparty', date: '2026-12-02', time: '09:00 PM', venue: 'The Palms Courtyard', address: 'Goa' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'modern-minimal': {
    names: 'Romeo & Juliet',
    groom_name: 'Romeo',
    bride_name: 'Juliet',
    groom_parents: 'Son of Mrs. & Mr. Montague',
    bride_parents: 'Daughter of Mrs. & Mr. Capulet',
    host_names: 'Montague & Capulet Families',
    title: 'Modern Minimal Contemporary Union',
    eventType: 'Wedding Invitation',
    date: '2026-11-18',
    time: '18:30',
    venue: 'The Oberoi Udaivilas, Udaipur',
    venueAddress: 'Badi-Gorela-Mulla Talai Rd, Haridas Ji Ki Magri, Udaipur 313001',
    story_text: 'Clean sapphire geometry, timeless intimacy, and unconditional devotion.',
    message: 'WEDDING INVITATION',
    welcome_text: 'You are cordially invited to join us in celebrating the wedding celebration of Romeo & Juliet.',
    scratch_reveal_text: 'SAVE THE DATE • NOV 18, 2026 ♡',
    events: [
      { title: 'The Intimate Vows Ceremony', date: '2026-11-18', time: '06:00 PM', venue: 'The Promenade Lawn', address: 'Udaipur, Rajasthan' },
      { title: 'Dinner Under Chandeliers', date: '2026-11-18', time: '08:00 PM', venue: 'Chandni Terrace', address: 'Udaipur, Rajasthan' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'royal-elegance': {
    names: 'Fazil & Zoya',
    groom_name: 'Fazil',
    bride_name: 'Zoya',
    groom_parents: 'Son of Mrs. & Mr. Khan',
    bride_parents: 'Daughter of Mrs. & Mr. Siddiqui',
    host_names: 'Khan & Siddiqui Families',
    title: 'Majestic Love Palace Celebration',
    eventType: 'Wedding Invitation',
    date: '2026-12-12',
    time: '19:00',
    venue: 'Noor Mahal Palace, Karnal',
    venueAddress: 'Noor Mahal Crossing, National Highway 1, Karnal 132001',
    story_text: 'Classic ivory hues and gold palace drapes celebrate two families coming together in eternal joy.',
    message: 'We request the honor of your presence to celebrate the wedding ceremony of',
    welcome_text: 'You are cordially invited to join us in celebrating the wedding celebration of Fazil & Zoya, together with their families.',
    scratch_reveal_text: 'SAVE THE DATE • DEC 12, 2026 ♡',
    events: [
      { title: 'Ring Ceremony & Sangeet', date: '2026-12-11', time: '07:00 PM', venue: 'Sheesh Mahal Banquets', address: 'Karnal, Haryana' },
      { title: 'Shubh Nikaah & Gala Dinner', date: '2026-12-12', time: '07:30 PM', venue: 'Rani Bagh Central Lawn', address: 'Karnal, Haryana' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'little-sunshine': {
    names: 'Vivaan Sharma',
    groom_name: 'Vivaan Sharma',
    bride_name: '1st Birthday Celebration',
    groom_parents: 'Loving Parents: Sneha & Rohit Sharma',
    bride_parents: 'Grandparents: Mrs. & Mr. K.K. Sharma',
    host_names: 'Sharma Family',
    title: 'Prince Vivaan Turns One!',
    eventType: 'Birthday Invitation',
    date: '2026-10-25',
    time: '17:00',
    venue: 'Grand Hyatt Mumbai Hotel & Residences',
    venueAddress: 'Bandra Kurla Complex Vicinity, Mumbai 400055',
    story_text: 'Our little prince is turning one! Join us for an evening of magic, laughter, balloons, and cake.',
    message: 'Join us in celebrating Vivaan’s 1st Birthday with fun, games, and wonderful treats!',
    welcome_text: 'Welcome to Little Prince Vivaan’s 1st Birthday Party!',
    scratch_reveal_text: 'JOIN THE BIRTHDAY BASH 🎂',
    events: [
      { title: 'Magic Show & Balloon Twisting', date: '2026-10-25', time: '05:30 PM', venue: 'The Grand Ballroom', address: 'Grand Hyatt Mumbai' },
      { title: 'Cake Cutting & Royal Feast', date: '2026-10-25', time: '07:00 PM', venue: 'Lawn Pavilion', address: 'Grand Hyatt Mumbai' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'sweet-nesting-baby': {
    names: 'Ananya & Siddharth Joshi',
    groom_name: 'Siddharth Joshi',
    bride_name: 'Ananya Joshi',
    groom_parents: 'Welcoming Baby Joshi with Love',
    bride_parents: 'Blessed by Grandparents on both sides',
    host_names: 'Joshi Family',
    title: 'Godh Bharai & Baby Shower Celebration',
    eventType: 'Baby Shower / Naming Ceremony',
    date: '2026-11-08',
    time: '16:00',
    venue: 'The Westin Pune Koregaon Park',
    venueAddress: '36/3-B, Mundhwa Rd, Koregaon Park Annexe, Pune 411001',
    story_text: 'A sweet little miracle is on the way to fill our lives with endless joy and giggles.',
    message: 'Cordially invite you to shower your blessings on the expectant mother and upcoming baby.',
    welcome_text: 'Welcome to our heavenly Baby Shower blessing ceremony!',
    scratch_reveal_text: 'BABY ON THE WAY 👶',
    events: [
      { title: 'Traditional Godh Bharai Rituals', date: '2026-11-08', time: '04:30 PM', venue: 'The Lotus Ballroom', address: 'The Westin Pune' },
      { title: 'High Tea & Celebration Games', date: '2026-11-08', time: '06:00 PM', venue: 'The Pool Deck', address: 'The Westin Pune' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'silver-anniversary': {
    names: 'Sunita & Rajesh Singhania',
    groom_name: 'Rajesh Singhania',
    bride_name: 'Sunita Singhania',
    groom_parents: 'Celebrating 25 Glorious Years of Matrimony (1999 - 2024)',
    bride_parents: 'Hosted with Love by Children: Aarav & Riya',
    host_names: 'Singhania Family',
    title: 'Silver Jubilee 25th Anniversary Celebration',
    eventType: 'Anniversary Invitation',
    date: '2026-11-30',
    time: '19:30',
    venue: 'The Taj Mahal Palace, Mumbai',
    venueAddress: 'Apollo Bunder, Colaba, Mumbai, Maharashtra 400001',
    story_text: '25 years of unconditional partnership, countless adventures, and an enduring bond of love.',
    message: 'Join us as we raise a toast to 25 wonderful years of together forever!',
    welcome_text: 'Welcome to the Silver Jubilee celebration of Sunita & Rajesh!',
    scratch_reveal_text: 'CHEERS TO 25 YEARS 🥂',
    events: [
      { title: 'Cocktails & Toast to 25 Years', date: '2026-11-30', time: '07:30 PM', venue: 'The Sea Lounge', address: 'The Taj Mahal Palace Mumbai' },
      { title: 'Gala Dinner & Dance', date: '2026-11-30', time: '09:00 PM', venue: 'The Crystal Room', address: 'The Taj Mahal Palace Mumbai' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'terracotta-boho': {
    names: 'Neha & Vikram Malhotra',
    groom_name: 'Vikram Malhotra',
    bride_name: 'Neha Malhotra',
    groom_parents: 'Shubh Griha Pravesh & Housewarming',
    bride_parents: 'Welcoming blessings into our new abode',
    host_names: 'Malhotra Family',
    title: 'Griha Pravesh & New Home Celebration',
    eventType: 'Housewarming / Griha Pravesh',
    date: '2026-10-18',
    time: '10:30',
    venue: 'Villa Serenity, The Palm Springs',
    venueAddress: 'Golf Course Road, Sector 54, Gurugram 122002',
    story_text: 'A home built with dreams, warmth, and laughter. We begin a wonderful new chapter.',
    message: 'Request your auspicious presence and blessings as we enter our new home.',
    welcome_text: 'Shubh Swagatam to our New Home!',
    scratch_reveal_text: 'WELCOME TO OUR NEW HOME 🏡',
    events: [
      { title: 'Vastu Shanti & Havan Puja', date: '2026-10-18', time: '10:30 AM', venue: 'Villa Serenity Courtyard', address: 'The Palm Springs, Gurugram' },
      { title: 'Housewarming Lunch & High Tea', date: '2026-10-18', time: '01:00 PM', venue: 'Rooftop Terrace', address: 'The Palm Springs, Gurugram' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'mehendi-magic': {
    names: 'Riya Sen & Varun Grover',
    groom_name: 'Varun Grover',
    bride_name: 'Riya Sen',
    groom_parents: 'Son of Mrs. & Mr. K.L. Grover',
    bride_parents: 'Daughter of Mrs. & Mr. Amit Sen',
    host_names: 'Sen & Grover Families',
    title: 'Marigold Henna & Dholak Utsav',
    eventType: 'Party & Celebration Invitations',
    date: '2026-11-16',
    time: '16:00',
    venue: 'Fairmont Jaipur, Kukas',
    venueAddress: '2, Riico, Kukas, Jaipur, Rajasthan 302028',
    story_text: 'Marigold yellow petals, fresh henna swirls, dholak beats, and joyous folk laughter.',
    message: 'Join us for a vibrant evening of henna, music, dance and delicious festive food!',
    welcome_text: 'Padharo Mhare Des! Welcome to the Henna Utsav!',
    scratch_reveal_text: 'MEHENDI UTSAV • NOV 16 🌼',
    events: [
      { title: 'Henna Application & Folk Dancers', date: '2026-11-16', time: '04:00 PM', venue: 'Zoya Central Lawn', address: 'Fairmont Jaipur' },
      { title: 'Dholak Beats & Rajasthani Feast', date: '2026-11-16', time: '07:30 PM', venue: 'Aravalli Ballroom', address: 'Fairmont Jaipur' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'celestial-night': {
    names: 'Kiara & Aryan',
    groom_name: 'Aryan Varma',
    bride_name: 'Kiara Sen',
    groom_parents: 'Sangeet & Cocktail Galaxy Night',
    bride_parents: 'Presented by Sen & Varma Families',
    host_names: 'Kiara & Aryan Squad',
    title: 'Celestial Galaxy Sangeet & Cocktails',
    eventType: 'Party & Celebration Invitations',
    date: '2026-11-27',
    time: '20:00',
    venue: 'Alila Diwa Goa Resort',
    venueAddress: '48/10, Adao Waddo, Majorda, Goa 403713',
    story_text: 'Under a canopy of stardust and crystal constellations, we dance the night away.',
    message: 'Get ready for an electric night of live band, Bollywood DJ battles, and signature cocktails!',
    welcome_text: 'Welcome to the Most Epic Galaxy Sangeet Night!',
    scratch_reveal_text: 'DANCE UNDER THE STARS ✨',
    events: [
      { title: 'Red Carpet & Cocktail Hour', date: '2026-11-27', time: '08:00 PM', venue: 'The Courtyard Deck', address: 'Alila Diwa Goa' },
      { title: 'Stage Performances & Afterparty', date: '2026-11-27', time: '09:30 PM', venue: 'Grand Diwa Ballroom', address: 'Alila Diwa Goa' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'coastal-breeze': {
    names: 'Tanya & Neil D’Souza',
    groom_name: 'Neil D’Souza',
    bride_name: 'Tanya Fernandez',
    groom_parents: 'Son of Mrs. Maria & Mr. Francis D’Souza',
    bride_parents: 'Daughter of Mrs. Joyce & Mr. Peter Fernandez',
    host_names: 'D’Souza & Fernandez Families',
    title: 'Goa Coastal Beachfront Nuptials',
    eventType: 'Wedding Invitation',
    date: '2026-12-04',
    time: '16:30',
    venue: 'W Goa Beachfront Pavilions, Vagator',
    venueAddress: 'Vagator Beach, Bardez, Goa 403509',
    story_text: 'Salty ocean breezes, sunlit palms, and barefoot vows along the shimmering Arabian Sea.',
    message: 'Warmly invite you to celebrate our seaside destination wedding in sunny Goa.',
    welcome_text: 'Welcome to our tropical beachfront wedding celebration!',
    scratch_reveal_text: 'GOA BEACH WEDDING • DEC 04 🏖️',
    events: [
      { title: 'Barefoot Beachside Vows', date: '2026-12-04', time: '04:30 PM', venue: 'Vagator Beachfront Lawn', address: 'W Goa' },
      { title: 'Sunset Sundowner & Live Jazz', date: '2026-12-04', time: '06:30 PM', venue: 'Rockpool Pavilion', address: 'W Goa' },
      { title: 'Starlit Seafood Gala Dinner', date: '2026-12-04', time: '08:30 PM', venue: 'The Great Room', address: 'W Goa' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1544078741-7ea0e0cb5b81?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    ],
  },
  // =========================================================================
  // 👑 5 NEW ROYAL TIER DEMO SUITES
  // =========================================================================
  'royal-farman': {
    names: 'Kunwar Ranvijay & Rajkumari Padmavati',
    groom_name: 'Kunwar Ranvijay',
    bride_name: 'Rajkumari Padmavati',
    groom_parents: 'Son of Maharajadhiraj Gaj Singh & Maharani Hemlata',
    bride_parents: 'Daughter of Maharaj Jai Singh & Maharani Suniti',
    host_names: 'Royal Houses of Mewar & Marwar',
    title: 'The Royal Shahi Farman Wedding Ceremony',
    eventType: 'Wedding Invitation',
    date: '2026-12-18',
    time: '19:00',
    venue: 'City Palace Zenana Mahal, Udaipur',
    venueAddress: 'Old City, Udaipur, Rajasthan 313001',
    story_text: 'Five centuries of royal prestige embrace two souls destined for an eternal legacy.',
    message: 'Solicit the honor of your august presence at the Royal Vivah Ceremony.',
    welcome_text: 'Shubh Swagatam to our Royal Farman Celebration.',
    scratch_reveal_text: 'ROYAL WEDDING • DEC 18, 2026 ♡',
    events: [
      { title: 'The Royal Shahi Mayra', date: '2026-12-17', time: '11:00 AM', venue: 'Manek Chowk, City Palace', address: 'Udaipur, Rajasthan' },
      { title: 'Sangeet Under The Stars', date: '2026-12-17', time: '07:30 PM', venue: 'Zenana Courtyard', address: 'Udaipur, Rajasthan' },
      { title: 'The Royal Vivah & Pheras', date: '2026-12-18', time: '07:00 PM', venue: 'Central Palace Dome', address: 'Udaipur, Rajasthan' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544078741-7ea0e0cb5b81?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'royal-jharokha': {
    names: 'Devendra Rathore & Gayatri Singh',
    groom_name: 'Devendra Rathore',
    bride_name: 'Gayatri Singh',
    groom_parents: 'Son of Mrs. & Mr. K.S. Rathore',
    bride_parents: 'Daughter of Mrs. & Mr. B.P. Singh',
    host_names: 'Rathore & Singh Families',
    title: 'Rajputana Jharokha Mandap Wedding',
    eventType: 'Wedding Invitation',
    date: '2026-12-20',
    time: '18:30',
    venue: 'Suryagarh Palace, Jaisalmer',
    venueAddress: 'Kahala Phata, Sam Road, Jaisalmer, Rajasthan 345001',
    story_text: 'Amidst sandstone palace arches and glowing lanterns, two best friends unite forever.',
    message: 'Warmly invite you to witness our sacred pheras and celebration.',
    welcome_text: 'Welcome to our desert palace celebration!',
    scratch_reveal_text: 'JOIN OUR CELEBRATION • DEC 20 ♡',
    events: [
      { title: 'Dunes Sunset Sundowner', date: '2026-12-19', time: '05:30 PM', venue: 'Thar Sunset Point', address: 'Jaisalmer, Rajasthan' },
      { title: 'Jharokha Pheras & Dinner', date: '2026-12-20', time: '06:30 PM', venue: 'Suryagarh Courtyard', address: 'Jaisalmer, Rajasthan' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'royal-solitaire': {
    names: 'Aarav Singhania & Natasha Oberoi',
    groom_name: 'Aarav Singhania',
    bride_name: 'Natasha Oberoi',
    groom_parents: 'Son of Mrs. & Mr. Vikram Singhania',
    bride_parents: 'Daughter of Mrs. & Mr. Rajesh Oberoi',
    host_names: 'Singhania & Oberoi Families',
    title: 'Kohinoor Solitaire Crystal Wedding',
    eventType: 'Wedding Invitation',
    date: '2026-11-28',
    time: '19:30',
    venue: 'The Leela Palace, New Delhi',
    venueAddress: 'Diplomatic Enclave, Chanakyapuri, New Delhi 110023',
    story_text: 'Lit by sapphire starlight and crystal chandeliers, a modern fairytale begins.',
    message: 'Cordially invite you to celebrate the wedding reception of Aarav and Natasha.',
    welcome_text: 'Welcome to our starlit celebration.',
    scratch_reveal_text: 'SAVE THE DATE • NOV 28 ♡',
    events: [
      { title: 'Diamond Sangeet Night', date: '2026-11-27', time: '07:30 PM', venue: 'Grand Crystal Ballroom', address: 'The Leela Palace' },
      { title: 'The Wedding Nuptials', date: '2026-11-28', time: '07:30 PM', venue: 'Royal Palace Lawn', address: 'The Leela Palace' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'royal-emerald-sheesh': {
    names: 'Rohan Mehra & Ananya Kapoor',
    groom_name: 'Rohan Mehra',
    bride_name: 'Ananya Kapoor',
    groom_parents: 'Son of Mrs. & Mr. Deepak Mehra',
    bride_parents: 'Daughter of Mrs. & Mr. Anil Kapoor',
    host_names: 'Mehra & Kapoor Families',
    title: 'Sheesh Mahal Emerald Palace Vivah',
    eventType: 'Wedding Invitation',
    date: '2026-12-05',
    time: '18:00',
    venue: 'Samode Palace & Haveli, Jaipur',
    venueAddress: 'Samode Village, Chomu, Rajasthan 303806',
    story_text: 'Mirror mosaic halls and emerald gardens reflect the pure love in our hearts.',
    message: 'Request the pleasure of your company to celebrate our auspicious union.',
    welcome_text: 'Welcome to our Sheesh Mahal wedding festivities!',
    scratch_reveal_text: 'EMERALD PALACE • DEC 05 ♡',
    events: [
      { title: 'Mehendi in the Gardens', date: '2026-12-04', time: '03:30 PM', venue: 'Samode Bagh Fountains', address: 'Jaipur, Rajasthan' },
      { title: 'Sheesh Mahal Pheras', date: '2026-12-05', time: '06:00 PM', venue: 'The Glass Pavilion', address: 'Jaipur, Rajasthan' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'royal-destination': {
    names: 'Kabir & Sanjana',
    groom_name: 'Kabir Varma',
    bride_name: 'Sanjana Sen',
    groom_parents: 'Son of Mrs. & Mr. Sunil Varma',
    bride_parents: 'Daughter of Mrs. & Mr. Amit Sen',
    host_names: 'Varma & Sen Families',
    title: 'Udaipur Lakefront Destination Vivah',
    eventType: 'Wedding Invitation',
    date: '2026-12-14',
    time: '17:00',
    venue: 'The Oberoi Udaivilas, Udaipur',
    venueAddress: 'Badi-Gorela-Mulla Talai Rd, Haridas Ji Ki Magri, Udaipur 313001',
    story_text: 'Where golden lake waters reflect palace domes, two souls step into forever.',
    message: 'Join us for our 3-day destination celebration in royal Udaipur.',
    welcome_text: 'Welcome to our Udaipur destination wedding!',
    scratch_reveal_text: 'DESTINATION UDAIPUR • DEC 14 ♡',
    events: [
      { title: 'Royal Boat Arrival & Sundowner', date: '2026-12-13', time: '05:00 PM', venue: 'Pichola Lakefront Deck', address: 'Udaivilas, Udaipur' },
      { title: 'The Royal Sunset Pheras', date: '2026-12-14', time: '05:30 PM', venue: 'The Central Dome Lawn', address: 'Udaivilas, Udaipur' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544078741-7ea0e0cb5b81?auto=format&fit=crop&w=800&q=80',
    ],
  },

  // =========================================================================
  // 🕉️ 3 ROYAL HINDI DEMO SUITES
  // =========================================================================
  'royal-shubh-vivah-hindi': {
    names: 'चि. सिद्धार्थ एवं सौ. कां. राधिका',
    groom_name: 'चि. सिद्धार्थ',
    bride_name: 'सौ. कां. राधिका',
    groom_parents: 'सुपुत्र श्रीमती सरोज एवं श्री राजेंद्र प्रसाद शर्मा',
    bride_parents: 'सुपुत्री श्रीमती सुशीला एवं श्री महेश चंद्र शास्त्री',
    host_names: 'शर्मा एवं शास्त्री परिवार',
    title: '|| श्री गणेशाय नमः || राजसी शुभ विवाह',
    eventType: 'हिंदी निमंत्रण / Hindi Invitations',
    language: 'hi',
    isHindi: true,
    date: '2026-12-11',
    time: '19:00',
    venue: 'नूर महल पैलेस, करनाल',
    venueAddress: 'नूर महल क्रॉसिंग, नेशनल हाईवे १, करनाल १३२००१',
    story_text: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
    message: 'मांगलिक विवाह निमंत्रण - हमारी सुपुत्री एवं सुपुत्र के शुभ पाणिग्रहण संस्कार में आपकी गरिमामयी उपस्थिति प्रार्थनीय है।',
    welcome_text: '|| शुभ आगमनम् || हमारे वैवाहिक उत्सव में आपका हार्दिक स्वागत एवं अभिनंदन है।',
    scratch_reveal_text: 'शुभ विवाह मुहूर्त • ११ दिसंबर २०२६ 卐',
    events: [
      { title: 'शुभ गणेश पूजन एवं मंडप प्रवेश', date: '१० दिसंबर २०२६', time: 'प्रातः १०:३० बजे', venue: 'शीश महल बैंक्वेट', address: 'करनाल, हरियाणा' },
      { title: 'हल्दी, कुमकुम एवं महिला संगीत', date: '१० दिसंबर २०२६', time: 'सायं ०७:०० बजे', venue: 'रंग महल लॉन', address: 'करनाल, हरियाणा' },
      { title: 'शुभ बारात आगमन एवं पाणिग्रहण संस्कार', date: '११ दिसंबर २०२६', time: 'सायं ०७:३० बजे', venue: 'रानी बाग सेंट्रल लॉन', address: 'करनाल, हरियाणा' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544078741-7ea0e0cb5b81?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'royal-rajwada-utsav-hindi': {
    names: 'चि. कुंवर मानवेंद्र एवं सौ. कां. जयश्री',
    groom_name: 'कुंवर मानवेंद्र सिंह',
    bride_name: 'सौ. कां. जयश्री राठौड़',
    groom_parents: 'सुपुत्र राजमाता गायत्री देवी एवं ठाकुर विक्रम सिंह शेखावत',
    bride_parents: 'सुपुत्री श्रीमती पद्मजा एवं श्री दिग्विजय सिंह राठौड़',
    host_names: 'शेखावत एवं राठौड़ राजवंश',
    title: 'राजवाड़ा शुभ विवाह महोत्सव',
    eventType: 'हिंदी निमंत्रण / Hindi Invitations',
    language: 'hi',
    isHindi: true,
    date: '2026-12-16',
    time: '18:30',
    venue: 'उम्मेद भवन पैलेस, जोधपुर',
    venueAddress: 'सर्किट हाउस रोड, जोधपुर, राजस्थान ३४२००६',
    story_text: 'रजवाड़ी ठाठ, शंख-शहनाई मंगल ध्वनि एवं कुलदेवी के पावन आशीर्वाद से दो कुलों का मंगल मिलन।',
    message: 'श्रीमान/श्रीमती जी, हमारे परिवार के इस मांगलिक वैवाहिक उत्सव में सपरिवार पधारकर नवदंपति को आशीर्वाद प्रदान करें।',
    welcome_text: 'खम्मा घणी! हमारे राजसी विवाह उत्सव में आपका आदरपूर्वक स्वागत है।',
    scratch_reveal_text: 'राजसी विवाह • १६ दिसंबर २०२६ 👑',
    events: [
      { title: 'शाही मायरा एवं तेल बाण', date: '१५ दिसंबर २०२६', time: 'प्रातः ११:०० बजे', venue: 'बारादरी गार्डन्स', address: 'जोधपुर' },
      { title: 'रजवाड़ी संगीत एवं घूमर संध्या', date: '१५ दिसंबर २०२६', time: 'सायं ०७:३० बजे', venue: 'मारवाड़ हॉल', address: 'जोधपुर' },
      { title: 'शाही बारात एवं शुभ फेरे', date: '१६ दिसंबर २०२६', time: 'सायं ०६:३० बजे', venue: 'सेंट्रल डोम पैवेलियन', address: 'जोधपुर' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'royal-shahi-farman-hindi': {
    names: 'चि. आदित्य एवं सौ. कां. मीनाक्षी',
    groom_name: 'चि. आदित्य',
    bride_name: 'सौ. कां. मीनाक्षी',
    groom_parents: 'सुपुत्र श्रीमती निर्मला एवं श्री सत्यनारायण अग्रवाल',
    bride_parents: 'सुपुत्री श्रीमती कांता एवं श्री ओमप्रकाश गुप्ता',
    host_names: 'अग्रवाल एवं गुप्ता परिवार',
    title: 'शाही फरमान निमंत्रण पत्रिका',
    eventType: 'हिंदी निमंत्रण / Hindi Invitations',
    language: 'hi',
    isHindi: true,
    date: '2026-11-22',
    time: '19:00',
    venue: 'रामबाग पैलेस, जयपुर',
    venueAddress: 'भवानी सिंह रोड, जयपुर, राजस्थान ३०२००५',
    story_text: 'परमपिता परमेश्वर की असीम अनुकंपा से हमारे प्रिय पुत्र-पुत्री का परिणय संस्कार संपन्न होने जा रहा है।',
    message: 'मांगलिक आमंत्रण - आपकी मंगलमयी उपस्थिति हमारे इस मांगलिक पर्व की शोभा बढ़ाएगी।',
    welcome_text: 'शुभ स्वागतम्! वर-वधू को स्नेहिल शुभाशीष प्रदान करें।',
    scratch_reveal_text: 'मांगलिक विवाह • २२ नवंबर २०२६ 📜',
    events: [
      { title: 'हल्दी कुमकुम एवं सगाई उत्सव', date: '२१ नवंबर २०२६', time: 'सायं ०६:०० बजे', venue: 'नक्शा गार्डन', address: 'जयपुर' },
      { title: 'शुभ विवाह एवं प्रीतिभोज', date: '२२ नवंबर २०२६', time: 'सायं ०७:०० बजे', venue: 'मुबारक महल लॉन', address: 'जयपुर' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1544078741-7ea0e0cb5b81?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    ],
  },

  // =========================================================================
  // ✨ 5 NEW CLASSIC SIGNATURE DEMO SUITES
  // =========================================================================
  'classic-farman-scroll': {
    names: 'Ranveer & Deepika',
    groom_name: 'Ranveer',
    bride_name: 'Deepika',
    groom_parents: 'Son of Mrs. & Mr. Bhavnani',
    bride_parents: 'Daughter of Mrs. & Mr. Padukone',
    host_names: 'Bhavnani & Padukone Families',
    title: 'Royal Shahi Scroll 3D Unroll',
    eventType: 'Wedding Invitation',
    date: '2026-12-18',
    time: '19:00',
    venue: 'Taj Lake Palace, Udaipur',
    venueAddress: 'Pichola, Udaipur, Rajasthan 313001',
    story_text: 'An antique parchment scroll unfolds the timeless romance of two soulmates.',
    message: 'Request the honor of your presence to celebrate the wedding ceremony of',
    welcome_text: 'You are cordially invited to celebrate with us.',
    scratch_reveal_text: 'ROYAL WEDDING • DEC 18 ♡',
    events: [
      { title: 'Ring Ceremony & Sangeet', date: '2026-12-17', time: '07:00 PM', venue: 'Mewar Ballroom', address: 'Udaipur' },
      { title: 'The Royal Pheras & Dinner', date: '2026-12-18', time: '07:30 PM', venue: 'Central Courtyard', address: 'Udaipur' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544078741-7ea0e0cb5b81?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'classic-velvet-envelope': {
    names: 'Veer & Zara',
    groom_name: 'Veer',
    bride_name: 'Zara',
    groom_parents: 'Son of Mrs. & Mr. Ahluwalia',
    bride_parents: 'Daughter of Mrs. & Mr. Batra',
    host_names: 'Ahluwalia & Batra Families',
    title: 'Velvet Envelope Flap & Card Reveal',
    eventType: 'Wedding Invitation',
    date: '2026-11-25',
    time: '18:30',
    venue: 'The Leela Palace, New Delhi',
    venueAddress: 'Diplomatic Enclave, Chanakyapuri, New Delhi 110023',
    story_text: 'A luxury velvet envelope opens to reveal an exquisite gold invitation card.',
    message: 'Cordially invite you to celebrate the wedding ceremony of',
    welcome_text: 'You are cordially invited to celebrate our wedding.',
    scratch_reveal_text: 'SAVE THE DATE • NOV 25 ♡',
    events: [
      { title: 'Cocktails & Sangeet', date: '2026-11-24', time: '07:30 PM', venue: 'Grand Ballroom', address: 'New Delhi' },
      { title: 'Anand Karaj & Reception', date: '2026-11-25', time: '11:30 AM', venue: 'Poolside Lawn', address: 'New Delhi' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'classic-boarding-pass': {
    names: 'Neil & Tanya',
    groom_name: 'Neil',
    bride_name: 'Tanya',
    groom_parents: 'Son of Mrs. & Mr. D’Souza',
    bride_parents: 'Daughter of Mrs. & Mr. Fernandez',
    host_names: 'D’Souza & Fernandez Families',
    title: 'Destination Luxe Passport & Boarding Pass',
    eventType: 'Wedding Invitation',
    date: '2026-12-04',
    time: '17:00',
    venue: 'W Goa Resort & Beachfront',
    venueAddress: 'Vagator Beach Rd, Bardez, Goa 403509',
    story_text: 'Pack your bags and join us in paradise as we celebrate our destination wedding!',
    message: 'DESTINATION WEDDING INVITATION',
    welcome_text: 'Welcome aboard our destination celebration!',
    scratch_reveal_text: 'BOARDING PASS • DEC 04 ✈️',
    events: [
      { title: 'Sunset Sundowner Party', date: '2026-12-03', time: '05:00 PM', venue: 'Rockpool Deck', address: 'Goa' },
      { title: 'Barefoot Beach Nuptials', date: '2026-12-04', time: '05:30 PM', venue: 'W Beach Lawn', address: 'Goa' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'classic-marigold-utsav': {
    names: 'Varun & Riya',
    groom_name: 'Varun',
    bride_name: 'Riya',
    groom_parents: 'Son of Mrs. & Mr. Grover',
    bride_parents: 'Daughter of Mrs. & Mr. Sen',
    host_names: 'Grover & Sen Families',
    title: 'Marigold Temple Bells Celebration',
    eventType: 'Wedding Invitation',
    date: '2026-11-16',
    time: '18:00',
    venue: 'Fairmont Jaipur, Kukas',
    venueAddress: '2, Riico, Kukas, Jaipur, Rajasthan 302028',
    story_text: 'Temple bells chime and marigold flowers shower their divine fragrance upon our new beginnings.',
    message: 'Cordially invite you to celebrate the joyous matrimony of Varun and Riya.',
    welcome_text: 'Welcome to our traditional wedding celebrations.',
    scratch_reveal_text: 'MARIGOLD WEDDING • NOV 16 🪔',
    events: [
      { title: 'Traditional Mehendi Utsav', date: '2026-11-15', time: '04:00 PM', venue: 'Zoya Central Lawn', address: 'Fairmont Jaipur' },
      { title: 'Shubh Vivah & Royal Feast', date: '2026-11-16', time: '06:30 PM', venue: 'Aravalli Ballroom', address: 'Fairmont Jaipur' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'classic-starlight-galaxy': {
    names: 'Aryan & Kiara',
    groom_name: 'Aryan',
    bride_name: 'Kiara',
    groom_parents: 'Son of Mrs. & Mr. Varma',
    bride_parents: 'Daughter of Mrs. & Mr. Sen',
    host_names: 'Varma & Sen Families',
    title: 'Celestial Zodiac Harmony Wedding',
    eventType: 'Wedding Invitation',
    date: '2026-11-27',
    time: '19:30',
    venue: 'Alila Diwa Goa Resort',
    venueAddress: '48/10, Adao Waddo, Majorda, Goa 403713',
    story_text: 'Written in the stars, two constellations merge into one lifelong orbit of love.',
    message: 'CELESTIAL WEDDING CELEBRATION',
    welcome_text: 'Welcome to our starry night celebration.',
    scratch_reveal_text: 'DANCE UNDER STARS • NOV 27 ✨',
    events: [
      { title: 'Galaxy Sangeet & Cocktails', date: '2026-11-26', time: '07:30 PM', venue: 'Diwa Poolside', address: 'Goa' },
      { title: 'Starlit Nuptials & Dinner', date: '2026-11-27', time: '07:30 PM', venue: 'Grand Ballroom', address: 'Goa' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    ],
  },

  // =========================================================================
  // 🕉️ 3 CLASSIC HINDI DEMO SUITES
  // =========================================================================
  'classic-pavitra-bandhan-hindi': {
    names: 'चि. मयंक एवं सौ. कां. प्रिया',
    groom_name: 'चि. मयंक',
    bride_name: 'सौ. कां. प्रिया',
    groom_parents: 'सुपुत्र श्रीमती आशा एवं श्री रमेश चंद्र जोशी',
    bride_parents: 'सुपुत्री श्रीमती रेखा एवं श्री विजय कुमार दीक्षित',
    host_names: 'जोशी एवं दीक्षित परिवार',
    title: 'पवित्र बंधन विवाह पत्रिका',
    eventType: 'हिंदी निमंत्रण / Hindi Invitations',
    language: 'hi',
    isHindi: true,
    date: '2026-12-08',
    time: '19:00',
    venue: 'हयात रीजेंसी, नई दिल्ली',
    venueAddress: 'भीकाजी कामा प्लेस, नई दिल्ली ११००६६',
    story_text: 'मंगलम् भगवान विष्णुः मंगलम् गरुड़ध्वजः। मंगलम् पुण्डरीकाक्षः मंगलाय तनो हरिः॥',
    message: 'मांगलिक पाणिग्रहण संस्कार - आपकी उपस्थिति वर-वधू को शुभ आशीर्वाद प्रदान करेगी।',
    welcome_text: '|| स्वागताम् || हमारे पावन मांगलिक उत्सव में आपका सहर्ष स्वागत है।',
    scratch_reveal_text: 'शुभ विवाह • ०८ दिसंबर २०२६ 卐',
    events: [
      { title: 'गणेश स्थापना एवं महिला संगीत', date: '०७ दिसंबर २०२६', time: 'सायं ०६:३० बजे', venue: 'रीगल हॉल', address: 'नई दिल्ली' },
      { title: 'शुभ पाणिग्रहण संस्कार एवं भोज', date: '०८ दिसंबर २०२६', time: 'सायं ०७:०० बजे', venue: 'द मेंशन लॉन', address: 'नई दिल्ली' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544078741-7ea0e0cb5b81?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'classic-mandap-sandesh-hindi': {
    names: 'चि. प्रखर एवं सौ. कां. अनुष्का',
    groom_name: 'चि. प्रखर',
    bride_name: 'सौ. कां. अनुष्का',
    groom_parents: 'सुपुत्र श्रीमती ममता एवं श्री सुरेश चंद्र बाजपेयी',
    bride_parents: 'सुपुत्री श्रीमती वंदना एवं श्री विनोद कुमार त्रिवेदी',
    host_names: 'बाजपेयी एवं त्रिवेदी परिवार',
    title: 'मंगल मंडप संदेश निमंत्रण',
    eventType: 'हिंदी निमंत्रण / Hindi Invitations',
    language: 'hi',
    isHindi: true,
    date: '2026-11-30',
    time: '18:30',
    venue: 'ताज पैलेस, जयपुर',
    venueAddress: 'भवानी सिंह रोड, जयपुर, राजस्थान',
    story_text: 'दीपक की ज्योति, कलश का अमृत और अपनों का स्नेह... इन्हीं पावन भावों के साथ विवाह उत्सव।',
    message: 'मांगलिक निमंत्रण - हमारे इस मांगलिक कार्य में पधारकर हमें अनुग्रहीत करें।',
    welcome_text: 'पधारो म्हारे देश! मंगल विवाह में आपका हार्दिक स्वागत है।',
    scratch_reveal_text: 'मंगल विवाह • ३० नवंबर २०२६ 🪔',
    events: [
      { title: 'हल्दी कुमकुम एवं संगीत संध्या', date: '२९ नवंबर २०२६', time: 'सायं ०५:३० बजे', venue: 'अरावली लॉन', address: 'जयपुर' },
      { title: 'शुभ लग्न एवं प्रीतिभोज', date: '३० नवंबर २०२६', time: 'सायं ०६:३० बजे', venue: 'जय महल हॉल', address: 'जयपुर' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'classic-anand-utsav-hindi': {
    names: 'चि. वैभव एवं सौ. कां. साक्षी',
    groom_name: 'चि. वैभव',
    bride_name: 'सौ. कां. साक्षी',
    groom_parents: 'सुपुत्र श्रीमती स्नेहलता एवं श्री कैलाश नारायण माथुर',
    bride_parents: 'सुपुत्री श्रीमती शकुंतला एवं श्री आलोक कुमार भटनागर',
    host_names: 'माथुर एवं भटनागर परिवार',
    title: 'आनंद उत्सव वैवाहिक निमंत्रण',
    eventType: 'हिंदी निमंत्रण / Hindi Invitations',
    language: 'hi',
    isHindi: true,
    date: '2026-12-25',
    time: '19:00',
    venue: 'आईटीसी मौर्या, नई दिल्ली',
    venueAddress: 'सरदार पटेल मार्ग, चाणक्यपुरी, नई दिल्ली ११००२१',
    story_text: 'स्नेह, विश्वास और समर्पण के पावन बंधन में बंधते दो दिलों का आनंद उत्सव।',
    message: 'मांगलिक विवाह आमंत्रण - आपकी मंगलमय उपस्थिति नवदंपति के लिए प्रेरणा व आशीर्वाद होगी।',
    welcome_text: 'शुभ स्वागतम्! आनंद उत्सव में आपका हार्दिक अभिनंदन है।',
    scratch_reveal_text: 'आनंद उत्सव • २५ दिसंबर २०२६ ✨',
    events: [
      { title: 'रिंग सेरेमनी एवं संगीत संध्या', date: '२४ दिसंबर २०२६', time: 'सायं ०७:०० बजे', venue: 'कमल महल', address: 'नई दिल्ली' },
      { title: 'शुभ पाणिग्रहण एवं ग्रैंड डिनर', date: '२५ दिसंबर २०२६', time: 'सायं ०७:३० बजे', venue: 'नंदिया गार्डन', address: 'नई दिल्ली' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    ],
  },
};

export const allDemosList = [
  // 👑 10 Royal Video Gate Suites
  { id: 'rose-gold-blush-royal', name: '👑 1. Royal Imperial', tier: 'royal' },
  { id: 'royal-majesty', name: '👑 2. Royal Majesty', tier: 'royal' },
  { id: 'royal-elegance-royal', name: '👑 3. Royal Elegance', tier: 'royal' },
  { id: 'royal-prestige', name: '👑 4. Royal Prestige', tier: 'royal' },
  { id: 'royal-heritage', name: '👑 5. Royal Heritage', tier: 'royal' },
  { id: 'royal-grace', name: '👑 6. Royal Grace', tier: 'royal' },
  { id: 'royal-crest', name: '👑 7. Royal Crest', tier: 'royal' },
  { id: 'royal-legacy', name: '👑 8. Royal Legacy', tier: 'royal' },
  { id: 'emerald-noir-royal', name: '👑 9. Emerald Noir Royal', tier: 'royal' },
  { id: 'ivory-elegance-royal', name: '👑 10. Ivory & Crimson Royal', tier: 'royal' },

  // 👑 5 NEW SIGNATURE ROYAL SUITES
  { id: 'royal-farman', name: '👑 11. Royal Shahi Farman', tier: 'royal' },
  { id: 'royal-jharokha', name: '👑 12. Rajputana Jharokha Mandap', tier: 'royal' },
  { id: 'royal-solitaire', name: '👑 13. Kohinoor Solitaire Luxe', tier: 'royal' },
  { id: 'royal-emerald-sheesh', name: '👑 14. Sheesh Mahal Emerald', tier: 'royal' },
  { id: 'royal-destination', name: '👑 15. Udaipur Lakefront Destination', tier: 'royal' },

  // 🕉️ 3 ROYAL HINDI LUXURY SUITES
  { id: 'royal-shubh-vivah-hindi', name: '🕉️ 1. राजसी शुभ विवाह (|| श्री गणेशाय नमः ||)', tier: 'royal' },
  { id: 'royal-rajwada-utsav-hindi', name: '🕉️ 2. राजवाड़ा विवाह महोत्सव', tier: 'royal' },
  { id: 'royal-shahi-farman-hindi', name: '🕉️ 3. शाही फरमान निमंत्रण पत्रिका', tier: 'royal' },

  // ✨ 5 Classic 3D Gate Suites
  { id: 'emerald-noir', name: '✨ 1. Emerald Mughal Jaali', tier: 'classic' },
  { id: 'ivory-elegance', name: '✨ 2. Crimson Royale Split', tier: 'classic' },
  { id: 'rose-gold-blush', name: '✨ 3. Rose Gold Floral Arch', tier: 'classic' },
  { id: 'modern-minimal', name: '✨ 4. Modern Minimal Book', tier: 'classic' },
  { id: 'royal-elegance', name: '✨ 5. Majestic Velvet Drape', tier: 'classic' },

  // ✨ 5 NEW SIGNATURE CLASSIC 3D SUITES
  { id: 'classic-farman-scroll', name: '✨ 6. Royal Shahi 3D Scroll', tier: 'classic' },
  { id: 'classic-velvet-envelope', name: '✨ 7. Velvet Envelope Flap & Card', tier: 'classic' },
  { id: 'classic-boarding-pass', name: '✨ 8. Destination Luxe Passport', tier: 'classic' },
  { id: 'classic-marigold-utsav', name: '✨ 9. Marigold Temple Bells Gate', tier: 'classic' },
  { id: 'classic-starlight-galaxy', name: '✨ 10. Celestial Zodiac Harmony', tier: 'classic' },

  // 🕉️ 3 CLASSIC HINDI 3D SUITES
  { id: 'classic-pavitra-bandhan-hindi', name: '🕉️ 4. पवित्र बंधन विवाह पत्रिका (3D)', tier: 'classic' },
  { id: 'classic-mandap-sandesh-hindi', name: '🕉️ 5. मंगल मंडप संदेश (3D)', tier: 'classic' },
  { id: 'classic-anand-utsav-hindi', name: '🕉️ 6. आनंद उत्सव निमंत्रण (3D)', tier: 'classic' },

  // Multi-Category Event Suites
  { id: 'little-sunshine', name: '🎂 Birthday Prince', tier: 'classic' },
  { id: 'sweet-nesting-baby', name: '👶 Baby Shower Cradle', tier: 'classic' },
  { id: 'silver-anniversary', name: '🥂 Silver Jubilee', tier: 'classic' },
  { id: 'terracotta-boho', name: '🏡 Griha Pravesh', tier: 'classic' },
  { id: 'mehendi-magic', name: '🌼 Marigold Henna', tier: 'classic' },
  { id: 'celestial-night', name: '✨ Galaxy Party', tier: 'classic' },
  { id: 'coastal-breeze', name: '🏖️ Goa Beachfront', tier: 'classic' },
];

const PublicInvitation = ({ defaultSlug = 'rose-gold-blush-royal' }) => {
  const { slug: rawSlug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const templateQuery =
    searchParams.get('template') || searchParams.get('t') || searchParams.get('id');

  const slug =
    templateQuery || (rawSlug && rawSlug !== 'undefined' && rawSlug !== 'demo' ? rawSlug : defaultSlug);

  // Synchronous initial preset resolution to prevent black screen on load
  const getInitialDemoData = (targetSlug) => {
    const activeSlug = targetSlug || defaultSlug;
    const aliases = {
      'royal-love': 'rose-gold-blush-royal',
      'modern-minimal-royal': 'royal-elegance-royal',
      'crimson-royale': 'ivory-elegance',
    };
    const resolvedSlug = aliases[activeSlug] || activeSlug;
    const customPreset = templateDemoDataMap[resolvedSlug] || templateDemoDataMap['rose-gold-blush-royal'];
    const isRoyalSuite =
      resolvedSlug.includes('royal') && resolvedSlug !== 'royal-elegance';

    return {
      _id: `demo-${resolvedSlug}`,
      id: `demo-${resolvedSlug}`,
      template_id: resolvedSlug,
      templateId: resolvedSlug,
      tier: isRoyalSuite ? 'royal' : 'classic',
      ...customPreset,
      scratch_enabled: true,
      rsvp_enabled: true,
      music_enabled: true,
    };
  };

  const { isBlurred, securityAlert } = useContentProtection(true);
  const [invitation, setInvitation] = useState(() => getInitialDemoData(slug));
  const [loading, setLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchInvitation = async () => {
      const activeSlug = slug || 'rose-gold-blush-royal';

      // Alias resolver
      const aliases = {
        'royal-love': 'rose-gold-blush-royal',
        'modern-minimal-royal': 'royal-elegance-royal',
        'crimson-royale': 'ivory-elegance',
      };
      const resolvedSlug = aliases[activeSlug] || activeSlug;

      try {
        const res = await api.get(`/invitations/public/${resolvedSlug}`);
        const data = res.data?.invitation || res.data?.data || res.data || res.invitation;
        if (data && !data._id?.startsWith('demo-')) {
          setInvitation(data);
          setIsDemoMode(false);
          return;
        }
      } catch (err) {
        // Fallback to local rich demo preset
      }

      setIsDemoMode(true);
      const customPreset = templateDemoDataMap[resolvedSlug] || templateDemoDataMap['rose-gold-blush-royal'];
      const isRoyalSuite =
        resolvedSlug.includes('royal') && resolvedSlug !== 'royal-elegance';

      const demoData = {
        _id: `demo-${resolvedSlug}`,
        id: `demo-${resolvedSlug}`,
        template_id: resolvedSlug,
        templateId: resolvedSlug,
        tier: isRoyalSuite ? 'royal' : 'classic',
        ...customPreset,
        scratch_enabled: true,
        rsvp_enabled: true,
        music_enabled: true,
      };

      setInvitation(demoData);
    };

    fetchInvitation();
  }, [slug]);

  const currentTemplateObj = allDemosList.find((t) => t.id === (invitation?.template_id || slug)) || allDemosList[0];

  return (
    <div className="relative min-h-screen protected-content select-none">
      <ContentProtectionBanner isBlurred={isBlurred} securityAlert={securityAlert} />
      <SEO
        title={`${invitation?.title || 'Royal Wedding Demo'} - Zareqia`}
        description="Experience 1:1 luxury animated digital invitations with live 4K video gates, scratch card, map, and RSVP."
      />

      {/* FLOATING TOP DEMO CONTROLS BANNER */}
      {isDemoMode && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-xl border border-amber-500/40 shadow-2xl text-xs text-white">
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold border border-amber-500/40 transition-all cursor-pointer"
            >
              <span>{currentTemplateObj.name}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 max-h-80 overflow-y-auto rounded-2xl bg-neutral-950/95 border border-amber-500/30 shadow-2xl p-1.5 space-y-1 z-50 custom-scrollbar text-left">
                <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-neutral-400 font-mono">
                  Switch Demo Template:
                </div>
                {allDemosList.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate(`/invite/demo?template=${t.id}`);
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      t.id === currentTemplateObj.id
                        ? 'bg-amber-500 text-neutral-950 font-bold'
                        : 'text-neutral-200 hover:bg-white/10'
                    }`}
                  >
                    <span>{t.name}</span>
                    {t.id === currentTemplateObj.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            to={`/templates/${currentTemplateObj.id}`}
            className="flex items-center gap-1 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold uppercase tracking-wider text-[11px] shadow-md transition-transform active:scale-95 cursor-pointer"
          >
            <span>USE THIS DESIGN</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* Main Suite Renderer */}
      <InvitationRenderer invitation={invitation} />
    </div>
  );
};

export default PublicInvitation;
