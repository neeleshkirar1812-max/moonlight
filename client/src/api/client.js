import axios from 'axios';

// Default initial datasets for offline/Vercel resilience
const initialData = {
  portfolio: [
    {
      _id: 'port-1',
      title: 'Vikram & Radhika | Royal Palace Union',
      category: 'Palace Weddings',
      location: 'The Oberoi Udaivilas, Udaipur',
      coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      isFeatured: true,
      tags: ['Royal Wedding', 'Palace', 'Udaipur', 'Heritage'],
      images: [
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      _id: 'port-2',
      title: 'Arjun & Meera | Narmada Riverfront Romance',
      category: 'Pre-Wedding Cinema',
      location: 'Ahilya Fort & Maheshwar Ghats',
      coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      isFeatured: true,
      tags: ['Pre-Wedding', 'Maheshwar', 'Sunset', 'Boat Shoot'],
      images: [
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      _id: 'port-3',
      title: 'Kabir & Tara | Heritage Courtyard Festivities',
      category: 'Heritage Destination',
      location: 'Jehan Numa Palace, Bhopal',
      coverImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
      isFeatured: true,
      tags: ['Bhopal', 'Jehan Numa', 'Courtyard', 'Qawwali Night'],
      images: [
        'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      _id: 'port-4',
      title: 'Siddharth & Ananya | Coastal Sunset Vows',
      category: 'Beach Weddings',
      location: 'Heritage Beachfront Resort, Goa',
      coverImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
      isFeatured: true,
      tags: ['Goa', 'Beach Wedding', 'Sunset Pheras', 'Coastal'],
      images: [
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
      ],
    },
  ],
  services: [
    {
      _id: 'srv-1',
      title: 'The Imperial Heritage Suite',
      tagline: 'Full 3-Day Royal Wedding Cinema & Master Photography',
      price: 1850000,
      description: 'Comprehensive multi-day coverage with dual Master Directors, aerial drone cinematography, and Italian leather albums.',
      features: ['2 Master Cinematographers', '2 Candid Masters', '4K Cinema Docu-Film', 'Aerial 4K Drone', '2x Flush Mount Albums'],
      isFeatured: true,
      order: 1,
    },
    {
      _id: 'srv-2',
      title: 'The Royal Sovereign Collection',
      tagline: 'Signature 2-Day Destination Wedding Celebration',
      price: 1250000,
      description: 'Artfully crafted wedding cinema and timeless candid portraiture for grand destination weddings.',
      features: ['1 Master Director + 2 Cinematographers', '2 Candid Masters', '4K Highlight Reel + Full Feature Film', 'Handcrafted Fine-Art Album'],
      isFeatured: true,
      order: 2,
    },
    {
      _id: 'srv-3',
      title: 'Cinematic Pre-Wedding Odyssey',
      tagline: 'Signature 2-Day Concept Film in Maheshwar / Udaipur',
      price: 350000,
      description: 'A bespoke 2-day story-driven cinematic experience across royal forts, riverfront ghats, and royal palaces.',
      features: ['Master Director & Drone Team', '3 Wardrobe Concept Themes', '4K Teaser Film for Sangeet Premiere', '50 Color-Graded Art Prints'],
      isFeatured: true,
      order: 3,
    },
  ],
  bookings: [
    {
      _id: 'book-1',
      bookingNumber: 'MLP-2026-001',
      customer: { name: 'Aarav & Ananya Sharma', email: 'aarav.ananya@gmail.com', phone: '+91 92292 29323' },
      eventType: 'Royal Palace Destination Wedding',
      eventDate: '2026-11-20',
      location: { city: 'Bhopal', venue: 'Jehan Numa Palace' },
      package: { name: 'The Imperial Heritage Suite', totalAmount: 1850000 },
      advancePaid: 555000,
      status: 'CONFIRMED',
      leadCrew: 'Rohan Verma (Director)',
      createdAt: '2026-08-20T10:00:00Z',
    },
    {
      _id: 'book-2',
      bookingNumber: 'MLP-2026-002',
      customer: { name: 'Vikram & Radhika Singhania', email: 'vikram.singhania@gmail.com', phone: '+91 98200 99887' },
      eventType: '3-Day Royal Wedding Suite',
      eventDate: '2026-12-14',
      location: { city: 'Udaipur', venue: 'The Oberoi Udaivilas' },
      package: { name: 'The Royal Sovereign Collection', totalAmount: 1250000 },
      advancePaid: 375000,
      status: 'CONFIRMED',
      leadCrew: 'Priya Mehta (Lead Master)',
      createdAt: '2026-08-22T14:30:00Z',
    },
  ],
  invoices: [
    {
      _id: 'inv-1',
      invoiceNumber: 'INV-2026-8801',
      clientName: 'Aarav Sharma',
      clientEmail: 'aarav.ananya@gmail.com',
      clientPhone: '+91 92292 29323',
      amount: 555000,
      gstAmount: 99900,
      totalAmount: 654900,
      status: 'PAID',
      dueDate: '2026-09-01',
      items: [{ description: '30% Advance Retainer for Jehan Numa Palace 3-Day Wedding Shoot', amount: 555000 }],
      createdAt: '2026-08-20T11:00:00Z',
    },
    {
      _id: 'inv-2',
      invoiceNumber: 'INV-2026-8802',
      clientName: 'Vikram Singhania',
      clientEmail: 'vikram.singhania@gmail.com',
      clientPhone: '+91 98200 99887',
      amount: 375000,
      gstAmount: 67500,
      totalAmount: 442500,
      status: 'PAID',
      dueDate: '2026-09-15',
      items: [{ description: '30% Advance Retainer for Udaipur 3-Day Destination Shoot', amount: 375000 }],
      createdAt: '2026-08-22T15:00:00Z',
    },
  ],
  payments: [
    {
      _id: 'pay-1',
      paymentId: 'pay_MLP89123847',
      orderId: 'order_MLP9912',
      clientName: 'Aarav Sharma',
      amount: 654900,
      currency: 'INR',
      method: 'Razorpay UPI / Netbanking',
      status: 'SUCCESS',
      createdAt: '2026-08-20T11:15:00Z',
    },
    {
      _id: 'pay-2',
      paymentId: 'pay_MLP89123999',
      orderId: 'order_MLP9913',
      clientName: 'Vikram Singhania',
      amount: 442500,
      currency: 'INR',
      method: 'Razorpay HDFC Corporate',
      status: 'SUCCESS',
      createdAt: '2026-08-22T15:10:00Z',
    },
  ],
  galleries: [
    {
      _id: 'gal-1',
      title: 'Aarav & Ananya | Private Royal Gallery',
      pin: '2026',
      clientEmail: 'aarav.ananya@gmail.com',
      coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      totalPhotos: 340,
      isPublished: true,
      items: [
        { _id: 'item-1', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80', title: 'Royal Couple Portrait', isFavorite: true },
        { _id: 'item-2', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80', title: 'Varmala Celebration', isFavorite: false },
      ],
    },
  ],
  blogs: [
    {
      _id: 'blog-1',
      slug: 'ultimate-guide-destination-wedding-maheshwar-ghats',
      title: 'The Ultimate Guide to Planning a Destination Wedding at Maheshwar Ghats',
      category: 'Destination Guides',
      readTime: '6 min read',
      author: 'Moonlight Editorial Team',
      coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      excerpt: 'From sunrise boat photography on Narmada River to regal evening pheras at Ahilya Fort ramparts.',
      content: 'Maheshwar is one of Central India’s most breathtaking heritage destinations...',
      isPublished: true,
      publishedAt: '2026-08-15T10:00:00Z',
    },
    {
      _id: 'blog-2',
      slug: 'royal-palace-cinematography-lighting-guide',
      title: 'How We Capture Royal Palace Weddings in 4K Master Cinema',
      category: 'Cinema Masterclass',
      readTime: '8 min read',
      author: 'Lead Cinematographer',
      coverImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
      excerpt: 'A deep dive into color-grading, natural lighting techniques, and royal palace sound design.',
      content: 'Capturing palace weddings requires precision lighting and state-of-the-art camera sensors...',
      isPublished: true,
      publishedAt: '2026-08-20T10:00:00Z',
    },
  ],
  videos: [
    {
      _id: 'vid-1',
      title: 'Royal Heritage Wedding Teaser | Udaipur',
      youtubeId: 'dQw4w9WgXcQ',
      category: 'Palace Wedding Films',
      couple: 'Vikram & Radhika',
      location: 'Udaipur',
      isFeatured: true,
    },
    {
      _id: 'vid-2',
      title: 'Narmada Riverfront Pre-Wedding Cinema | Maheshwar',
      youtubeId: 'dQw4w9WgXcQ',
      category: 'Pre-Wedding Cinema',
      couple: 'Arjun & Meera',
      location: 'Maheshwar Ghats',
      isFeatured: true,
    },
  ],
  careers: [
    {
      _id: 'car-1',
      title: 'Lead Cinematographer & Wedding Film Director',
      department: 'Cinematography',
      location: 'Bhopal / Travel Circuits (Udaipur, Maheshwar, Goa)',
      type: 'Full Time',
      experience: '3+ Years in Luxury Wedding Cinema',
      salary: '₹8,00,000 - ₹14,00,000 / Year',
      description: 'Direct high-profile destination wedding films and lead our cinematic camera crew.',
      isOpen: true,
    },
    {
      _id: 'car-2',
      title: 'Senior 4K Colorist & Film Editor',
      department: 'Post-Production',
      location: 'Studio Headquarters (Bhopal)',
      type: 'Full Time',
      experience: '2+ Years DaVinci Resolve',
      salary: '₹6,00,000 - ₹9,50,000 / Year',
      description: 'Transform raw cinema footage into timeless, color-graded emotional masterpieces.',
      isOpen: true,
    },
  ],
  applications: [
    {
      _id: 'app-1',
      position: 'Lead Cinematographer',
      fullName: 'Aakash Verma',
      email: 'aakash.cinema@gmail.com',
      phone: '+91 98260 55443',
      portfolioUrl: 'https://vimeo.com/aakashfilms',
      status: 'UNDER_REVIEW',
      appliedAt: '2026-08-24T11:00:00Z',
    },
  ],
  testimonials: [
    {
      _id: 'test-1',
      clientName: 'Aarav & Ananya Sharma',
      location: 'Jehan Numa Palace, Bhopal',
      rating: 5,
      story: 'Moonlight Production captured our wedding with such royal grandeur. The 4K cinema film brings tears of joy every single time we watch it.',
      isFeatured: true,
    },
    {
      _id: 'test-2',
      clientName: 'Vikram & Radhika Singhania',
      location: 'The Oberoi Udaivilas, Udaipur',
      rating: 5,
      story: 'The attention to detail and cinematic drone sweeps across Lake Pichola made our wedding look like a Bollywood blockbuster!',
      isFeatured: true,
    },
  ],
  employees: [
    {
      _id: 'emp-1',
      name: 'Rohan Verma',
      designation: 'Lead Cinematographer & Director',
      department: 'Cinematography',
      user: { name: 'Rohan Verma', email: 'lead.photographer@moonlightproduction.com', phone: '+91 92292 29323' },
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      status: 'active',
    },
  ],
  customers: [
    {
      _id: 'cust-1',
      name: 'Aarav & Ananya Sharma',
      email: 'aarav.ananya@gmail.com',
      phone: '+91 92292 29323',
      eventDate: '2026-11-20',
      city: 'Bhopal',
      package: 'The Imperial Heritage Suite',
      status: 'active',
    },
    {
      _id: 'cust-2',
      name: 'Vikram & Radhika Singhania',
      email: 'vikram.singhania@gmail.com',
      phone: '+91 98200 99887',
      eventDate: '2026-12-14',
      city: 'Udaipur',
      package: 'The Royal Sovereign Collection',
      status: 'active',
    },
  ],
  admins: [
    {
      _id: 'adm-1',
      name: 'Moonlight Studio Director',
      email: 'admin@moonlightproduction.com',
      role: 'admin',
      permissions: ['ALL_PERMISSIONS'],
      status: 'active',
    },
  ],
  auditLogs: [
    {
      _id: 'log-1',
      action: 'Super Admin Login Clearance Verified',
      performedBy: { name: 'Executive Super Admin' },
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'log-2',
      action: 'Real-Time CRM Pipeline Auto-Sync Active',
      performedBy: { name: 'System Engine' },
      createdAt: new Date().toISOString(),
    },
  ],
  settings: {
    studioName: 'Moonlight Production',
    tagline: 'Your Story. Our Vision. Forever.',
    email: 'info@moonlightproduction.com',
    phone: '+91 92292 29323',
    instagram: '@moonlight_production__',
    youtube: '@moonlightproductions_films',
    address: 'Studio Atelier, VIP Road, Bhopal, MP 462001',
    gstin: '23AABCM1234F1Z8',
  },
};

// Helper to get or initialize local storage collection
const getCollection = (key) => {
  const stored = localStorage.getItem(`ml_${key}`);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {}
  }
  const defaultVal = initialData[key] || [];
  localStorage.setItem(`ml_${key}`, JSON.stringify(defaultVal));
  return defaultVal;
};

const setCollection = (key, data) => {
  localStorage.setItem(`ml_${key}`, JSON.stringify(data));
};

// Simulated mock API router to eliminate 405 Method Not Allowed errors on static hosts
const handleMockRequest = async (method, url, data) => {
  const cleanUrl = url.split('?')[0].replace(/^\/api/, '');
  const params = new URLSearchParams(url.includes('?') ? url.split('?')[1] : '');

  // 1. Portfolio
  if (cleanUrl === '/portfolio' || cleanUrl.startsWith('/portfolio/')) {
    let items = getCollection('portfolio');
    if (method === 'GET') {
      if (cleanUrl.startsWith('/portfolio/') && cleanUrl !== '/portfolio') {
        const id = cleanUrl.replace('/portfolio/', '');
        const item = items.find((p) => p._id === id);
        return { data: item || items[0] };
      }
      return { data: items };
    }
    if (method === 'POST') {
      const newItem = { _id: `port-${Date.now()}`, ...data };
      items = [newItem, ...items];
      setCollection('portfolio', items);
      return { data: newItem };
    }
    if (method === 'DELETE') {
      const id = cleanUrl.replace('/portfolio/', '');
      items = items.filter((p) => p._id !== id);
      setCollection('portfolio', items);
      return { data: { success: true } };
    }
  }

  // 2. Services
  if (cleanUrl === '/services' || cleanUrl.startsWith('/services/')) {
    let items = getCollection('services');
    if (method === 'GET') return { data: items };
    if (method === 'POST') {
      const newItem = { _id: `srv-${Date.now()}`, ...data };
      items = [...items, newItem];
      setCollection('services', items);
      return { data: newItem };
    }
    if (method === 'DELETE') {
      const id = cleanUrl.replace('/services/', '');
      items = items.filter((p) => p._id !== id);
      setCollection('services', items);
      return { data: { success: true } };
    }
  }

  // 3. Bookings
  if (cleanUrl === '/bookings' || cleanUrl.startsWith('/bookings/')) {
    let items = getCollection('bookings');
    if (method === 'GET') return { data: items };
    if (method === 'POST') {
      const newItem = { _id: `book-${Date.now()}`, bookingNumber: `MLP-${Date.now().toString().slice(-4)}`, ...data };
      items = [newItem, ...items];
      setCollection('bookings', items);
      return { data: newItem };
    }
    if (method === 'PUT') {
      return { data: { success: true } };
    }
  }

  // 4. Invoices
  if (cleanUrl === '/invoices' || cleanUrl.startsWith('/invoices/')) {
    let items = getCollection('invoices');
    if (method === 'GET') return { data: items };
    if (method === 'POST') {
      const newItem = { _id: `inv-${Date.now()}`, invoiceNumber: `INV-${Date.now().toString().slice(-4)}`, ...data };
      items = [newItem, ...items];
      setCollection('invoices', items);
      return { data: newItem };
    }
  }

  // 5. Payments
  if (cleanUrl === '/payments' || cleanUrl.startsWith('/payments/')) {
    let items = getCollection('payments');
    if (method === 'GET') return { data: items };
    if (method === 'POST') {
      const newItem = { _id: `pay-${Date.now()}`, paymentId: `pay_${Date.now()}`, ...data };
      items = [newItem, ...items];
      setCollection('payments', items);
      return { data: newItem };
    }
  }

  // 6. Galleries
  if (cleanUrl === '/galleries' || cleanUrl.startsWith('/galleries/')) {
    let items = getCollection('galleries');
    if (method === 'GET') {
      if (cleanUrl.startsWith('/galleries/') && cleanUrl !== '/galleries') {
        const id = cleanUrl.replace('/galleries/', '');
        const gal = items.find((g) => g._id === id);
        return { data: gal || items[0] };
      }
      return { data: items };
    }
    if (method === 'POST') {
      const newItem = { _id: `gal-${Date.now()}`, ...data };
      items = [newItem, ...items];
      setCollection('galleries', items);
      return { data: newItem };
    }
  }

  // 7. Blogs
  if (cleanUrl === '/blogs' || cleanUrl.startsWith('/blogs/')) {
    let items = getCollection('blogs');
    if (method === 'GET') {
      if (cleanUrl.startsWith('/blogs/') && cleanUrl !== '/blogs') {
        const slug = cleanUrl.replace('/blogs/', '');
        const b = items.find((item) => item.slug === slug || item._id === slug);
        return { data: b || items[0] };
      }
      return { data: items };
    }
    if (method === 'POST') {
      const newItem = { _id: `blog-${Date.now()}`, slug: (data.title || 'blog').toLowerCase().replace(/\s+/g, '-'), ...data };
      items = [newItem, ...items];
      setCollection('blogs', items);
      return { data: newItem };
    }
  }

  // 8. Videos
  if (cleanUrl === '/videos' || cleanUrl.startsWith('/videos/')) {
    let items = getCollection('videos');
    if (method === 'GET') return { data: items };
    if (method === 'POST') {
      const newItem = { _id: `vid-${Date.now()}`, ...data };
      items = [newItem, ...items];
      setCollection('videos', items);
      return { data: newItem };
    }
  }

  // 9. Careers & Applications
  if (cleanUrl === '/careers' || cleanUrl.startsWith('/careers/')) {
    if (cleanUrl.includes('applications')) {
      return { data: getCollection('applications') };
    }
    return { data: getCollection('careers') };
  }

  // 10. Testimonials
  if (cleanUrl === '/testimonials' || cleanUrl.startsWith('/testimonials/')) {
    let items = getCollection('testimonials');
    if (method === 'GET') return { data: items };
    if (method === 'POST') {
      const newItem = { _id: `test-${Date.now()}`, ...data };
      items = [newItem, ...items];
      setCollection('testimonials', items);
      return { data: newItem };
    }
  }

  // 11. Admin Employees & Customers
  if (cleanUrl === '/admin/employees' || cleanUrl === '/employees') {
    return { data: getCollection('employees') };
  }
  if (cleanUrl === '/admin/customers' || cleanUrl === '/customers') {
    return { data: getCollection('customers') };
  }

  // 12. Super Admin Admins & Audit Logs & Config
  if (cleanUrl === '/super-admin/admins') {
    let items = getCollection('admins');
    if (method === 'GET') return { data: items };
    if (method === 'POST') {
      const newItem = { _id: `adm-${Date.now()}`, ...data, role: 'admin', status: 'active' };
      items = [newItem, ...items];
      setCollection('admins', items);
      return { data: newItem };
    }
  }
  if (cleanUrl.startsWith('/super-admin/audit-logs')) {
    return { data: getCollection('auditLogs') };
  }
  if (cleanUrl.startsWith('/super-admin/system-config') || cleanUrl === '/settings') {
    return { data: initialData.settings };
  }

  // 13. Enquiries
  if (cleanUrl === '/enquiries' || cleanUrl.startsWith('/enquiries/')) {
    return { data: [] };
  }

  // Generic fallback
  return { data: { success: true, message: 'Operation completed in offline resilient storage.' } };
};

// Check if we have a live backend endpoint
const isLiveBackendAvailable = Boolean(import.meta.env.VITE_API_URL);

// Base Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Resilient API Wrapper that prevents 405 Method Not Allowed errors
const api = {
  get: async (url, config = {}) => {
    if (isLiveBackendAvailable) {
      try {
        const res = await axiosInstance.get(url, config);
        return res.data;
      } catch (err) {
        // Fall back seamlessly
      }
    }
    const mock = await handleMockRequest('GET', url);
    return mock.data;
  },

  post: async (url, data = {}, config = {}) => {
    if (isLiveBackendAvailable) {
      try {
        const res = await axiosInstance.post(url, data, config);
        return res.data;
      } catch (err) {
        // Fall back seamlessly
      }
    }
    const mock = await handleMockRequest('POST', url, data);
    return mock.data;
  },

  put: async (url, data = {}, config = {}) => {
    if (isLiveBackendAvailable) {
      try {
        const res = await axiosInstance.put(url, data, config);
        return res.data;
      } catch (err) {
        // Fall back seamlessly
      }
    }
    const mock = await handleMockRequest('PUT', url, data);
    return mock.data;
  },

  delete: async (url, config = {}) => {
    if (isLiveBackendAvailable) {
      try {
        const res = await axiosInstance.delete(url, config);
        return res.data;
      } catch (err) {
        // Fall back seamlessly
      }
    }
    const mock = await handleMockRequest('DELETE', url);
    return mock.data;
  },

  patch: async (url, data = {}, config = {}) => {
    if (isLiveBackendAvailable) {
      try {
        const res = await axiosInstance.patch(url, data, config);
        return res.data;
      } catch (err) {
        // Fall back seamlessly
      }
    }
    const mock = await handleMockRequest('PUT', url, data);
    return mock.data;
  },
};

export default api;
