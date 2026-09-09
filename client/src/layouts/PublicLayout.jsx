import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import WhatsAppFloatingButton from '../components/common/WhatsAppFloatingButton';
import { ToastContainer } from '../components/common/Toast';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 flex flex-col selection:bg-amber-300 selection:text-neutral-950 w-full max-w-full overflow-x-hidden min-w-0">
      <Navbar />
      <main className="flex-grow w-full max-w-full overflow-x-hidden min-w-0">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <ToastContainer />
    </div>
  );
};

export default PublicLayout;
