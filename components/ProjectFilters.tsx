'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Filter, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { reservedTags } from '@/data/portfolio';
import ExpandableSkills from './ExpandableSkills';

interface ProjectFiltersProps {
  projectTypes: string[];
  skills: string[];
  selectedProjectTypes: string[];
  selectedSkills: string[];
  searchQuery: string;
  onProjectTypeToggle: (type: string) => void;
  onSkillToggle: (skill: string) => void;
  onClearFilters: () => void;
  onSearchChange: (query: string) => void;
}

const ProjectFilters = ({
  projectTypes,
  skills,
  selectedProjectTypes,
  selectedSkills,
  searchQuery,
  onProjectTypeToggle,
  onSkillToggle,
  onClearFilters,
  onSearchChange,
}: ProjectFiltersProps) => {
  const [isProjectTypeExpanded, setIsProjectTypeExpanded] = useState(true);
  const [isSkillsExpanded, setIsSkillsExpanded] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const filterRef = useRef<HTMLDivElement>(null);

  const activeFilterCount = selectedProjectTypes.length + selectedSkills.length;
  const hasActiveFilters = activeFilterCount > 0 || searchQuery.length > 0;

  // Scroll detection for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      if (!filterRef.current) return;
      
      const rect = filterRef.current.getBoundingClientRect();
      const navHeight = 64; // h-16 = 64px
      
      // Check if filter is now sticky (top <= navHeight)
      if (rect.top <= navHeight && !isSticky) {
        setIsSticky(true);
      } else if (rect.top > navHeight && isSticky) {
        // Scrolled back above the nav - reset sticky state
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSticky]);

  const getReservedTagStyle = (tagName: string) => {
    const reservedTag = reservedTags.find(
      rt => rt.label.toLowerCase() === tagName.toLowerCase()
    );
    return reservedTag;
  };

  // Animation variants for collapse/expand
  const collapseVariants = {
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: {
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        },
        opacity: {
          duration: 0.25,
          delay: 0.05,
          ease: 'easeOut',
        },
      },
    },
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        },
        opacity: {
          duration: 0.2,
          ease: 'easeIn',
        },
      },
    },
  };

  return (
    <div ref={filterRef} className="sticky top-16 z-10 bg-gray-50/95 backdrop-blur-sm py-6 mb-8 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div 
            className={`flex items-center gap-2 ${isCollapsed ? 'cursor-pointer' : ''}`}
            onClick={() => {
              if (isCollapsed) {
                setIsCollapsed(false);
                setIsFilterVisible(true);
              }
            }}
          >
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="hidden lg:block text-lg font-semibold text-gray-900">
              Filter Projects
            </h3>
            {/* Mobile filter toggle */}
            <button
              className="lg:hidden text-lg font-semibold text-gray-900"
              onClick={(e) => {
                e.stopPropagation();
                if (isCollapsed) {
                  setIsCollapsed(false);
                }
                setIsFilterVisible(!isFilterVisible);
              }}
            >
              Filter Projects
            </button>
            {hasActiveFilters && (
              <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                {activeFilterCount} active
              </span>
            )}
            {isCollapsed && (
              <ChevronDown className="w-5 h-5 text-gray-500 ml-2" />
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Collapse button - only show when expanded and sticky */}
            {!isCollapsed && isSticky && (
              <button
                onClick={() => {
                  setIsCollapsed(true);
                  setIsFilterVisible(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ChevronUp className="w-4 h-4" />
                Collapse
              </button>
            )}
            {hasActiveFilters && (
              <button
                onClick={() => {
                  onClearFilters();
                  onSearchChange('');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Filter options - hide when collapsed on desktop, controlled by isFilterVisible on mobile */}
        <AnimatePresence initial={false}>
          {(!isCollapsed || isFilterVisible) && (
            <motion.div
              key="filter-options"
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={collapseVariants}
              style={{ overflow: 'hidden' }}
              className={`${isFilterVisible ? 'block' : 'hidden'} lg:block`}
            >
              {/* Search Input */}
              <div className="mb-4 mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search by project name, type, or skill..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => onSearchChange('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              {/* Project Types */}
              {projectTypes.length > 0 && (
                <div className="mb-4">
                  <button
                    onClick={() => setIsProjectTypeExpanded(!isProjectTypeExpanded)}
                    className="w-full flex justify-between items-center text-left"
                  >
                    <label className="text-sm font-medium text-gray-700 cursor-pointer">
                      Project Type
                    </label>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                        isProjectTypeExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isProjectTypeExpanded && (
                      <motion.div
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        variants={collapseVariants}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="mt-2 flex flex-wrap gap-2">
                          {projectTypes.map((type) => {
                            const reservedTag = getReservedTagStyle(type);
                            const isSelected = selectedProjectTypes.includes(type);
                            
                            return (
                              <button
                                key={type}
                                onClick={() => onProjectTypeToggle(type)}
                                className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                                  isSelected
                                    ? reservedTag
                                      ? 'shadow-md scale-105'
                                      : 'bg-primary-600 text-white shadow-md scale-105'
                                    : reservedTag
                                    ? 'bg-white text-gray-700 border-2 hover:shadow-md'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:shadow-sm'
                                }`}
                                style={
                                  isSelected && reservedTag
                                    ? {
                                        backgroundColor: reservedTag.backgroundColor,
                                        color: reservedTag.textColor,
                                        borderColor: reservedTag.borderColor,
                                      }
                                    : {}
                                }
                              >
                                {type}
                                {isSelected && (
                                  <X className="w-3.5 h-3.5 ml-0.5" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Core Skills */}
              {skills.length > 0 && (
                <div>
                  <button
                    onClick={() => setIsSkillsExpanded(!isSkillsExpanded)}
                    className="w-full flex justify-between items-center text-left"
                  >
                    <label className="text-sm font-medium text-gray-700 cursor-pointer">
                      Core Skills
                    </label>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                        isSkillsExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isSkillsExpanded && (
                      <motion.div
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        variants={collapseVariants}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="mt-2">
                          <ExpandableSkills
                            skills={skills}
                            initialVisibleCount={12}
                            onSkillClick={onSkillToggle}
                            isSelected={(skill) => selectedSkills.includes(skill)}
                            renderSkill={(skill, isSelected) => (
                              <button
                                onClick={() => onSkillToggle(skill)}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                                  isSelected
                                    ? 'bg-primary-600 text-white shadow-md scale-105'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:shadow-sm'
                                }`}
                              >
                                {skill}
                                {isSelected && (
                                  <X className="w-3.5 h-3.5 ml-1.5 inline" />
                                )}
                              </button>
                            )}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectFilters;

