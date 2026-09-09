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
    <div className="space-y-8 animate-fade-in text-neutral-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block">
            Client Directory
          </span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Registered Clients & Couples</h1>
          <p className="text-neutral-600 text-xs font-light mt-1">
            Browse all client accounts, couple details, shoot wedding dates, and contact profiles.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchCustomers()}
            className="w-full bg-white border border-amber-900/20 rounded-full pl-9 pr-4 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-44 rounded-2xl bg-stone-100 animate-pulse border border-stone-200" />
          ))}
        </div>
      ) : customers.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-amber-900/15 space-y-3 shadow-sm">
          <Users className="w-8 h-8 text-amber-600 mx-auto opacity-70" />
          <h3 className="font-serif text-xl text-neutral-900 font-bold">No Clients Found</h3>
          <p className="text-xs text-neutral-500">Registered clients will appear here automatically.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.map((c) => (
            <div key={c._id} className="bg-white rounded-2xl p-6 border border-amber-900/15 hover:border-amber-500/40 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b border-stone-100">
                <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 font-serif font-bold">
                  {c.user?.name?.charAt(0) || 'C'}
                </div>
                <div className="truncate">
                  <h3 className="font-serif text-base font-bold text-neutral-900 truncate">{c.user?.name}</h3>
                  <p className="text-[11px] text-neutral-500 font-mono truncate">{c.user?.email}</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-neutral-600">
                {c.partnerName && (
                  <p className="flex items-center text-amber-900 font-medium">
                    <Heart className="w-3.5 h-3.5 mr-2 text-rose-500 shrink-0" /> Partner: {c.partnerName}
                  </p>
                )}
                <p className="flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-2 text-amber-700 shrink-0" /> {c.user?.phone || 'No phone'}
                </p>
                {c.weddingDate && (
                  <p className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-2 text-amber-700 shrink-0" /> {new Date(c.weddingDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;
