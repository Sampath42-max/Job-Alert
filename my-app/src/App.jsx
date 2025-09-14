import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection.jsx';
import HowItWorksSection from './components/HowItWorksSection.jsx';
import WhyUsSection from './components/WhyUsSection.jsx';
import Footer from './components/Footer.jsx';
import JobAlertsPage from './pages/JobAlertsPage.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = {
    home: useRef(null),
    'how-it-works': useRef(null),
    'why-us': useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <Router>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <div className="bg-white text-slate-800 font-sans leading-relaxed">
        <Header activeSection={activeSection} />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div id="home" ref={sectionRefs.home}>
                    <ErrorBoundary>
                      <HeroSection />
                    </ErrorBoundary>
                  </div>
                  <div id="how-it-works" ref={sectionRefs['how-it-works']}>
                    <HowItWorksSection />
                  </div>
                  <div id="why-us" ref={sectionRefs['why-us']}>
                    <WhyUsSection />
                  </div>
                </>
              }
            />
            <Route
              path="/get-alerts"
              element={
                <ErrorBoundary>
                  <JobAlertsPage />
                </ErrorBoundary>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}