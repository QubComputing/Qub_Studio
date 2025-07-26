import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { LoadingScreen } from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuantumBackground } from './components/QuantumBackground';
import { LandingPage } from './pages/LandingPage';
import { IDE } from './pages/IDE';
import { Playground } from './pages/Playground';
import { Challenges } from './pages/Challenges';
import { Learn } from './pages/Learn';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay to ensure smooth transition
    setTimeout(() => setShowContent(true), 100);
  };

  // Prevent scrolling during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <ThemeProvider>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      <Router>
        <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 font-inter transition-all duration-700 relative ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}>
          <ScrollToTop/>
          <QuantumBackground />
          <div className="relative z-10">
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/ide" element={<IDE />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/learn" element={<Learn />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;