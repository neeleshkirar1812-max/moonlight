import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { Users, Mail, Phone, Calendar, Heart, Search } from 'lucide-react';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/customers?search=${search}`);
      setCustomers(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
            Client Directory
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Registered Clients & Couples</h1>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchCustomers()}
            className="w-full bg-obsidian-300 border border-white/15 rounded-full pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((c) => (
          <div key={c._id} className="luxury-card rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-white/10">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 font-serif font-bold">
                {c.user?.name?.charAt(0) || 'C'}
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-white">{c.user?.name}</h3>
                <p className="text-[11px] text-neutral-400">{c.user?.email}</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-neutral-300">
              {c.partnerName && (
                <p className="flex items-center text-gold-300">
                  <Heart className="w-3.5 h-3.5 mr-2 text-red-400" /> Partner: {c.partnerName}
                </p>
              )}
              <p className="flex items-center">
                <Phone className="w-3.5 h-3.5 mr-2 text-gold-400" /> {c.user?.phone || 'No phone'}
              </p>
              {c.weddingDate && (
                <p className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-2 text-gold-400" /> {new Date(c.weddingDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCustomers;
