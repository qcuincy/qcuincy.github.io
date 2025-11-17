'use client';

import portfolioData, { reservedTags } from '@/data/portfolio';
import { GraduationCap, Briefcase } from 'lucide-react';
import ExpandableSkills from './ExpandableSkills';

const About = () => {
  const { personal, skills } = portfolioData;

  const iconMap: Record<string, any> = {
    GraduationCap,
    Briefcase,
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Bio */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Background
            </h3>
            {personal.bio.map((paragraph, index) => (
              <p key={index} className="text-gray-600 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
            
            {personal.location && (
              <p className="text-gray-500 mt-6">
                📍 {personal.location}
              </p>
            )}
          </div>

          {/* Project Types & Skills */}
          <div className="space-y-8">
            {/* Project Types */}
            {reservedTags && reservedTags.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Project Types
                </h3>
                <div className="flex flex-wrap gap-2">
                  {reservedTags.map((tag) => {
                    const TagIcon = tag.icon ? iconMap[tag.icon] : null;
                    return (
                      <span
                        key={tag.id}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg font-semibold shadow-sm"
                        style={{
                          backgroundColor: tag.backgroundColor,
                          color: tag.textColor,
                          border: tag.borderColor ? `2px solid ${tag.borderColor}` : 'none',
                        }}
                      >
                        {TagIcon && <TagIcon className="w-4 h-4" />}
                        {tag.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Core Skills
                </h3>
                <ExpandableSkills
                  skills={skills}
                  initialVisibleCount={15}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;