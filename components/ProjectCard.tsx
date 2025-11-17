'use client';

import { Project } from '@/lib/types';
import MediaDisplay from './MediaDisplay';
import { Github, ExternalLink, FileText, BookOpen, Book, GraduationCap, Briefcase } from 'lucide-react';
import { reservedTags } from '@/data/portfolio';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const iconMap: Record<string, any> = {
  Github,
  ExternalLink,
  FileText,
  BookOpen,
  Book,
  GraduationCap,
  Briefcase,
};

const ProjectCard = ({ project, featured = false }: ProjectCardProps) => {
  const getIcon = (iconName?: string) => {
    if (!iconName) return ExternalLink;
    return iconMap[iconName] || ExternalLink;
  };

  const getReservedTagStyle = (tagName: string) => {
    const reservedTag = reservedTags.find(
      rt => rt.label.toLowerCase() === tagName.toLowerCase()
    );
    return reservedTag;
  };

  return (
    <article
      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ${
        featured ? 'border-2 border-primary-200' : ''
      }`}
    >
      {/* Media Section */}
      {project.media && (
        <MediaDisplay media={project.media} title={project.title} />
      )}

      {/* Content Section */}
      <div className="p-6 lg:p-8">
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {project.title}
          {featured && (
            <span className="ml-3 text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded">
              FEATURED
            </span>
          )}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => {
            const reservedTag = getReservedTagStyle(tag);
            
            if (reservedTag) {
              const TagIcon = reservedTag.icon ? getIcon(reservedTag.icon) : null;
              return (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-sm rounded-md font-semibold shadow-sm"
                  style={{
                    backgroundColor: reservedTag.backgroundColor,
                    color: reservedTag.textColor,
                    border: reservedTag.borderColor ? `2px solid ${reservedTag.borderColor}` : 'none',
                  }}
                >
                  {TagIcon && <TagIcon className="w-3.5 h-3.5" />}
                  {tag}
                </span>
              );
            }
            
            return (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md font-medium"
              >
                {tag}
              </span>
            );
          })}
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Links */}
        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {project.links.map((link, index) => {
              const Icon = getIcon(link.icon);
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;