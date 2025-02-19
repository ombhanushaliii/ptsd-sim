import React from 'react';
import { ArrowRight } from 'lucide-react';
import Chatbot from './Chatbot';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import GridDistortion from './GridDistortion';

const Landing = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen relative">
      {/* Distortion Background Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        <GridDistortion
          imageSrc="src/assets/Classroom.png"
          grid={15}
          mouse={0.1}
          strength={0.15}
          relaxation={0.9}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 min-h-screen">
        {/* Navigation */}
        <nav className="flex justify-between items-center p-6">
          <div className="text-white text-2xl font-bold">Echoes of Trauma</div>
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

        {/* Main Content */}
        <main className="flex flex-col items-start justify-center h-[calc(100vh-80px)] px-16">
          <div className="text-white space-y-6 max-w-2xl">
            <div className="text-sm font-medium tracking-wider opacity-80">{t('main.newReleases')}</div>
            <h1 className="text-6xl font-serif">
              {t('main.frames')}
              <br />
              <span className="text-5xl text-white/80">{t('main.gen3Alpha')}</span>
              <br />
              <span className="text-4xl text-white/60">{t('main.actOne')}</span>
            </h1>
            <p className="text-xl text-white/80 mt-4">
              {t('main.description')}
            </p>
            <button className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 mt-8">
              {t('main.tryNow')}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
        </main>
      </div>

      {/* Optional: You can keep or remove these gradient orbs based on the effect you want */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl z-5"></div>
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-300/10 rounded-full blur-2xl z-5"></div>

      <Chatbot />
    </div>
  );
};

export default Landing;