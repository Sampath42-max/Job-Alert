import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import WhyUsSection from './components/WhyUsSection';
import Footer from './components/Footer';
import JobAlertsPage from './pages/JobAlertsPage';
import ErrorBoundary from './components/ErrorBoundary'; // Added import

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
      <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans leading-relaxed">
        <Header activeSection={activeSection} />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div id="home" ref={sectionRefs.home}>
                    <HeroSection />
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