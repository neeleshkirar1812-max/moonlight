import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import WhatsAppFloatingButton from '../components/common/WhatsAppFloatingButton';
import { ToastContainer } from '../components/common/Toast';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-obsidian text-neutral-100 flex flex-col selection:bg-gold-500 selection:text-black w-full max-w-full overflow-x-hidden min-w-0">
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
