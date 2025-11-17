'use client';

import portfolioData from '@/data/portfolio';
import { Mail, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';

const Contact = () => {
  const { personal } = portfolioData;

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Let&apos;s Connect
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          I&apos;m always interested in hearing about new opportunities, collaborations, or just having a conversation about data science.
        </p>

        {/* Email */}
        <a
          href={`mailto:${personal.email}`}
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl mb-12 text-lg"
        >
          <Mail className="w-5 h-5" />
          {personal.email}
        </a>

        {/* Social Links */}
        <div className="flex justify-center gap-6 flex-wrap">
          {personal.links.github && (
            <a
              href={personal.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-6 h-6" />
              <span>GitHub</span>
            </a>
          )}
          {personal.links.linkedin && (
            <a
              href={personal.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
              <span>LinkedIn</span>
            </a>
          )}
          {personal.links.twitter && (
            <a
              href={personal.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Twitter className="w-6 h-6" />
              <span>Twitter</span>
            </a>
          )}
          {personal.links.scholar && (
            <a
              href={personal.links.scholar}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ExternalLink className="w-6 h-6" />
              <span>Google Scholar</span>
            </a>
          )}
          {personal.links.custom?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ExternalLink className="w-6 h-6" />
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;