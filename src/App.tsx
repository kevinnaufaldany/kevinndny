import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { HomePage } from '@/pages/HomePage';
import { CaseStudyPage } from '@/pages/CaseStudyPage';
import { useLenis } from '@/hooks/useLenis';

function AnimatedRoutes() {
  const location = useLocation();
  
  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:slug" element={<CaseStudyPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
