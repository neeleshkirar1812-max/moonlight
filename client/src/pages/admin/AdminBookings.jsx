import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import * as XLSX from 'xlsx';
import { generateQuotationPDF } from '../../utils/quotationPdfGenerator';
import { generateLuxuryInvoicePDF } from '../../utils/invoicePdfGenerator';
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
  X,
} from 'lucide-react';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [assignModalBooking, setAssignModalBooking] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [stageModalBooking, setStageModalBooking] = useState(null);
  const [selectedStage, setSelectedStage] = useState('CONFIRMED');
  const [stageNote, setStageNote] = useState('');
  const { addToast } = useNotification();

  const handleUpdateStage = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/bookings/${stageModalBooking._id}/stage`, {
        stage: selectedStage,
        note: stageNote,
      });
      addToast({
        title: 'Order Stage Updated',
        message: `Booking ${stageModalBooking.bookingNumber} moved to ${selectedStage.replace(/_/g, ' ')}.`,
        type: 'success',
      });
      setStageModalBooking(null);
      setStageNote('');
      fetchData();
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

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
    <div className="space-y-8 animate-fade-in text-neutral-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block">
            Shoot Operations & Financials
          </span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Confirmed Bookings & Auto-Excel</h1>
          <p className="text-xs text-neutral-600 mt-1">
            Auto-compiles verified wedding productions, crew assignments, and payment statuses into Excel.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Export Bookings to Excel */}
          <button
            onClick={handleExportExcel}
            className="px-5 py-2.5 rounded-full bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white border border-emerald-300 font-bold text-xs uppercase tracking-wider transition-all flex items-center shadow-sm shrink-0"
          >
            <Download className="w-4 h-4 mr-2" /> Export Bookings to Excel (.xlsx)
          </button>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-amber-900/10">
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
          {['ALL', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-gold-gradient text-neutral-950 font-bold shadow-gold-subtle'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-amber-900/15'
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
            className="w-full bg-white border border-amber-900/20 rounded-full pl-9 pr-4 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
          />
        </div>
      </div>

      {/* Bookings Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-64 rounded-2xl bg-stone-100 animate-pulse border border-stone-200" />
          ))}
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-amber-900/15 space-y-3 shadow-sm">
          <Calendar className="w-8 h-8 text-amber-600 mx-auto opacity-70" />
          <h3 className="font-serif text-xl text-neutral-900 font-bold">No Confirmed Bookings Found</h3>
          <p className="text-xs text-neutral-500">Convert enquiries from the pipeline to generate confirmed bookings.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl p-6 border border-amber-900/15 hover:border-amber-500/40 shadow-sm hover:shadow-md transition-all space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    {booking.bookingNumber}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                      {(booking.orderStage || 'CONFIRMED').replace(/_/g, ' ')}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold">
                      {booking.bookingStatus}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-neutral-900">
                    {booking.customer?.name || 'Private Client'}
                  </h3>
                  <p className="text-xs text-amber-700 font-medium">{booking.eventType}</p>
                </div>

                <div className="space-y-2 text-xs text-neutral-600 font-mono">
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-2 text-amber-600" />
                    <span>{new Date(booking.eventDate).toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-2 text-amber-600" />
                    <span>{booking.location?.city} • {booking.location?.venue || 'Palace Venue'}</span>
                  </div>
                </div>

                {/* Financial Breakdown */}
                <div className="p-3.5 bg-stone-50 rounded-xl border border-amber-900/10 space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>Total Package:</span>
                    <strong className="text-neutral-900">₹{booking.totalAmount?.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>Advance Received:</span>
                    <strong>₹{booking.advanceAmount?.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between text-amber-900 pt-1 border-t border-stone-200">
                    <span>Balance Remaining:</span>
                    <strong className="font-bold text-amber-900">₹{booking.remainingAmount?.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                {/* Assigned Crew List */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block tracking-wider">
                    Assigned Production Crew
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {booking.assignedEmployees?.length > 0 ? (
                      booking.assignedEmployees.map((emp) => (
                        <span
                          key={emp._id || emp}
                          className="px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200 text-[11px] text-neutral-800 font-medium"
                        >
                          👤 {emp.name || emp}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-neutral-400 italic">No crew assigned yet.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-3 border-t border-amber-900/10 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setStageModalBooking(booking);
                      setSelectedStage(booking.orderStage || 'CONFIRMED');
                      setStageNote('');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs uppercase tracking-wider transition-all flex items-center shadow-sm"
                  >
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-amber-700" /> Update Stage
                  </button>
                  <button
                    onClick={() => {
                      setAssignModalBooking(booking);
                      setSelectedEmployees(booking.assignedEmployees?.map((e) => e._id || e) || []);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-neutral-800 font-bold text-xs uppercase tracking-wider transition-all flex items-center shadow-sm"
                  >
                    <UserPlus className="w-3.5 h-3.5 mr-1.5 text-neutral-600" /> Assign Crew
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => generateQuotationPDF(booking)}
                    className="px-2.5 py-1.5 rounded-xl bg-stone-50 hover:bg-amber-50 text-amber-900 border border-amber-300/80 font-bold text-[11px] font-mono transition-all flex items-center shadow-sm"
                    title="Download Official Quotation Proposal PDF"
                  >
                    <Download className="w-3 h-3 mr-1 text-amber-700" /> Quotation
                  </button>
                  <button
                    onClick={() => generateLuxuryInvoicePDF({
                      ...booking,
                      invoiceNumber: booking.bookingNumber ? `INV-${booking.bookingNumber}` : 'INV-2026-001',
                      items: [
                        {
                          description: `${booking.eventType} — Comprehensive Wedding Cinema & Photography Services`,
                          quantity: 1,
                          unitPrice: booking.totalAmount || 850000,
                          total: booking.totalAmount || 850000,
                        },
                      ],
                      subtotal: booking.totalAmount || 850000,
                      totalAmount: Math.round((booking.totalAmount || 850000) * 1.18),
                      taxRate: 18,
                      taxAmount: Math.round((booking.totalAmount || 850000) * 0.18),
                      paidAmount: booking.advanceAmount || 0,
                      remainingBalance: booking.remainingAmount || 0,
                      status: booking.bookingStatus || 'CONFIRMED',
                    })}
                    className="px-2.5 py-1.5 rounded-xl bg-gold-gradient text-neutral-950 font-bold text-[11px] font-mono transition-all flex items-center shadow-sm hover:brightness-105"
                    title="Download Signed Tax Invoice PDF"
                  >
                    <FileText className="w-3 h-3 mr-1" /> Invoice
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Crew Assignment Modal */}
      {assignModalBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-amber-900/20 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-fade-in">
            <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
              <h3 className="font-serif text-lg font-bold text-neutral-900">
                Assign Crew: {assignModalBooking.bookingNumber}
              </h3>
              <button
                onClick={() => setAssignModalBooking(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-neutral-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAssignCrew} className="space-y-4 text-xs">
              <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                {employees.map((emp) => {
                  const empUserId = emp.user?._id || emp.user || emp._id;
                  const isChecked = selectedEmployees.includes(empUserId);
                  return (
                    <label
                      key={emp._id}
                      className="flex items-center space-x-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer hover:bg-amber-50/50 transition-colors"
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
                        className="accent-amber-600 w-4 h-4 rounded"
                      />
                      <div>
                        <strong className="text-neutral-900 block">{emp.user?.name || emp.name}</strong>
                        <span className="text-[10px] text-amber-700 font-mono">{emp.designation}</span>
                      </div>
                    </label>
                  );
                })}
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-amber-900/10">
                <button
                  type="button"
                  onClick={() => setAssignModalBooking(null)}
                  className="px-4 py-2 rounded-full border border-stone-300 text-neutral-600 hover:text-neutral-900 hover:bg-stone-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-gold-gradient text-neutral-950 font-bold uppercase tracking-wider text-xs shadow-gold-subtle hover:scale-105 transition-all"
                >
                  Save Crew
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Stage Tracker & Update Modal */}
      {stageModalBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-amber-900/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-fade-in text-neutral-900 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-700 font-bold block">
                  Order Tracking System
                </span>
                <h3 className="font-serif text-lg font-bold text-neutral-900">
                  Update Stage: {stageModalBooking.bookingNumber}
                </h3>
              </div>
              <button
                onClick={() => setStageModalBooking(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-neutral-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateStage} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-700 font-bold block mb-1.5 font-mono">
                  Select Production Stage:
                </label>
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-neutral-900 font-mono text-xs focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                >
                  <option value="ENQUIRY_RECEIVED">1. Enquiry Received (Reviewing Date)</option>
                  <option value="QUOTATION_SENT">2. Quotation Sent (Awaiting Client)</option>
                  <option value="ADVANCE_PAID">3. Advance Paid (Retainer Received)</option>
                  <option value="CONFIRMED">4. Confirmed (Dates Locked)</option>
                  <option value="SHOOT_SCHEDULED">5. Shoot Scheduled (Call-Sheets & Gear Prepped)</option>
                  <option value="SHOOT_COMPLETED">6. Shoot Completed (Master Footage Ingested)</option>
                  <option value="EDITING">7. Editing / Post-Production (Color Grading & Audio)</option>
                  <option value="DELIVERED">8. Delivered (Private Gallery & 4K Master Dispatched)</option>
                  <option value="CLOSED">9. Closed (Order Completed)</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-700 font-bold block mb-1.5 font-mono">
                  Stage Update Note / Reason (Visible in Customer Timeline):
                </label>
                <textarea
                  rows="3"
                  value={stageNote}
                  onChange={(e) => setStageNote(e.target.value)}
                  placeholder="e.g. Master footage ingested to editing suite. Color grading begun on DaVinci Resolve."
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-neutral-900 text-xs focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              {/* Past Stage Audit History */}
              {stageModalBooking.stageHistory?.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-stone-200">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 font-bold block">
                    Stage Audit Trail History:
                  </span>
                  <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-1">
                    {stageModalBooking.stageHistory
                      .slice()
                      .reverse()
                      .map((h, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <strong className="text-amber-800 font-mono">
                              {h.stage?.replace(/_/g, ' ')}
                            </strong>
                            <span className="text-[10px] text-neutral-500 font-mono">
                              {new Date(h.timestamp).toLocaleString('en-IN', {
                                dateStyle: 'short',
                                timeStyle: 'short',
                              })}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-700 font-light">{h.note || 'No notes'}</p>
                          <span className="text-[9.5px] text-neutral-500 font-mono block">
                            Updated by: {h.updaterName || 'Staff'}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setStageModalBooking(null)}
                  className="px-4 py-2 rounded-full border border-stone-300 text-neutral-600 hover:text-neutral-900 hover:bg-stone-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-bold uppercase tracking-wider text-xs shadow-gold-subtle hover:scale-105 transition-all"
                >
                  Save Stage & Notify Client
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
