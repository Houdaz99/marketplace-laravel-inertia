import React from 'react';
import Footer from '@/Layouts/Partials/Footer.jsx';
import Navbar from '@/Layouts/Partials/Navbar.jsx';
import Notification from '@/Layouts/Partials/Notification.jsx';
import { usePage } from '@inertiajs/react';
import { ToastContainer } from 'react-bootstrap';

export default function Layout({ user, children ,hideFooter = false}) {
  const { flash } = usePage().props;

  return (
    <div className="d-flex flex-column min-vh-100">
      
      {/* Navbar */}
      <Navbar user={user} />

      {/* Main */}
      <main className="flex-grow-1 d-flex flex-column">
        
        <ToastContainer
          className="position-fixed top-0 start-50 translate-middle-x"
          style={{ zIndex: 1, paddingTop: '5px' }}
        >
          {flash?.message && <Notification message={flash.message} />}
        </ToastContainer>

        {/* 👇 LA CLÉ DU PROBLÈME */}
        <div className="flex-grow-1">
          {children}
        </div>

      </main>

      {/* Footer */}
      {/* Footer conditionnel */}
      {!hideFooter && <Footer />}
    </div>
  );
}
