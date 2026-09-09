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
    <div className="space-y-8 animate-fade-in text-neutral-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block">
            Proposal Status
          </span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">My Enquiries & Proposals</h1>
          <p className="text-neutral-600 text-xs font-light mt-1">
            Track lead responses, custom quotation proposals, and confirmed dates.
          </p>
        </div>
        <Link
          to="/enquiry"
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all self-start sm:self-auto"
        >
          + New Enquiry
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="h-40 rounded-3xl bg-stone-100 animate-pulse border border-stone-200" />
          ))}
        </div>
      ) : enquiries.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-amber-900/15 space-y-3 shadow-sm">
          <MessageSquare className="w-8 h-8 text-amber-600 mx-auto opacity-70" />
          <h3 className="font-serif text-xl text-neutral-900 font-bold">No Enquiries Logged</h3>
          <p className="text-xs text-neutral-500">Submit an inquiry to start your bespoke wedding itinerary.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {enquiries.map((enq) => (
            <div key={enq._id} className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-sm space-y-6 hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-900/10">
                <div>
                  <span className="text-xs font-mono text-amber-800 font-bold bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">{enq.enquiryId}</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 mt-1">{enq.eventType}</h3>
                  <div className="flex items-center space-x-3 text-xs text-neutral-500 mt-1 font-mono">
                    <span>{new Date(enq.eventDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{enq.location?.city}</span>
                  </div>
                </div>

                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase bg-amber-50 text-amber-900 border border-amber-300 w-fit">
                  {enq.status}
                </span>
              </div>

              {/* Quotation Preview */}
              {enq.quotation?.totalAmount && (
                <div className="p-4 rounded-2xl bg-stone-50 border border-amber-900/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase text-neutral-500 font-mono font-bold">Formal Proposal Amount</span>
                    <p className="font-serif text-xl font-bold text-amber-900">
                      ₹{enq.quotation.totalAmount?.toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-neutral-600 mt-1">{enq.quotation.notes}</p>
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
