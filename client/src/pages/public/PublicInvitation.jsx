import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import api from '../../api/client';
import SEO from '../../components/common/SEO';
import InvitationRenderer from '../../components/invitations/engine/InvitationRenderer';
import { Crown, Sparkles, ChevronDown, Check, ArrowRight } from 'lucide-react';
import { getTemplateById, invitationTemplates } from '../../data/invitationTemplates';

// 13 Distinct Presets for each Royal and Classic Template
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

  // ==========================================
  // ✨ 5 CLASSIC SUITES
  // ==========================================
  'emerald-noir': {
    names: 'Zaid Khan & Alizeh Mirza',
    groom_name: 'Zaid Khan',
    bride_name: 'Alizeh Mirza',
    groom_parents: 'Son of Mrs. Parveen & Mr. Tariq Khan',
    bride_parents: 'Daughter of Mrs. Shazia & Mr. Farhan Mirza',
    host_names: 'Khan & Mirza Families',
    title: 'Emerald Noir & Dynasty Nikah',
    eventType: 'Wedding Invitation',
    date: '2026-11-10',
    time: '19:30',
    venue: 'Taj Falaknuma Palace, Hyderabad',
    venueAddress: 'Engine Bowli, Fatima Nagar, Falaknuma, Hyderabad 500053',
    story_text: 'An emerald garden of love and heartfelt promises under the Nizami chandeliers of Falaknuma.',
    message: 'Request the pleasure of your company to celebrate the auspicious Nikah & Walima ceremony.',
    welcome_text: 'Khushamdeed! We warmly welcome you to our celebration.',
    scratch_reveal_text: 'NIKAH MUBARAK • NOV 10 ♡',
    events: [
      { title: 'Qawwali & Dawat-e-Mehendi', date: '2026-11-09', time: '07:00 PM', venue: '101 Dining Hall, Falaknuma', address: 'Hyderabad, Telangana' },
      { title: 'Shahi Nikah Ceremony', date: '2026-11-10', time: '07:30 PM', venue: 'The Palace Gardens', address: 'Hyderabad, Telangana' },
      { title: 'Grand Dawat-e-Walima', date: '2026-11-11', time: '08:00 PM', venue: 'Durbar Hall', address: 'Hyderabad, Telangana' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'ivory-elegance': {
    names: 'Karan Ahluwalia & Natasha Batra',
    groom_name: 'Karan Ahluwalia',
    bride_name: 'Natasha Batra',
    groom_parents: 'Son of Mrs. Simran & Mr. Harpreet Ahluwalia',
    bride_parents: 'Daughter of Mrs. Neena & Mr. Rajiv Batra',
    host_names: 'Ahluwalia & Batra Families',
    title: 'Crimson Royale Grand Wedding',
    eventType: 'Wedding Invitation',
    date: '2026-11-25',
    time: '19:00',
    venue: 'ITC Grand Bharat, Gurugram',
    venueAddress: 'Hasanpur Tauru, Mewat District, Gurugram 122105',
    story_text: 'From college library smiles to forever by your side. Our journey into holy matrimony.',
    message: 'Cordially invite you to join in the celebrations of their auspicious wedding.',
    welcome_text: 'We would be honored by your presence and blessings.',
    scratch_reveal_text: 'YOU’RE INVITED TO CELEBRATE ♡',
    events: [
      { title: 'Cocktails & Sangeet Bash', date: '2026-11-24', time: '07:30 PM', venue: 'The Grand Pavilion', address: 'Gurugram, Haryana' },
      { title: 'Anand Karaj & Pheras', date: '2026-11-25', time: '11:30 AM', venue: 'Poolside Amphitheatre', address: 'Gurugram, Haryana' },
      { title: 'Gala Wedding Reception', date: '2026-11-25', time: '08:00 PM', venue: 'Bharat Ballroom', address: 'Gurugram, Haryana' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544078741-7ea0e0cb5b81?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'rose-gold-blush': {
    names: 'Aakash Varma & Rhea Chakraborty',
    groom_name: 'Aakash Varma',
    bride_name: 'Rhea Chakraborty',
    groom_parents: 'Son of Mrs. Sunita & Mr. Deepak Varma',
    bride_parents: 'Daughter of Mrs. Sharmila & Mr. Subhash Chakraborty',
    host_names: 'Varma & Chakraborty Families',
    title: 'Rose Gold Blush Floral Wedding',
    eventType: 'Wedding Invitation',
    date: '2026-12-02',
    time: '17:30',
    venue: 'JW Marriott Resort & Spa, Goa',
    venueAddress: 'Vagator Beach Rd, Bardez, Goa 403509',
    story_text: 'Sun-kissed beaches, endless laughter, and a romance painted in soft rose gold petals.',
    message: 'Invite you to celebrate love and witness the marriage of Aakash and Rhea.',
    welcome_text: 'Welcome to our destination beach wedding!',
    scratch_reveal_text: 'BEACH WEDDING • DEC 02 ♡',
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
    names: 'Aisha Khan & Rohan Mehra',
    groom_name: 'Rohan Mehra',
    bride_name: 'Aisha Khan',
    groom_parents: 'Son of Mrs. Anita & Mr. Sunil Mehra',
    bride_parents: 'Daughter of Mrs. Shabana & Mr. Javed Khan',
    host_names: 'Mehra & Khan Families',
    title: 'Modern Minimal Contemporary Union',
    eventType: 'Wedding Invitation',
    date: '2026-11-18',
    time: '18:30',
    venue: 'The Oberoi Udaivilas, Udaipur',
    venueAddress: 'Badi-Gorela-Mulla Talai Rd, Haridas Ji Ki Magri, Udaipur 313001',
    story_text: 'Clean geometry, timeless intimacy, and unconditional love.',
    message: 'Cordially invite you to celebrate the wedding ceremony of Aisha and Rohan.',
    welcome_text: 'Welcome to our intimate celebration.',
    scratch_reveal_text: 'SAVE THE DATE • NOV 18 ♡',
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
    names: 'Devansh Aggarwal & Isha Bansal',
    groom_name: 'Devansh Aggarwal',
    bride_name: 'Isha Bansal',
    groom_parents: 'Son of Mrs. Saroj & Mr. Naresh Aggarwal',
    bride_parents: 'Daughter of Mrs. Rekha & Mr. Ashok Bansal',
    host_names: 'Aggarwal & Bansal Families',
    title: 'Majestic Love Palace Celebration',
    eventType: 'Wedding Invitation',
    date: '2026-12-12',
    time: '19:00',
    venue: 'Noor Mahal Palace, Karnal',
    venueAddress: 'Noor Mahal Crossing, National Highway 1, Karnal 132001',
    story_text: 'Classic ivory hues and gold palace drapes celebrate two families coming together in eternal joy.',
    message: 'Request your esteemed presence to bless the wedding of Devansh and Isha.',
    welcome_text: 'Shubh Aagman! Welcome to our wedding festivities.',
    scratch_reveal_text: 'YOU’RE CORDIALLY INVITED ♡',
    events: [
      { title: 'Ring Ceremony & Sangeet', date: '2026-12-11', time: '07:00 PM', venue: 'Sheesh Mahal Banquets', address: 'Karnal, Haryana' },
      { title: 'Shubh Vivah & Dinner', date: '2026-12-12', time: '07:30 PM', venue: 'Rani Bagh Central Lawn', address: 'Karnal, Haryana' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    ],
  },
};

const allDemosList = [
  { id: 'rose-gold-blush-royal', name: '👑 Royal Imperial', tier: 'royal' },
  { id: 'royal-majesty', name: '👑 Royal Majesty', tier: 'royal' },
  { id: 'royal-elegance-royal', name: '👑 Royal Elegance', tier: 'royal' },
  { id: 'royal-prestige', name: '👑 Royal Prestige', tier: 'royal' },
  { id: 'royal-heritage', name: '👑 Royal Heritage', tier: 'royal' },
  { id: 'royal-grace', name: '👑 Royal Grace', tier: 'royal' },
  { id: 'royal-crest', name: '👑 Royal Crest', tier: 'royal' },
  { id: 'royal-legacy', name: '👑 Royal Legacy', tier: 'royal' },
  { id: 'emerald-noir', name: '✨ Emerald Noir', tier: 'classic' },
  { id: 'ivory-elegance', name: '✨ Crimson Royale', tier: 'classic' },
  { id: 'rose-gold-blush', name: '✨ Rose Gold Blush', tier: 'classic' },
  { id: 'modern-minimal', name: '✨ Modern Minimal', tier: 'classic' },
  { id: 'royal-elegance', name: '✨ Majestic Love', tier: 'classic' },
];

const PublicInvitation = ({ defaultSlug = 'rose-gold-blush-royal' }) => {
  const { slug: rawSlug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const templateQuery =
    searchParams.get('template') || searchParams.get('t') || searchParams.get('id');

  const slug =
    templateQuery || (rawSlug && rawSlug !== 'undefined' && rawSlug !== 'demo' ? rawSlug : defaultSlug);

  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchInvitation = async () => {
      setLoading(true);
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
          setLoading(false);
          return;
        }
      } catch (err) {
        // Fallback to local rich demo preset
      }

      setIsDemoMode(true);
      const customPreset = templateDemoDataMap[resolvedSlug] || templateDemoDataMap['rose-gold-blush-royal'];
      const matchedTemplate = getTemplateById(resolvedSlug) || invitationTemplates[0];

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

  const currentTemplateObj = allDemosList.find((t) => t.id === (invitation?.template_id || slug)) || allDemosList[0];

  return (
    <div className="relative min-h-screen">
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
              <div className="absolute left-0 top-full mt-2 w-56 max-h-72 overflow-y-auto rounded-2xl bg-neutral-950/95 border border-amber-500/30 shadow-2xl p-1.5 space-y-1 z-50 custom-scrollbar text-left">
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
            to={`/create/${currentTemplateObj.id}`}
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
