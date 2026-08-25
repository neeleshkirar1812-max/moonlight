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
        if (bRes.status === 'fulfilled' && bRes.value.data) setAssignedBookings(bRes.value.data);
        if (eRes.status === 'fulfilled' && eRes.value.data) setAssignedEnquiries(eRes.value.data);
      } catch (err) {
        console.error('Employee data error', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeData();
  }, []);

  const defaultBookings = assignedBookings.length > 0 ? assignedBookings : [
    {
      _id: 'b1',
      bookingNumber: 'MLP-2026-9812',
      eventType: 'Royal Palace Destination Wedding',
      bookingStatus: 'Confirmed',
      eventDate: '2026-11-18',
      location: { venue: 'Ahilya Fort', city: 'Maheshwar' },
      customer: { name: 'Aarav & Ananya Sharma', phone: '+91 92292 29323' },
    },
    {
      _id: 'b2',
      bookingNumber: 'MLP-2026-9815',
      eventType: 'Cinematic Pre-Wedding Shoot',
      bookingStatus: 'Scheduled',
      eventDate: '2026-10-05',
      location: { venue: 'Jehan Numa Palace', city: 'Bhopal' },
      customer: { name: 'Rohan & Sanjana Nair', phone: '+91 98260 11223' },
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-black">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 border-2 border-neutral-300 bg-white shadow-xl">
        <div className="relative z-10 space-y-2">
          <span className="text-xs uppercase font-mono tracking-widest text-gold-800 font-black block">
            Production & Cinema Crew Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-black">
            Hello, {user?.name || 'Rohan Verma'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-800 font-semibold">
            You have <strong className="text-black font-black">{defaultBookings.length} active wedding shoots</strong> assigned to your schedule.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border-2 border-neutral-300 shadow-md flex items-center justify-between">
          <div>
            <span className="text-[10.5px] uppercase font-mono font-bold text-neutral-600">Assigned Shoots</span>
            <p className="font-serif text-3xl font-black text-black mt-1">{defaultBookings.length}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gold-50 border-2 border-gold-600 flex items-center justify-center text-black">
            <Camera className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-neutral-300 shadow-md flex items-center justify-between">
          <div>
            <span className="text-[10.5px] uppercase font-mono font-bold text-neutral-600">Assigned Enquiries</span>
            <p className="font-serif text-3xl font-black text-black mt-1">4</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gold-50 border-2 border-gold-600 flex items-center justify-center text-black">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-neutral-300 shadow-md flex items-center justify-between">
          <div>
            <span className="text-[10.5px] uppercase font-mono font-bold text-neutral-600">Readiness Status</span>
            <p className="font-serif text-2xl font-black text-emerald-800 mt-1">Gear Ready</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border-2 border-emerald-600 flex items-center justify-center text-emerald-800">
            <CheckSquare className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Upcoming Shoots Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-black text-black">My Upcoming Shoot Schedule</h2>
          <Link to="/employee/projects" className="text-xs text-gold-800 font-black hover:underline">
            View All Projects →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {defaultBookings.map((bkg) => (
            <div key={bkg._id} className="bg-white rounded-2xl p-6 border-2 border-neutral-300 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <span className="font-mono text-xs text-gold-800 font-black">{bkg.bookingNumber}</span>
                <span className="px-2.5 py-1 rounded-full text-[10.5px] font-mono font-bold bg-gold-100 text-black border border-gold-600">
                  {bkg.bookingStatus}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-xl font-black text-black">{bkg.eventType}</h3>
                <div className="space-y-1 text-xs text-neutral-800 font-semibold mt-2">
                  <p className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1.5 text-gold-700" /> {new Date(bkg.eventDate).toLocaleDateString('en-US', { dateStyle: 'full' })}</p>
                  <p className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1.5 text-gold-700" /> {bkg.location?.venue}, {bkg.location?.city}</p>
                  <p className="flex items-center"><Users className="w-3.5 h-3.5 mr-1.5 text-gold-700" /> Client: {bkg.customer?.name} ({bkg.customer?.phone})</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/employee/projects"
                  className="inline-flex items-center text-xs font-black text-black hover:text-gold-800 uppercase tracking-wider"
                >
                  View Project Brief & Shot Checklist <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-gold-700" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
