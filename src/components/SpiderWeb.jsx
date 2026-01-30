/**
 * SpiderWeb component - Decorative corner spider webs
 * Spider-Man themed decoration
 */
function SpiderWeb({ position = 'top-left', size = 'md', className = '' }) {
    const sizeClasses = {
        sm: 'w-16 h-16 md:w-24 md:h-24',
        md: 'w-24 h-24 md:w-32 md:h-32',
        lg: 'w-32 h-32 md:w-48 md:h-48',
    };

    const positionClasses = {
        'top-left': 'top-0 left-0',
        'top-right': 'top-0 right-0 -scale-x-100',
        'bottom-left': 'bottom-0 left-0 -scale-y-100',
        'bottom-right': 'bottom-0 right-0 -scale-x-100 -scale-y-100',
    };

    return (
        <div className={`absolute ${positionClasses[position]} ${sizeClasses[size]} pointer-events-none ${className}`}>
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-40">
                {/* Radial lines from corner */}
                <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" />
                <line x1="0" y1="0" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" />
                <line x1="0" y1="0" x2="100" y2="0" stroke="currentColor" strokeWidth="0.5" />
                <line x1="0" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" />
                <line x1="0" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.5" />
                <line x1="0" y1="0" x2="70" y2="25" stroke="currentColor" strokeWidth="0.5" />
                <line x1="0" y1="0" x2="25" y2="70" stroke="currentColor" strokeWidth="0.5" />

                {/* Concentric arcs */}
                <path d="M 20 0 Q 20 20 0 20" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <path d="M 40 0 Q 40 40 0 40" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <path d="M 60 0 Q 60 60 0 60" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <path d="M 80 0 Q 80 80 0 80" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <path d="M 100 0 Q 100 100 0 100" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </svg>
        </div>
    );
}

export default SpiderWeb;
