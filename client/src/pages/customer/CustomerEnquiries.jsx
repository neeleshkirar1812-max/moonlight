import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { MessageSquare, Calendar, MapPin, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await api.get('/enquiries');
        setEnquiries(res.data || []);
      } catch (err) {
        console.error('Error loading enquiries', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
            Proposal Status
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">My Enquiries & Proposals</h1>
        </div>
        <Link
          to="/enquiry"
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle"
        >
          + New Enquiry
        </Link>
      </div>

      {enquiries.length === 0 ? (
        <div className="text-center py-20 bg-obsidian-400 rounded-3xl border border-white/10 space-y-3">
          <MessageSquare className="w-8 h-8 text-gold-400 mx-auto opacity-50" />
          <h3 className="font-serif text-xl text-white">No Enquiries Logged</h3>
        </div>
      ) : (
        <div className="space-y-6">
          {enquiries.map((enq) => (
            <div key={enq._id} className="luxury-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-gold-400 font-bold">{enq.enquiryId}</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">{enq.eventType}</h3>
                  <div className="flex items-center space-x-3 text-xs text-neutral-400 mt-1">
                    <span>{new Date(enq.eventDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{enq.location?.city}</span>
                  </div>
                </div>

                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase bg-gold-500/20 text-gold-300 border border-gold-500/40 w-fit">
                  {enq.status}
                </span>
              </div>

              {/* Quotation Preview */}
              {enq.quotation?.totalAmount && (
                <div className="p-4 rounded-2xl bg-obsidian-500 border border-gold-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 font-mono">Formal Proposal Amount</span>
                    <p className="font-serif text-xl font-bold text-gold-300">
                      ₹{enq.quotation.totalAmount?.toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-neutral-300">{enq.quotation.notes}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerEnquiries;
