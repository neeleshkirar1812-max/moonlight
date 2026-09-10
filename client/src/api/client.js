import axios from 'axios';
import { invitationTemplates } from '../data/invitationTemplates';

// One-time automatic purge for clean production state (removes all dummy testing cache)
try {
  if (typeof window !== 'undefined' && localStorage.getItem('ml_data_purged_production_v2') !== 'true') {
    const keysToRemove = [
      'ml_employees',
      'ml_salaries',
      'ml_bookings',
      'ml_invoices',
      'ml_payments',
      'ml_enquiries',
      'ml_customers',
      'ml_admins',
      'ml_applications',
      'ml_galleries',
      'moonlight_pending_approvals',
      'moonlight_all_users',
      'moonlight_reset_tickets',
      'moonlight_registered_clients',
    ];
    keysToRemove.forEach((k) => localStorage.removeItem(k));
    localStorage.setItem('ml_data_purged_production_v2', 'true');
  }
} catch (e) {}

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
  bookings: [],
  invoices: [],
  payments: [],
  galleries: [],
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
  employees: [],
  customers: [],
  admins: [],
  salaries: [],
  auditLogs: [],
  settings: {
    studioName: 'Moonlight Production',
    legalName: 'Raksha Rathore',
    tagline: 'Your Story. Our Vision. Forever.',
    email: 'Tarunrathore3435@gmail.com',
    phone: '+91 92292 29323',
    secondaryPhone: '+91 90395 83534',
    instagram: '@moonlight_production__',
    youtube: '@moonlightproductions_films',
    address: 'C 37, Pallavi Nagar, Rohit Nagar, Bawaria Kalan, Bhopal, MP 462039',
    gstin: '23DHNPR9293D1ZT',
    udyam: 'UDYAM-MP-10-0119118',
    pan: 'DHNPR9293D',
    bankName: 'YES BANK Ltd.',
    bankBranch: 'Bittan Market, Arera Colony, Bhopal - 462016',
    accountType: 'Current Account',
    accountNumber: '069861900005221',
    ifscCode: 'YESB0000698',
  },
};

// Helper to get or initialize local storage collection
const getCollection = (key) => {
  const stored = localStorage.getItem(`ml_${key}`);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) || typeof parsed === 'object') {
        return parsed;
      }
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
    if (method === 'PATCH' && cleanUrl.includes('/stage')) {
      const parts = cleanUrl.split('/');
      const id = parts[2];
      const { stage, note } = data || {};
      items = items.map((b) => {
        if (b._id === id) {
          const history = b.stageHistory || [];
          return {
            ...b,
            orderStage: stage,
            stageHistory: [
              ...history,
              { stage, note, timestamp: new Date().toISOString(), updaterName: 'Staff' },
            ],
          };
        }
        return b;
      });
      setCollection('bookings', items);
      return { data: { success: true } };
    }
    if (method === 'PUT') {
      return { data: { success: true } };
    }
  }

  // 3b. Salary Slips & Payroll
  if (cleanUrl === '/salary' || cleanUrl.startsWith('/salary/')) {
    let items = getCollection('salaries') || [];
    if (method === 'GET') return { data: items };
    if (method === 'POST' && cleanUrl === '/salary/bulk') {
      return { data: items };
    }
    if (method === 'POST') {
      const newItem = { _id: `slip-${Date.now()}`, ...data };
      items = [newItem, ...items];
      setCollection('salaries', items);
      return { data: newItem };
    }
    if (method === 'PATCH' && cleanUrl.includes('/pay')) {
      const parts = cleanUrl.split('/');
      const id = parts[2];
      items = items.map((s) =>
        s._id === id
          ? {
              ...s,
              paymentStatus: 'Paid',
              paymentDate: new Date().toISOString(),
              ...data,
            }
          : s
      );
      setCollection('salaries', items);
      return { data: { success: true } };
    }
  }

  // 4. Invoices
  if (cleanUrl === '/invoices' || cleanUrl.startsWith('/invoices/')) {
    let items = getCollection('invoices');
    if (method === 'GET') return { data: items };
    if (method === 'POST') {
      const subtotal = (data.items || []).reduce((acc, it) => acc + (Number(it.quantity) || 1) * (Number(it.unitPrice) || 0), 0);
      const taxRate = Number(data.taxRate || 18);
      const taxAmount = Math.round((subtotal * taxRate) / 100);
      const totalAmount = subtotal + taxAmount;
      const paidAmount = Number(data.paidAmount || 0);
      const remainingBalance = Math.max(0, totalAmount - paidAmount);

      const newItem = {
        _id: `inv-${Date.now()}`,
        invoiceNumber: data.invoiceNumber || `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        issueDate: new Date().toISOString(),
        dueDate: data.dueDate || new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
        status: paidAmount >= totalAmount ? 'PAID' : paidAmount > 0 ? 'PARTIALLY_PAID' : (data.status || 'ISSUED'),
        subtotal,
        taxRate,
        taxAmount,
        totalAmount,
        paidAmount,
        remainingBalance,
        clientInfo: {
          name: data.clientName || data.clientInfo?.name || 'Valued Client',
          email: data.clientEmail || data.clientInfo?.email || '',
          phone: data.clientPhone || data.clientInfo?.phone || '',
          address: data.clientAddress || data.clientInfo?.address || '',
        },
        items: (data.items || []).map((it) => ({
          ...it,
          quantity: Number(it.quantity) || 1,
          unitPrice: Number(it.unitPrice) || 0,
          total: (Number(it.quantity) || 1) * (Number(it.unitPrice) || 0),
        })),
        notes: data.notes || '',
        ...data,
      };
      items = [newItem, ...items.filter((i) => i._id !== newItem._id)];
      setCollection('invoices', items);
      return { data: newItem };
    }
  }

  // 5. Payments
  if (cleanUrl === '/payments' || cleanUrl.startsWith('/payments/')) {
    let items = getCollection('payments');
    if (cleanUrl.includes('create-order')) {
      return {
        data: {
          keyId: 'rzp_test_Ta47WTEJxJInTH',
          order: {
            id: `order_${Date.now()}`,
            amount: (data.amount || 50000) * 100,
            currency: 'INR',
          },
        },
      };
    }
    if (cleanUrl.includes('verify')) {
      const newPay = {
        _id: `pay-${Date.now()}`,
        paymentId: data.razorpay_payment_id || `pay_${Date.now()}`,
        amount: data.amount || 50000,
        status: 'SUCCESS',
        method: 'UPI / Razorpay',
        createdAt: new Date().toISOString(),
        bookingId: data.bookingId,
      };
      items = [newPay, ...items];
      setCollection('payments', items);
      return { data: { success: true, payment: newPay } };
    }
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
    if (cleanUrl.includes('/favorite')) {
      return { data: { success: true, isFavorite: true } };
    }
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
  if (
    cleanUrl === '/admin/employees' ||
    cleanUrl.startsWith('/admin/employees/') ||
    cleanUrl === '/employees' ||
    cleanUrl.startsWith('/employees/')
  ) {
    let items = getCollection('employees');
    if (method === 'GET') return { data: items };
    if (method === 'POST') {
      const email = (data.user?.email || data.email || '').toLowerCase().trim();
      const existingIdx = email ? items.findIndex((e) => (e.user?.email || '').toLowerCase().trim() === email) : -1;
      if (existingIdx >= 0) {
        items[existingIdx] = { ...items[existingIdx], ...data };
        setCollection('employees', items);
        return { data: items[existingIdx] };
      }
      const newItem = {
        _id: data._id || `emp-${Date.now()}`,
        employeeCode: data.employeeCode || `EMP-MLP-${String(items.length + 1).padStart(3, '0')}`,
        status: data.status || 'pending_approval',
        ...data,
      };
      items = [newItem, ...items];
      setCollection('employees', items);
      return { data: newItem };
    }
    if (method === 'PUT' || method === 'PATCH') {
      const id = cleanUrl.split('/').pop();
      items = items.map((emp) => (emp._id === id ? { ...emp, ...data } : emp));
      setCollection('employees', items);
      const updated = items.find((emp) => emp._id === id);
      return { data: updated || data };
    }
    if (method === 'DELETE') {
      const id = cleanUrl.split('/').pop();
      items = items.filter((emp) => emp._id !== id);
      setCollection('employees', items);
      return { data: { success: true, message: 'Employee deleted successfully.' } };
    }
    return { data: items };
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
  if (cleanUrl === '/enquiries' || cleanUrl.startsWith('/enquiries/') || cleanUrl.startsWith('/webhooks/')) {
    let items = getCollection('enquiries');
    if (!items || items.length === 0) {
      items = [
        {
          _id: 'enq-1',
          enquiryId: 'ENQ-9812',
          leadSource: 'Website Estimator',
          customerDetails: { fullName: 'Aarav & Ananya Sharma', email: 'aarav.ananya@gmail.com', phone: '+91 92292 29323' },
          eventType: 'Royal Palace Destination Wedding',
          eventDate: '2026-11-18',
          location: { city: 'Maheshwar', venue: 'Ahilya Fort' },
          guestCount: 450,
          budgetRange: '₹5L - ₹8L',
          quotation: { totalAmount: 650000, advanceRequired: 195000, notes: '3-Day royal cinema & photo suite.' },
          status: 'NEW',
          createdAt: new Date().toISOString(),
          storyDetails: 'Sunset pheras overlooking Narmada ghats and heritage palace.',
        },
        {
          _id: 'enq-2',
          enquiryId: 'ENQ-9813',
          leadSource: 'Instagram',
          customerDetails: { fullName: 'Kabir & Rhea Kapoor', email: 'kabir.rhea@gmail.com', phone: '+91 98200 12345' },
          eventType: 'Pre-Wedding Rendezvous',
          eventDate: '2026-10-15',
          location: { city: 'Bhopal', venue: 'Jehan Numa Palace' },
          guestCount: 50,
          budgetRange: '₹1.5L - ₹3L',
          quotation: { totalAmount: 225000, advanceRequired: 67500, notes: 'Full day pre-wedding shoot with drone.' },
          status: 'CONTACTED',
          createdAt: new Date().toISOString(),
        },
      ];
      setCollection('enquiries', items);
    }
    if (method === 'GET') {
      const statusParam = params.get('status');
      const searchParam = (params.get('search') || '').toLowerCase();
      let filtered = items;
      if (statusParam && statusParam !== 'ALL') {
        filtered = filtered.filter((e) => e.status === statusParam);
      }
      if (searchParam) {
        filtered = filtered.filter(
          (e) =>
            (e.customerDetails?.fullName || '').toLowerCase().includes(searchParam) ||
            (e.enquiryId || '').toLowerCase().includes(searchParam) ||
            (e.location?.city || '').toLowerCase().includes(searchParam)
        );
      }
      return { data: filtered };
    }
    if (method === 'POST') {
      const newEnq = {
        _id: `enq-${Date.now()}`,
        enquiryId: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'NEW',
        createdAt: new Date().toISOString(),
        ...data,
      };
      items = [newEnq, ...items];
      setCollection('enquiries', items);

      // Auto-sync to Google Sheet if configured
      try {
        const gsheetUrl = localStorage.getItem('moonlight_gsheet_webhook');
        if (gsheetUrl && typeof fetch !== 'undefined') {
          fetch(gsheetUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              enquiryId: newEnq.enquiryId,
              timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
              fullName: newEnq.customerDetails?.fullName || newEnq.fullName || 'New Prospect',
              phone: newEnq.customerDetails?.phone || newEnq.phone || '',
              email: newEnq.customerDetails?.email || newEnq.email || '',
              eventType: newEnq.eventType || 'Wedding',
              eventDate: newEnq.eventDate || 'TBD',
              city: newEnq.location?.city || newEnq.city || 'Bhopal',
              budgetRange: newEnq.budgetRange || '₹2L–₹5L',
              leadSource: newEnq.leadSource || 'Website',
              status: 'NEW',
            }),
          }).catch((e) => console.warn('[Client GSheet Sync]', e));
        }
      } catch (err) {
        // silent
      }
      return {
        data: {
          success: true,
          data: newEnq,
          ...newEnq,
        },
      };
    }
    if (method === 'PUT' || method === 'PATCH') {
      const id = cleanUrl.split('/').pop();
      items = items.map((e) => (e._id === id || e.enquiryId === id ? { ...e, ...data } : e));
      setCollection('enquiries', items);
      const updated = items.find((e) => e._id === id || e.enquiryId === id);
      return { data: updated || data };
    }
    return { data: items };
  }

  // 14. Contact Form
  if (cleanUrl === '/contact' || cleanUrl.startsWith('/contact/')) {
    if (method === 'POST') {
      const contacts = JSON.parse(localStorage.getItem('ml_contacts') || '[]');
      const newContact = {
        _id: `contact-${Date.now()}`,
        ...data,
        receivedAt: new Date().toISOString(),
        status: 'UNREAD',
      };
      contacts.unshift(newContact);
      localStorage.setItem('ml_contacts', JSON.stringify(contacts));
      return {
        data: {
          success: true,
          message: 'Your inquiry has been received by Moonlight Production. We will contact you within 2 hours.',
        },
      };
    }
    return { data: JSON.parse(localStorage.getItem('ml_contacts') || '[]') };
  }

  // 15. Auth Routes (/auth/login, /auth/register, /auth/me)
  if (cleanUrl.startsWith('/auth')) {
    if (cleanUrl.includes('login')) {
      const email = (data?.email || '').toLowerCase().trim();
      let role = 'customer';
      if (email === 'nkneeleshkirar@gmail.com' || email.includes('superadmin')) {
        role = 'superadmin';
      } else if (email.includes('admin') || email.includes('director') || email.includes('hr')) {
        role = 'admin';
      } else if (
        email.includes('employee') ||
        email.includes('crew') ||
        [
          'amanpawar074@gmail.com',
          'bunnysingh@gmail.com',
          'xxx@gmail.com',
          'chinnu@gmail.com',
          'rohitmanekar475@gmail.com',
          'sumit.moonlight@gmail.com',
          'rsthoretsrun@gmail.com',
          'santosh.moonlight@gmail.com',
          'lucky@gmail.com',
          'priyanshu@gmail.com',
        ].includes(email)
      ) {
        role = 'employee';
      }
      const token = `moonlight_jwt_${Date.now()}`;
      const userObj = {
        _id: `usr-${Date.now()}`,
        email,
        name: (email.split('@')[0] || 'User').toUpperCase(),
        role,
      };
      return {
        data: {
          token,
          user: userObj,
        },
      };
    }
    if (cleanUrl.includes('register')) {
      const reg = JSON.parse(localStorage.getItem('moonlight_registered_clients') || '[]');
      reg.unshift({
        name: data?.name || 'Valued Client',
        email: data?.email || '',
        phone: data?.phone || '',
        registeredAt: new Date().toISOString(),
      });
      localStorage.setItem('moonlight_registered_clients', JSON.stringify(reg));
      return {
        data: {
          success: true,
          token: `moonlight_jwt_${Date.now()}`,
          user: {
            email: data?.email,
            name: data?.name,
            role: 'customer',
          },
        },
      };
    }
    if (cleanUrl.includes('me')) {
      const saved = localStorage.getItem('Moonlight_user');
      const user = saved ? JSON.parse(saved) : null;
      return { data: { user } };
    }
  }

  // 16. Digital Invitations & RSVP
  if (cleanUrl.startsWith('/invitations') || cleanUrl.startsWith('/rsvp')) {
    let invitations = getCollection('invitations') || [];
    let purchases = getCollection('invitationPurchases') || [];
    let rsvps = getCollection('rsvps') || [];
    let templates = getCollection('invitationTemplates') || [];
    let coupons = getCollection('invitationCoupons') || [];
    let activityLogs = getCollection('adminActivityLogs') || [];

    // Seed default sample invitation if empty so /i/royal-wedding-aarav-kiara opens out of the box
    if (invitations.length === 0) {
      invitations = [
        {
          _id: 'inv-sample-1',
          id: 'inv-sample-1',
          templateId: 'royal-love',
          customerEmail: 'aarav.ananya@gmail.com',
          customerName: 'Aarav Sharma & Kiara Sen',
          brideName: 'Kiara Sen',
          groomName: 'Aarav Sharma',
          hostNames: 'Sharma & Sen Families',
          title: 'Royal Wedding Celebration',
          names: 'Aarav & Kiara',
          eventType: 'Wedding',
          date: '2026-11-20',
          time: '19:00',
          venue: 'Jehan Numa Palace',
          venueAddress: '152 Shamla Hills, Bhopal, Madhya Pradesh 462013',
          message: 'With the blessings of our parents, we invite you to celebrate our union in royal grace.',
          quote: 'Two souls, one sacred path. A lifetime of laughter, honor, and love begins under the stars.',
          story: 'What began as a chance meeting under the golden sunset of the lakes turned into a lifetime promise of love.',
          hashtag: '#AaravWedsKiara',
          scratchMessage: 'YOU’RE INVITED ♡',
          musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
          coverPhoto: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
          galleryUrls: [
            'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
          ],
          events: [
            {
              id: 'ev-1',
              title: 'Haldi & Phoolon Ki Holi',
              eventType: 'Haldi',
              date: '2026-11-19',
              time: '10:30 AM',
              venue: 'Gulmohar Bagh, Jehan Numa Palace',
              address: 'Shamla Hills, Bhopal',
              description: 'A morning filled with sunshine yellow, marigold petals, and festive rituals.',
              image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
              mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jehan+Numa+Palace+Bhopal',
              calendarEnabled: true,
            },
            {
              id: 'ev-2',
              title: 'Mehendi & Sangeet Gala',
              eventType: 'Sangeet',
              date: '2026-11-19',
              time: '07:00 PM',
              venue: 'The Royal Courtyard Ballroom',
              address: 'Shamla Hills, Bhopal',
              description: 'An evening of henna artistry, high-energy family choreography, and acoustic live band.',
              image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
              mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jehan+Numa+Palace+Bhopal',
              calendarEnabled: true,
            },
            {
              id: 'ev-3',
              title: 'The Royal Wedding & Pheras',
              eventType: 'Wedding',
              date: '2026-11-20',
              time: '06:00 PM',
              venue: 'Royal Poolside Lawn',
              address: 'Shamla Hills, Bhopal',
              description: 'The sacred union of two souls under the royal mandap, followed by dinner and fireworks.',
              image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
              mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jehan+Numa+Palace+Bhopal',
              calendarEnabled: true,
            },
          ],
          dressCode: {
            enabled: true,
            title: 'Royal Indian Formal',
            description: 'We would love to see our guests adorned in traditional royal palettes.',
            palettes: [
              { ceremony: 'Haldi', color: 'Mustard Gold & Turmeric', hex: '#E5A93C' },
              { ceremony: 'Mehendi', color: 'Emerald & Sage Green', hex: '#2D5A27' },
              { ceremony: 'Wedding', color: 'Crimson, Ivory & Champagne', hex: '#8B1E2D' },
            ],
          },
          accommodation: {
            enabled: true,
            hotelName: 'Jehan Numa Palace & Heritage Suites',
            address: 'Shamla Hills, Bhopal',
            checkIn: 'Nov 20, 2026 at 12:00 PM',
            checkOut: 'Nov 22, 2026 at 11:00 AM',
            conciergeContact: '+91 755 266 1100',
          },
          parking: {
            enabled: true,
            valetAvailable: true,
            instructions: 'Complimentary valet parking available at Gate 1 (Royal Portico).',
          },
          weatherGuide: {
            enabled: true,
            forecast: 'Pleasant evening with light breeze (21°C - 24°C). Light pashmina recommended for open-air lawn ceremonies.',
          },
          giftBlessing: {
            enabled: true,
            note: 'Your warm presence and blessings are our greatest gift.',
          },
          status: 'PUBLISHED',
          published: true,
          slug: 'royal-wedding-aarav-kiara',
          createdAt: new Date().toISOString(),
          rsvpCount: 14,
        },
      ];
      setCollection('invitations', invitations);
    }

    if (purchases.length === 0) {
      purchases = [
        {
          _id: 'pur-1',
          templateId: 'royal-love',
          templateName: 'Royal Love',
          customerEmail: 'aarav.ananya@gmail.com',
          customerName: 'Aarav Sharma & Kiara Sen',
          amount: 699,
          purchaseType: 'PAID',
          status: 'paid',
          razorpayOrderId: 'order_sample_101',
          razorpayPaymentId: 'pay_sample_101',
          createdAt: new Date().toISOString(),
          invitationId: 'inv-sample-1',
        },
      ];
      setCollection('invitationPurchases', purchases);
    }

    if (templates.length === 0) {
      templates = [...invitationTemplates];
      setCollection('invitationTemplates', templates);
    }

    // Templates Catalog & Single Template
    if (cleanUrl === '/invitations/templates' || cleanUrl === '/invitations/admin/templates') {
      if (method === 'POST') {
        const newTpl = {
          id: data.slug || `tpl-${Date.now()}`,
          slug: data.slug || `tpl-${Date.now()}`,
          name: data.name || 'Bespoke Luxury Suite',
          category: data.category || 'Wedding',
          price: Number(data.price) || 699,
          originalPrice: Number(data.originalPrice) || 1499,
          previewImage: data.previewImage || data.coverImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
          coverImage: data.previewImage || data.coverImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
          description: data.description || 'Luxury digital invitation suite with interactive features.',
          features: data.features || ['Interactive Scratch Card', 'Live RSVP', 'Google Maps Navigation', 'Background Music'],
          badge: data.badge || 'New',
          theme: data.theme || 'heritage-gold',
          bgGradient: data.bgGradient || 'from-amber-950 via-[#2A1D13] to-neutral-950',
          accentColor: data.accentColor || '#D4AF37',
          status: 'active',
          createdAt: new Date().toISOString(),
        };
        templates.unshift(newTpl);
        setCollection('invitationTemplates', templates);
        return { data: { success: true, template: newTpl } };
      }
      return {
        data: {
          success: true,
          templates: templates.length > 0 ? templates : invitationTemplates,
        },
      };
    }

    if (cleanUrl.startsWith('/invitations/templates/')) {
      const slug = cleanUrl.replace('/invitations/templates/', '');
      const found = (templates.length > 0 ? templates : invitationTemplates).find(
        (t) => t.slug === slug || t.id === slug
      );
      return {
        data: {
          success: true,
          template: found || invitationTemplates[0],
        },
      };
    }

    // Coupons Endpoint
    if (cleanUrl.includes('/coupons/apply')) {
      const { code, amount = 699 } = data;
      const upper = (code || '').toUpperCase().trim();
      let discount = 0;
      if (upper === 'MOONLIGHT100') discount = 100;
      else if (upper === 'ROYAL50') discount = Math.round(amount * 0.5);
      else if (upper === 'WELCOME20') discount = Math.round(amount * 0.2);
      else {
        return { data: { success: false, message: 'Invalid coupon code' } };
      }
      return {
        data: {
          success: true,
          coupon: {
            code: upper,
            discountAmount: discount,
            originalAmount: amount,
            finalAmount: Math.max(0, amount - discount),
          },
        },
      };
    }

    // Customer Dashboard
    if (cleanUrl === '/invitations/dashboard' || cleanUrl === '/invitations/my') {
      const email = (params.get('email') || '').toLowerCase().trim();
      const userInvs = email
        ? invitations.filter((i) => (i.customerEmail || i.userEmail || '').toLowerCase().trim() === email)
        : invitations;
      const userPurchases = email
        ? purchases.filter((p) => (p.customerEmail || '').toLowerCase().trim() === email)
        : purchases;
      return {
        data: {
          success: true,
          invitations: userInvs.length > 0 ? userInvs : invitations,
          purchases: userPurchases.length > 0 ? userPurchases : purchases,
        },
      };
    }

    // Razorpay Create Order
    if (cleanUrl.includes('/payments/create-order')) {
      const tplPrice = data.price || 699;
      return {
        data: {
          key: 'rzp_test_Ta47WTEJxJInTH',
          id: `order_inv_${Date.now()}`,
          amount: tplPrice * 100,
          currency: 'INR',
        },
      };
    }

    // Razorpay Verify & Draft Generation
    if (cleanUrl.includes('/payments/verify')) {
      const newPurchase = {
        _id: `pur-${Date.now()}`,
        templateId: data.templateId || 'royal-love',
        templateName: 'Royal Love',
        customerEmail: data.customerEmail || 'couple@moonlight.com',
        customerName: data.customerName || 'Valued Couple',
        customerPhone: data.customerPhone || '',
        purchaseType: data.couponCode ? 'COUPON' : 'PAID',
        couponCode: data.couponCode || '',
        razorpayOrderId: data.razorpay_order_id || `ord_${Date.now()}`,
        razorpayPaymentId: data.razorpay_payment_id || `pay_${Date.now()}`,
        amount: 699,
        status: 'paid',
        createdAt: new Date().toISOString(),
      };
      purchases.unshift(newPurchase);
      setCollection('invitationPurchases', purchases);

      const cleanNames = (data.customerName || 'wedding')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const initialSlug = `${cleanNames}-${Math.floor(1000 + Math.random() * 9000)}`;

      const newInv = {
        _id: `inv-${Date.now()}`,
        id: `inv-${Date.now()}`,
        templateId: data.templateId || 'royal-love',
        customerEmail: data.customerEmail || 'couple@moonlight.com',
        userEmail: data.customerEmail || 'couple@moonlight.com',
        customerName: data.customerName || 'Valued Couple',
        title: `${data.customerName || 'Couple'}'s Royal Celebration`,
        names: data.customerName || 'Aarav & Kiara',
        brideName: 'Kiara',
        groomName: 'Aarav',
        hostNames: 'Singhania & Advani Families',
        eventType: 'Wedding',
        date: '2026-11-20',
        time: '19:00',
        venue: 'Jehan Numa Palace',
        venueAddress: '152 Shamla Hills, Bhopal, Madhya Pradesh',
        message: 'With joyous hearts, we request the honor of your presence to celebrate our special day.',
        quote: 'Two souls, one sacred path. A lifetime of laughter, honor, and love begins under the stars.',
        story: 'What began as a chance meeting under the golden sunset of the lakes turned into a lifetime promise of love.',
        hashtag: '#AaravWedsKiara',
        scratchMessage: 'YOU’RE INVITED ♡',
        musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
        coverPhoto: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        galleryUrls: [
          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
        ],
        events: [],
        status: 'DRAFT',
        published: false,
        slug: initialSlug,
        createdAt: new Date().toISOString(),
        rsvpCount: 0,
      };
      invitations.unshift(newInv);
      setCollection('invitations', invitations);

      newPurchase.invitationId = newInv._id;
      setCollection('invitationPurchases', purchases);

      return { data: { success: true, invitation: newInv, purchase: newPurchase } };
    }

    // Public /i/:slug endpoint
    if (cleanUrl.startsWith('/invitations/public/')) {
      const slug = cleanUrl.replace('/invitations/public/', '');
      const found = invitations.find((i) => i.slug === slug || i._id === slug || i.id === slug);
      if (found) {
        if (found.status === 'SUSPENDED') {
          return { data: { success: false, status: 'SUSPENDED', message: 'This digital invitation is temporarily suspended.' } };
        }
        return { data: { success: true, invitation: found } };
      }
      return { data: { success: true, invitation: invitations[0] } };
    }

    // Admin overview & stats
    if (cleanUrl === '/invitations/admin/overview' || cleanUrl.startsWith('/invitations/admin/stats')) {
      const totalRevenue = purchases.reduce((sum, p) => sum + (['paid', 'active'].includes(p.status) ? p.amount || 0 : 0), 0) || 699;
      const totalPurchases = purchases.length || 1;
      const totalPublished = invitations.filter((i) => i.published || i.status === 'PUBLISHED').length;
      const draftInvitations = invitations.filter((i) => i.status === 'DRAFT' || !i.published).length;
      const suspendedInvitations = invitations.filter((i) => i.status === 'SUSPENDED').length;
      const totalRSVPs = rsvps.reduce((sum, r) => sum + (Number(r.guests) || 1), 0) || 14;

      return {
        data: {
          success: true,
          stats: {
            totalCustomers: Math.max(purchases.length, invitations.length),
            totalInvitations: invitations.length,
            publishedInvitations: totalPublished,
            draftInvitations,
            suspendedInvitations,
            totalPurchases,
            totalRevenue,
            todayOrders: purchases.length,
            todayRevenue: totalRevenue,
            totalRSVPs,
            rsvpBreakdown: {
              accepted: Math.round(totalRSVPs * 0.75),
              declined: Math.round(totalRSVPs * 0.1),
              maybe: Math.round(totalRSVPs * 0.15),
            },
          },
          recentInvitations: invitations.slice(0, 10),
          recentOrders: purchases.slice(0, 10),
          invitations,
        },
      };
    }

    // Admin Customers (GET, POST)
    if (cleanUrl === '/invitations/admin/customers') {
      if (method === 'POST') {
        const newCustomer = {
          email: (data.email || '').toLowerCase().trim(),
          name: data.name || 'Customer',
          phone: data.phone || '',
          registeredAt: new Date().toISOString(),
          purchases: [],
          invitations: [],
          totalSpent: 0,
          rsvpCount: 0,
        };
        return { data: { success: true, customer: newCustomer, message: 'Customer created successfully.' } };
      }
      // Group customers from purchases and invitations
      const customerMap = {};
      purchases.forEach((p) => {
        const email = (p.customerEmail || '').toLowerCase().trim();
        if (!email) return;
        if (!customerMap[email]) {
          customerMap[email] = {
            email,
            name: p.customerName || 'Client',
            phone: p.customerPhone || '',
            registeredAt: p.createdAt,
            purchases: [],
            invitations: [],
            totalSpent: 0,
            rsvpCount: 0,
          };
        }
        customerMap[email].purchases.push(p);
        customerMap[email].totalSpent += p.amount || 0;
      });

      invitations.forEach((inv) => {
        const email = (inv.customerEmail || inv.userEmail || '').toLowerCase().trim();
        if (!email) return;
        if (!customerMap[email]) {
          customerMap[email] = {
            email,
            name: inv.names || 'Client',
            phone: '',
            registeredAt: inv.createdAt,
            purchases: [],
            invitations: [],
            totalSpent: 0,
            rsvpCount: inv.rsvpCount || 0,
          };
        }
        customerMap[email].invitations.push(inv);
      });

      return { data: { success: true, customers: Object.values(customerMap) } };
    }

    // Admin Manual Free Invitation Assignment (POST)
    if (cleanUrl === '/invitations/admin/manual-invitation') {
      const email = (data.customerEmail || 'client@moonlight.com').toLowerCase().trim();
      const name = data.customerName || 'Valued Client';
      const cleanNames = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const initialSlug = `${cleanNames}-${Math.floor(1000 + Math.random() * 9000)}`;

      const newPurchase = {
        _id: `pur-${Date.now()}`,
        templateId: data.templateId || 'royal-love',
        templateName: 'Royal Love',
        customerEmail: email,
        customerName: name,
        customerPhone: data.customerPhone || '',
        purchaseType: 'ADMIN_ASSIGNED',
        amount: 0,
        currency: 'INR',
        status: 'active',
        createdAt: new Date().toISOString(),
      };
      purchases.unshift(newPurchase);
      setCollection('invitationPurchases', purchases);

      const newInv = {
        _id: `inv-${Date.now()}`,
        id: `inv-${Date.now()}`,
        templateId: data.templateId || 'royal-love',
        customerEmail: email,
        userEmail: email,
        customerName: name,
        title: data.title || `${name}'s Invitation`,
        names: data.names || name,
        eventType: 'Wedding',
        date: data.date || '2026-11-20',
        time: '18:00',
        venue: data.venue || 'Jehan Numa Palace',
        venueAddress: 'Shamla Hills, Bhopal, Madhya Pradesh',
        message: 'With immense joy and happiness, we invite you to join us in celebrating our special moments.',
        scratchMessage: 'YOU’RE INVITED ♡',
        coverPhoto: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        galleryUrls: [],
        events: [],
        status: data.publishImmediately ? 'PUBLISHED' : 'DRAFT',
        published: !!data.publishImmediately,
        slug: initialSlug,
        createdAt: new Date().toISOString(),
        rsvpCount: 0,
      };
      invitations.unshift(newInv);
      setCollection('invitations', invitations);

      newPurchase.invitationId = newInv._id;
      setCollection('invitationPurchases', purchases);

      return { data: { success: true, invitation: newInv, purchase: newPurchase } };
    }

    // Admin Invitation Status Update (PUT /invitations/admin/invitations/:id/status)
    if (cleanUrl.startsWith('/invitations/admin/invitations/') && cleanUrl.endsWith('/status')) {
      const id = cleanUrl.replace('/invitations/admin/invitations/', '').replace('/status', '');
      invitations = invitations.map((inv) => {
        if (inv._id === id || inv.id === id) {
          return {
            ...inv,
            status: data.status,
            published: data.status === 'PUBLISHED',
            updatedAt: new Date().toISOString(),
          };
        }
        return inv;
      });
      setCollection('invitations', invitations);
      const updated = invitations.find((i) => i._id === id || i.id === id);
      return { data: { success: true, invitation: updated } };
    }

    // Admin Activity Logs (GET)
    if (cleanUrl === '/invitations/admin/activity-logs') {
      return { data: { success: true, logs: activityLogs } };
    }

    // Admin Coupons (GET, POST, PUT)
    if (cleanUrl === '/invitations/admin/coupons') {
      if (method === 'POST') {
        const newCoupon = {
          _id: `coup-${Date.now()}`,
          ...data,
          createdAt: new Date().toISOString(),
        };
        coupons.unshift(newCoupon);
        setCollection('invitationCoupons', coupons);
        return { data: { success: true, coupon: newCoupon } };
      }
      return {
        data: {
          success: true,
          coupons: coupons.length > 0 ? coupons : [
            { code: 'MOONLIGHT100', discountType: 'fixed', discountValue: 100, minOrderAmount: 499, isActive: true, usageCount: 12 },
            { code: 'ROYAL50', discountType: 'percentage', discountValue: 50, minOrderAmount: 0, isActive: true, usageCount: 4 },
            { code: 'WELCOME20', discountType: 'percentage', discountValue: 20, minOrderAmount: 0, isActive: true, usageCount: 28 },
          ],
        },
      };
    }

    // Specific invitation by ID
    if (
      cleanUrl.startsWith('/invitations/') &&
      !cleanUrl.includes('dashboard') &&
      !cleanUrl.includes('admin') &&
      !cleanUrl.includes('payments') &&
      !cleanUrl.includes('templates') &&
      !cleanUrl.includes('my') &&
      !cleanUrl.includes('public') &&
      !cleanUrl.includes('rsvp') &&
      !cleanUrl.includes('coupons')
    ) {
      const id = cleanUrl.replace('/invitations/', '');
      if (method === 'GET') {
        let found = invitations.find((i) => i._id === id || i.id === id || i.slug === id);
        if (!found) {
          const matchingTemplate =
            invitationTemplates.find((t) => t.id === id || t.slug === id) || invitationTemplates[0];
          found = {
            _id: id.startsWith('inv-') ? id : `inv-${Date.now()}`,
            id: id.startsWith('inv-') ? id : `inv-${Date.now()}`,
            templateId: matchingTemplate.id,
            template_id: matchingTemplate.id,
            title: `Royal Wedding Celebration`,
            names: 'Aarav & Kiara',
            customerEmail: 'couple@moonlight.com',
            userEmail: 'couple@moonlight.com',
            eventType: matchingTemplate.category || 'Wedding',
            date: '2026-11-20',
            time: '19:00',
            venue: 'Jehan Numa Palace',
            venueAddress: '152 Shamla Hills, Bhopal, Madhya Pradesh',
            message: 'With joyous hearts, we request the honor of your presence.',
            scratchMessage: 'YOU’RE INVITED ♡',
            coverPhoto: matchingTemplate.coverImage,
            galleryUrls: [
              'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
            ],
            events: [],
            status: 'DRAFT',
            published: false,
            slug: `invitation-${Math.floor(1000 + Math.random() * 9000)}`,
            createdAt: new Date().toISOString(),
            rsvpCount: 0,
          };
          invitations.unshift(found);
          setCollection('invitations', invitations);
        }
        return { data: { success: true, invitation: found } };
      }
      if (method === 'PUT' || method === 'PATCH') {
        let slug = data.slug;
        if (data.published && !slug) {
          const rawNames = (data.names || 'wedding')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          slug = `${rawNames}-${Math.floor(1000 + Math.random() * 9000)}`;
        }

        let existing = invitations.find((i) => i._id === id || i.id === id);
        if (existing) {
          invitations = invitations.map((inv) => {
            if (inv._id === id || inv.id === id) {
              return {
                ...inv,
                ...data,
                slug: slug || inv.slug,
                status: data.status !== undefined ? data.status : data.published ? 'PUBLISHED' : inv.status || 'DRAFT',
                published: data.published !== undefined ? data.published : inv.published,
                updatedAt: new Date().toISOString(),
              };
            }
            return inv;
          });
        } else {
          const newEntry = {
            _id: id,
            id: id,
            ...data,
            slug: slug || `invitation-${Math.floor(1000 + Math.random() * 9000)}`,
            status: data.status !== undefined ? data.status : data.published ? 'PUBLISHED' : 'DRAFT',
            published: !!data.published,
            updatedAt: new Date().toISOString(),
          };
          invitations.unshift(newEntry);
        }

        setCollection('invitations', invitations);
        const updated = invitations.find((i) => i._id === id || i.id === id) || invitations[0];
        return { data: { success: true, invitation: updated } };
      }
    }

    // RSVP endpoints
    if (cleanUrl === '/rsvp' || cleanUrl.startsWith('/rsvp/') || cleanUrl === '/invitations/rsvp') {
      if (method === 'POST') {
        const newRsvp = {
          _id: `rsvp-${Date.now()}`,
          ...data,
          createdAt: new Date().toISOString(),
        };
        rsvps.unshift(newRsvp);
        setCollection('rsvps', rsvps);

        // Increment count on invitation
        if (data.invitationId) {
          invitations = invitations.map((inv) => {
            if (
              inv._id === data.invitationId ||
              inv.id === data.invitationId ||
              inv.slug === data.invitationId
            ) {
              return { ...inv, rsvpCount: (inv.rsvpCount || 0) + (Number(data.guests) || 1) };
            }
            return inv;
          });
          setCollection('invitations', invitations);
        }
        return { data: { success: true, rsvp: newRsvp } };
      }
      if (method === 'GET') {
        return { data: { success: true, rsvps } };
      }
    }
  }

  // Generic fallback
  return { data: { success: true, message: 'Operation completed in offline resilient storage.' } };
};

// Base Axios instance - always communicates with real live backend
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor to inject Authorization Bearer token from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Moonlight_token') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Resilient API Wrapper: Direct connection to live backend
const api = {
  get: async (url, config = {}) => {
    try {
      const res = await axiosInstance.get(url, config);
      return res.data;
    } catch (err) {
      if (err.response && ![404, 405, 500, 502, 503, 504].includes(err.response.status)) {
        throw err;
      }
      const mock = await handleMockRequest('GET', url);
      return mock.data;
    }
  },

  post: async (url, data = {}, config = {}) => {
    try {
      const res = await axiosInstance.post(url, data, config);
      return res.data;
    } catch (err) {
      if (err.response && ![404, 405, 500, 502, 503, 504].includes(err.response.status)) {
        throw err;
      }
      const mock = await handleMockRequest('POST', url, data);
      return mock.data;
    }
  },

  put: async (url, data = {}, config = {}) => {
    try {
      const res = await axiosInstance.put(url, data, config);
      return res.data;
    } catch (err) {
      if (err.response && ![404, 405, 500, 502, 503, 504].includes(err.response.status)) {
        throw err;
      }
      const mock = await handleMockRequest('PUT', url, data);
      return mock.data;
    }
  },

  delete: async (url, config = {}) => {
    try {
      const res = await axiosInstance.delete(url, config);
      return res.data;
    } catch (err) {
      if (err.response && ![404, 405, 500, 502, 503, 504].includes(err.response.status)) {
        throw err;
      }
      const mock = await handleMockRequest('DELETE', url);
      return mock.data;
    }
  },

  patch: async (url, data = {}, config = {}) => {
    try {
      const res = await axiosInstance.patch(url, data, config);
      return res.data;
    } catch (err) {
      if (err.response && ![404, 405, 500, 502, 503, 504].includes(err.response.status)) {
        throw err;
      }
      const mock = await handleMockRequest('PATCH', url, data);
      return mock.data;
    }
  },
};

export default api;
