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

const CREW_NAMES_MAP = {
  'EMP-MLP-001': 'Aman Pawar',
  'EMP-MLP-002': 'Bunny Singh',
  'EMP-MLP-003': 'Chinnu',
  'EMP-MLP-004': 'Rohit Manekar',
  'EMP-MLP-005': 'Sumit',
  'EMP-MLP-006': 'Tarun Rathore',
  'EMP-MLP-007': 'Santosh Rathore',
  'EMP-MLP-008': 'Lucky',
  'EMP-MLP-009': 'Priyanshu',
};

const DEFAULT_CREW_MEMBERS = [
  { _id: 'emp-1', name: 'Aman Pawar', employeeCode: 'EMP-MLP-001', designation: 'Lead Cinematographer & Film Director', user: { name: 'Aman Pawar' } },
  { _id: 'emp-2', name: 'Bunny Singh', employeeCode: 'EMP-MLP-002', designation: 'Senior Candid Master & Portraiture', user: { name: 'Bunny Singh' } },
  { _id: 'emp-3', name: 'Chinnu', employeeCode: 'EMP-MLP-003', designation: '4K Commercial Drone Cinematographer', user: { name: 'Chinnu' } },
  { _id: 'emp-4', name: 'Rohit Manekar', employeeCode: 'EMP-MLP-004', designation: 'Senior 4K Colorist & Film Editor', user: { name: 'Rohit Manekar' } },
  { _id: 'emp-5', name: 'Sumit', employeeCode: 'EMP-MLP-005', designation: 'Gimbal Operator & 2nd Camera Master', user: { name: 'Sumit' } },
  { _id: 'emp-6', name: 'Tarun Rathore', employeeCode: 'EMP-MLP-006', designation: 'Lighting Director & Technical Lead', user: { name: 'Tarun Rathore' } },
  { _id: 'emp-7', name: 'Santosh Rathore', employeeCode: 'EMP-MLP-007', designation: 'Audio & Sound Design Recordist', user: { name: 'Santosh Rathore' } },
  { _id: 'emp-8', name: 'Lucky', employeeCode: 'EMP-MLP-008', designation: 'Post-Production Editor & Reels Specialist', user: { name: 'Lucky' } },
  { _id: 'emp-9', name: 'Priyanshu', employeeCode: 'EMP-MLP-009', designation: 'Shoot Logistics & Production Lead', user: { name: 'Priyanshu' } },
];

const DEFAULT_CREW_SLIPS = [
  {
    _id: 'slip-1',
    slipNumber: 'SLIP-202608-AMA-101',
    employeeName: 'Aman Pawar',
    employeeCode: 'EMP-MLP-001',
    designation: 'Lead Cinematographer & Film Director',
    month: 'August 2026',
    year: 2026,
    basicPay: 55000,
    hraAllowances: 11000,
    shootBonus: 5000,
    travelReimbursement: 2500,
    grossPay: 73500,
    taxDeduction: 2000,
    providentFund: 1500,
    totalDeductions: 3500,
    netPay: 70000,
    paymentStatus: 'Paid',
    paymentDate: '2026-08-01',
    paymentMethod: 'BANK_TRANSFER',
    transactionId: 'UTR-HDFC-98210401',
  },
  {
    _id: 'slip-2',
    slipNumber: 'SLIP-202608-BUN-102',
    employeeName: 'Bunny Singh',
    employeeCode: 'EMP-MLP-002',
    designation: 'Senior Candid Master & Portraiture',
    month: 'August 2026',
    year: 2026,
    basicPay: 50000,
    hraAllowances: 10000,
    shootBonus: 5000,
    travelReimbursement: 2500,
    grossPay: 67500,
    taxDeduction: 2000,
    providentFund: 1500,
    totalDeductions: 3500,
    netPay: 64000,
    paymentStatus: 'Paid',
    paymentDate: '2026-08-01',
    paymentMethod: 'BANK_TRANSFER',
    transactionId: 'UTR-HDFC-98210402',
  },
  {
    _id: 'slip-3',
    slipNumber: 'SLIP-202608-CHI-103',
    employeeName: 'Chinnu',
    employeeCode: 'EMP-MLP-003',
    designation: '4K Commercial Drone Cinematographer',
    month: 'August 2026',
    year: 2026,
    basicPay: 48000,
    hraAllowances: 9600,
    shootBonus: 5000,
    travelReimbursement: 2500,
    grossPay: 65100,
    taxDeduction: 2000,
    providentFund: 1500,
    totalDeductions: 3500,
    netPay: 61600,
    paymentStatus: 'Paid',
    paymentDate: '2026-08-01',
    paymentMethod: 'BANK_TRANSFER',
    transactionId: 'UTR-HDFC-98210403',
  },
  {
    _id: 'slip-4',
    slipNumber: 'SLIP-202608-ROH-104',
    employeeName: 'Rohit Manekar',
    employeeCode: 'EMP-MLP-004',
    designation: 'Senior 4K Colorist & Film Editor',
    month: 'August 2026',
    year: 2026,
    basicPay: 48000,
    hraAllowances: 9600,
    shootBonus: 5000,
    travelReimbursement: 2500,
    grossPay: 65100,
    taxDeduction: 2000,
    providentFund: 1500,
    totalDeductions: 3500,
    netPay: 61600,
    paymentStatus: 'Paid',
    paymentDate: '2026-08-01',
    paymentMethod: 'BANK_TRANSFER',
    transactionId: 'UTR-HDFC-98210404',
  },
  {
    _id: 'slip-5',
    slipNumber: 'SLIP-202608-SUM-105',
    employeeName: 'Sumit',
    employeeCode: 'EMP-MLP-005',
    designation: 'Gimbal Operator & 2nd Camera Master',
    month: 'August 2026',
    year: 2026,
    basicPay: 45000,
    hraAllowances: 9000,
    shootBonus: 5000,
    travelReimbursement: 2500,
    grossPay: 61500,
    taxDeduction: 2000,
    providentFund: 1500,
    totalDeductions: 3500,
    netPay: 58000,
    paymentStatus: 'Paid',
    paymentDate: '2026-08-01',
    paymentMethod: 'BANK_TRANSFER',
    transactionId: 'UTR-HDFC-98210405',
  },
  {
    _id: 'slip-6',
    slipNumber: 'SLIP-202608-TAR-106',
    employeeName: 'Tarun Rathore',
    employeeCode: 'EMP-MLP-006',
    designation: 'Lighting Director & Technical Lead',
    month: 'August 2026',
    year: 2026,
    basicPay: 45000,
    hraAllowances: 9000,
    shootBonus: 5000,
    travelReimbursement: 2500,
    grossPay: 61500,
    taxDeduction: 2000,
    providentFund: 1500,
    totalDeductions: 3500,
    netPay: 58000,
    paymentStatus: 'Pending',
    paymentDate: null,
    paymentMethod: 'BANK_TRANSFER',
    transactionId: '',
  },
  {
    _id: 'slip-7',
    slipNumber: 'SLIP-202608-SAN-107',
    employeeName: 'Santosh Rathore',
    employeeCode: 'EMP-MLP-007',
    designation: 'Audio & Sound Design Recordist',
    month: 'August 2026',
    year: 2026,
    basicPay: 45000,
    hraAllowances: 9000,
    shootBonus: 5000,
    travelReimbursement: 2500,
    grossPay: 61500,
    taxDeduction: 2000,
    providentFund: 1500,
    totalDeductions: 3500,
    netPay: 58000,
    paymentStatus: 'Pending',
    paymentDate: null,
    paymentMethod: 'BANK_TRANSFER',
    transactionId: '',
  },
  {
    _id: 'slip-8',
    slipNumber: 'SLIP-202608-LUC-108',
    employeeName: 'Lucky',
    employeeCode: 'EMP-MLP-008',
    designation: 'Post-Production Editor & Reels Specialist',
    month: 'August 2026',
    year: 2026,
    basicPay: 42000,
    hraAllowances: 8400,
    shootBonus: 5000,
    travelReimbursement: 2500,
    grossPay: 57900,
    taxDeduction: 2000,
    providentFund: 1500,
    totalDeductions: 3500,
    netPay: 54400,
    paymentStatus: 'Pending',
    paymentDate: null,
    paymentMethod: 'BANK_TRANSFER',
    transactionId: '',
  },
  {
    _id: 'slip-9',
    slipNumber: 'SLIP-202608-PRI-109',
    employeeName: 'Priyanshu',
    employeeCode: 'EMP-MLP-009',
    designation: 'Shoot Logistics & Production Lead',
    month: 'August 2026',
    year: 2026,
    basicPay: 42000,
    hraAllowances: 8400,
    shootBonus: 5000,
    travelReimbursement: 2500,
    grossPay: 57900,
    taxDeduction: 2000,
    providentFund: 1500,
    totalDeductions: 3500,
    netPay: 54400,
    paymentStatus: 'Pending',
    paymentDate: null,
    paymentMethod: 'BANK_TRANSFER',
    transactionId: '',
  },
];

const AdminPayroll = () => {
  const [slips, setSlips] = useState(DEFAULT_CREW_SLIPS);
  const [employees, setEmployees] = useState(DEFAULT_CREW_MEMBERS);
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
    employeeId: 'emp-1',
    employeeName: 'Aman Pawar',
    employeeCode: 'EMP-MLP-001',
    designation: 'Lead Cinematographer & Film Director',
    month: 'August 2026',
    basicPay: '55000',
    hraAllowances: '11000',
    shootBonus: '5000',
    travelReimbursement: '2500',
    taxDeduction: '2000',
    providentFund: '1500',
    advanceDeduction: '0',
    paymentMethod: 'BANK_TRANSFER',
    notes: 'Monthly salary payout for wedding production crew.',
  });

  const { addToast } = useNotification();

  const fetchPayrollData = async () => {
    try {
      const [sRes, eRes] = await Promise.allSettled([
        api.get(`/salary?month=${encodeURIComponent(selectedMonth)}`),
        api.get('/admin/employees'),
      ]);

      let loadedSlips = sRes.status === 'fulfilled'
        ? (Array.isArray(sRes.value) ? sRes.value : sRes.value?.data || [])
        : [];
      let loadedEmps = eRes.status === 'fulfilled'
        ? (Array.isArray(eRes.value) ? eRes.value : eRes.value?.data || [])
        : [];

      if (!loadedEmps || loadedEmps.length === 0) {
        loadedEmps = DEFAULT_CREW_MEMBERS;
      }

      if (!loadedSlips || loadedSlips.length === 0) {
        loadedSlips = DEFAULT_CREW_SLIPS;
      }

      // Normalize all slips to ensure employeeName, code and designation are always populated
      loadedSlips = loadedSlips.map((slip, i) => {
        const empId = slip.employee?._id || slip.employee;
        const matchingEmp = loadedEmps.find((e) => e._id === empId || e.id === empId);
        const code = slip.employeeCode || slip.employee?.employeeCode || matchingEmp?.employeeCode || `EMP-MLP-00${(i % 9) + 1}`;

        let resolvedName =
          slip.employeeName ||
          slip.user?.name ||
          slip.employee?.user?.name ||
          slip.employee?.name ||
          matchingEmp?.user?.name ||
          matchingEmp?.name;

        if (!resolvedName || resolvedName === 'Production Crew Member' || resolvedName === 'undefined') {
          resolvedName = CREW_NAMES_MAP[code] || DEFAULT_CREW_SLIPS[i % 9]?.employeeName || `Crew Member ${i + 1}`;
        }

        const resolvedDesig =
          slip.designation ||
          slip.employee?.designation ||
          matchingEmp?.designation ||
          DEFAULT_CREW_SLIPS[i % 9]?.designation ||
          'Production Specialist';

        return {
          ...slip,
          employeeName: resolvedName,
          employeeCode: code,
          designation: resolvedDesig,
        };
      });

      setSlips(loadedSlips);
      setEmployees(loadedEmps);
      if (loadedEmps.length > 0 && !form.employeeId) {
        const firstEmp = loadedEmps[0];
        setForm((prev) => ({
          ...prev,
          employeeId: firstEmp._id,
          employeeName: firstEmp.user?.name || firstEmp.name || 'Aman Pawar',
          employeeCode: firstEmp.employeeCode || 'EMP-MLP-001',
          designation: firstEmp.designation || 'Lead Cinematographer',
        }));
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
    const empList = employees && employees.length > 0 ? employees : DEFAULT_CREW_MEMBERS;
    const first = empList[0];
    const firstName = first.user?.name || first.name || CREW_NAMES_MAP[first.employeeCode] || 'Aman Pawar';
    const firstCode = first.employeeCode || 'EMP-MLP-001';
    const firstDesig = first.designation || 'Lead Cinematographer & Film Director';
    const basic = firstDesig.toLowerCase().includes('director') || firstDesig.toLowerCase().includes('lead') ? '55000' : '45000';
    const hra = String(Math.round(Number(basic) * 0.2));

    setForm({
      employeeId: first._id || first.employeeCode || 'emp-1',
      employeeName: firstName,
      employeeCode: firstCode,
      designation: firstDesig,
      month: selectedMonth || 'August 2026',
      basicPay: basic,
      hraAllowances: hra,
      shootBonus: '5000',
      travelReimbursement: '2500',
      taxDeduction: '2000',
      providentFund: '1500',
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
            className="p-2.5 rounded-xl bg-[#18181e] border border-white/15 text-white font-mono text-xs focus:border-gold-400 focus:outline-none min-h-[44px]"
          >
            <option value="August 2026">August 2026</option>
            <option value="July 2026">July 2026</option>
            <option value="June 2026">June 2026</option>
            <option value="May 2026">May 2026</option>
          </select>

          <button
            onClick={handleBulkGenerate}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs font-mono transition-all flex items-center justify-center min-h-[44px]"
          >
            <Sparkles className="w-4 h-4 mr-1.5 text-gold-400" /> Bulk Generate All
          </button>

          <button
            onClick={handleOpenCreateModal}
            className="px-4 sm:px-5 py-2.5 rounded-xl bg-gold-gradient text-black font-bold uppercase tracking-wider text-xs shadow-gold-subtle hover:brightness-110 transition-all flex items-center justify-center min-h-[44px]"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Create Salary Slip
          </button>
        </div>
      </div>

      {/* KPI Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#141418] p-6 rounded-2xl border border-white/10 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
            <span>Total Monthly Payroll</span>
            <DollarSign className="w-4 h-4 text-gold-400" />
          </div>
          <h3 className="font-serif text-3xl font-bold text-white">
            ₹{totalPayroll.toLocaleString('en-IN')}
          </h3>
          <span className="text-[10px] text-neutral-400 font-mono">
            {slips.length} Total Staff Slips for {selectedMonth}
          </span>
        </div>

        <div className="bg-[#141418] p-6 rounded-2xl border border-white/10 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-mono">
            <span>Salaries Disbursed (Paid)</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-3xl font-bold text-emerald-400">
            ₹{totalPaid.toLocaleString('en-IN')}
          </h3>
          <span className="text-[10px] text-neutral-400 font-mono">
            {slips.filter((s) => s.paymentStatus === 'Paid').length} Crew Members Cleared
          </span>
        </div>

        <div className="bg-[#141418] p-6 rounded-2xl border border-white/10 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-amber-400 text-xs font-mono">
            <span>Pending Payout</span>
            <Clock className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-3xl font-bold text-amber-400">
            ₹{totalPending.toLocaleString('en-IN')}
          </h3>
          <span className="text-[10px] text-neutral-400 font-mono">
            {slips.filter((s) => s.paymentStatus === 'Pending').length} Pending Bank Transfer
          </span>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          {['ALL', 'Paid', 'Pending'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
                statusFilter === st
                  ? 'bg-gold-gradient text-black font-bold shadow-gold-subtle'
                  : 'bg-[#18181e] text-neutral-400 hover:text-white border border-white/10'
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
            className="w-full bg-[#18181e] border border-white/15 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-gold-400 font-mono"
          />
        </div>
      </div>

      {/* Salary Slips Table */}
      {loading ? (
        <div className="h-64 rounded-2xl bg-[#141418] animate-pulse" />
      ) : filteredSlips.length === 0 ? (
        <div className="text-center py-20 bg-[#141418] rounded-3xl border border-white/10 space-y-3">
          <DollarSign className="w-8 h-8 text-gold-400 mx-auto opacity-50" />
          <h3 className="font-serif text-xl text-white">No Salary Slips Found</h3>
          <p className="text-xs text-neutral-400">
            Click "Bulk Generate All" or "Create Salary Slip" to issue payslips for {selectedMonth}.
          </p>
        </div>
      ) : (
        <div className="bg-[#141418] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto custom-scrollbar w-full">
            <table className="w-full min-w-[850px] text-left text-xs">
              <thead className="bg-[#181820] text-gold-400 uppercase font-mono text-[10.5px] border-b border-white/10">
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
              <tbody className="divide-y divide-white/5 font-mono">
                {filteredSlips.map((slip) => {
                  const isPaid = slip.paymentStatus === 'Paid';
                  return (
                    <tr key={slip._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4">
                        <strong className="text-white block font-serif font-bold text-sm">
                          {slip.employeeName || slip.user?.name || slip.employee?.user?.name || slip.employee?.name || 'Production Crew Member'}
                        </strong>
                        <span className="text-[10px] text-gold-400">{slip.employeeCode || slip.employee?.employeeCode || 'EMP-MLP'}</span>
                      </td>

                      <td className="py-3.5 px-4 text-neutral-300 font-sans">{slip.designation}</td>

                      <td className="py-3.5 px-4 text-white">
                        ₹{(Number(slip.basicPay) || 0).toLocaleString('en-IN')}
                      </td>

                      <td className="py-3.5 px-4 text-emerald-400">
                        +₹{((Number(slip.hraAllowances) || 0) + (Number(slip.shootBonus) || 0)).toLocaleString('en-IN')}
                      </td>

                      <td className="py-3.5 px-4 text-rose-400">
                        -₹{(Number(slip.totalDeductions) || 0).toLocaleString('en-IN')}
                      </td>

                      <td className="py-3.5 px-4">
                        <strong className="text-gold-300 font-bold text-sm">
                          ₹{(Number(slip.netPay) || 0).toLocaleString('en-IN')}
                        </strong>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                            isPaid
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          }`}
                        >
                          {slip.paymentStatus}
                        </span>
                        {isPaid && slip.transactionId && (
                          <span className="text-[9px] text-neutral-400 block mt-0.5">
                            {slip.transactionId}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-2">
                        {!isPaid && (
                          <button
                            onClick={() => {
                              setPayModalSlip(slip);
                              setPaymentForm({
                                paymentMethod: 'BANK_TRANSFER',
                                transactionId: `UTR-MLP-${Date.now().toString().slice(-6)}`,
                              });
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-bold text-[11px] transition-all"
                          >
                            Mark Paid
                          </button>
                        )}

                        <button
                          onClick={() => generateSalarySlipPDF(slip)}
                          className="px-2.5 py-1.5 rounded-lg bg-gold-500/15 hover:bg-gold-500/30 text-gold-300 border border-gold-500/30 font-bold text-[11px] inline-flex items-center transition-all"
                        >
                          <Download className="w-3.5 h-3.5 mr-1" /> Pay Slip PDF
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Salary Slip Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141418] border border-gold-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-fade-in text-white max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400 font-bold block">
                  Staff Compensation Console
                </span>
                <h3 className="font-serif text-xl font-bold text-white">Generate Salary Slip</h3>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSlip} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-300 font-bold block mb-1 font-mono">
                  Select Production Crew Member:
                </label>
                <select
                  required
                  value={form.employeeId}
                  onChange={(e) => {
                    const empId = e.target.value;
                    const empList = employees && employees.length > 0 ? employees : DEFAULT_CREW_MEMBERS;
                    const foundEmp = empList.find(
                      (emp) => emp._id === empId || emp.id === empId || emp.employeeCode === empId
                    );
                    const empName =
                      foundEmp?.user?.name ||
                      foundEmp?.name ||
                      CREW_NAMES_MAP[foundEmp?.employeeCode] ||
                      'Production Crew Member';
                    const empCode = foundEmp?.employeeCode || '';
                    const desig = foundEmp?.designation || 'Production Specialist';
                    const basic =
                      desig.toLowerCase().includes('director') || desig.toLowerCase().includes('lead')
                        ? '55000'
                        : '45000';
                    const hra = String(Math.round(Number(basic) * 0.2));

                    setForm({
                      ...form,
                      employeeId: empId,
                      employeeName: empName,
                      employeeCode: empCode,
                      designation: desig,
                      basicPay: basic,
                      hraAllowances: hra,
                    });
                  }}
                  className="w-full p-3 rounded-xl bg-[#181820] border border-gold-500/40 text-white font-mono text-xs focus:border-gold-400 focus:outline-none"
                  style={{ backgroundColor: '#181820', color: '#ffffff' }}
                >
                  <option value="" disabled style={{ backgroundColor: '#181820', color: '#888' }}>
                    -- Select Production Crew Member --
                  </option>
                  {(employees && employees.length > 0 ? employees : DEFAULT_CREW_MEMBERS).map((emp) => {
                    const name =
                      emp.user?.name || emp.name || CREW_NAMES_MAP[emp.employeeCode] || 'Crew Member';
                    const desig = emp.designation || 'Production Specialist';
                    const code = emp.employeeCode || emp.code || 'EMP';
                    const val = emp._id || code;
                    return (
                      <option
                        key={val}
                        value={val}
                        style={{ backgroundColor: '#181820', color: '#ffffff' }}
                      >
                        {name} — {desig} ({code})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-300 font-bold block mb-1 font-mono">Salary Month:</label>
                  <input
                    type="text"
                    required
                    value={form.month}
                    onChange={(e) => setForm({ ...form, month: e.target.value })}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white font-mono focus:border-gold-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 font-bold block mb-1 font-mono">Basic Salary (INR):</label>
                  <input
                    type="number"
                    required
                    value={form.basicPay}
                    onChange={(e) => setForm({ ...form, basicPay: e.target.value })}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white font-mono focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-300 font-bold block mb-1 font-mono">HRA Allowances:</label>
                  <input
                    type="number"
                    value={form.hraAllowances}
                    onChange={(e) => setForm({ ...form, hraAllowances: e.target.value })}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white font-mono focus:border-gold-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 font-bold block mb-1 font-mono">Shoot Bonus (INR):</label>
                  <input
                    type="number"
                    value={form.shootBonus}
                    onChange={(e) => setForm({ ...form, shootBonus: e.target.value })}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white font-mono focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-300 font-bold block mb-1 font-mono">Tax / TDS Deduction:</label>
                  <input
                    type="number"
                    value={form.taxDeduction}
                    onChange={(e) => setForm({ ...form, taxDeduction: e.target.value })}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white font-mono focus:border-gold-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 font-bold block mb-1 font-mono">PF Contribution:</label>
                  <input
                    type="number"
                    value={form.providentFund}
                    onChange={(e) => setForm({ ...form, providentFund: e.target.value })}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white font-mono focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Live Net Pay Preview */}
              <div className="p-3.5 rounded-xl bg-black/60 border border-gold-500/30 flex items-center justify-between font-mono">
                <span className="text-neutral-400 text-xs">Estimated Take-Home Net Pay:</span>
                <strong className="text-gold-300 text-base font-bold">
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

              <div className="flex justify-end space-x-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-white/10 text-neutral-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gold-gradient text-black font-bold uppercase tracking-wider text-xs shadow-gold-subtle hover:scale-105 transition-all"
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
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141418] border border-gold-500/40 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-fade-in text-white">
            <h3 className="font-serif text-lg font-bold text-white">
              Disburse Salary: {payModalSlip.employeeName}
            </h3>
            <p className="text-xs text-neutral-400 font-mono">
              Net Amount: <strong className="text-gold-300 text-sm">₹{payModalSlip.netPay?.toLocaleString('en-IN')}</strong> ({payModalSlip.month})
            </p>

            <form onSubmit={handleConfirmPayment} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-300 font-bold block mb-1 font-mono">Disbursement Mode:</label>
                <select
                  value={paymentForm.paymentMethod}
                  onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white font-mono focus:border-gold-400 focus:outline-none"
                >
                  <option value="BANK_TRANSFER">Bank Transfer (NEFT / IMPS)</option>
                  <option value="UPI">UPI Payment</option>
                  <option value="CHEQUE">Studio Cheque</option>
                  <option value="CASH">Cash Voucher</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-300 font-bold block mb-1 font-mono">Bank UTR / Transaction ID:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UTR-HDFC-982104"
                  value={paymentForm.transactionId}
                  onChange={(e) => setPaymentForm({ ...paymentForm, transactionId: e.target.value })}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white font-mono focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setPayModalSlip(null)}
                  className="px-4 py-2 rounded-full border border-white/10 text-neutral-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider text-xs shadow-lg"
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
