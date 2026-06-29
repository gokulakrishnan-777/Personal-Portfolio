import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import MagneticDots from '../components/MagneticDots';
import Header from '../components/Header';
import Text from '../components/Text';

const blogs = [
    {
        id: 'skillswap',
        title: 'SkillSwap: Revolutionizing Skill Exchange',
        description: 'A deep dive into how SkillSwap connects learners and experts seamlessly, and the technical architecture behind it.',
        date: 'October 15, 2025',
        slug: 'skillswap'
    }
];

const BlogList = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="mx-auto w-full overflow-x-clip px-2 md:max-w-3xl pt-8 pb-16">
                {/* Header / Nav */}
            <div className="flex items-center justify-between pb-6 border-b border-line mb-8">
                <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft size={16} />
                    Back to Portfolio
                </Link>
                <div className="font-mono text-xl font-bold">&lt;/&gt; Blog</div>
            </div>

            <div className="space-y-8">
                <h1 className="text-3xl font-semibold tracking-tight text-balance">Writing & Thoughts</h1>
                <p className="text-muted-foreground">
                    I write about web development, AI engineering, machine learning, and my experiences building products.
                </p>

                <div className="grid gap-6 mt-8">
                    {blogs.map((blog) => (
                        <Link 
                            key={blog.id} 
                            to={`/blog/${blog.slug}`}
                            className="group block p-5 rounded-2xl border border-line bg-background hover:bg-muted/50 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <MagneticDots />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-3">
                                    <Calendar size={14} />
                                    <span>{blog.date}</span>
                                </div>
                                <h2 className="text-xl font-semibold mb-2 group-hover:text-foreground transition-colors">{blog.title}</h2>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {blog.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            </main>
            
            {/* Portfolio Footer */}
            <div className="mt-10">
                <Text />
            </div>
        </div>
    );
};

export default BlogList;
