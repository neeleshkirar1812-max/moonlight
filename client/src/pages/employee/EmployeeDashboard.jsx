import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';
import { generateSalarySlipPDF } from '../../utils/salarySlipPdfGenerator';
import {
  Calendar,
  CheckSquare,
  Clock,
  MapPin,
  Users,
  Camera,
  Sparkles,
  ArrowRight,
  Download,
  DollarSign,
  FileText,
  CheckCircle2,
} from 'lucide-react';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [assignedBookings, setAssignedBookings] = useState([]);
  const [salarySlips, setSalarySlips] = useState([]);
  const [activeTab, setActiveTab] = useState('shoots'); // 'shoots' | 'slips'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const [bRes, sRes] = await Promise.allSettled([
          api.get('/bookings'),
          api.get('/salary'),
        ]);
        if (bRes.status === 'fulfilled') {
          const bData = Array.isArray(bRes.value) ? bRes.value : bRes.value?.data || [];
          setAssignedBookings(bData);
        }
        if (sRes.status === 'fulfilled') {
          const sData = Array.isArray(sRes.value) ? sRes.value : sRes.value?.data || [];
          setSalarySlips(sData);
        }
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
    <div className="space-y-8 animate-fade-in text-neutral-900">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 border border-amber-900/15 bg-white shadow-md">
        <div className="relative z-10 space-y-2">
          <span className="text-xs uppercase font-mono tracking-widest text-amber-800 font-bold block">
            Production & Cinema Crew Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
            Hello, {user?.name || 'Aman Pawar'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-normal">
            You have <strong className="text-amber-900 font-bold">{defaultBookings.length} active wedding shoots</strong> assigned to your schedule.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-amber-900/15 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10.5px] uppercase font-mono text-neutral-500 font-bold">Assigned Shoots</span>
            <p className="font-serif text-3xl font-bold text-neutral-900 mt-1">{defaultBookings.length}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-800 shadow-sm">
            <Camera className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-amber-900/15 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10.5px] uppercase font-mono text-neutral-500 font-bold">Assigned Enquiries</span>
            <p className="font-serif text-3xl font-bold text-neutral-900 mt-1">4</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-800 shadow-sm">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-amber-900/15 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10.5px] uppercase font-mono text-neutral-500 font-bold">Readiness Status</span>
            <p className="font-serif text-2xl font-bold text-emerald-700 mt-1">Gear Ready</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-sm">
            <CheckSquare className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center space-x-3 border-b border-neutral-200 pb-3">
        <button
          onClick={() => setActiveTab('shoots')}
          className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all flex items-center ${
            activeTab === 'shoots'
              ? 'bg-gold-gradient text-neutral-950 shadow-sm font-extrabold'
              : 'bg-white text-neutral-700 hover:text-neutral-950 border border-neutral-300'
          }`}
        >
          <Camera className="w-3.5 h-3.5 mr-1.5" /> Assigned Shoots ({defaultBookings.length})
        </button>

        <button
          onClick={() => setActiveTab('slips')}
          className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all flex items-center ${
            activeTab === 'slips'
              ? 'bg-gold-gradient text-neutral-950 shadow-sm font-extrabold'
              : 'bg-white text-neutral-700 hover:text-neutral-950 border border-neutral-300'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5 mr-1.5" /> My Salary Slips ({salarySlips.length || 1})
        </button>
      </div>

      {/* Tab 1: Assigned Shoots */}
      {activeTab === 'shoots' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-neutral-900">Upcoming Wedding Shoots</h2>
            <Link to="/employee/projects" className="text-xs text-amber-800 font-bold hover:underline">
              View All Projects →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {defaultBookings.map((bkg) => (
              <div
                key={bkg._id}
                className="bg-white rounded-2xl p-6 border border-amber-900/15 shadow-sm space-y-4 hover:border-amber-600/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <span className="font-mono text-xs text-amber-800 font-bold">
                      {bkg.bookingNumber}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10.5px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-300">
                      Stage: {(bkg.orderStage || 'SHOOT_SCHEDULED').replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-neutral-900">{bkg.eventType}</h3>
                    <div className="space-y-1.5 text-xs text-neutral-600 font-normal mt-2">
                      <p className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-amber-700" />
                        {new Date(bkg.eventDate).toLocaleDateString('en-US', { dateStyle: 'full' })}
                      </p>
                      <p className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-amber-700" />
                        {bkg.location?.venue}, {bkg.location?.city}
                      </p>
                      <p className="flex items-center">
                        <Users className="w-3.5 h-3.5 mr-1.5 text-amber-700" />
                        Client: {bkg.customer?.name} ({bkg.customer?.phone})
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                  <Link
                    to="/employee/projects"
                    className="inline-flex items-center text-xs font-bold text-amber-800 hover:text-amber-950 uppercase tracking-wider"
                  >
                    Shot Checklist <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>

                  {/* Stage Fast-Actions */}
                  {bkg.orderStage !== 'SHOOT_COMPLETED' && bkg.orderStage !== 'EDITING' && (
                    <button
                      onClick={async () => {
                        try {
                          await api.patch(`/bookings/${bkg._id}/stage`, {
                            stage: 'SHOOT_COMPLETED',
                            note: `Shoot successfully wrapped by crew (${user?.name}).`,
                          });
                          alert('Shoot marked as Completed! Master footage status updated.');
                          window.location.reload();
                        } catch (e) {
                          alert(e.message);
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 text-[11px] font-mono font-bold hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                    >
                      ✓ Mark Shoot Done
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: My Monthly Salary Slips */}
      {activeTab === 'slips' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-neutral-900">My Monthly Pay Slips</h2>
              <p className="text-neutral-600 text-xs font-normal">
                Official compensation slips disbursed by Moonlight Production HR atelier.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-amber-900/15 overflow-hidden shadow-sm">
            <div className="overflow-x-auto custom-scrollbar w-full">
              <table className="w-full min-w-[700px] text-left text-xs">
                <thead className="bg-amber-50/70 text-amber-900 uppercase font-mono text-[10.5px] border-b border-amber-900/15">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">Month</th>
                    <th className="py-3.5 px-4 font-bold">Slip No</th>
                    <th className="py-3.5 px-4 font-bold">Basic Pay</th>
                    <th className="py-3.5 px-4 font-bold">Allowances</th>
                    <th className="py-3.5 px-4 font-bold">Net Salary</th>
                    <th className="py-3.5 px-4 font-bold">Status</th>
                    <th className="py-3.5 px-4 font-bold text-right">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 font-mono">
                  {(salarySlips.length > 0
                    ? salarySlips
                    : [
                        {
                          _id: 'sample-slip-1',
                          employeeName: user?.name || 'Aman Pawar',
                          employeeCode: 'EMP-MLP-001',
                          designation: 'Lead Cinematographer & Film Director',
                          month: 'August 2026',
                          year: 2026,
                          slipNumber: 'SLIP-202608-AMA-101',
                          basicPay: 55000,
                          hraAllowances: 11000,
                          shootBonus: 5000,
                          travelReimbursement: 2500,
                          grossPay: 73500,
                          taxDeduction: 2500,
                          providentFund: 1800,
                          totalDeductions: 4300,
                          netPay: 69200,
                          paymentStatus: 'Paid',
                          paymentDate: new Date('2026-08-01'),
                          paymentMethod: 'BANK_TRANSFER',
                          transactionId: 'UTR-HDFC-9821040',
                        },
                      ]
                  ).map((slip) => (
                    <tr key={slip._id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-neutral-900">{slip.month}</td>
                      <td className="py-3.5 px-4 text-amber-800 font-bold">{slip.slipNumber}</td>
                      <td className="py-3.5 px-4 text-neutral-800">
                        ₹{(Number(slip.basicPay) || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 text-emerald-700">
                        +₹{(Number(slip.hraAllowances || 0) + Number(slip.shootBonus || 0)).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4">
                        <strong className="text-amber-900 font-bold text-sm">
                          ₹{(Number(slip.netPay) || 0).toLocaleString('en-IN')}
                        </strong>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                            slip.paymentStatus === 'Paid'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          {slip.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() =>
                            generateSalarySlipPDF({
                              ...slip,
                              employeeName: slip.employeeName || slip.user?.name || user?.name || 'Production Crew Member',
                              employeeCode: slip.employeeCode || 'EMP-MLP-001',
                              designation: slip.designation || 'Production Specialist',
                            })
                          }
                          className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[11px] inline-flex items-center transition-all shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5 mr-1" /> Pay Slip PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
