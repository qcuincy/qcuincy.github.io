import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '../utils';

// --- 3D COMPONENTS ---

const RotatingShape = ({ type }: { type: 'sphere' | 'cube' | 'torus' | 'octahedron' }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((_) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef} scale={2.5}>
                {type === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
                {type === 'cube' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
                {type === 'torus' && <torusGeometry args={[1, 0.3, 16, 100]} />}
                {type === 'octahedron' && <octahedronGeometry args={[1.5]} />}

                <MeshDistortMaterial
                    color="#6366f1"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
};

const SkillCanvas = ({ type }: { type: 'sphere' | 'cube' | 'torus' | 'octahedron' }) => {
    return (
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <Canvas camera={{ position: [0, 0, 6] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <RotatingShape type={type} />
            </Canvas>
        </div>
    );
};

// --- BENTO CARD ---

interface SkillCardProps {
    title: string;
    desc: string;
    tags: string[];
    className?: string;
    shape: 'sphere' | 'cube' | 'torus' | 'octahedron';
}

const SkillCard = ({ title, desc, tags, className, shape }: SkillCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
                "relative overflow-hidden rounded-3xl bg-slate-900/50 border border-slate-800 p-8 group hover:border-indigo-500/50 transition-colors duration-500",
                className
            )}
        >
            {/* 3D Background */}
            <SkillCanvas type={shape} />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
                <div>
                    <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-indigo-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-slate-400 leading-relaxed">{desc}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-8">
                    {tags.map(tag => (
                        <span key={tag} className="text-xs font-medium text-indigo-300/80 bg-indigo-900/20 px-3 py-1 rounded-full border border-indigo-500/10">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

// --- MAIN SECTION ---

export const SkillsBento = () => {
    return (
        <section id="about" className="relative py-32 bg-slate-950 z-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-20">

                    {/* Sticky Narrative - Left Side */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-32">
                            <h2 className="text-sm font-bold tracking-[0.2em] text-indigo-400 uppercase mb-6">
                                Expertise
                            </h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                                Engineering <br />
                                <span className="text-slate-500 font-serif italic">Intelligence.</span>
                            </h3>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                I bridge the gap between theoretical data science and production-grade software.
                                My approach combines rigorous statistical analysis with modern software engineering practices.
                            </p>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Currently focused on <span className="text-indigo-400">Predictive Maintenance</span> and real-time inference systems.
                            </p>
                        </div>
                    </div>

                    {/* Scrollable Bento Grid - Right Side */}
                    <div className="lg:w-2/3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Card 1: Machine Learning (Tall) */}
                            <SkillCard
                                title="Machine Learning"
                                desc="Architecting and training state-of-the-art models for computer vision and NLP tasks."
                                tags={["PyTorch", "TensorFlow", "Scikit-learn", "HuggingFace"]}
                                shape="sphere"
                                className="md:row-span-2 min-h-[400px]"
                            />

                            {/* Card 2: Data Engineering */}
                            <SkillCard
                                title="Data Engineering"
                                desc="Building robust ETL pipelines and data warehouses."
                                tags={["DynamoDB", "Snowflake", "PostgreSQL"]}
                                shape="cube"
                                className="min-h-[250px]"
                            />

                            {/* Card 3: Full Stack */}
                            <SkillCard
                                title="Full Stack"
                                desc="Creating intuitive interfaces for complex data visualizations."
                                tags={["React", "TypeScript", "FastAPI", "Python"]}
                                shape="octahedron"
                                className="min-h-[250px]"
                            />

                            {/* Card 4: MLOps (Wide) */}
                            <SkillCard
                                title="MLOps & Cloud"
                                desc="Deploying and monitoring models at scale."
                                tags={["Docker", "AWS SageMaker"]}
                                shape="torus"
                                className="md:col-span-2 min-h-[250px]"
                            />

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
