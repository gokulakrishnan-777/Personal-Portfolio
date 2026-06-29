import React from 'react';

const Tooltip = ({ text, children, position = 'bottom', shortcut }) => {
    return (
        <div className="group/tooltip relative flex items-center  justify-center">
            {children}
            
            <div className={`pointer-events-none absolute z-100 opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-200 origin-center group-hover/tooltip:delay-1000
                ${position === 'bottom' ? 'top-full mt-2.5' : ''}
                ${position === 'top' ? 'bottom-full mb-2.5' : ''}
                ${position === 'left' ? 'right-full mr-2.5' : ''}
                ${position === 'right' ? 'left-full ml-2.5' : ''}
            `}>
                <div className="relative flex items-center gap-2 px-3 py-2 text-[11px] font-medium text-white bg-black dark:bg-slate-100 dark:text-slate-950 rounded-lg shadow-md whitespace-nowrap  tracking-wide">
                    <span>{text}</span>
                    {shortcut && (
                        <kbd className="px-1.5 py-0.5 font-sans font-medium bg-white/20 dark:bg-black/10 rounded-sm text-[10px] text-slate-300 dark:text-slate-600 border border-white/10 dark:border-black/5">
                            {shortcut}
                        </kbd>
                    )}
                    {/* Arrow */}
                    <div className={`absolute border-4 border-transparent 
                        ${position === 'bottom' ? 'top-[-8px] left-1/2 -translate-x-1/2 border-b-black dark:border-b-slate-100' : ''}
                        ${position === 'top' ? 'bottom-[-8px] left-1/2 -translate-x-1/2 border-t-black dark:border-t-slate-100' : ''}
                        ${position === 'left' ? 'right-[-8px] top-1/2 -translate-y-1/2 border-l-black dark:border-l-slate-100' : ''}
                        ${position === 'right' ? 'left-[-8px] top-1/2 -translate-y-1/2 border-r-black dark:border-r-slate-100' : ''}
                    `}></div>
                </div>
            </div>
        </div>
    );
};

export default Tooltip;
