import React, { useEffect, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { useLenis } from 'lenis/react';
import { AnimatePresence, m as motion } from 'framer-motion';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const LoadingMessage = (
    <div className="flex items-center justify-center py-20 text-muted-foreground">
        <div className="w-6 h-6 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 font-medium text-sm">Loading PDF...</span>
    </div>
);

const ResumeModal = ({ isOpen, onClose }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1);
    const [pdfWidth, setPdfWidth] = useState(
        typeof window !== 'undefined' ? Math.min(window.innerWidth - 32, 800) : 800
    );
    
    const lenis = useLenis();
    
    // Handle window resize for PDF width
    useEffect(() => {
        const handleResize = () => {
            setPdfWidth(Math.min(window.innerWidth - 32, 800)); // 32px accounts for padding
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent scrolling on body when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open') ;
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.classList.remove('modal-open');
            document.documentElement.style.overflow = '';
        }
        return () => {
             document.body.classList.remove('modal-open');
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 2.5));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    data-lenis-prevent="true" 
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4"
                >
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="relative w-full max-w-4xl h-[90vh] sm:h-[85vh] bg-background border border-line rounded-xl shadow-2xl overflow-hidden flex flex-col"
                    >
                
                {/* Header */}
                <div className="flex items-center justify-between p-3 sm:p-4 border-b border-line shrink-0">
                    <div className="flex items-center gap-2 sm:gap-4">
                        <h2 className="text-lg font-semibold tracking-tight text-foreground hidden sm:block">Resume Preview</h2>
                        {/* Zoom Controls */}
                        <div className="flex items-center bg-muted/50 rounded-lg p-1">
                            <button type="button" onClick={handleZoomOut} className="p-1 sm:p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                            </button>
                            <span className="text-xs font-medium w-10 sm:w-12 text-center text-muted-foreground">{Math.round(scale * 100)}%</span>
                            <button type="button" onClick={handleZoomIn} className="p-1 sm:p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                        <a 
                            href="/Gokulakrishnan__A_Full stack developer.pdf" 
                            download
                            className="flex items-center gap-2 px-2 sm:px-3 py-1.5 text-sm font-medium bg-accent/10 text-accent hover:bg-accent/20 rounded-md transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                            <span className="hidden sm:block">Download</span>
                        </a>
                        <button 
                            type="button"
                            onClick={onClose}
                            className="p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground rounded-md transition-colors"
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                    </div>
                </div>

                {/* PDF Viewer */}
                <div className="flex-1 w-full bg-muted/20 overflow-y-auto overflow-x-hidden p-2 sm:p-8 flex justify-center custom-scrollbar">
                    <Document
                        file="/gokulakrishnan_software_developer.pdf"
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="flex flex-col items-center gap-4"
                        loading={LoadingMessage}
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page 
                                key={`page_${index + 1}`} 
                                pageNumber={index + 1} 
                                scale={scale}
                                width={pdfWidth}
                                className="shadow-lg shadow-black/5 ring-1 ring-border bg-white"
                                renderTextLayer={true}
                                renderAnnotationLayer={true}
                            />
                        ))}
                    </Document>
                </div>
            
                {/* Click outside to close */}
                <div 
                    className="absolute inset-0 -z-10" 
                    onClick={onClose}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClose(); }}
                    role="button"
                    tabIndex={0}
                    aria-label="Close modal backdrop"
                ></div>
                </motion.div>
            </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ResumeModal;
