import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';
import { Calendar, CheckSquare, Clock, MapPin, Users, Camera, Sparkles, ArrowRight } from 'lucide-react';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [assignedBookings, setAssignedBookings] = useState([]);
  const [assignedEnquiries, setAssignedEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const [bRes, eRes] = await Promise.allSettled([
          api.get('/bookings'),
          api.get('/enquiries'),
        ]);
        if (bRes.status === 'fulfilled') setAssignedBookings(bRes.value.data || []);
        if (eRes.status === 'fulfilled') setAssignedEnquiries(eRes.value.data || []);
      } catch (err) {
        console.error('Employee data error', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeData();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-10 border border-gold-500/30 bg-obsidian-400 shadow-2xl">
        <div className="relative z-10 space-y-2">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
            Production & Cinema Crew Portal
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">
            Hello, {user?.name}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 font-light">
            You have <strong className="text-gold-300">{assignedBookings.length} active wedding shoots</strong> assigned to your schedule.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="luxury-card rounded-2xl p-6 border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase text-neutral-400">Assigned Shoots</span>
            <p className="font-serif text-3xl font-bold text-white mt-1">{assignedBookings.length}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <Camera className="w-6 h-6" />
          </div>
        </div>

        <div className="luxury-card rounded-2xl p-6 border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase text-neutral-400">Assigned Enquiries</span>
            <p className="font-serif text-3xl font-bold text-white mt-1">{assignedEnquiries.length}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="luxury-card rounded-2xl p-6 border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase text-neutral-400">Readiness Status</span>
            <p className="font-serif text-2xl font-bold text-emerald-400 mt-1">Gear Ready</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckSquare className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Upcoming Shoots Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-white">My Upcoming Shoot Schedule</h2>
          <Link to="/employee/projects" className="text-xs text-gold-400 hover:underline">
            View All Projects →
          </Link>
        </div>

        {assignedBookings.length === 0 ? (
          <p className="text-xs text-neutral-400">No active shoot assignments.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assignedBookings.map((bkg) => (
              <div key={bkg._id} className="luxury-card rounded-2xl p-6 border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="font-mono text-xs text-gold-400 font-bold">{bkg.bookingNumber}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-gold-500/20 text-gold-300 border border-gold-500/40">
                    {bkg.bookingStatus}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-white">{bkg.eventType}</h3>
                  <div className="space-y-1 text-xs text-neutral-300 mt-2">
                    <p className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1.5 text-gold-400" /> {new Date(bkg.eventDate).toLocaleDateString('en-US', { dateStyle: 'full' })}</p>
                    <p className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1.5 text-gold-400" /> {bkg.location?.venue}, {bkg.location?.city}</p>
                    <p className="flex items-center"><Users className="w-3.5 h-3.5 mr-1.5 text-gold-400" /> Client: {bkg.customer?.name} ({bkg.customer?.phone})</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/employee/projects"
                    className="inline-flex items-center text-xs font-semibold text-gold-300 hover:text-white uppercase tracking-wider"
                  >
                    View Project Brief & Shot Checklist <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
