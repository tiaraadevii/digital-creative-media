import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Services from '@/sections/Services';
import PortfolioPreview from '@/sections/PortfolioPreview';
import Partners from '@/sections/Partners';
import NewsPreview from '@/sections/NewsPreview';
import PropertyPreview from '@/sections/PropertyPreview';
import PartnershipCTA from '@/sections/PartnershipCTA';
import Contact from '@/sections/Contact';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

import AdminLogin from '@/admin/AdminLogin';
import AdminDashboard from '@/admin/AdminDashboard';
import AdminGuard from '@/admin/AdminGuard';

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <PortfolioPreview />
        <Partners />
        <NewsPreview />
        <PropertyPreview />
        <PartnershipCTA />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp phoneNumber="6281295129528" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Website */}
        <Route path="/" element={<LandingPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
