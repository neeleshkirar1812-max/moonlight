import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import * as XLSX from 'xlsx';
import {
  CreditCard,
  DollarSign,
  Download,
  Search,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Calendar,
  Filter,
  Receipt,
  Building,
  Sparkles,
} from 'lucide-react';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'IN' | 'OUT'
  const [timeFilter, setTimeFilter] = useState('ALL'); // 'ALL' | 'MONTH' | 'QUARTER' | 'YEAR'
  const [search, setSearch] = useState('');
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    title: '',
    category: 'Equipment & Gear Rental',
    amount: '',
    recipient: '',
    paymentMethod: 'UPI',
    notes: '',
  });

  const { addToast } = useNotification();

  const fetchLedgerData = async () => {
    setLoading(true);
    try {
      const [pRes, sRes] = await Promise.allSettled([
        api.get('/payments'),
        api.get('/salary'),
      ]);

      let loadedPayments = pRes.status === 'fulfilled' ? pRes.value.data || [] : [];
      let loadedSalaries = sRes.status === 'fulfilled' ? sRes.value.data || [] : [];

      if (loadedPayments.length === 0) {
        loadedPayments = [
          {
            _id: 'pay-1',
            paymentNumber: 'PAY-2026-001',
            customer: { name: 'Aarav & Ananya Sharma' },
            booking: { bookingNumber: 'MLP-2026-9812' },
            amount: 300000,
            paymentType: 'ADVANCE',
            status: 'CAPTURED',
            paymentMethod: 'Razorpay UPI',
            createdAt: new Date('2026-08-10').toISOString(),
          },
          {
            _id: 'pay-2',
            paymentNumber: 'PAY-2026-002',
            customer: { name: 'Rohan & Sanjana Nair' },
            booking: { bookingNumber: 'MLP-2026-9815' },
            amount: 150000,
            paymentType: 'ADVANCE',
            status: 'CAPTURED',
            paymentMethod: 'Net Banking',
            createdAt: new Date('2026-08-15').toISOString(),
          },
          {
            _id: 'pay-3',
            paymentNumber: 'PAY-2026-003',
            customer: { name: 'Vikram & Meera Singhania' },
            booking: { bookingNumber: 'MLP-2026-9804' },
            amount: 250000,
            paymentType: 'FINAL',
            status: 'CAPTURED',
            paymentMethod: 'Razorpay Card',
            createdAt: new Date('2026-08-20').toISOString(),
          },
        ];
      }

      // Load operational expenses
      const savedExpenses = JSON.parse(localStorage.getItem('ml_expenses') || '[]');
      if (savedExpenses.length === 0) {
        const defaultExpenses = [
          {
            _id: 'exp-1',
            title: 'Arri Alexa Mini LF & Cooke Lens Rental (Maheshwar Shoot)',
            category: 'Equipment Rental',
            amount: 48000,
            recipient: 'Indore Cine Rentals Ltd.',
            paymentMethod: 'Bank Transfer',
            createdAt: new Date('2026-08-12').toISOString(),
          },
          {
            _id: 'exp-2',
            title: 'Crew Luxury Innova Crysta Travel & Fuel Allowance',
            category: 'Travel & Logistics',
            amount: 24500,
            recipient: 'Bhopal Royal Travels',
            paymentMethod: 'UPI',
            createdAt: new Date('2026-08-14').toISOString(),
          },
          {
            _id: 'exp-3',
            title: 'Annual Music Licensing & Soundstripe Master Sync Rights',
            category: 'Software & Royalties',
            amount: 18500,
            recipient: 'Musicbed Global Inc.',
            paymentMethod: 'Credit Card',
            createdAt: new Date('2026-08-05').toISOString(),
          },
        ];
        localStorage.setItem('ml_expenses', JSON.stringify(defaultExpenses));
        setExpenses(defaultExpenses);
      } else {
        setExpenses(savedExpenses);
      }

      setPayments(loadedPayments);
      setSalaries(loadedSalaries);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLedgerData();
  }, []);

  const handleCreateExpense = (e) => {
    e.preventDefault();
    const newExp = {
      _id: `exp-${Date.now()}`,
      ...expenseForm,
      amount: Number(expenseForm.amount),
      createdAt: new Date().toISOString(),
    };
    const updated = [newExp, ...expenses];
    setExpenses(updated);
    localStorage.setItem('ml_expenses', JSON.stringify(updated));
    addToast({
      title: 'Expense Recorded',
      message: `Outflow of ₹${newExp.amount.toLocaleString('en-IN')} added to ledger.`,
      type: 'success',
    });
    setExpenseModalOpen(false);
    setExpenseForm({
      title: '',
      category: 'Equipment & Gear Rental',
      amount: '',
      recipient: '',
      paymentMethod: 'UPI',
      notes: '',
    });
  };

  // Compile Master Unified Ledger Items
  const inEntries = payments
    .filter((p) => p.status === 'CAPTURED')
    .map((p) => ({
      _id: p._id,
      date: p.createdAt,
      ref: p.paymentNumber || 'PAY-REF',
      title: `Client Payment: ${p.customer?.name || 'Private Client'} (${p.booking?.bookingNumber || 'Shoot Booking'})`,
      category: 'Client Revenue (Money IN)',
      type: 'IN',
      amount: Number(p.amount) || 0,
      mode: p.paymentMethod || 'Razorpay Online',
      status: 'CAPTURED',
    }));

  const outPayrollEntries = salaries
    .filter((s) => s.paymentStatus === 'Paid')
    .map((s) => ({
      _id: s._id,
      date: s.paymentDate || s.createdAt,
      ref: s.slipNumber || 'SLIP-REF',
      title: `Crew Payroll: ${s.employeeName} (${s.designation})`,
      category: 'Staff Salary (Money OUT)',
      type: 'OUT',
      amount: Number(s.netPay) || 0,
      mode: s.paymentMethod || 'Bank Transfer',
      status: 'PAID',
    }));

  const outExpenseEntries = expenses.map((e) => ({
    _id: e._id,
    date: e.createdAt,
    ref: `EXP-${e._id.slice(-5)}`,
    title: `${e.title} (Payee: ${e.recipient})`,
    category: e.category || 'Production Expense',
    type: 'OUT',
    amount: Number(e.amount) || 0,
    mode: e.paymentMethod || 'UPI',
    status: 'PAID',
  }));

  const masterLedger = [...inEntries, ...outPayrollEntries, ...outExpenseEntries].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Financial Calculations
  const totalMoneyIn = inEntries.reduce((sum, item) => sum + item.amount, 0);
  const totalMoneyOut = outPayrollEntries.reduce((sum, item) => sum + item.amount, 0) + outExpenseEntries.reduce((sum, item) => sum + item.amount, 0);
  const netStudioBalance = totalMoneyIn - totalMoneyOut;
  const profitMarginPercent = totalMoneyIn > 0 ? Math.round((netStudioBalance / totalMoneyIn) * 100) : 0;

  // Filter items
  const filteredLedger = masterLedger.filter((item) => {
    if (activeTab === 'IN' && item.type !== 'IN') return false;
    if (activeTab === 'OUT' && item.type !== 'OUT') return false;

    const query = search.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.ref.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    return matchesSearch;
  });

  // Export to Excel (.xlsx)
  const handleExportLedgerExcel = () => {
    try {
      const rows = filteredLedger.map((row) => ({
        'Transaction Date': new Date(row.date).toLocaleDateString('en-IN'),
        'Reference Code': row.ref,
        'Description / Payee': row.title,
        Category: row.category,
        'Flow Type': row.type === 'IN' ? 'MONEY IN (CREDIT)' : 'MONEY OUT (DEBIT)',
        'Amount (INR)': row.amount,
        'Payment Mode': row.mode,
        Status: row.status,
      }));

      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Studio Ledger');
      XLSX.writeFile(workbook, `Moonlight_Production_Accounting_Ledger_${new Date().toISOString().slice(0, 10)}.xlsx`);
      addToast({
        title: 'Ledger Exported',
        message: 'Accounting ledger spreadsheet downloaded.',
        type: 'success',
      });
    } catch (err) {
      addToast({ title: 'Export Failed', message: err.message, type: 'error' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-gold-400 font-bold block">
            Executive Financial Console
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">
            Studio Accounting & Cash Flow Ledger
          </h1>
          <p className="text-neutral-400 text-xs font-light mt-1">
            Real-time tracking of studio Inflows (Client payments) vs Outflows (Crew payroll & shoot production expenses).
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={handleExportLedgerExcel}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs font-bold transition-all flex items-center justify-center min-h-[44px]"
          >
            <Download className="w-4 h-4 mr-1.5 text-gold-400" /> Export Excel (.xlsx)
          </button>

          <button
            onClick={() => setExpenseModalOpen(true)}
            className="px-4 sm:px-5 py-2.5 rounded-xl bg-gold-gradient text-black font-bold uppercase tracking-wider text-xs shadow-gold-subtle hover:brightness-110 transition-all flex items-center justify-center min-h-[44px]"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Record Expense (Outflow)
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Money IN */}
        <div className="bg-[#141418] p-6 rounded-2xl border border-white/10 shadow-lg space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-mono">
            <span className="flex items-center">
              <ArrowUpRight className="w-4 h-4 mr-1" /> MONEY IN (INFLOW)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
              {inEntries.length} Inflows
            </span>
          </div>
          <h3 className="font-serif text-3xl font-bold text-emerald-400">
            ₹{totalMoneyIn.toLocaleString('en-IN')}
          </h3>
          <p className="text-[11px] text-neutral-400 font-mono">
            Client advances, booking retainers & final bill clearances
          </p>
        </div>

        {/* Money OUT */}
        <div className="bg-[#141418] p-6 rounded-2xl border border-white/10 shadow-lg space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-rose-400 text-xs font-mono">
            <span className="flex items-center">
              <ArrowDownRight className="w-4 h-4 mr-1" /> MONEY OUT (OUTFLOW)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30">
              {outPayrollEntries.length + outExpenseEntries.length} Outflows
            </span>
          </div>
          <h3 className="font-serif text-3xl font-bold text-rose-400">
            ₹{totalMoneyOut.toLocaleString('en-IN')}
          </h3>
          <p className="text-[11px] text-neutral-400 font-mono">
            Crew salary payouts, gear rentals & shoot logistics
          </p>
        </div>

        {/* Net Studio Balance */}
        <div className="bg-[#141418] p-6 rounded-2xl border border-gold-500/40 shadow-2xl space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-gold-400 text-xs font-mono font-bold">
            <span className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" /> NET STUDIO PROFIT
            </span>
            <span className="text-[10.5px] px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40 font-bold">
              {profitMarginPercent}% Margin
            </span>
          </div>
          <h3 className="font-serif text-3xl font-bold text-gold-300">
            ₹{netStudioBalance.toLocaleString('en-IN')}
          </h3>
          <p className="text-[11px] text-neutral-400 font-mono">
            Retained earnings after all crew payouts and studio operational overheads
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          {[
            { id: 'ALL', label: 'All Transactions' },
            { id: 'IN', label: 'Money IN (Inflows)' },
            { id: 'OUT', label: 'Money OUT (Outflows)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gold-gradient text-black font-bold shadow-gold-subtle'
                  : 'bg-[#18181e] text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search reference, client, vendor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#18181e] border border-white/15 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-gold-400 font-mono"
          />
        </div>
      </div>

      {/* Unified Master Ledger Table */}
      {loading ? (
        <div className="h-64 rounded-2xl bg-[#141418] animate-pulse" />
      ) : filteredLedger.length === 0 ? (
        <div className="text-center py-20 bg-[#141418] rounded-3xl border border-white/10 space-y-3">
          <Receipt className="w-8 h-8 text-gold-400 mx-auto opacity-50" />
          <h3 className="font-serif text-xl text-white">No Ledger Transactions Found</h3>
          <p className="text-xs text-neutral-400">
            Switch filter tabs or record a new production expense.
          </p>
        </div>
      ) : (
        <div className="bg-[#141418] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto custom-scrollbar w-full">
            <table className="w-full min-w-[750px] text-left text-xs">
              <thead className="bg-[#181820] text-gold-400 uppercase font-mono text-[10.5px] border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Date</th>
                  <th className="py-3.5 px-4 font-bold">Ref No</th>
                  <th className="py-3.5 px-4 font-bold">Description / Counterparty</th>
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Type</th>
                  <th className="py-3.5 px-4 font-bold text-right">Amount (INR)</th>
                  <th className="py-3.5 px-4 font-bold">Mode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {filteredLedger.map((row) => {
                  const isIn = row.type === 'IN';
                  return (
                    <tr key={row._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 text-neutral-300">
                        {new Date(row.date).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      <td className="py-3.5 px-4 text-gold-400 font-bold">{row.ref}</td>

                      <td className="py-3.5 px-4 text-white font-sans font-medium">
                        {row.title}
                      </td>

                      <td className="py-3.5 px-4 text-neutral-400 text-[11px] font-sans">
                        {row.category}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                            isIn
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          }`}
                        >
                          {isIn ? 'MONEY IN' : 'MONEY OUT'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <span
                          className={`font-bold text-sm ${
                            isIn ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {isIn ? '+' : '-'}₹{row.amount.toLocaleString('en-IN')}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-neutral-400">{row.mode}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Record Expense Modal */}
      {expenseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141418] border border-gold-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-fade-in text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-rose-400 font-bold block">
                  Studio Cash Outflow
                </span>
                <h3 className="font-serif text-xl font-bold text-white">Record Production Expense</h3>
              </div>
              <button
                onClick={() => setExpenseModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateExpense} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-300 font-bold block mb-1 font-mono">Expense Purpose / Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arri Alexa Camera Rental / Hotel Stay for Crew"
                  value={expenseForm.title}
                  onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white font-mono focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-300 font-bold block mb-1 font-mono">Expense Category:</label>
                  <select
                    value={expenseForm.category}
                    onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white font-mono focus:border-gold-400 focus:outline-none"
                  >
                    <option value="Equipment & Gear Rental">Equipment & Gear Rental</option>
                    <option value="Travel & Logistics">Travel & Logistics</option>
                    <option value="Vendor / Freelancer Fee">Vendor / Freelancer Fee</option>
                    <option value="Music & Software Rights">Music & Software Rights</option>
                    <option value="Studio Utilities & Maintenance">Studio Utilities & Maintenance</option>
                    <option value="Client Hospitality">Client Hospitality</option>
                  </select>
                </div>

                <div>
                  <label className="text-neutral-300 font-bold block mb-1 font-mono">Amount (INR):</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 35000"
                    value={expenseForm.amount}
                    onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white font-mono focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-300 font-bold block mb-1 font-mono">Vendor / Payee Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CineEquip Indore"
                    value={expenseForm.recipient}
                    onChange={(e) => setExpenseForm({ ...expenseForm, recipient: e.target.value })}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white font-mono focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 font-bold block mb-1 font-mono">Payment Mode:</label>
                  <select
                    value={expenseForm.paymentMethod}
                    onChange={(e) => setExpenseForm({ ...expenseForm, paymentMethod: e.target.value })}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white font-mono focus:border-gold-400 focus:outline-none"
                  >
                    <option value="UPI">UPI Payment</option>
                    <option value="Bank Transfer">Direct Bank Transfer</option>
                    <option value="Credit Card">Corporate Credit Card</option>
                    <option value="Cash Voucher">Cash Voucher</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setExpenseModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-white/10 text-neutral-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-400 text-white font-bold uppercase tracking-wider text-xs shadow-lg"
                >
                  Record Outflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPayments;
