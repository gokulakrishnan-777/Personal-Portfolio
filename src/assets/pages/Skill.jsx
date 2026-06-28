import React from 'react';
import { Wrench, MousePointer2, Zap, Network } from 'lucide-react';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiTailwindcss, SiJavascript, SiNextdotjs, SiGit, SiPostman, SiVite, SiRedux, SiJest, SiDocker, SiOpenai, SiBun, SiAnthropic, SiBootstrap, SiSupabase } from 'react-icons/si';

const Skill = () => {
    // Core tech stack
    const coreSkills = [
        { name: 'React', icon: <SiReact /> },
        { name: 'Next.js', icon: <SiNextdotjs /> },
        { name: 'Node.js', icon: <SiNodedotjs /> },
        { name: 'Express', icon: <SiExpress /> },
        { name: 'MongoDB', icon: <SiMongodb /> },
        { name: 'JavaScript', icon: <SiJavascript /> },
        { name: 'Tailwind', icon: <SiTailwindcss /> },
        { name: 'Bootstrap', icon: <SiBootstrap /> },
        { name: 'Redux', icon: <SiRedux /> },
        { name: 'Jest', icon: <SiJest /> },
        { name: 'Docker', icon: <SiDocker /> },
        { name: 'Git', icon: <SiGit /> },
        { name: 'Postman', icon: <SiPostman /> },
        { name: 'ThunderClient', icon: <Zap /> },
        { name: 'Supabase', icon: <SiSupabase /> },
        { name: 'WebSocket', icon: <Network /> },
        { name: 'Bun', icon: <SiBun /> },
        { name: 'ChatGPT', icon: <SiOpenai /> },
        { name: 'Claude', icon: <SiAnthropic /> },
        { name: 'Cursor', icon: <MousePointer2 /> },
    ];

    return (
        <section id="skills" className="mx-auto max-w-screen overflow-x-clip px-2 md:max-w-3xl pt-8 pb-16">
            <h2 className="sr-only">Skills</h2>
            
            <div className="screen-line-top screen-line-bottom border-x border-line">
                <div className="p-4 md:p-6 border-b border-line">
                    <div className="flex items-center gap-4 font-mono text-sm mb-4">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-line bg-muted text-muted-foreground">
                            <Wrench size={14} />
                        </div>
                        <p className="font-semibold text-lg tracking-tight">Technical Expertise</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        A specialized stack focused on building high-performance, scalable modern web applications.
                    </p>
                </div>

                <div className="flex flex-wrap w-full border-t border-l border-line -ml-px">
                    {coreSkills.map((skill, index) => (
                        <div 
                            key={index} 
                            className="flex flex-col items-center justify-center w-1/2 sm:w-1/3 md:w-1/5 gap-3 p-6 border-r border-b border-line hover:bg-accent-muted transition-colors"
                        >
                            <div className="text-2xl text-foreground">
                                {skill.icon}
                            </div>
                            <span className="text-xs font-mono text-muted-foreground">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skill;
