import React, { use } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { themeContext } from '../context/themeApi';
import { GrGithub } from 'react-icons/gr';

const drawGokul = (data) => {
    if (!data || data.length === 0) return data;

    const textGrid = [
        ".XXX .XX. X..X X..X X...",
        "X... X..X X.X. X..X X...",
        "X.XX X..X XX.. X..X X...",
        "X..X X..X X.X. X..X X...",
        ".XXX .XX. X..X .XX. XXXX"
    ].map(row => row.replace(/ /g, '.'));

    const startDate = new Date(data[0].date);
    const startDayOfWeek = startDate.getDay(); 
    
    const startCol = 14; 
    const startRow = 1;  

    return data.map((day, index) => {
        const offsetIndex = index + startDayOfWeek;
        const col = Math.floor(offsetIndex / 7);
        const row = offsetIndex % 7;
        
        let level = 0;
        
        if (row >= startRow && row < startRow + 5 && col >= startCol && col < startCol + 24) {
            const char = textGrid[row - startRow][col - startCol];
            if (char === 'X') {
                level = 4; 
            }
        }
        
        return { ...day, level, count: level > 0 ? 100 : 0 };
    });
};

const GithubContributions = () => {
    const { theme } = use(themeContext);

    return (
        <section id="contributions" className="mx-auto w-full overflow-x-clip  px-2 md:max-w-3xl pt-8 pb-16">
            <div className="screen-line-top screen-line-bottom border-x  border-line p-4 md:p-6 flex flex-col items-center">
                <div className="flex w-full items-center gap-4 font-mono text-sm mb-6">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-line bg-muted text-muted-foreground">
                        <GrGithub size={14} />
                    </div>
                    <p className="font-semibold text-lg tracking-tight">GitHub Contributions</p>
                </div>
                
                <div className="no-scrollbar-wrapper w-full overflow-x-auto scrollbar-none flex justify-center border border-line rounded-xl p-4 bg-muted/20">
                    <GitHubCalendar 
                        username="gokulakrishnan-777" 
                        colorScheme={theme === 'dark' ? 'dark' : 'light'}
                        blockSize={12}
                        blockMargin={4}
                        fontSize={12}
                        blockRadius={1}
                        transformData={drawGokul}
                        
                    />
                </div>
            </div>
        </section>
    );
};

export default GithubContributions;
