'use client';

import { ArrowDown } from 'lucide-react';
import portfolioData from '@/data/portfolio';

const Hero = () => {
  const { personal } = portfolioData;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4"
    >
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
          {personal.name}
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-600 mb-4">
          {personal.title}
        </p>
        
        <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
          {personal.tagline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#projects"
            className="px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors border-2 border-gray-200"
          >
            Get In Touch
          </a>
        </div>

        <div className="mt-20 animate-bounce">
          <a href="#about" aria-label="Scroll to about section">
            <ArrowDown className="w-6 h-6 mx-auto text-gray-400" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;