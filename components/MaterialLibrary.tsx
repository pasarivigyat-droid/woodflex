import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Droplets, TreePine } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MaterialItem {
    id: string;
    name: string;
    image: string;          // URL from public folder
    description: string;
    tags: string[];         // shown as small pills
}

// WOOD TYPES
const WOOD_TYPES: MaterialItem[] = [
    {
        id: "teak",
        name: "Teak Wood",
        image: "/Materials/Woods/Teak Wood.jpg",
        description: "Dense, durable hardwood with warm honey tones. Ideal for heavy-use furniture and outdoor pieces.",
        tags: ["High durability", "Warm tone", "Moisture resistant"]
    },
    {
        id: "sheesham",
        name: "Sheesham (Indian Rosewood)",
        image: "/Materials/Woods/Sheesham Wood (Indian Rosewood).jpg",
        description: "Rich grain patterns and deep browns. Works well for statement dining tables and consoles.",
        tags: ["Bold grain", "Indian hardwood", "Premium look"]
    },
    {
        id: "mango",
        name: "Mango Wood",
        image: "/Materials/Woods/Mango Wood.jpg",
        description: "Sustainable hardwood with a soft, varied grain. Great for modern, budget-friendly furniture.",
        tags: ["Sustainable", "Modern look", "Light–medium tone"]
    },
    {
        id: "acacia",
        name: "Acacia Wood",
        image: "/Materials/Woods/Acacia Wood.jpg",
        description: "Hard, scratch-resistant surface with dramatic grain movement.",
        tags: ["Scratch resistant", "Strong grain", "Dining & tops"]
    },
    {
        id: "white-ash",
        name: "White Ash",
        image: "/Materials/Woods/White Ash Wood.jpg",
        description: "Light, clean base tone that takes stain very well. Perfect for Scandinavian-style pieces.",
        tags: ["Light tone", "Takes stain well", "Scandi style"]
    }
];

// FINISHES
const WOOD_FINISHES: MaterialItem[] = [
    {
        id: "dark-brown",
        name: "Dark Brown Polish",
        image: "/Materials/Finishes/Dark Brown Polish.jpg",
        description: "Deep coffee-brown tone that highlights grain and gives a warm, premium feel.",
        tags: ["Rich tone", "Premium", "Highlight grain"]
    },
    {
        id: "light-brown",
        name: "Natural / Light Brown Polish",
        image: "/Materials/Finishes/Light Brown Polish.jpg",
        description: "Natural, mid-brown finish that keeps the wood looking close to raw but protected.",
        tags: ["Natural look", "Versatile", "Low visual weight"]
    },
    {
        id: "matte-black",
        name: "Matte Black Finish",
        image: "/Materials/Finishes/Matte Black Finish.jpg",
        description: "Non-reflective black finish that softens reflections while keeping texture visible.",
        tags: ["Matte", "Modern", "Accent pieces"]
    },
    {
        id: "wire-brushed",
        name: "Wire-Brushed Finish",
        image: "/Materials/Finishes/Wire Brushed.jpg",
        description: "Lightly wire-brushed surface for a tactile, rustic feel with stronger grain expression.",
        tags: ["Textured", "Rustic", "High grain"]
    }
];

export const MaterialLibrary: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'wood' | 'finish'>('wood');
    const [activeIndex, setActiveIndex] = useState(0);

    const filteredMaterials = activeTab === 'wood' ? WOOD_TYPES : WOOD_FINISHES;
    const currentMaterial = filteredMaterials[activeIndex] || filteredMaterials[0];

    const nextMaterial = () => {
        setActiveIndex(prev => (prev + 1) % filteredMaterials.length);
    };

    const prevMaterial = () => {
        setActiveIndex(prev => (prev - 1 + filteredMaterials.length) % filteredMaterials.length);
    };

    // Reset index when tab changes
    React.useEffect(() => {
        setActiveIndex(0);
    }, [activeTab]);

    return (
        <div className="min-h-screen w-full bg-[#1a1a1a] text-[#eff1f3] font-sans overflow-hidden relative">

            {/* BACKGROUND ANIMATION MOCK */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className={`absolute inset-0 transition-opacity duration-1000 ${activeTab === 'wood' ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")' }} />
                <div className={`absolute inset-0 transition-opacity duration-1000 ${activeTab === 'finish' ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'linear-gradient(45deg, #2d2a26 0%, #000 100%)' }} />
            </div>

            {/* HEADER */}
            <div className="absolute top-0 left-0 w-full p-8 z-50 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                    <ArrowLeft size={16} /> Return to Lobby
                </Link>
                <h1 className="font-serif text-2xl tracking-wider text-[#d4af37]">Materials Library</h1>
            </div>

            {/* MAIN CONTENT SPLIT */}
            <div className="relative z-10 w-full h-screen flex flex-col md:flex-row">

                {/* LEFT: IMAGE & CONTROL */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-full relative overflow-hidden bg-[#121212]">
                    <img
                        key={currentMaterial.id}
                        src={currentMaterial.image}
                        alt={currentMaterial.name}
                        className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black/10" />

                    {/* Navigation Buttons Overlay */}
                    <div className="absolute bottom-8 right-8 flex gap-4">
                        <button onClick={prevMaterial} className="p-4 bg-white/10 backdrop-blur-md hover:bg-[#d4af37] text-white hover:text-black rounded-full transition-all border border-white/20">
                            <ArrowLeft size={20} />
                        </button>
                        <button onClick={nextMaterial} className="p-4 bg-white/10 backdrop-blur-md hover:bg-[#d4af37] text-white hover:text-black rounded-full transition-all border border-white/20">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* RIGHT: INFO */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-full flex flex-col justify-center px-8 md:px-20 relative bg-[#1a1a1a]/95 backdrop-blur-sm">

                    {/* TABS */}
                    <div className="absolute top-8 md:top-20 left-8 md:left-20 flex gap-8">
                        <button
                            onClick={() => setActiveTab('wood')}
                            className={`flex items-center gap-2 pb-2 text-sm uppercase tracking-widest transition-all ${activeTab === 'wood' ? 'border-b-2 border-[#d4af37] text-[#d4af37]' : 'text-white/40 hover:text-white'}`}
                        >
                            <TreePine size={16} /> Wood Types
                        </button>
                        <button
                            onClick={() => setActiveTab('finish')}
                            className={`flex items-center gap-2 pb-2 text-sm uppercase tracking-widest transition-all ${activeTab === 'finish' ? 'border-b-2 border-[#d4af37] text-[#d4af37]' : 'text-white/40 hover:text-white'}`}
                        >
                            <Droplets size={16} /> Finishes
                        </button>
                    </div>

                    {/* CONTENT */}
                    <div className="animate-fade-in-up mt-12 md:mt-0">
                        <span className="text-white/30 text-xs font-mono mb-4 block tracking-widest uppercase">Material 0{activeIndex + 1} / 0{filteredMaterials.length}</span>
                        <h2 className="font-serif text-5xl md:text-6xl mb-6 text-[#d4af37] leading-tight">{currentMaterial.name}</h2>
                        <p className="text-white/60 leading-relaxed text-lg mb-8 max-w-md font-light">
                            {currentMaterial.description}
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {currentMaterial.tags.map((tag, i) => (
                                <div key={i} className="px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold bg-white/5 border border-white/10 text-white/80">
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
};
