import { useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { projectsData, type Project } from '../data';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { cn, getYouTubeThumbnail } from '../utils';

const ProjectRow = ({ project, index, setHoveredProject, last }: { project: Project, index: number, setHoveredProject: (p: Project | null) => void, last: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={cn(
                "group relative flex items-center justify-between py-8 border-t border-slate-800 cursor-pointer transition-colors hover:bg-slate-900/30 px-4",
                last && "border-b"
            )}
            onMouseEnter={() => setHoveredProject(project)}
            onMouseLeave={() => setHoveredProject(null)}
        >
            {/* Index */}
            <div className="w-12 text-slate-600 font-mono text-sm">
                {String(index + 1).padStart(2, '0')}
            </div>

            {/* Title with Kinetic Effect */}
            <div className="flex-1 md:pl-12">
                <h3 className="text-2xl md:text-4xl font-bold text-slate-300 group-hover:text-white transition-colors flex items-center gap-4">
                    {project.title}
                    <motion.span
                        initial={{ width: 0, opacity: 0 }}
                        whileHover={{ width: 'auto', opacity: 1 }}
                        className="overflow-hidden flex items-center text-indigo-400"
                    >
                        <ArrowRight size={24} className="ml-2" />
                    </motion.span>
                </h3>
            </div>

            {/* Metadata (Hidden on mobile) */}
            <div className="hidden md:flex items-center gap-12 text-slate-500 font-mono text-sm">
                <div className="w-32">
                    {project.tags.slice(0, 2).join(", ")}
                </div>
                <div className="w-16">
                    {project.year}
                </div>
            </div>

            {/* Arrow Icon */}
            <div className="ml-8 text-slate-600 group-hover:text-indigo-400 transition-colors group-hover:-translate-y-1 group-hover:translate-x-1 duration-300">
                <ArrowUpRight size={24} />
            </div>
        </motion.div>
    );
};

export const ProjectArchive = ({ onProjectClick }: { onProjectClick: (p: Project) => void }) => {
    const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

    const cursorX = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
    const cursorY = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        cursorX.set(clientX);
        cursorY.set(clientY);
    };

    return (
        <section
            id="archive"
            className="py-32 bg-slate-950 relative z-10"
            onMouseMove={handleMouseMove}
        >
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                    <div>
                        <h2 className="text-sm font-bold tracking-[0.2em] text-indigo-400 uppercase mb-4">Archive</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-white">All Projects</h3>
                    </div>
                    <p className="text-slate-500 max-w-md text-right hidden md:block">
                        A complete list of experiments, commercial projects, and open source contributions.
                    </p>
                </div>

                <div className="flex flex-col">
                    {projectsData.map((project, index) => (
                        <div key={project.id} onClick={() => onProjectClick(project)}>
                            <ProjectRow
                                project={project}
                                index={index}
                                setHoveredProject={setHoveredProject}
                                last={index === projectsData.length - 1}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Image Reveal */}
            <motion.div
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                className="fixed top-0 left-0 w-[400px] h-[250px] pointer-events-none z-50 hidden md:block rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: hoveredProject ? 1 : 0,
                    scale: hoveredProject ? 1 : 0.8,
                }}
                transition={{ duration: 0.2 }}
            >
                {hoveredProject && (
                    <img
                        src={hoveredProject.media.thumbnail || (hoveredProject.media.videoUrl ? getYouTubeThumbnail(hoveredProject.media.videoUrl) ?? undefined : undefined)}
                        alt={hoveredProject.title}
                        className="w-full h-full object-cover"
                    />
                )}
            </motion.div>
        </section>
    );
};
