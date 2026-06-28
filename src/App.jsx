import React, { Suspense, lazy } from 'react';
import Header from './assets/components/Header'
import { Home } from './assets/pages/Home.jsx'
import '@fontsource-variable/sansita-swashed';
import ApiProvider from './assets/context/ApiProvider.jsx'
import Text from './assets/components/Text.jsx';
import BackToTop from './assets/components/BackToTop.jsx';
import SearchModal from './assets/components/SearchModal.jsx';

// Lazy loaded components for performance optimization
const About = lazy(() => import('./assets/pages/About.jsx').then(module => ({ default: module.About })));
const Education = lazy(() => import('./assets/pages/Education.jsx'));
const Skill = lazy(() => import('./assets/pages/Skill.jsx'));
const Project = lazy(() => import('./assets/pages/Project.jsx'));
const GithubContributions = lazy(() => import('./assets/components/GithubContributions.jsx'));
const Contact = lazy(() => import('./assets/pages/Contact.jsx').then(module => ({ default: module.Contact })));

function App() {
    return (
        <ApiProvider>
            <div className="w-full overflow-x-clip relative min-h-screen">
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
            <BackToTop />
            <SearchModal />
            </div>
        </ApiProvider>
    )
}

export default App
