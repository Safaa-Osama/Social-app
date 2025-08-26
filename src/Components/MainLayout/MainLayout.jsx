import React from 'react';
import Navbar from '../Navbar/NavbarApp';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen p-10">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
