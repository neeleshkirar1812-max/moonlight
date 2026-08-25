import mongoose from 'mongoose';
import User from '../models/User.js';
import Customer from '../models/Customer.js';
import Employee from '../models/Employee.js';
import Admin from '../models/Admin.js';
import PortfolioCategory from '../models/PortfolioCategory.js';
import Portfolio from '../models/Portfolio.js';
import Service from '../models/Service.js';
import Blog from '../models/Blog.js';
import Enquiry from '../models/Enquiry.js';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import Gallery from '../models/Gallery.js';
import GalleryItem from '../models/GalleryItem.js';
import Video from '../models/Video.js';
import Career from '../models/Career.js';
import Testimonial from '../models/Testimonial.js';
import Settings from '../models/Settings.js';

export const seedData = async (exitOnComplete = false) => {
  try {
    console.log('🌱 [Seed] Purging existing database collections...');

    await Promise.all([
      User.deleteMany(),
      Customer.deleteMany(),
      Employee.deleteMany(),
      Admin.deleteMany(),
      PortfolioCategory.deleteMany(),
      Portfolio.deleteMany(),
      Service.deleteMany(),
      Blog.deleteMany(),
      Enquiry.deleteMany(),
      Booking.deleteMany(),
      Payment.deleteMany(),
      Gallery.deleteMany(),
      GalleryItem.deleteMany(),
      Video.deleteMany(),
      Career.deleteMany(),
      Testimonial.deleteMany(),
      Settings.deleteMany(),
    ]);

    console.log('✅ Collections purged. Seeding Users & Roles...');

    // 1. Create Super Admin
    const superAdmin = await User.create({
      name: 'Julian Montgomery',
      email: 'superadmin@lumierestudios.com',
      password: 'SuperAdmin@2026',
      phone: '+91 98200 00001',
      role: 'superadmin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      permissions: ['*'],
    });

    await Admin.create({
      user: superAdmin._id,
      roleTitle: 'Executive Creative Director & Founder',
      department: 'Executive Atelier',
      permissions: {
        canManagePortfolios: true,
        canManageEnquiries: true,
        canManageFinances: true,
        canManageUsers: true,
        canAccessSystemSettings: true,
      },
    });

    // 2. Create Studio Admin
    const studioAdmin = await User.create({
      name: 'Natasha Roy Kapoor',
      email: 'admin@lumierestudios.com',
      password: 'Admin@2026',
      phone: '+91 98200 00002',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      permissions: [
        'MANAGE_PORTFOLIO',
        'MANAGE_SERVICES',
        'MANAGE_BLOGS',
        'MANAGE_ENQUIRIES',
        'MANAGE_BOOKINGS',
        'MANAGE_GALLERIES',
        'MANAGE_PAYMENTS',
        'MANAGE_CUSTOMERS',
        'MANAGE_EMPLOYEES',
        'MANAGE_VIDEOS',
        'MANAGE_CAREERS',
        'MANAGE_TESTIMONIALS',
      ],
    });

    await Admin.create({
      user: studioAdmin._id,
      roleTitle: 'Head of Studio Operations & Commissions',
      department: 'Studio Operations',
      permissions: {
        canManagePortfolios: true,
        canManageEnquiries: true,
        canManageFinances: true,
        canManageUsers: true,
        canAccessSystemSettings: false,
      },
    });

    // 3. Create Employees (Crew)
    const emp1 = await User.create({
      name: 'Vikramaditya Seth',
      email: 'lead.photographer@lumierestudios.com',
      password: 'Employee@2026',
      phone: '+91 98200 00003',
      role: 'employee',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    });

    await Employee.create({
      user: emp1._id,
      designation: 'Principal Lead Photographer',
      department: 'Photography',
      specialization: ['Royal Heritage Ceremonies', 'Editorial Portraiture'],
      bio: 'Master framing specialist trained at Speos Paris with 12 years capturing royal dynasties across Rajasthan and Lake Como.',
      assignedEquipment: ['Sony Alpha 1 (x2)', 'Sony 50mm f/1.2 GM', 'Profoto B10X Plus'],
      rating: 4.9,
    });

    // 4. Create Customers (Couples)
    const client1 = await User.create({
      name: 'Aarav Singhania',
      email: 'aarav.ananya@gmail.com',
      password: 'Customer@2026',
      phone: '+91 98200 12345',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    });

    await Customer.create({
      user: client1._id,
      partnerName: 'Ananya Goenka',
      weddingDate: new Date('2026-11-20'),
      address: {
        street: 'Penthouse 4B, Sky Villa, Worli Sea Face',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        postalCode: '400018',
      },
    });

    console.log('✅ Users & Roles created. Seeding Portfolio & Services...');

    // 5. Portfolio Categories & Items
    const categories = await PortfolioCategory.insertMany([
      { name: 'Royal Wedding', slug: 'wedding', description: 'Grand palace unions and royal rituals.' },
      { name: 'Pre-Wedding', slug: 'pre-wedding', description: 'Cinematic romance in iconic worldwide landscapes.' },
      { name: 'Destination Wedding', slug: 'destination-wedding', description: 'Celebrations across Lake Como, Positano, and St. Moritz.' },
      { name: 'Wedding Films', slug: 'films', description: 'Haute couture wedding cinema shot on ARRI & RED systems.' },
    ]);

    const portfolios = await Portfolio.insertMany([
      {
        title: 'The Royal Union of Aarav & Ananya at City Palace, Udaipur',
        slug: 'aarav-ananya-udaipur',
        category: 'wedding',
        coupleName: 'Aarav & Ananya',
        eventDate: new Date('2025-12-14'),
        location: { city: 'Udaipur', venue: 'City Palace & Jagmandir Island' },
        coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
        images: [
          { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80', caption: 'The Royal Baraat Sunset Procession', isCover: true },
          { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80', caption: 'Varmala beneath 10,000 Floating Candles' },
          { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80', caption: 'Sabyasachi Heritage Lehanga Portraiture' },
        ],
        description: 'A 3-day royal extravaganza celebrating Rajasthan heritage with candlelit palace courtyards.',
        isFeatured: true,
        tags: ['Udaipur', 'Royal Wedding', 'Palace', 'Sabyasachi'],
      },
      {
        title: 'Lake Como Romance: Kabir & Maya at Villa Balbiano',
        slug: 'kabir-maya-lake-como',
        category: 'destination-wedding',
        coupleName: 'Kabir & Maya',
        eventDate: new Date('2025-09-18'),
        location: { city: 'Lake Como', venue: 'Villa Balbiano, Italy' },
        coverImage: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80',
        images: [
          { url: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80', caption: 'Riva Boat Romance on Lake Como', isCover: true },
          { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80', caption: 'Italian Garden Vows at Sunset' },
        ],
        description: 'An ethereal celebration framed against the Italian Alps with wooden Riva speedboats.',
        isFeatured: true,
        tags: ['Lake Como', 'Italy', 'Destination Wedding'],
      },
      {
        title: 'Parisian Dawn: Rohan & Tanya Haute Pre-Wedding',
        slug: 'rohan-tanya-paris',
        category: 'pre-wedding',
        coupleName: 'Rohan & Tanya',
        eventDate: new Date('2025-07-22'),
        location: { city: 'Paris', venue: 'Place Vendôme & Palais Royal, France' },
        coverImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
        images: [
          { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80', caption: 'First Light over the Eiffel Tower', isCover: true },
        ],
        description: 'Editorial high-fashion pre-wedding captured at 5:30 AM golden hour across Parisian landmarks.',
        isFeatured: true,
        tags: ['Paris', 'Pre-Wedding', 'Couture'],
      },
    ]);

    // 6. Services
    const services = await Service.insertMany([
      {
        title: 'The Royal Palace Heritage Collection',
        slug: 'royal-palace-heritage',
        category: 'Royal Wedding',
        shortDescription: 'Our flagship 3-day royal celebration package designed for palace weddings and multi-event celebrations.',
        fullDescription: 'Comprehensive coverage for up to 3 days of grand celebrations including Mehendi, Sangeet, Haldi, Varmala, Pheras, and Reception.',
        startingPrice: 1200000,
        currency: 'INR',
        coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
        features: [
          '2 Master Creative Directors & 4 Senior Specialists',
          'Cinematic 4K Master Docu-Film (25-40 mins)',
          'High-Energy 4-Minute Cinematic Wedding Teaser',
          'Same-Day Edit Reception Highlight Reel',
          'Drone / Aerial Cinematography in 4K ProRes',
          'Two Handcrafted Italian Leather Lay-Flat Albums',
          'Full-Resolution Cloud Proofing & Private Gallery',
          'Delivered on Custom Gold-Plated Crystal USB Box',
        ],
        deliverables: [
          '1000+ Master Color-Graded High-Res Photographs',
          '1x 4K Cinematic Feature Film',
          '1x 4K Instagram / Social Teaser',
          '2x Bespoke 40-Page Italian Flush-Mount Albums',
          'Raw Audio Recordings of Vows & Speeches',
        ],
        isPopular: true,
      },
      {
        title: 'The International Destination Atelier',
        slug: 'international-destination-atelier',
        category: 'Destination Wedding',
        shortDescription: 'Tailored for luxury destination celebrations across Lake Como, Positano, St. Moritz, and Paris.',
        fullDescription: 'Worldwide production coverage with dedicated visa-ready cinema crews and dual RED/ARRI camera systems.',
        startingPrice: 1800000,
        currency: 'INR',
        coverImage: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80',
        features: [
          'Worldwide Travel & Insured Cinema Kit Bundled',
          'Pre-Wedding Sunset Shoot in Destination City',
          'Multi-Camera 4K Live Stream for Global Guests',
          'Bespoke Fine-Art Coffee Table Book Suite',
        ],
        deliverables: [
          '800+ High-Resolution Graded Photographs',
          '1x 4K Destination Cinema Docu-Film',
          '1x Ultra-HD Drone Aerial Archive',
        ],
        isPopular: false,
      },
    ]);

    // 7. Enquiries
    const enquiry1 = await Enquiry.create({
      enquiryId: 'ENQ-2026-89421',
      eventType: 'Royal Palace Wedding',
      eventDate: new Date('2026-11-20'),
      location: { city: 'Udaipur', venue: 'The Oberoi Udaivilas & City Palace' },
      guestCount: 450,
      requiredServices: ['Photography', 'Cinematography', 'Drone Cinematography', 'Luxury Physical Albums'],
      budgetRange: '₹15,00,000 – ₹25,00,000',
      storyDetails: 'We are celebrating our 3-day royal palace wedding in Udaipur with sunset boat procession across Lake Pichola.',
      customerDetails: {
        fullName: 'Aarav Singhania & Ananya Goenka',
        email: 'aarav.ananya@gmail.com',
        phone: '+91 98200 12345',
        whatsapp: '+91 98200 12345',
      },
      status: 'CONFIRMED',
      quotation: {
        totalAmount: 1850000,
        advanceRequired: 462500,
        notes: 'Includes 2 Lead Directors, 4K Cinema Docu-film, Aerial Drone, and 2 Handcrafted Italian Leather Albums.',
        validUntil: new Date('2026-09-30'),
      },
      internalNotes: [
        { authorName: 'Natasha Roy Kapoor', note: 'VIP Client. Accommodations arranged at Udaivilas. Special focus on sunset boat entry.' },
      ],
    });

    // 8. Bookings
    const booking1 = await Booking.create({
      bookingNumber: 'LUM-2026-10492',
      enquiry: enquiry1._id,
      customer: client1._id,
      eventType: 'Royal Palace Wedding',
      eventDate: new Date('2026-11-20'),
      location: { city: 'Udaipur', venue: 'The Oberoi Udaivilas' },
      guestCount: 450,
      servicePackage: services[0]._id,
      assignedEmployees: [emp1._id],
      totalAmount: 1850000,
      advanceAmount: 462500,
      remainingAmount: 1387500,
      currency: 'INR',
      bookingStatus: 'CONFIRMED',
      paymentStatus: 'PARTIAL',
      scheduleTimeline: [
        { time: '09:00 AM', event: 'Bridal Couture & Jewellery Details', notes: 'Master suite with natural morning terrace light' },
        { time: '03:30 PM', event: 'Royal Baraat Boat Procession', notes: 'Lake Pichola sunset aerials via drone' },
        { time: '06:30 PM', event: 'Varmala & Royal Pheras Ceremony', notes: 'Candlelit courtyard mandap' },
        { time: '09:30 PM', event: 'Grand Gala Banquet & Speeches', notes: 'Speeches and acoustic concert' },
      ],
      deliverablesStatus: [
        { item: '72-Hour Social Media 100-Photo Teaser', status: 'Pending' },
        { item: 'Full Color-Graded High-Resolution Archive', status: 'Pending' },
        { item: '4K Cinematic Wedding Feature Film', status: 'Pending' },
        { item: 'Handmade Italian Leather Flush-Mount Albums', status: 'Pending' },
      ],
    });

    // 9. Payment
    await Payment.create({
      paymentNumber: 'PAY-2026-4821',
      booking: booking1._id,
      customer: client1._id,
      amount: 462500,
      currency: 'INR',
      paymentType: 'ADVANCE',
      paymentMethod: 'RAZORPAY',
      razorpayOrderId: 'order_NX829104829',
      razorpayPaymentId: 'pay_NY928301928',
      status: 'CAPTURED',
    });

    // 10. Private Gallery with PIN 2026
    const privateGallery = await Gallery.create({
      title: 'Aarav & Ananya | The Udaipur Royal Archives',
      slug: 'aarav-ananya-udaipur-private',
      customer: client1._id,
      booking: booking1._id,
      coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      eventDate: new Date('2025-12-14'),
      accessPin: '2026',
      watermarked: false,
      downloadAllowed: true,
      totalPhotos: 6,
      sections: [
        { name: 'Highlights', order: 1 },
        { name: 'Ceremony', order: 2 },
        { name: 'Portraits', order: 3 },
        { name: 'Reception', order: 4 },
      ],
    });

    await GalleryItem.insertMany([
      {
        gallery: privateGallery._id,
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=90',
        title: 'Sunset Procession at Lake Pichola',
        section: 'Highlights',
        isFavorite: true,
        order: 1,
      },
      {
        gallery: privateGallery._id,
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=90',
        title: 'Varmala amidst Floating Lotus Diyas',
        section: 'Ceremony',
        isFavorite: true,
        order: 2,
      },
      {
        gallery: privateGallery._id,
        url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1800&q=90',
        title: 'Bridal Heritage Sabyasachi Portrait',
        section: 'Portraits',
        isFavorite: false,
        order: 3,
      },
      {
        gallery: privateGallery._id,
        url: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1800&q=90',
        title: 'Royal Couple Golden Hour Gaze',
        section: 'Portraits',
        isFavorite: true,
        order: 4,
      },
      {
        gallery: privateGallery._id,
        url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=90',
        title: 'Grand Palace Courtyard Banquet',
        section: 'Reception',
        isFavorite: false,
        order: 5,
      },
      {
        gallery: privateGallery._id,
        url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1800&q=90',
        title: 'Candlelight Champagne Toast',
        section: 'Reception',
        isFavorite: false,
        order: 6,
      },
    ]);

    // 11. YouTube Cinema Videos
    await Video.insertMany([
      {
        title: 'The Eternal Vows: Aarav & Ananya in Udaipur',
        slug: 'eternal-vows-aarav-ananya',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        duration: '4:32',
        category: 'Royal Wedding Film',
        clientNames: 'Aarav & Ananya',
        location: { city: 'Udaipur', venue: 'City Palace' },
        description: 'Shot on RED V-Raptor 8K with Cooke Anamorphic glass. A 3-day royal odyssey.',
        isFeatured: true,
      },
      {
        title: 'Symphony on Lake Como: Kabir & Maya',
        slug: 'symphony-lake-como-kabir-maya',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80',
        duration: '3:50',
        category: 'Destination Cinema',
        clientNames: 'Kabir & Maya',
        location: { city: 'Lake Como', venue: 'Villa Balbiano' },
        description: 'Captured with ARRI Alexa Mini LF on vintage Super Baltar cinema primes.',
        isFeatured: true,
      },
    ]);

    // 12. Editorial Blogs
    await Blog.insertMany([
      {
        title: 'The Art of Royal Wedding Cinematography: Filming on Anamorphic Glass',
        slug: 'art-of-royal-wedding-cinematography',
        excerpt: 'Why we choose Cooke and ARRI anamorphic primes to create painterly oval bokeh and cinematic flare.',
        content: `At Lumière Studios, we reject the digital, hyper-sharpened look of ordinary wedding videography. We believe royal celebrations deserve the visual richness of 35mm Hollywood motion pictures.\n\nAnamorphic lenses compress horizontal space, creating distinctive horizontal blue and amber flares when pointing toward palace chandeliers and evening fireworks.`,
        author: superAdmin._id,
        featuredImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        category: 'Cinematography Insights',
        tags: ['Cinematography', 'ARRI', 'Royal Weddings', 'Anamorphic'],
        readingTime: '6 min read',
        isFeatured: true,
        publishedAt: new Date('2026-01-10'),
      },
    ]);

    // 13. Careers
    await Career.insertMany([
      {
        title: 'Lead Cinematographer & Drone Pilot',
        department: 'Cinematography',
        location: 'Mumbai / On-Location Worldwide',
        jobType: 'Full-Time',
        experienceRequired: '4+ Years',
        description: 'We are seeking an elite cinematographer skilled in gimbal operation (DJI RS3 Pro) and ARRI / RED camera systems.',
        requirements: [
          'Proficiency with Sony FX6 / FX3 and RED cinema cameras',
          'Licensed DGCA drone pilot with 200+ flight hours',
          'Valid passport and willingness to travel internationally 60+ days/year',
        ],
        salaryRange: '₹14,00,000 – ₹22,00,000 / Year + Shoot Bonuses',
        isActive: true,
      },
    ]);

    // 14. Testimonials
    await Testimonial.insertMany([
      {
        clientName: 'Aarav & Ananya Singhania',
        partnerName: 'Ananya Goenka',
        eventType: 'Royal Palace Wedding',
        weddingDate: 'December 2025',
        location: 'City Palace, Udaipur',
        quote: 'Julian and his team did not merely film our wedding; they immortalized our legacy. The 4K film feels like a period cinema feature. Every frame belongs in Vogue.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        isFeatured: true,
      },
      {
        clientName: 'Kabir & Maya Merchant',
        partnerName: 'Maya Merchant',
        eventType: 'Destination Wedding',
        weddingDate: 'September 2025',
        location: 'Villa Balbiano, Lake Como',
        quote: 'Uncompromising professionalism. Traveling with 12 flight cases across Milan and Como without a hitch. The private proofing gallery was effortless for our families worldwide.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        isFeatured: true,
      },
    ]);

    // 15. Global Settings
    await Settings.create({
      siteName: 'Lumière Studios',
      tagline: 'Luxury Wedding Photography & Cinematic Heirlooms',
      contactEmail: 'concierge@lumierestudios.com',
      contactPhone: '+91 98200 12345',
      whatsappNumber: '+919820012345',
      address: {
        street: 'Lumière Penthouse, 18th Floor, Hill Road, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        postalCode: '400050',
      },
      socialLinks: {
        instagram: 'https://instagram.com/lumierestudios',
        youtube: 'https://youtube.com/@lumierestudios',
        facebook: 'https://facebook.com/lumierestudios',
        linkedin: 'https://linkedin.com/company/lumierestudios',
        pinterest: 'https://pinterest.com/lumierestudios',
        whatsapp: 'https://wa.me/919820012345',
      },
    });

    console.log('✨ [Database Seeded Successfully]');
    console.log('====================================================');
    console.log('🔑 TEST ACCOUNTS CREATED:');
    console.log('  1. Super Admin: superadmin@lumierestudios.com / SuperAdmin@2026');
    console.log('  2. Admin:       admin@lumierestudios.com / Admin@2026');
    console.log('  3. Employee:    lead.photographer@lumierestudios.com / Employee@2026');
    console.log('  4. Customer:    aarav.ananya@gmail.com / Customer@2026 (Gallery PIN: 2026)');
    console.log('====================================================');

    if (exitOnComplete) {
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ [Seed Script Error]', error);
    if (exitOnComplete) {
      process.exit(1);
    }
    throw error;
  }
};

// If run directly via CLI (node seed/seed.js)
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  import('../config/db.js').then(async ({ connectDB }) => {
    await connectDB();
    await seedData(true);
  });
}
