import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, Github } from 'lucide-react';
import Chatbot from './Chatbot';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const DecryptText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

  useEffect(() => {
    let timeout;
    let currentIndex = 0;
    let iterationCount = 0;
    const maxIterations = 2;
    const iterationDelay = 30;

    const animate = () => {
      if (currentIndex === text.length) {
        setDisplayText(text);
        return;
      }

      const scrambledText = text.split('').map((char, index) => {
        if (index < currentIndex) return char;
        if (char === ' ') return ' ';
        return characters[Math.floor(Math.random() * characters.length)];
      }).join('');

      setDisplayText(scrambledText);
      iterationCount++;

      if (iterationCount >= maxIterations) {
        iterationCount = 0;
        currentIndex++;
      }

      timeout = setTimeout(animate, iterationDelay);
    };

    timeout = setTimeout(() => {
      animate();
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span>{displayText}</span>;
};

const Landing = () => {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDownload = () => {
    const targetScroll = window.innerHeight; // Scroll to the height of one viewport
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative bg-gray-900">
      {/* Hero Section with Parallax */}
      <div className="min-h-screen sticky top-0">
        <div 
          className="fixed inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-transparent"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }} 
        />

        <div className="relative z-20">
          <nav className="fixed w-full flex justify-between items-center p-6 bg-black/20 backdrop-blur-sm">
            <button 
              onClick={() => window.location.reload()}
              className="text-white text-2xl font-['Righteous'] hover:text-blue-400 transition-colors duration-300 tracking-wider bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-transparent cursor-pointer"
            >
              Breaking Point
            </button>
            <div className="flex items-center gap-8">
              <a href="#research" className="text-white/80 hover:text-white">{t('nav.research')}</a>
              <a href="#product" className="text-white/80 hover:text-white">{t('nav.product')}</a>
              <a href="#studios" className="text-white/80 hover:text-white">{t('nav.studios')}</a>
              <a href="#company" className="text-white/80 hover:text-white">{t('nav.company')}</a>
              <LanguageSwitcher />
              <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20 hover:bg-white/20">
                {t('nav.getStarted')}
              </button>
            </div>
          </nav>

          <main className="flex flex-col items-start justify-center h-screen px-16">
            <div 
              className="text-white space-y-6 max-w-2xl"
              style={{
                transform: `translateY(${scrollY * 0.3}px)`,
                opacity: 1 - scrollY / 500,
              }}
            >
              <div className="text-sm font-medium tracking-wider opacity-80">{t('main.newReleases')}</div>
              <h1 className="text-6xl font-serif">
                <DecryptText text="Breaking Point" />
                <br />
                <span className="text-5xl text-white/80">
                  <DecryptText text="ver 1" delay={250} />
                </span>
              </h1>
              <p className="text-xl text-white/80 mt-4">{t('main.description')}</p>
              <button 
                onClick={scrollToDownload}
                className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white/20 hover:bg-white/20"
              >
                {t('main.tryNow')}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Download Section */}
      <div className="min-h-screen relative z-30 bg-gray-900/95 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
          <div className="text-center space-y-8 max-w-3xl">
            <h2 className="text-5xl font-serif text-white">
              The editor for what's next
            </h2>
            <p className="text-xl text-white/80">
              A next-generation code editor designed for high-performance collaboration with humans and AI.
            </p>
            <div className="flex gap-4 justify-center mt-8">
              <button className="group flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors">
                <Download size={20} />
                Download now
              </button>
              <button className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white/20 hover:bg-white/20">
                <Github size={20} />
                Clone source
              </button>
            </div>
            <div className="flex items-center justify-center gap-4 mt-8 text-white/60">
              <span>Available for macOS</span>
              <span>•</span>
              <span>Linux</span>
              <span>•</span>
              <span>Coming soon for Windows</span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 z-40">
        <Chatbot />
      </div>
    </div>
  );
};

export default Landing;