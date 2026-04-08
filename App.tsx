import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { OurWork } from './components/OurWork';
import { ArchitectView } from './components/ArchitectView';
import { HouseOwnerView } from './components/HouseOwnerView';
import { ProductsPage } from './components/ProductsPage';
import { CafeOwnerView } from './components/CafeOwnerView';
import { MaterialLibrary } from './components/MaterialLibrary';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { LeadWall } from './components/LeadWall';
import ScrollToTop from './components/ScrollToTop';
import { LeadReview } from './components/LeadReview';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <LeadWall />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/work" element={<OurWork />} />
        <Route path="/architect" element={<ArchitectView />} />
        <Route path="/house-owner" element={<HouseOwnerView />} />
        <Route path="/cafe-owner" element={<CafeOwnerView />} />
        <Route path="/materials" element={<MaterialLibrary />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/lead/:id" element={<LeadReview />} />
      </Routes>
    </Router>
  );
};

export default App;