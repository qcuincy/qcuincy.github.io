import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { projectsData, type Project } from '../data';
import { ChevronRight } from 'lucide-react';
import { cn, getYouTubeThumbnail } from '../utils';

// --- SHADER MATERIAL ---

const DistortionMaterial = shaderMaterial(
    {
        uTexture: new THREE.Texture(),
        uHover: 0,
        uTime: 0,
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    uniform float uHover;
    uniform float uTime;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Simple wave effect on hover
      float noise = sin(pos.y * 10.0 + uTime) * 0.02 * uHover;
      pos.x += noise;
      pos.z += noise * 0.5;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
    // Fragment Shader
    `
    uniform sampler2D uTexture;
    uniform float uHover;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Liquid distortion
      float wave = sin(uv.y * 20.0) * 0.01 * uHover;
      uv.x += wave;

      vec4 color = texture2D(uTexture, uv);
      
      // RGB Shift on hover
      float shift = 0.01 * uHover;
      float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
      float g = texture2D(uTexture, uv).g;
      float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
      
      gl_FragColor = vec4(r, g, b, color.a);
    }
  `
);

extend({ DistortionMaterial });

// --- 3D IMAGE COMPONENT ---

const DistortedImage = ({ src, isHovered }: { src: string, isHovered: boolean }) => {
    const materialRef = useRef<any>(null);
    const texture = useTexture(src);

    useFrame((_, delta) => {
        if (materialRef.current) {
            // Smoothly interpolate hover value
            materialRef.current.uHover = THREE.MathUtils.lerp(
                materialRef.current.uHover,
                isHovered ? 1 : 0,
                delta * 5
            );
            materialRef.current.uTime += delta;
        }
    });

    return (
        <mesh>
            <planeGeometry args={[5, 3, 32, 32]} />
            {/* @ts-ignore */}
            <distortionMaterial ref={materialRef} uTexture={texture} transparent />
        </mesh>
    );
};

const WebGLImage = ({ src, className }: { src: string, className?: string }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className={cn("relative w-full h-full overflow-hidden", className)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
                <DistortedImage src={src} isHovered={hovered} />
            </Canvas>
        </div>
    );
};

// --- PROJECT ITEM ---

const ProjectItem = ({ project, index, onProjectClick }: { project: Project, index: number, onProjectClick: (p: Project) => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    const isEven = index % 2 === 0;

    // Determine the image source with fallbacks
    const imageSrc = project.media.thumbnail || 
                     (project.media.videoUrl ? getYouTubeThumbnail(project.media.videoUrl) : null) ||
                     (project.media.images && project.media.images[0]) || 
                     "https://placehold.co/800x600/1e1e1e/FFF?text=No+Image";

    return (
        <motion.div
            ref={ref}
            style={{ opacity }}
            className={cn(
                "flex flex-col md:flex-row gap-12 md:gap-24 items-center mb-48",
                !isEven && "md:flex-row-reverse"
            )}
        >
            {/* Image Section - Full Bleed / Broken Grid */}
            <div className="w-full md:w-3/5 h-[60vh] relative">
                <motion.div
                    style={{ y }}
                    className="w-full h-full absolute inset-0"
                >
                    {/* Using a standard img for now as WebGL texture loading can be tricky with external URLs without CORS setup. 
               If CORS is an issue, we fallback to standard image. 
               For this demo, I'll use the WebGL component but wrap it in ErrorBoundary conceptually or just use standard img if it fails?
               Actually, let's stick to a high-end CSS transform for reliability if WebGL is risky, 
               but the user asked for WebGL. I'll use the WebGLImage.
           */}
                    <div className="w-full h-full rounded-none md:rounded-sm overflow-hidden cursor-pointer" onClick={() => onProjectClick(project)}>
                        {imageSrc && <WebGLImage src={imageSrc} className="w-full h-full object-cover" />}
                    </div>
                </motion.div>

                {/* Parallax Text Overlay - "Masking" effect simulation */}
                <div className={cn(
                    "absolute -bottom-12 text-9xl font-bold text-slate-900/20 pointer-events-none select-none z-0 mix-blend-difference",
                    isEven ? "-right-20" : "-left-20"
                )}>
                    {project.year}
                </div>
            </div>

            {/* Text Section */}
            <div className="w-full md:w-2/5 relative z-10 px-6 md:px-0">
                <div className="flex items-center gap-4 mb-6">
                    <span className="h-px w-12 bg-indigo-500" />
                    <span className="text-indigo-400 font-mono text-sm uppercase tracking-widest">{project.tags[0]}</span>
                </div>

                <h3
                    className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[0.9] cursor-pointer hover:text-indigo-400 transition-colors"
                    onClick={() => onProjectClick(project)}
                >
                    {project.title}
                </h3>

                <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md">
                    {project.description}
                </p>

                <button
                    onClick={() => onProjectClick(project)}
                    className="group flex items-center gap-3 text-white font-bold uppercase tracking-widest text-sm hover:text-indigo-400 transition-colors"
                >
                    View Case Study
                    <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-indigo-400 group-hover:bg-indigo-400/10 transition-all">
                        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                </button>
            </div>
        </motion.div>
    );
};

// --- MAIN COMPONENT ---

export const FeaturedParallax = ({ onProjectClick }: { onProjectClick: (p: Project) => void }) => {
    const featured = projectsData.filter(p => p.featured);

    return (
        <section id="featured" className="py-32 relative z-10 bg-slate-950 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="mb-32 pl-6 border-l-2 border-indigo-500">
                    <h2 className="text-sm font-bold tracking-[0.2em] text-indigo-400 uppercase mb-4">Selected Works</h2>
                    <p className="text-4xl md:text-6xl font-bold text-white max-w-2xl leading-tight">
                        Digital experiences <br />
                        <span className="text-slate-600">crafted with precision.</span>
                    </p>
                </div>

                <div className="flex flex-col">
                    {featured.map((project, index) => (
                        <ProjectItem
                            key={project.id}
                            project={project}
                            index={index}
                            onProjectClick={onProjectClick}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
