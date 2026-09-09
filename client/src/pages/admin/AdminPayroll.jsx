import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { generateSalarySlipPDF } from '../../utils/salarySlipPdfGenerator';
import {
  DollarSign,
  Download,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Users,
  CreditCard,
  Building,
  Calendar,
  Sparkles,
  ArrowUpRight,
  TrendingDown,
  Filter,
} from 'lucide-react';

const CREW_NAMES_MAP = {};
const DEFAULT_CREW_MEMBERS = [];
const DEFAULT_CREW_SLIPS = [];

const AdminPayroll = () => {
  const [slips, setSlips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('August 2026');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [payModalSlip, setPayModalSlip] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    paymentMethod: 'BANK_TRANSFER',
    transactionId: '',
  });

  const [form, setForm] = useState({
    employeeId: '',
    employeeName: '',
    employeeCode: '',
    designation: '',
    month: 'August 2026',
    basicPay: '45000',
    hraAllowances: '9000',
    shootBonus: '0',
    travelReimbursement: '0',
    taxDeduction: '0',
    providentFund: '0',
    advanceDeduction: '0',
    paymentMethod: 'BANK_TRANSFER',
    notes: '',
  });

  const { addToast } = useNotification();

  const fetchPayrollData = async () => {
    try {
      setLoading(true);

      // 1. Initial load from persistent local store
      let localEmps = [];
      try {
        const storedCrew = localStorage.getItem('ml_employees');
        if (storedCrew) localEmps = JSON.parse(storedCrew);
      } catch (e) {}

      let localSlips = [];
      try {
        const storedSlips = localStorage.getItem('ml_salaries');
        if (storedSlips) localSlips = JSON.parse(storedSlips);
      } catch (e) {}

      if (localEmps.length > 0) setEmployees(localEmps);
      if (localSlips.length > 0) setSlips(localSlips);

      // 2. Fetch from Backend
      const [sRes, eRes] = await Promise.allSettled([
        api.get(`/salary?month=${encodeURIComponent(selectedMonth)}`),
        api.get('/admin/employees'),
      ]);

      const loadedSlips = sRes.status === 'fulfilled'
        ? (Array.isArray(sRes.value) ? sRes.value : sRes.value?.data || [])
        : [];
      const loadedEmps = eRes.status === 'fulfilled'
        ? (Array.isArray(eRes.value) ? eRes.value : eRes.value?.data || [])
        : [];

      if (loadedSlips.length > 0) {
        setSlips(loadedSlips);
        localStorage.setItem('ml_salaries', JSON.stringify(loadedSlips));
      }
      if (loadedEmps.length > 0) {
        setEmployees(loadedEmps);
        localStorage.setItem('ml_employees', JSON.stringify(loadedEmps));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayrollData();
  }, [selectedMonth]);

  const handleOpenCreateModal = () => {
    if (!employees || employees.length === 0) {
      addToast('No crew members found. Please add crew members in "Shoot Crew & Team" first.', 'info');
      setForm({
        employeeId: '',
        employeeName: '',
        employeeCode: '',
        designation: '',
        month: selectedMonth || 'August 2026',
        basicPay: '45000',
        hraAllowances: '9000',
        shootBonus: '0',
        travelReimbursement: '0',
        taxDeduction: '0',
        providentFund: '0',
        advanceDeduction: '0',
        paymentMethod: 'BANK_TRANSFER',
        notes: '',
      });
      setCreateModalOpen(true);
      return;
    }

    const first = employees[0];
    const firstName = first.user?.name || first.name || 'Crew Member';
    const firstCode = first.employeeCode || 'EMP-001';
    const firstDesig = first.designation || 'Production Specialist';
    const basic = firstDesig.toLowerCase().includes('director') || firstDesig.toLowerCase().includes('lead') ? '55000' : '45000';
    const hra = String(Math.round(Number(basic) * 0.2));

    setForm({
      employeeId: first._id || first.employeeCode || '',
      employeeName: firstName,
      employeeCode: firstCode,
      designation: firstDesig,
      month: selectedMonth || 'August 2026',
      basicPay: basic,
      hraAllowances: hra,
      shootBonus: '0',
      travelReimbursement: '0',
      taxDeduction: '0',
      providentFund: '0',
      advanceDeduction: '0',
      paymentMethod: 'BANK_TRANSFER',
      notes: `Official monthly pay slip for ${firstName}.`,
    });
    setCreateModalOpen(true);
  };

  const handleCreateSlip = async (e) => {
    e.preventDefault();
    try {
      const selectedEmpObj = employees.find((e) => e._id === form.employeeId);
      const resolvedName =
        selectedEmpObj?.user?.name ||
        selectedEmpObj?.name ||
        form.employeeName ||
        'Production Crew Member';
      const resolvedCode =
        selectedEmpObj?.employeeCode ||
        form.employeeCode ||
        `EMP-MLP-${Date.now().toString().slice(-3)}`;
      const resolvedDesig =
        selectedEmpObj?.designation ||
        form.designation ||
        'Production Specialist';

      const payload = {
        ...form,
        employeeName: resolvedName,
        employeeCode: resolvedCode,
        designation: resolvedDesig,
        basicPay: Number(form.basicPay),
        hraAllowances: Number(form.hraAllowances),
        shootBonus: Number(form.shootBonus),
        travelReimbursement: Number(form.travelReimbursement),
        taxDeduction: Number(form.taxDeduction),
        providentFund: Number(form.providentFund),
        advanceDeduction: Number(form.advanceDeduction),
      };

      const res = await api.post('/salary', payload);
      const resData = res?.data || res;
      const newSlip = {
        _id: resData?._id || `slip-${Date.now()}`,
        ...payload,
        ...resData,
        employeeName: resData?.employeeName || resolvedName,
        employeeCode: resData?.employeeCode || resolvedCode,
        designation: resData?.designation || resolvedDesig,
      };

      setSlips([newSlip, ...slips]);
      addToast({
        title: 'Salary Slip Generated',
        message: `Official pay slip created for ${resolvedName}.`,
        type: 'success',
      });
      setCreateModalOpen(false);
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  const handleBulkGenerate = async () => {
    if (!window.confirm(`Generate monthly salary slips for all ${employees.length} employees for ${selectedMonth}?`)) {
      return;
    }
    try {
      await api.post('/salary/bulk', { month: selectedMonth });
      addToast({
        title: 'Bulk Payroll Generated',
        message: `Salary slips generated for all active employees for ${selectedMonth}.`,
        type: 'success',
      });
      fetchPayrollData();
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  const handleConfirmPayment = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/salary/${payModalSlip._id}/pay`, paymentForm);
      setSlips((prev) =>
        prev.map((s) =>
          s._id === payModalSlip._id
            ? {
                ...s,
                paymentStatus: 'Paid',
                paymentDate: new Date(),
                paymentMethod: paymentForm.paymentMethod,
                transactionId: paymentForm.transactionId || `TXN-MLP-${Date.now().toString().slice(-6)}`,
              }
            : s
        )
      );
      addToast({
        title: 'Salary Disbursed',
        message: `Salary marked as Paid for ${payModalSlip.employeeName}.`,
        type: 'success',
      });
      setPayModalSlip(null);
      setPaymentForm({ paymentMethod: 'BANK_TRANSFER', transactionId: '' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  // Metrics Calculations
  const totalPayroll = slips.reduce((sum, s) => sum + (Number(s.netPay) || 0), 0);
  const totalPaid = slips.filter((s) => s.paymentStatus === 'Paid').reduce((sum, s) => sum + (Number(s.netPay) || 0), 0);
  const totalPending = totalPayroll - totalPaid;

  const filteredSlips = slips.filter((s) => {
    const matchesStatus = statusFilter === 'ALL' || s.paymentStatus === statusFilter;
    const query = search.toLowerCase();
    const matchesSearch =
      (s.employeeName || '').toLowerCase().includes(query) ||
      (s.employeeCode || '').toLowerCase().includes(query) ||
      (s.designation || '').toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-gold-400 font-bold block">
            HR Module & Staff Compensation
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">
            Staff Payroll & Salary Slips
          </h1>
          <p className="text-neutral-400 text-xs font-light mt-1">
            Generate monthly pay slips with earnings & deductions breakdown, disburse salaries, and issue official PDFs.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-neutral-900 font-mono text-xs font-bold focus:border-amber-600 focus:outline-none min-h-[44px] shadow-sm"
          >
            <option value="August 2026">August 2026</option>
            <option value="July 2026">July 2026</option>
            <option value="June 2026">June 2026</option>
            <option value="May 2026">May 2026</option>
          </select>

          <button
            onClick={handleBulkGenerate}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-amber-50 border border-stone-300 text-neutral-900 font-bold text-xs font-mono transition-all flex items-center justify-center min-h-[44px] shadow-sm"
          >
            <Sparkles className="w-4 h-4 mr-1.5 text-amber-700" /> Bulk Generate All
          </button>

          <button
            onClick={handleOpenCreateModal}
            className="px-4 sm:px-5 py-2.5 rounded-xl bg-gold-gradient text-neutral-950 font-extrabold uppercase tracking-wider text-xs shadow-sm hover:brightness-105 transition-all flex items-center justify-center min-h-[44px]"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Create Salary Slip
          </button>
        </div>
      </div>

      {/* KPI Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-amber-900/15 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-600 text-xs font-mono">
            <span className="font-bold">Total Monthly Payroll</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
            ₹{totalPayroll.toLocaleString('en-IN')}
          </h3>
          <span className="text-[10.5px] text-neutral-500 font-mono block">
            {slips.length} Total Staff Slips for {selectedMonth}
          </span>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-amber-900/15 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-emerald-800 text-xs font-mono">
            <span className="font-bold">Salaries Disbursed (Paid)</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-700">
            ₹{totalPaid.toLocaleString('en-IN')}
          </h3>
          <span className="text-[10.5px] text-neutral-500 font-mono block">
            {slips.filter((s) => s.paymentStatus === 'Paid').length} Crew Members Cleared
          </span>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-amber-900/15 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-amber-900 text-xs font-mono">
            <span className="font-bold">Pending Payout</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-900">
            ₹{totalPending.toLocaleString('en-IN')}
          </h3>
          <span className="text-[10.5px] text-neutral-500 font-mono block">
            {slips.filter((s) => s.paymentStatus === 'Pending').length} Pending Bank Transfer
          </span>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {['ALL', 'Paid', 'Pending'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-2 rounded-full text-xs font-mono font-bold transition-all min-h-[38px] whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-gold-gradient text-neutral-950 font-extrabold shadow-sm'
                  : 'bg-white text-neutral-700 hover:text-neutral-950 border border-stone-300'
              }`}
            >
              {st === 'ALL' ? 'All Slips' : st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search employee code, name, designation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-stone-300 rounded-full pl-10 pr-4 py-2 text-xs text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-amber-600 font-mono shadow-sm"
          />
        </div>
      </div>

      {/* Salary Slips Table */}
      {loading ? (
        <div className="h-64 rounded-2xl bg-white border border-stone-200 animate-pulse" />
      ) : filteredSlips.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-amber-900/15 space-y-3 shadow-sm">
          <DollarSign className="w-8 h-8 text-amber-700 mx-auto opacity-70" />
          <h3 className="font-serif text-xl text-neutral-900 font-bold">No Salary Slips Found</h3>
          <p className="text-xs text-neutral-600">
            Click "Bulk Generate All" or "Create Salary Slip" to issue payslips for {selectedMonth}.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-amber-900/15 overflow-hidden shadow-sm">
          <div className="overflow-x-auto custom-scrollbar w-full">
            <table className="w-full min-w-[850px] text-left text-xs">
              <thead className="bg-stone-100 text-stone-700 uppercase font-mono text-[10.5px] border-b border-stone-200">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Employee</th>
                  <th className="py-3.5 px-4 font-bold">Designation</th>
                  <th className="py-3.5 px-4 font-bold">Basic Pay</th>
                  <th className="py-3.5 px-4 font-bold">Allowances</th>
                  <th className="py-3.5 px-4 font-bold">Deductions</th>
                  <th className="py-3.5 px-4 font-bold">Net Salary</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-mono">
                {filteredSlips.map((slip) => {
                  const isPaid = slip.paymentStatus === 'Paid';
                  return (
                    <tr key={slip._id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <strong className="text-neutral-900 block font-serif font-bold text-sm">
                          {slip.employeeName || slip.user?.name || slip.employee?.user?.name || slip.employee?.name || 'Production Crew Member'}
                        </strong>
                        <span className="text-[10px] text-amber-900 font-bold">{slip.employeeCode || slip.employee?.employeeCode || 'EMP-MLP'}</span>
                      </td>

                      <td className="py-3.5 px-4 text-neutral-700 font-sans">{slip.designation}</td>

                      <td className="py-3.5 px-4 text-neutral-900 font-bold">
                        ₹{(Number(slip.basicPay) || 0).toLocaleString('en-IN')}
                      </td>

                      <td className="py-3.5 px-4 text-emerald-700 font-bold">
                        +₹{((Number(slip.hraAllowances) || 0) + (Number(slip.shootBonus) || 0)).toLocaleString('en-IN')}
                      </td>

                      <td className="py-3.5 px-4 text-rose-700 font-bold">
                        -₹{(Number(slip.totalDeductions) || 0).toLocaleString('en-IN')}
                      </td>

                      <td className="py-3.5 px-4">
                        <strong className="text-amber-900 font-bold text-sm">
                          ₹{(Number(slip.netPay) || 0).toLocaleString('en-IN')}
                        </strong>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            isPaid
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : 'bg-amber-100 text-amber-900 border border-amber-300'
                          }`}
                        >
                          {isPaid ? '● Paid' : '○ Pending'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => generateSalarySlipPDF(slip)}
                            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-neutral-800 transition-all border border-stone-300 min-h-[36px] min-w-[36px] flex items-center justify-center"
                            title="Download PDF Salary Slip"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>

                          {!isPaid && (
                            <button
                              onClick={() => setPayModalSlip(slip)}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm min-h-[36px]"
                            >
                              Mark Paid
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE SALARY SLIP MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-amber-400 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 animate-fade-in text-neutral-900 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-serif text-xl font-bold text-neutral-900">Issue Monthly Salary Slip</h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-neutral-500 hover:text-neutral-900">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSlip} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-800 font-bold block mb-1 font-mono">Select Employee *</label>
                <select
                  required
                  value={form.employeeId}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const emp = employees.find((x) => x._id === selectedId || x.employeeCode === selectedId);
                    const empName = emp ? (emp.user?.name || emp.name || 'Crew Member') : '';
                    const empCode = emp ? (emp.employeeCode || emp.code || 'EMP') : '';
                    const desig = emp ? (emp.designation || 'Production Specialist') : '';
                    const basic = desig.toLowerCase().includes('director') || desig.toLowerCase().includes('lead') ? '55000' : '45000';
                    const hra = String(Math.round(Number(basic) * 0.2));

                    setForm({
                      ...form,
                      employeeId: selectedId,
                      employeeName: empName,
                      employeeCode: empCode,
                      designation: desig,
                      basicPay: basic,
                      hraAllowances: hra,
                    });
                  }}
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-neutral-900 font-mono text-xs focus:border-amber-600 focus:outline-none"
                >
                  <option value="" disabled>
                    {employees.length === 0
                      ? '-- No crew members found. Add crew in Shoot Crew & Team first --'
                      : '-- Select Production Crew Member --'}
                  </option>
                  {employees.map((emp) => {
                    const name = emp.user?.name || emp.name || 'Crew Member';
                    const desig = emp.designation || 'Production Specialist';
                    const code = emp.employeeCode || emp.code || 'EMP';
                    const val = emp._id || code;
                    return (
                      <option key={val} value={val}>
                        {name} — {desig} ({code})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-800 font-bold block mb-1 font-mono">Salary Month:</label>
                  <input
                    type="text"
                    required
                    value={form.month}
                    onChange={(e) => setForm({ ...form, month: e.target.value })}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-neutral-900 font-mono focus:border-amber-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-800 font-bold block mb-1 font-mono">Basic Salary (INR):</label>
                  <input
                    type="number"
                    required
                    value={form.basicPay}
                    onChange={(e) => setForm({ ...form, basicPay: e.target.value })}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-neutral-900 font-mono focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-800 font-bold block mb-1 font-mono">HRA Allowances:</label>
                  <input
                    type="number"
                    value={form.hraAllowances}
                    onChange={(e) => setForm({ ...form, hraAllowances: e.target.value })}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-neutral-900 font-mono focus:border-amber-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-800 font-bold block mb-1 font-mono">Shoot Bonus (INR):</label>
                  <input
                    type="number"
                    value={form.shootBonus}
                    onChange={(e) => setForm({ ...form, shootBonus: e.target.value })}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-neutral-900 font-mono focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-800 font-bold block mb-1 font-mono">Tax / TDS Deduction:</label>
                  <input
                    type="number"
                    value={form.taxDeduction}
                    onChange={(e) => setForm({ ...form, taxDeduction: e.target.value })}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-neutral-900 font-mono focus:border-amber-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-800 font-bold block mb-1 font-mono">PF Contribution:</label>
                  <input
                    type="number"
                    value={form.providentFund}
                    onChange={(e) => setForm({ ...form, providentFund: e.target.value })}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-neutral-900 font-mono focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Live Net Pay Preview */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-300 flex items-center justify-between font-mono">
                <span className="text-neutral-600 text-xs font-bold">Estimated Take-Home Net Pay:</span>
                <strong className="text-amber-900 text-base font-bold">
                  ₹{Math.max(
                    0,
                    (Number(form.basicPay) || 0) +
                      (Number(form.hraAllowances) || 0) +
                      (Number(form.shootBonus) || 0) +
                      (Number(form.travelReimbursement) || 0) -
                      ((Number(form.taxDeduction) || 0) +
                        (Number(form.providentFund) || 0) +
                        (Number(form.advanceDeduction) || 0))
                  ).toLocaleString('en-IN')}
                </strong>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-stone-300 text-neutral-700 hover:bg-stone-100 min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold uppercase tracking-wider text-xs shadow-sm hover:brightness-105 transition-all min-h-[44px]"
                >
                  Save & Issue Pay Slip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mark Salary Paid Modal */}
      {payModalSlip && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-amber-400 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-fade-in text-neutral-900">
            <h3 className="font-serif text-lg font-bold text-neutral-900">
              Disburse Salary: {payModalSlip.employeeName}
            </h3>
            <p className="text-xs text-neutral-600 font-mono">
              Net Amount: <strong className="text-amber-900 text-sm">₹{payModalSlip.netPay?.toLocaleString('en-IN')}</strong> ({payModalSlip.month})
            </p>

            <form onSubmit={handleConfirmPayment} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-800 font-bold block mb-1 font-mono">Disbursement Mode:</label>
                <select
                  value={paymentForm.paymentMethod}
                  onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-neutral-900 font-mono focus:border-amber-600 focus:outline-none"
                >
                  <option value="BANK_TRANSFER">Bank Transfer (NEFT / IMPS)</option>
                  <option value="UPI">UPI Payment</option>
                  <option value="CHEQUE">Studio Cheque</option>
                  <option value="CASH">Cash Voucher</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-800 font-bold block mb-1 font-mono">Bank UTR / Transaction ID:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UTR-HDFC-982104"
                  value={paymentForm.transactionId}
                  onChange={(e) => setPaymentForm({ ...paymentForm, transactionId: e.target.value })}
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-neutral-900 font-mono focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setPayModalSlip(null)}
                  className="px-4 py-2 rounded-full border border-stone-300 text-neutral-700 hover:bg-stone-100 min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold uppercase tracking-wider text-xs shadow-sm min-h-[44px]"
                >
                  Confirm Payout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPayroll;
