import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants
} from 'framer-motion';
import { X, ExternalLink, Github, Linkedin, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import Lenis from 'lenis';
import { SkillsBento } from './components/SkillsBento';
import { FeaturedParallax } from './components/FeaturedParallax';
import { ProjectArchive } from './components/ProjectArchive';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { type Project } from './data';
import { cn, getEmbedUrl } from './utils';

// --- TYPES ---


// --- ADVANCED COMPONENTS ---

/**
 * Feature 1: Interactive Neural Network Background
 * Uses HTML5 Canvas to draw connecting nodes that react to mouse position
 */
const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.5; // Velocity
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * 0.5;
          this.y -= Math.sin(angle) * 0.5;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.5)'; // Indigo-500 with opacity
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const count = Math.min(100, (canvas.width * canvas.height) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw lines
      particles.forEach((p, index) => {
        p.update();
        p.draw();

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 - distance / 1200})`; // Fade line based on distance
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};



/**
 * Feature 3: Scrollytelling Text Reveal
 */
const RevealText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  // Split text into words for staggering
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 * i + delay },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={cn("flex flex-wrap gap-x-[0.3em]", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

/**
 * Feature 4: Magnetic Button
 */
const MagneticButton = ({ children, className = "", onClick, href }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 }); // Attraction strength
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Content = (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (href) return <a href={href}>{Content}</a>;
  return Content;
};

const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-overlay opacity-[0.07]">
    <svg className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);


// --- STANDARD COMPONENTS (Updated with new features) ---

const Navbar = () => (
  <motion.nav
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white pointer-events-none"
  >
    <MagneticButton className="pointer-events-auto cursor-pointer">
      <div className="text-xl font-bold tracking-tighter">
        QUINCY<span className="text-indigo-400">.Sproul</span>
      </div>
    </MagneticButton>

    <div className="hidden md:flex gap-8 pointer-events-auto">
      {['About', 'Featured', 'Archive', 'Contact'].map((item) => (
        <MagneticButton key={item} href={`#${item.toLowerCase()} `} className="text-sm font-medium tracking-wide hover:text-indigo-300 transition-colors px-2 py-1">
          {item}
        </MagneticButton>
      ))}
    </div>

    <MagneticButton href="mailto:quincy.sproul@gmail.com" className="pointer-events-auto bg-white text-black px-6 py-2 rounded-full text-xs font-bold hover:bg-indigo-50 transition-colors">
      Let's Talk
    </MagneticButton>
  </motion.nav>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950/50 backdrop-blur-[2px]">
      <div className="relative z-10 container mx-auto px-6 text-center md:text-left">
        <motion.div style={{ y, opacity }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-3 py-1 mb-6 border border-indigo-500/30 rounded-full bg-indigo-500/10 backdrop-blur-sm"
          >
            <span className="text-indigo-300 text-xs tracking-[0.2em] uppercase font-medium">Machine Learning Engineer</span>
          </motion.div>

          <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tighter text-white mb-8 leading-[0.85]">
            <RevealText text="Turning Chaos" className="justify-center md:justify-start" />
            {/* <br /> */}
            <span className="text-slate-500 italic font-serif font-light">
              <RevealText text="into Clarity." delay={0.5} className="justify-center md:justify-start" />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="max-w-xl text-slate-400 text-lg md:text-xl leading-relaxed mb-12 md:mx-0 mx-auto"
          >
            Experienced in predictive modeling, computer vision, and constructing scalable data pipelines that drive strategic decision-making.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex gap-6 justify-center md:justify-start"
        >
          <SocialLink icon={<Github size={20} />} href="https://github.com/qcuincy" />
          <SocialLink icon={<Linkedin size={20} />} href="https://www.linkedin.com/in/quincysproul/" />
          <SocialLink icon={<Mail size={20} />} href="mailto:quincy.sproul@gmail.com" />
        </motion.div>
      </div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-indigo-500 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};

const SocialLink = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <MagneticButton className="block">
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 flex items-center justify-center rounded-full border border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-300 backdrop-blur-md"
    >
      {icon}
    </a >
  </MagneticButton >
);


const ProjectModal = ({ project, isOpen, onClose }: { project: Project | null, isOpen: boolean, onClose: () => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset index when modal opens
  useEffect(() => { if (isOpen) setCurrentImageIndex(0) }, [isOpen]);

  if (!project || !isOpen) return null;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.media.images) {
      setCurrentImageIndex((prev) => (prev + 1) % project.media.images!.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.media.images) {
      setCurrentImageIndex((prev) => (prev - 1 + project.media.images!.length) % project.media.images!.length);
    }
  };

  // Determine media content
  let MediaContent;
  if (project.media.type === 'video' && project.media.videoUrl) {
    MediaContent = (
      <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-2xl">
        <iframe
          src={getEmbedUrl(project.media.videoUrl)}
          className="w-full h-full"
          title={project.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  } else if (project.media.type === 'gallery' && project.media.images && project.media.images.length > 0) {
    MediaContent = (
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black group shadow-2xl">
        <AnimatePresence mode='wait'>
          <motion.img
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            src={project.media.images[currentImageIndex]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 flex justify-between items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={prevImage} className="p-3 bg-black/50 text-white rounded-full hover:bg-indigo-600/80 backdrop-blur-md transition-colors"><ChevronLeft size={20} /></button>
          <button onClick={nextImage} className="p-3 bg-black/50 text-white rounded-full hover:bg-indigo-600/80 backdrop-blur-md transition-colors"><ChevronRight size={20} /></button>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {project.media.images.map((_, idx) => (
            <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-8 bg-indigo-500' : 'w-1.5 bg-white/50'}`} />
          ))}
        </div>
      </div>
    );
  } else {
    MediaContent = (
      <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
        <img src={project.media.thumbnail} alt={project.title} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-950 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-slate-800 relative"
          data-lenis-prevent
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-red-500/80 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="p-6 md:p-10">
            <div className="mb-8">
              {MediaContent}
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3 text-indigo-400 text-sm font-mono">
                  <span>{project.year}</span>
                  <span className="w-1 h-1 bg-indigo-400 rounded-full"></span>
                  <span>{project.month}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{project.title}</h2>
                <p className="text-slate-300 leading-relaxed text-lg mb-8">
                  {project.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-900 text-indigo-300 text-xs rounded-md border border-slate-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-72 flex flex-col gap-4 bg-slate-900/30 p-6 rounded-xl border border-slate-800/50 h-fit">
                <h3 className="text-white font-bold mb-2">Project Links</h3>
                {project.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:bg-indigo-600 hover:border-indigo-500 hover:text-white transition-all group text-slate-300 text-sm"
                  >
                    <span className="font-medium">{link.label}</span>
                    <ExternalLink size={14} className="opacity-50 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Footer = () => (
  <footer id="contact" className="bg-slate-950 py-20 relative z-10 border-t border-slate-900/50">
    <div className="container mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Ready to collaborate on the next big thing?</h2>
        <MagneticButton className="inline-block">
          <a
            href="mailto:quincy.sproul@gmail.com"
            className="text-2xl md:text-3xl text-indigo-400 hover:text-white transition-colors font-bold"
          >
            quincy.sproul@gmail.com
          </a>
        </MagneticButton>
        <div className="mt-12 flex justify-center gap-6">
          <SocialLink icon={<Github size={20} />} href="https://github.com/qcuincy" />
          <SocialLink icon={<Linkedin size={20} />} href="https://www.linkedin.com/in/quincysproul/" />
          <SocialLink icon={<Mail size={20} />} href="mailto:quincy.sproul@gmail.com" />
        </div>
        <p className="text-slate-600 text-sm mt-12">
          © {new Date().getFullYear()} Quincy Sproul. Built with React, Tailwind & Framer Motion.
        </p>
      </motion.div>
    </div>
  </footer>
);

// --- MAIN APP COMPONENT ---
export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (selectedProject) {
      lenisRef.current?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = '';
    }
  }, [selectedProject]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <div className="bg-slate-950 min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200 font-sans cursor-none">
      <CustomCursor />
      <ScrollProgress />
      <GrainOverlay />
      <Navbar />
      <ParticleNetwork />

      <main className="relative">
        <Hero />
        <SkillsBento />
        <FeaturedParallax onProjectClick={handleProjectClick} />
        <ProjectArchive onProjectClick={handleProjectClick} />
      </main>

      <Footer />

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}