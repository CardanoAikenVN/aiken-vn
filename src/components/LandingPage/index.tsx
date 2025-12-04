import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import Curriculum from './Curriculum';
import Projects from './Projects';
import Community from './Community';
import Footer from './Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page" style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#e5e5e5'
    }}>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Curriculum />
        <Projects />
        <Community />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
