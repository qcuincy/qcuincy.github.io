'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableSkillsProps {
  skills: string[];
  initialVisibleCount?: number;
  onSkillClick?: (skill: string) => void;
  isSelected?: (skill: string) => boolean;
  renderSkill?: (skill: string, isSelected: boolean) => React.ReactNode;
  className?: string;
}

const ExpandableSkills = ({
  skills,
  initialVisibleCount = 15,
  onSkillClick,
  isSelected,
  renderSkill,
  className = '',
}: ExpandableSkillsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isInitialMount = useRef(true);
  const shouldShowExpandButton = skills.length > initialVisibleCount;
  const visibleSkills = isExpanded ? skills : skills.slice(0, initialVisibleCount);
  const hiddenCount = skills.length - initialVisibleCount;

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
  }, []);

  const defaultRenderSkill = (skill: string, selected: boolean) => (
    <span
      className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-all duration-200 ${
        selected
          ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-300'
          : 'hover:bg-primary-50 hover:text-primary-700'
      }`}
    >
      {skill}
    </span>
  );

  const clickableRenderSkill = (skill: string, selected: boolean) => (
    <button
      onClick={() => onSkillClick?.(skill)}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
        selected
          ? 'bg-primary-600 text-white shadow-md scale-105'
          : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:shadow-sm'
      }`}
    >
      {skill}
      {selected && (
        <span className="ml-1.5 text-xs">✓</span>
      )}
    </button>
  );

  const skillRenderer = renderSkill || (onSkillClick ? clickableRenderSkill : defaultRenderSkill);

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        {visibleSkills.map((skill, index) => {
          const selected = isSelected ? isSelected(skill) : false;
          // Animate on initial mount, or animate newly visible items when expanding
          const shouldAnimate = isInitialMount.current || (isExpanded && index >= initialVisibleCount);
          return (
            <div
              key={skill}
              className={shouldAnimate ? "opacity-0 animate-fade-in-up" : ""}
              style={shouldAnimate ? {
                animationDelay: `${(isInitialMount.current ? index : index - initialVisibleCount) * 0.02}s`,
              } : {}}
            >
              {skillRenderer(skill, selected)}
            </div>
          );
        })}
      </div>
      
      {shouldShowExpandButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
        >
          {isExpanded ? (
            <>
              <span>Show less</span>
              <ChevronUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </>
          ) : (
            <>
              <span>Show {hiddenCount} more skills</span>
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ExpandableSkills;

