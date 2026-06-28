import React from 'react'

const Text = () => {
    const word = "GOKUL";

    return (
        <div className="mt-20 w-full overflow-hidden max-w-7xl mx-auto flex justify-center items-center select-none group">
            <h1 className="text-[12vw] font-black  tracking-tighter whitespace-nowrap opacity-20 group-hover:opacity-100 transition-opacity duration-700 ease-out  caret-black  dark:caret-white cursor-crosshair flex">
                {word.split('').map((letter, index) => (
                    <span
                        key={index}
                        className="text-transparent [-webkit-text-stroke:2px_var(--color-muted-foreground)] hover:text-foreground transition-colors duration-500 ease-out"
                    >
                        {letter}
                    </span>
                ))}
            </h1>
        </div>
    )
}

export default Text