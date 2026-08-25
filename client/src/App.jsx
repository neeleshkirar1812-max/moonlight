import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import CustomerLayout from './layouts/CustomerLayout';
import EmployeeLayout from './layouts/EmployeeLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import Portfolio from './pages/public/Portfolio';
import PortfolioCategoryPage from './pages/public/PortfolioCategoryPage';
import Services from './pages/public/Services';
import About from './pages/public/About';
import Blog from './pages/public/Blog';
import BlogDetail from './pages/public/BlogDetail';
import Careers from './pages/public/Careers';
import Contact from './pages/public/Contact';
import FAQ from './pages/public/FAQ';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import Terms from './pages/public/Terms';
import EnquiryPlanner from './pages/enquiry/EnquiryPlanner';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Customer Portal Pages
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CustomerBookings from './pages/customer/CustomerBookings';
import CustomerGallery from './pages/customer/CustomerGallery';
import CustomerGalleryDetail from './pages/customer/CustomerGalleryDetail';
import CustomerVideos from './pages/customer/CustomerVideos';
import CustomerPayments from './pages/customer/CustomerPayments';
import CustomerInvoices from './pages/customer/CustomerInvoices';
import CustomerEnquiries from './pages/customer/CustomerEnquiries';
import CustomerNotifications from './pages/customer/CustomerNotifications';
import CustomerProfile from './pages/customer/CustomerProfile';

// Employee Portal Pages
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import EmployeeProjects from './pages/employee/EmployeeProjects';
import EmployeeTasks from './pages/employee/EmployeeTasks';
import EmployeeProfile from './pages/employee/EmployeeProfile';

// Admin Portal Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminBookings from './pages/admin/AdminBookings';
import AdminInvoices from './pages/admin/AdminInvoices';
import AdminPayments from './pages/admin/AdminPayments';
import AdminPortfolio from './pages/admin/AdminPortfolio';
import AdminGalleries from './pages/admin/AdminGalleries';
import AdminServices from './pages/admin/AdminServices';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminVideos from './pages/admin/AdminVideos';
import AdminCareers from './pages/admin/AdminCareers';
import AdminApplications from './pages/admin/AdminApplications';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminEmployees from './pages/admin/AdminEmployees';
import AdminSettings from './pages/admin/AdminSettings';

// Super Admin Pages
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import SuperAdminApprovals from './pages/superadmin/SuperAdminApprovals';
import SuperAdminAdmins from './pages/superadmin/SuperAdminAdmins';
import SuperAdminAuditLogs from './pages/superadmin/SuperAdminAuditLogs';
import SuperAdminConfig from './pages/superadmin/SuperAdminConfig';

// Protected Route Guard
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-gold-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // If user doesn't have role, redirect to their permitted home
    if (user.role === 'customer') return <Navigate to="/customer/dashboard" replace />;
    if (user.role === 'employee') return <Navigate to="/employee/dashboard" replace />;
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'superadmin') return <Navigate to="/super-admin/dashboard" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Routes>
      {/* 1. Public Luxury Brand Website */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:category" element={<PortfolioCategoryPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/enquiry" element={<EnquiryPlanner />} />

        {/* Auth Pages under Public Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* 2. Customer Portal */}
      <Route
        path="/customer"
        element={
          <ProtectedRoute allowedRoles={['customer', 'admin', 'superadmin']}>
            <CustomerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/customer/dashboard" replace />} />
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="bookings" element={<CustomerBookings />} />
        <Route path="gallery" element={<CustomerGallery />} />
        <Route path="gallery/:id" element={<CustomerGalleryDetail />} />
        <Route path="videos" element={<CustomerVideos />} />
        <Route path="payments" element={<CustomerPayments />} />
        <Route path="invoices" element={<CustomerInvoices />} />
        <Route path="enquiries" element={<CustomerEnquiries />} />
        <Route path="notifications" element={<CustomerNotifications />} />
        <Route path="profile" element={<CustomerProfile />} />
      </Route>

      {/* 3. Employee Portal */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRoles={['employee', 'admin', 'superadmin']}>
            <EmployeeLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/employee/dashboard" replace />} />
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="projects" element={<EmployeeProjects />} />
        <Route path="tasks" element={<EmployeeTasks />} />
        <Route path="profile" element={<EmployeeProfile />} />
      </Route>

      {/* 4. Admin Portal */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="enquiries" element={<AdminEnquiries />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="invoices" element={<AdminInvoices />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="portfolio" element={<AdminPortfolio />} />
        <Route path="galleries" element={<AdminGalleries />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="blogs" element={<AdminBlogs />} />
        <Route path="videos" element={<AdminVideos />} />
        <Route path="careers" element={<AdminCareers />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="employees" element={<AdminEmployees />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* 5. Super Admin Portal */}
      <Route
        path="/super-admin"
        element={
          <ProtectedRoute allowedRoles={['superadmin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/super-admin/dashboard" replace />} />
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="approvals" element={<SuperAdminApprovals />} />
        <Route path="admins" element={<SuperAdminAdmins />} />
        <Route path="audit-logs" element={<SuperAdminAuditLogs />} />
        <Route path="config" element={<SuperAdminConfig />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
