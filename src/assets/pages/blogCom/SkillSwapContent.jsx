import React from 'react';

const SkillSwapContent = () => {
    return (
        <div className="prose max-w-none prose-zinc dark:prose-invert px-4 pt-8 pb-16">
            <h1 className="text-3xl font-semibold tracking-tight text-balance mb-4">
                SkillSwap: Revolutionizing Skill Exchange
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
                A deep dive into how SkillSwap connects learners and experts seamlessly, and the technical architecture behind it.
            </p>

            <a 
                href="https://skillswap-five-beta.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block mb-10 overflow-hidden rounded-xl border border-line hover:border-foreground/50 transition-colors group shadow-lg"
                aria-label="Visit SkillSwap live preview website"
            >
                <img 
                    src="/skillswap.webp" 
                    alt="SkillSwap Live Preview Interface" 
                    loading="lazy"
                    width="1200"
                    height="800"
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out" 
                />
            </a>

            <p>
                In a world where knowledge is growing at an unprecedented pace, learning from each other is the most powerful tool we have. SkillSwap was born from this exact idea—a platform where anyone can exchange their expertise with someone else's.
            </p>

            <h2 className="flex flex-row items-center gap-2 mt-12 mb-4 text-2xl font-semibold group cursor-pointer" id="the-problem">
                <span>The Problem We Set Out to Solve</span>
            </h2>
            <p>
                Traditional learning platforms are often one-directional. You pay for a course, you watch videos, and you learn. But what if you have a skill you can teach, and in return, you want to learn something else?
            </p>
            <ul>
                <li><strong>High costs</strong> of professional tutoring.</li>
                <li><strong>Lack of personalized feedback</strong> in static online courses.</li>
                <li><strong>No incentive</strong> to share knowledge unless it's monetized.</li>
            </ul>

            <h2 className="flex flex-row items-center gap-2 mt-12 mb-4 text-2xl font-semibold group cursor-pointer" id="technical-architecture">
                <span>Technical Architecture</span>
            </h2>
            <p>
                Building SkillSwap required a robust and scalable architecture to handle real-time messaging, matching algorithms, and video sessions.
            </p>
            <p>
                We chose a modern stack to ensure performance and maintainability:
            </p>
            <ul>
                <li><strong>Frontend:</strong> React, Vite, and Tailwind CSS for a snappy, responsive UI.</li>
                <li><strong>Backend:</strong> Node.js and Express to handle API requests efficiently.</li>
                <li><strong>Database:</strong> MongoDB for flexible user schema and fast read/write operations.</li>
                <li><strong>Real-time:</strong> Socket.io for instant messaging and connection updates.</li>
                <li><strong>Video:</strong> WebRTC integration for seamless peer-to-peer video calls.</li>
            </ul>

            <h2 className="flex flex-row items-center gap-2 mt-12 mb-4 text-2xl font-semibold group cursor-pointer" id="designing-the-ui">
                <span>Designing a Clean, Engaging UI</span>
            </h2>
            <p>
                User experience is critical. We wanted the platform to feel modern, clean, and distraction-free. By utilizing Tailwind CSS, we built custom components that adapt flawlessly to both light and dark modes. The typography uses Geist Mono for code snippets and Google Sans Flex for maximum readability.
            </p>
            
            <div className="relative my-8 p-6 rounded-xl border border-line bg-muted/30">
                <p className="italic text-muted-foreground mb-0">
                    "The beauty of SkillSwap isn't just in the code; it's in the connections it builds between people who want to grow together."
                </p>
            </div>

            <h2 className="flex flex-row items-center gap-2 mt-12 mb-4 text-2xl font-semibold group cursor-pointer" id="looking-ahead">
                <span>Looking Ahead</span>
            </h2>
            <p>
                SkillSwap is just getting started. In the future, we plan to implement AI-driven matching to pair users based on exact skill synergies, availability, and learning styles. The goal is to make peer-to-peer learning as accessible as searching for a tutorial online.
            </p>
            <p>
                Thank you for reading about the journey of building SkillSwap!
            </p>
        </div>
    );
};

export default SkillSwapContent;
