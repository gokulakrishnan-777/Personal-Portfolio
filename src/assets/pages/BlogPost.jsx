import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share, Copy, ChevronDown } from 'lucide-react';
import { SiX, SiLinkedin } from 'react-icons/si';
import Header from '../components/Header';
import Text from '../components/Text';

// Lazy load blog contents
const SkillSwapContent = lazy(() => import('./blogCom/SkillSwapContent.jsx'));

const blogContents = {
    'skillswap': SkillSwapContent,
};

const TOCSidebar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [activeId, setActiveId] = useState("");
    
    const headings = [
        { id: "the-problem", text: "The Problem We Set Out to Solve" },
        { id: "technical-architecture", text: "Technical Architecture" },
        { id: "designing-the-ui", text: "Designing a Clean, Engaging UI" },
        { id: "looking-ahead", text: "Looking Ahead" },
        
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Find all intersecting entries
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -80% 0px" } // trigger when heading is near the top
        );

        headings.forEach((h) => {
            const el = document.getElementById(h.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div 
            className="fixed top-[20%] right-10 w-fit ml-auto z-50 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`flex flex-col items-end gap-3 py-3 pl-6 pr-2 transition-all duration-300 ${isHovered ? 'opacity-0 scale-90 blur-sm' : 'opacity-100 scale-100 blur-none'}`}>
                {headings.map((h, i) => (
                    <div 
                        key={i} 
                        className={`h-1 shrink-0 rounded-sm transition-all duration-300 ease-out cursor-pointer ${
                            activeId === h.id ? 'bg-foreground w-8' : 'bg-muted-foreground/30 w-6 hover:bg-foreground hover:w-8'
                        }`}
                        onClick={() => {
                            const el = document.getElementById(h.id);
                            if(el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                    ></div>
                ))}
            </div>

            {/* Popup Card */}
            <div 
                className={`absolute top-0 right-0 w-[280px] rounded-2xl border border-line bg-background p-5 text-sm text-muted-foreground shadow-2xl transition-all duration-500 ease-out ${
                    isHovered ? 'opacity-100 translate-x-0 blur-none' : 'opacity-0 translate-x-full blur-sm pointer-events-none'
                }`}
            >
                <nav className="flex flex-col gap-3">
                    {headings.map((h, i) => (
                        <a 
                            key={i} 
                            href={`#${h.id}`} 
                            className={`transition-colors leading-tight ${
                                activeId === h.id ? 'text-foreground' : 'hover:text-foreground'
                            }`}
                            onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById(h.id);
                                if(el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            {h.text}
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    );
};

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    const ContentComponent = blogContents[slug];

    if (!ContentComponent) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
                <button onClick={() => navigate('/blog')} className="text-muted-foreground hover:text-foreground underline">
                    Return to Blog
                </button>
            </div>
        );
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        // Optional: show a small toast here
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Main Application Header */}
            <Header />

            <div className="mx-auto grid w-full grid-cols-1 lg:grid-cols-[1fr_minmax(auto,48rem)_1fr] max-w-[1400px]">
                {/* Left empty column for grid centering */}
                <div className="hidden lg:block border-r border-line"></div>
                
                <main className="w-full">
                    <div className="mx-auto h-12 border-x border-line md:max-w-3xl"></div>
                    
                    <article className="mx-auto w-full border-x border-b border-line md:max-w-3xl">
                        <div className="screen-line-bottom h-px"></div>
                    
                    {/* Navigation and Actions */}
                    <div className="flex items-center justify-between p-2 pl-4">
                        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft size={16} />
                            Blog
                        </Link>
                        
                        <div className="flex items-center gap-2">
                            <div className="flex items-stretch rounded-lg border border-line bg-secondary overflow-hidden">
                                <button onClick={handleCopyLink} className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.8125rem] font-medium hover:bg-secondary/80 transition-colors">
                                    <Copy size={14} />
                                    <span className="max-[28rem]:hidden">Copy Page</span>
                                </button>
                                <div className="w-px bg-line"></div>
                                <button className="inline-flex items-center justify-center px-2 py-1 hover:bg-secondary/80 transition-colors">
                                    <ChevronDown size={14} />
                                </button>
                            </div>
                            <button className="inline-flex items-center justify-center size-7 rounded-lg border border-line bg-secondary hover:bg-secondary/80 transition-colors">
                                <Share size={14} />
                            </button>
                        </div>
                    </div>
                    
                    <div className="screen-line-top screen-line-bottom">
                        <div className="h-8 bg-repeating-lines"></div>
                    </div>

                    <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>}>
                        <ContentComponent />
                    </Suspense>
                </article>
                </main>

                {/* Right Column: Sticky Table of Contents */}
                <aside className="hidden lg:block pl-6 pt-12 pr-4 relative z-50">
                    {slug === 'skillswap' && <TOCSidebar />}
                </aside>
            </div>
            
            {/* Portfolio Footer */}
            <div className="mt-20">
                <Text />
            </div>
        </div>
    );
};

export default BlogPost;
