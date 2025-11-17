'use client';

import { useState, useMemo } from 'react';
import portfolioData from '@/data/portfolio';
import ProjectCard from './ProjectCard';
import ProjectFilters from './ProjectFilters';
import { Project } from '@/lib/types';
import { reservedTags } from '@/data/portfolio';

function sortProjectsByDate(projects: Project[]) {
  return projects.sort((a, b) => {
    const aDate = new Date(`${a.year}-${a.month}`);
    const bDate = new Date(`${b.year}-${b.month}`);
    return bDate.getTime() - aDate.getTime();
  });
}

const Projects = () => {
  const { projects } = portfolioData;
  
  // Extract unique project types from reserved tags
  const projectTypes = useMemo(() => {
    return reservedTags.map(tag => tag.label);
  }, []);

  // Extract all unique skills from projects (excluding reserved tags)
  const availableSkills = useMemo(() => {
    const projectTags = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => projectTags.add(tag));
    });
    
    // Exclude reserved tags (project types)
    const reservedTagLabels = new Set(reservedTags.map(tag => tag.label));
    const skillsFromProjects = Array.from(projectTags).filter(
      tag => !reservedTagLabels.has(tag)
    );
    
    // Sort alphabetically for consistent display
    return skillsFromProjects.sort();
  }, [projects]);

  // Filter state
  const [selectedProjectTypes, setSelectedProjectTypes] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter project types based on search query
  const filteredProjectTypes = useMemo(() => {
    if (searchQuery.trim().length === 0) {
      return projectTypes;
    }

    const query = searchQuery.toLowerCase().trim();
    const matching = projectTypes.filter(type => 
      type.toLowerCase().includes(query)
    );

    // Include already selected types even if they don't match the query
    const result = new Set([...matching, ...selectedProjectTypes]);
    return Array.from(result).sort();
  }, [projectTypes, searchQuery, selectedProjectTypes]);

  // Filter skills based on search query
  const filteredSkills = useMemo(() => {
    if (searchQuery.trim().length === 0) {
      return availableSkills;
    }

    const query = searchQuery.toLowerCase().trim();
    const matching = availableSkills.filter(skill => 
      skill.toLowerCase().includes(query)
    );

    // Include already selected skills even if they don't match the query
    const result = new Set([...matching, ...selectedSkills]);
    return Array.from(result).sort();
  }, [availableSkills, searchQuery, selectedSkills]);

  // Filter projects based on selected filters and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search filter: check if search query matches project name, types, or skills
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase().trim();
        const projectTitle = project.title.toLowerCase();
        const projectTags = project.tags.map(tag => tag.toLowerCase());
        
        // Check if query matches project title
        const matchesTitle = projectTitle.includes(query);
        
        // Check if query matches any project type (reserved tags)
        const reservedTagLabels = reservedTags.map(tag => tag.label.toLowerCase());
        const matchesProjectType = projectTags.some(tag => 
          reservedTagLabels.includes(tag) && tag.includes(query)
        );
        
        // Check if query matches any core skill (non-reserved tags)
        const matchesSkill = projectTags.some(tag => 
          !reservedTagLabels.includes(tag) && tag.includes(query)
        );
        
        if (!matchesTitle && !matchesProjectType && !matchesSkill) {
          return false;
        }
      }

      // Project type filter: project must have at least one selected project type tag
      if (selectedProjectTypes.length > 0) {
        const hasSelectedType = project.tags.some(tag =>
          selectedProjectTypes.includes(tag)
        );
        if (!hasSelectedType) return false;
      }

      // Skills filter: project must have at least one selected skill tag
      if (selectedSkills.length > 0) {
        const hasSelectedSkill = project.tags.some(tag =>
          selectedSkills.includes(tag)
        );
        if (!hasSelectedSkill) return false;
      }

      return true;
    });
  }, [projects, selectedProjectTypes, selectedSkills, searchQuery]);

  const sortedProjects = sortProjectsByDate(filteredProjects);
  const featuredProjects = sortedProjects.filter((p) => p.featured);
  const regularProjects = sortedProjects.filter((p) => !p.featured);

  const handleProjectTypeToggle = (type: string) => {
    setSelectedProjectTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleClearFilters = () => {
    setSelectedProjectTypes([]);
    setSelectedSkills([]);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Projects
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          A selection of my work in data science, machine learning, and statistical modeling.
        </p>
      </div>

      {/* Filters - Sticky positioned */}
      <ProjectFilters
          projectTypes={filteredProjectTypes}
          skills={filteredSkills}
          selectedProjectTypes={selectedProjectTypes}
          selectedSkills={selectedSkills}
          searchQuery={searchQuery}
          onProjectTypeToggle={handleProjectTypeToggle}
          onSkillToggle={handleSkillToggle}
          onClearFilters={handleClearFilters}
          onSearchChange={handleSearchChange}
        />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results count */}
        {(selectedProjectTypes.length > 0 || selectedSkills.length > 0 || searchQuery.trim().length > 0) && (
          <div className="mb-8 text-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{sortedProjects.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{projects.length}</span> projects
            </p>
          </div>
        )}

        {/* No results message */}
        {sortedProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-2">No projects match your filters.</p>
            <button
              onClick={handleClearFilters}
              className="text-primary-600 hover:text-primary-700 font-medium underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              Featured Projects
            </h3>
            <div className="space-y-12">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
            </div>
          </div>
        )}

        {/* Regular Projects */}
        {regularProjects.length > 0 && (
          <div>
            {featuredProjects.length > 0 && (
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                More Projects
              </h3>
            )}
            <div className="grid md:grid-cols-2 gap-8">
              {regularProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;