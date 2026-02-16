/**
 * MarginNote - Small rotated annotations in the margins
 * Handwritten-style notes that add zine character
 */
function MarginNote({ text, side = 'left', className = '' }) {
    const positionClasses = side === 'left'
        ? 'left-0 md:-left-4 -translate-x-0 md:-translate-x-full'
        : 'right-0 md:-right-4 translate-x-0 md:translate-x-full';

    return (
        <div
            className={`absolute ${positionClasses} font-typewriter text-[10px] md:text-xs text-zine-ink/20 select-none pointer-events-none hidden md:block ${className}`}
            style={{ transform: `rotate(${side === 'left' ? -90 : 90}deg)`, transformOrigin: side === 'left' ? 'right center' : 'left center' }}
            aria-hidden="true"
        >
            {text}
        </div>
    );
}

export default MarginNote;
