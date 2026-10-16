import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Services from '@/sections/Services';
import PortfolioPreview from '@/sections/PortfolioPreview';
import NewsPreview from '@/sections/NewsPreview';
import PropertyPreview from '@/sections/PropertyPreview';
import PartnershipCTA from '@/sections/PartnershipCTA';
import Contact from '@/sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <PortfolioPreview />
        <NewsPreview />
        <PropertyPreview />
        <PartnershipCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
