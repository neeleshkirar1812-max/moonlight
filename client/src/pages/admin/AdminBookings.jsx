import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import * as XLSX from 'xlsx';
import {
  Calendar,
  Users,
  MapPin,
  CreditCard,
  CheckCircle2,
  UserPlus,
  FileText,
  Download,
  Search,
  Clock,
  Sparkles,
} from 'lucide-react';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [assignModalBooking, setAssignModalBooking] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const { addToast } = useNotification();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bRes, empRes] = await Promise.allSettled([
        api.get('/bookings'),
        api.get('/admin/employees'),
      ]);
      if (bRes.status === 'fulfilled') setBookings(bRes.value.data || []);
      if (empRes.status === 'fulfilled') setEmployees(empRes.value.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssignCrew = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/bookings/${assignModalBooking._id}/assign`, {
        employeeIds: selectedEmployees,
      });
      addToast({ title: 'Crew Assigned', message: 'Team members assigned to shoot.', type: 'success' });
      setAssignModalBooking(null);
      fetchData();
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  // Export Confirmed Bookings directly to Excel (.xlsx)
  const handleExportExcel = () => {
    try {
      const rows = filteredBookings.map((bkg) => ({
        'Booking Number': bkg.bookingNumber || '',
        'Client Full Name': bkg.customer?.name || 'Valued Client',
        'Client Email': bkg.customer?.email || '',
        'Client Phone': bkg.customer?.phone || '',
        'Event Type': bkg.eventType || '',
        'Event Date': bkg.eventDate ? new Date(bkg.eventDate).toLocaleDateString('en-IN') : '',
        'City & Venue': `${bkg.location?.city || ''}${bkg.location?.venue ? ' - ' + bkg.location.venue : ''}`,
        'Package / Deliverables': (bkg.services || []).join(', ') || bkg.packageSelected || 'Heritage Wedding Archive',
        'Total Amount (INR)': Number(bkg.totalAmount || 0),
        'Advance Received (INR)': Number(bkg.advanceAmount || 0),
        'Balance Due (INR)': Number(bkg.remainingAmount || 0),
        'Payment Status': bkg.paymentStatus || 'UNPAID',
        'Booking Status': bkg.bookingStatus || 'CONFIRMED',
        'Assigned Crew': (bkg.assignedEmployees || []).map((e) => e.name || e).join(', ') || 'Pending Assignment',
        'Booking Created Date': bkg.createdAt ? new Date(bkg.createdAt).toLocaleDateString('en-IN') : '',
      }));

      const worksheet = XLSX.utils.json_to_sheet(rows);
      worksheet['!cols'] = [
        { wch: 18 },
        { wch: 25 },
        { wch: 28 },
        { wch: 18 },
        { wch: 22 },
        { wch: 14 },
        { wch: 25 },
        { wch: 32 },
        { wch: 18 },
        { wch: 20 },
        { wch: 18 },
        { wch: 15 },
        { wch: 16 },
        { wch: 30 },
        { wch: 18 },
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Confirmed Bookings');
      XLSX.writeFile(workbook, `Moonlight_Confirmed_Bookings_${new Date().toISOString().split('T')[0]}.xlsx`);

      addToast({
        title: 'Bookings Excel Sheet Exported',
        message: `${rows.length} Confirmed Wedding Bookings saved to Excel (.xlsx) successfully!`,
        type: 'success',
      });
    } catch (e) {
      addToast({ title: 'Export Error', message: e.message, type: 'error' });
    }
  };

  const filteredBookings = bookings.filter((bkg) => {
    if (statusFilter !== 'ALL' && bkg.bookingStatus !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const num = (bkg.bookingNumber || '').toLowerCase();
      const name = (bkg.customer?.name || '').toLowerCase();
      const email = (bkg.customer?.email || '').toLowerCase();
      const city = (bkg.location?.city || '').toLowerCase();
      return num.includes(q) || name.includes(q) || email.includes(q) || city.includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
            Shoot Operations & Financials
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Confirmed Bookings & Auto-Excel</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Auto-compiles verified wedding productions, crew assignments, and payment statuses into Excel.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Export Bookings to Excel */}
          <button
            onClick={handleExportExcel}
            className="px-5 py-2.5 rounded-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-black border border-emerald-500/40 font-bold text-xs uppercase tracking-wider transition-all flex items-center shadow-lg shrink-0"
          >
            <Download className="w-4 h-4 mr-2" /> Export Bookings to Excel (.xlsx)
          </button>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
          {['ALL', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-gold-gradient text-black font-bold shadow-gold-subtle'
                  : 'bg-obsidian-300 text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search bookings, couples, venue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-obsidian-300 border border-white/15 rounded-full pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
          />
        </div>
      </div>

      {/* Bookings Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-64 rounded-2xl bg-obsidian-400 animate-pulse" />
          ))}
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="text-center py-20 bg-obsidian-400 rounded-3xl border border-white/10 space-y-3">
          <Calendar className="w-8 h-8 text-gold-400 mx-auto opacity-50" />
          <h3 className="font-serif text-xl text-white">No Confirmed Bookings Found</h3>
          <p className="text-xs text-neutral-400">Convert enquiries from the pipeline to generate confirmed bookings.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="luxury-card rounded-2xl p-6 border border-white/10 hover:border-gold-500/30 transition-all space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-gold-300">
                    {booking.bookingNumber}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {booking.bookingStatus}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {booking.customer?.name || 'Private Client'}
                  </h3>
                  <p className="text-xs text-gold-400 font-medium">{booking.eventType}</p>
                </div>

                <div className="space-y-2 text-xs text-neutral-300 font-mono">
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-2 text-gold-400" />
                    <span>{new Date(booking.eventDate).toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-2 text-gold-400" />
                    <span>{booking.location?.city} • {booking.location?.venue || 'Palace Venue'}</span>
                  </div>
                </div>

                {/* Financial Breakdown */}
                <div className="p-3.5 bg-obsidian-500/80 rounded-xl border border-white/5 space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>Total Package:</span>
                    <strong className="text-white">₹{booking.totalAmount?.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>Advance Received:</span>
                    <strong>₹{booking.advanceAmount?.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between text-gold-300 pt-1 border-t border-white/5">
                    <span>Balance Remaining:</span>
                    <strong className="font-bold">₹{booking.remainingAmount?.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                {/* Assigned Crew List */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                    Assigned Production Crew
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {booking.assignedEmployees?.length > 0 ? (
                      booking.assignedEmployees.map((emp) => (
                        <span
                          key={emp._id || emp}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-neutral-200"
                        >
                          👤 {emp.name || emp}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-neutral-500 italic">No crew assigned yet.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Assign Crew Action Button */}
              <div className="pt-3 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => {
                    setAssignModalBooking(booking);
                    setSelectedEmployees(booking.assignedEmployees?.map((e) => e._id || e) || []);
                  }}
                  className="px-4 py-2 rounded-xl bg-obsidian-300 hover:bg-gold-500 hover:text-black border border-white/10 text-gold-300 font-bold text-xs uppercase tracking-wider transition-all flex items-center"
                >
                  <UserPlus className="w-3.5 h-3.5 mr-1.5" /> Assign Crew
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Crew Assignment Modal */}
      {assignModalBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-obsidian-400 border border-gold-500/40 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-fade-in">
            <h3 className="font-serif text-lg font-bold text-white">
              Assign Crew: {assignModalBooking.bookingNumber}
            </h3>

            <form onSubmit={handleAssignCrew} className="space-y-4 text-xs">
              <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                {employees.map((emp) => {
                  const empUserId = emp.user?._id || emp.user || emp._id;
                  const isChecked = selectedEmployees.includes(empUserId);
                  return (
                    <label
                      key={emp._id}
                      className="flex items-center space-x-3 p-2.5 rounded-xl bg-obsidian-500 border border-white/5 cursor-pointer hover:bg-white/5"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedEmployees([...selectedEmployees, empUserId]);
                          } else {
                            setSelectedEmployees(selectedEmployees.filter((id) => id !== empUserId));
                          }
                        }}
                        className="accent-gold-500 w-4 h-4"
                      />
                      <div>
                        <strong className="text-white block">{emp.user?.name || emp.name}</strong>
                        <span className="text-[10px] text-gold-400 font-mono">{emp.designation}</span>
                      </div>
                    </label>
                  );
                })}
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setAssignModalBooking(null)}
                  className="px-4 py-2 rounded-full border border-white/10 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-gold-gradient text-black font-bold uppercase tracking-wider text-xs shadow-gold-subtle"
                >
                  Save Crew
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
