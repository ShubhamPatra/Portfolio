/**
 * ZineDivider - Punk-style section dividers
 * Adds visual rhythm between sections
 */

const variants = {
    torn: (
        <div className="relative my-8 md:my-16 select-none" aria-hidden="true">
            <div className="flex items-center gap-2 md:gap-4 justify-center font-terminal text-lg md:text-2xl text-zine-ink/20 tracking-[0.5em]">
                {'×'.repeat(15)}
            </div>
        </div>
    ),
    redacted: (
        <div className="relative my-8 md:my-16 select-none" aria-hidden="true">
            <div className="h-px bg-zine-ink/10 w-full"></div>
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zine-paper px-4 md:px-6">
                <span className="font-pixel text-[6px] md:text-[8px] text-zine-ink/20 tracking-widest">[SECTION_BREAK]</span>
            </div>
        </div>
    ),
    dashed: (
        <div className="relative my-8 md:my-16 select-none" aria-hidden="true">
            <div className="border-t-2 border-dashed border-zine-ink/10 w-3/4 mx-auto"></div>
            <div className="absolute right-[12%] -translate-y-1/2 bg-zine-paper px-2">
                <span className="font-terminal text-sm md:text-lg text-zine-red/30">▼</span>
            </div>
        </div>
    ),
    glitch: (
        <div className="relative my-8 md:my-16 select-none" aria-hidden="true">
            <div className="flex justify-center gap-1">
                <div className="h-1 w-16 md:w-32 bg-zine-red/15 transform -skew-x-12"></div>
                <div className="h-1 w-8 md:w-16 bg-zine-blue/15 transform skew-x-12"></div>
                <div className="h-1 w-24 md:w-48 bg-zine-ink/10 transform -skew-x-6"></div>
            </div>
        </div>
    ),
};

function ZineDivider({ variant = 'torn' }) {
    return variants[variant] || variants.torn;
}

export default ZineDivider;
