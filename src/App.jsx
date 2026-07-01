import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LazyMotion, domAnimation, AnimatePresence, m as motion } from 'framer-motion';
import Header from './assets/components/Header'
import { Home } from './assets/pages/Home.jsx'
import '@fontsource-variable/sansita-swashed';
import '@fontsource/geist-mono';
import ApiProvider from './assets/context/ApiProvider.jsx'
import Text from './assets/components/Text.jsx';
import BackToTop from './assets/components/BackToTop.jsx';
import SearchModal from './assets/components/SearchModal.jsx';
import Loader from './assets/components/Loader.jsx';

// Lazy loaded components for performance optimization
const About = lazy(() => import('./assets/pages/About.jsx').then(module => ({ default: module.About })));
const Education = lazy(() => import('./assets/pages/Education.jsx'));
const Skill = lazy(() => import('./assets/pages/Skill.jsx'));
const Project = lazy(() => import('./assets/pages/Project.jsx'));
const GithubContributions = lazy(() => import('./assets/components/GithubContributions.jsx'));
const Contact = lazy(() => import('./assets/pages/Contact.jsx').then(module => ({ default: module.Contact })));

const BlogList = lazy(() => import('./assets/pages/BlogList.jsx'));
const BlogPost = lazy(() => import('./assets/pages/BlogPost.jsx'));
const NotFound = lazy(() => import('./assets/pages/NotFound.jsx'));
const Certificates = lazy(() => import('./assets/pages/Certificates.jsx'));

// Page Transition Wrapper
const PageTransition = ({ children }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full"
    >
        {children}
    </motion.div>
);

const Portfolio = () => (
    <>
        <Header />
        <Home />
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>}>
            <About />
            <Education />
            <Skill />
            <Project />
            <GithubContributions />
            <Contact />
            <Text />
        </Suspense>
    </>
);

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    // Lock body scroll while loading
    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = '';
        }
    }, [isLoading]);

    return (
        <ApiProvider>
            {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
            
            <LazyMotion features={domAnimation}>
                <div className={`w-full overflow-x-clip relative min-h-screen transition-opacity duration-700 ease-in-out ${isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
                <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<PageTransition><Portfolio /></PageTransition>} />
                        <Route path="/certificates" element={
                            <PageTransition>
                                <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>}>
                                    <Certificates />
                                </Suspense>
                            </PageTransition>
                        } />
                        <Route path="/blog" element={
                            <PageTransition>
                                <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>}>
                                    <BlogList />
                                </Suspense>
                            </PageTransition>
                        } />
                        <Route path="/blog/:slug" element={
                            <PageTransition>
                                <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>}>
                                    <BlogPost />
                                </Suspense>
                            </PageTransition>
                        } />
                        <Route path="*" element={
                            <PageTransition>
                                <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>}>
                                    <NotFound />
                                </Suspense>
                            </PageTransition>
                        } />
                    </Routes>
                </AnimatePresence>
                <BackToTop />
                <SearchModal />
            </div>
            </LazyMotion>
        </ApiProvider>
    )
}

export default App
