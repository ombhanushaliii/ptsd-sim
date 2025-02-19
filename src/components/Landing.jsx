import React from 'react';
import { ArrowRight } from 'lucide-react';
import Chatbot from './Chatbot';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Landing = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen relative bg-cover bg-center" style={{ backgroundImage: 'url(src/assets/Classroom.png)' }}>
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <div className="text-white text-2xl font-bold">Echoes of Trauma</div>
        <div className="flex items-center gap-8">
          <a href="#research" className="text-white/80 hover:text-white">{t('nav.research')}</a>
          <a href="#product" className="text-white/80 hover:text-white">{t('nav.product')}</a>
          <a href="#studios" className="text-white/80 hover:text-white">{t('nav.studios')}</a>
          <a href="#company" className="text-white/80 hover:text-white">{t('nav.company')}</a>
          <LanguageSwitcher />
          <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20 hover:bg-white/20">
            {t('nav.downloadSimulator')}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-start justify-center h-[calc(100vh-80px)] px-16">
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

      {/* Decorative gradient orb */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-300/10 rounded-full blur-2xl"></div>

      <Chatbot/>
    </div>
  );
};

export default Landing;
