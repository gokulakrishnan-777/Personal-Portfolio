import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share, Copy, ChevronDown, Check, Link2, MoreHorizontal, MessageSquare, Box, Sparkles, FileCode, Circle } from 'lucide-react';
import { SiX, SiLinkedin, SiGithub } from 'react-icons/si';
import Header from '../components/Header';
import Text from '../components/Text';

// Lazy load blog contents
const SkillSwapContent = lazy(() => import('./blogCom/SkillSwapContent.jsx'));

const blogContents = {
    'skillswap': SkillSwapContent,
};

const TOCSidebar = ({ title }) => {
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
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -80% 0px" } 
        );

        let observedCount = 0;
        const interval = setInterval(() => {
            headings.forEach((h) => {
                const el = document.getElementById(h.id);
                // Only observe elements that haven't been observed yet
                if (el && !el.dataset.tocObserved) {
                    observer.observe(el);
                    el.dataset.tocObserved = 'true';
                    observedCount++;
                }
            });
            // Stop polling once all headings are found and observed
            if (observedCount === headings.length) {
                clearInterval(interval);
            }
        }, 300);

        return () => {
            clearInterval(interval);
            observer.disconnect();
        };
    }, []);

    return (
        <div 
            className="fixed top-[20%] right-10 w-fit ml-auto z-50 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`flex flex-col items-end gap-3 py-3 pl-6 pr-2 transition-all duration-300 ${isHovered ? 'opacity-0 scale-90 blur-sm' : 'opacity-100 scale-100 blur-none'}`}>
                {headings.map((h, i) => (
                    <button 
                        type="button"
                        key={i} 
                        className={`h-1 shrink-0 rounded-sm transition-all duration-300 ease-out cursor-pointer ${
                            activeId === h.id ? 'bg-foreground w-8' : 'bg-muted-foreground/30 w-6 hover:bg-foreground hover:w-8'
                        }`}
                        onClick={() => {
                            const el = document.getElementById(h.id);
                            if(el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        aria-label={`Scroll to ${h.text}`}
                    ></button>
                ))}
            </div>

            {/* Popup Card */}
            <div 
                className={`absolute top-0 right-0 w-[280px] rounded-2xl border border-line bg-background p-5 text-sm text-muted-foreground shadow-2xl transition-all duration-500 ease-out ${
                    isHovered ? 'opacity-100 translate-x-0 blur-none' : 'opacity-0 translate-x-full blur-sm pointer-events-none'
                }`}
            >
                <h4 
                    role="button"
                    tabIndex={0}
                    className="text-base font-semibold text-foreground/80 mb-4 pb-2 border-b border-line cursor-pointer hover:text-black dark:hover:text-white transition-colors"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    }}
                >
                    {title || "Table of Contents"}
                </h4>
                <nav className="flex flex-col gap-3">
                    {headings.map((h, i) => (
                        <button 
                            key={i} 
                            type="button"
                            className={`text-left transition-colors leading-tight ${
                                activeId === h.id ? 'text-foreground' : 'hover:text-foreground'
                            }`}
                            onClick={() => {
                                const el = document.getElementById(h.id);
                                if(el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            {h.text}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    
    const [isCopyOpen, setIsCopyOpen] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const copyRef = React.useRef(null);
    const shareRef = React.useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (copyRef.current && !copyRef.current.contains(e.target)) setIsCopyOpen(false);
            if (shareRef.current && !shareRef.current.contains(e.target)) setIsShareOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    const ContentComponent = blogContents[slug];

    if (!ContentComponent) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
                <button type="button" onClick={() => navigate('/blog')} className="text-muted-foreground hover:text-foreground underline">
                    Return to Blog
                </button>
            </div>
        );
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        setIsCopyOpen(false);
    };

    const handleShareX = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent("Check out this post!");
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
        setIsShareOpen(false);
    };

    const handleShareLinkedIn = () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        setIsShareOpen(false);
    };

    const handleShareOther = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    url: window.location.href
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            handleCopyLink();
        }
        setIsShareOpen(false);
    };

    const openAI = (ai) => {
        const prompt = encodeURIComponent(`Please read this blog post: ${window.location.href}`);
        let url = '';
        if (ai === 'chatgpt') url = `https://chatgpt.com/?q=${prompt}`;
        else if (ai === 'claude') url = `https://claude.ai/new?q=${prompt}`;
        else if (ai === 'grok') url = `https://grok.com/?q=${prompt}`;
        else if (ai === 'cursor') url = `cursor://`; 
        else if (ai === 'scira') url = `https://scira.app/?q=${prompt}`;
        
        if (url) window.open(url, '_blank');
        setIsCopyOpen(false);
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
                            {/* Copy Dropdown */}
                            <div className="relative" ref={copyRef}>
                                <div className="flex items-stretch rounded-lg border border-line bg-secondary overflow-hidden">
                                    <button type="button" onClick={handleCopyLink} className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.8125rem] font-medium hover:bg-secondary/80 transition-colors">
                                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                        <span className="max-[28rem]:hidden">{copied ? "Copied!" : "Copy Page"}</span>
                                    </button>
                                    <div className="w-px bg-line"></div>
                                    <button type="button" onClick={() => setIsCopyOpen(!isCopyOpen)} className="inline-flex items-center justify-center px-2 py-1 hover:bg-secondary/80 transition-colors">
                                        <ChevronDown size={14} className={`transition-transform duration-200 ${isCopyOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                </div>

                                {/* Dropdown Menu */}
                                {isCopyOpen && (
                                    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-line bg-[#1c1c1f] p-1.5 shadow-xl z-50 flex flex-col gap-0.5 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <button type="button" className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors text-left" onClick={() => { window.open(window.location.href + '.md', '_blank'); setIsCopyOpen(false); }}>
                                            <FileCode size={15} /> View as Markdown
                                        </button>
                                        <button type="button" className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors text-left" onClick={() => { window.open('https://github.com/gokulakrishnan-777/Personal-Portfolio', '_blank'); setIsCopyOpen(false); }}>
                                            <SiGithub size={15} /> Open in GitHub
                                        </button>
                                        <button type="button" className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors text-left" onClick={() => openAI('chatgpt')}>
                                            <MessageSquare size={15} /> Open in ChatGPT
                                        </button>
                                        <button type="button" className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors text-left" onClick={() => openAI('claude')}>
                                            <Sparkles size={15} /> Open in Claude
                                        </button>
                                        <button type="button" className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors text-left" onClick={() => openAI('cursor')}>
                                            <Box size={15} /> Open in Cursor
                                        </button>
                                        <button type="button" className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors text-left" onClick={() => openAI('grok')}>
                                            <Circle size={15} /> Open in Grok
                                        </button>
                                        <button type="button" className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors text-left" onClick={() => openAI('scira')}>
                                            <Sparkles size={15} /> Open in Scira AI
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Share Dropdown */}
                            <div className="relative" ref={shareRef}>
                                <button type="button" onClick={() => setIsShareOpen(!isShareOpen)} className={`inline-flex items-center justify-center size-7 rounded-lg border border-line transition-colors ${isShareOpen ? 'bg-secondary/80' : 'bg-secondary hover:bg-secondary/80'}`}>
                                    <Share size={14} />
                                </button>
                                
                                {isShareOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-xl border border-line bg-[#1c1c1f] p-1.5 shadow-xl z-50 flex flex-col gap-0.5 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <button type="button" className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors text-left" onClick={() => { handleCopyLink(); setIsShareOpen(false); }}>
                                            <Link2 size={15} /> Copy link
                                        </button>
                                        <button type="button" className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors text-left" onClick={handleShareX}>
                                            <SiX size={15} /> Share on X
                                        </button>
                                        <button type="button" className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors text-left" onClick={handleShareLinkedIn}>
                                            <SiLinkedin size={15} /> Share on LinkedIn
                                        </button>
                                        <button type="button" className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors text-left" onClick={handleShareOther}>
                                            <MoreHorizontal size={15} /> Other app
                                        </button>
                                    </div>
                                )}
                            </div>
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
                    {slug === 'skillswap' && <TOCSidebar title="SkillSwap: Revolutionizing Skill Exchange" />}
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
