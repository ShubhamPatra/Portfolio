/**
 * InkStamp - Zine-style rubber stamp marks
 * "CLASSIFIED", "TOP SECRET", etc. for that redacted aesthetic
 */
function InkStamp({ text = 'CLASSIFIED', color = 'red', rotation = -12, className = '' }) {
    const colorMap = {
        red: 'border-zine-red/30 text-zine-red/20',
        blue: 'border-zine-blue/30 text-zine-blue/20',
        ink: 'border-zine-ink/20 text-zine-ink/15',
    };

    const colors = colorMap[color] || colorMap.red;

    return (
        <div
            className={`absolute font-pixel text-[8px] md:text-xs border-2 md:border-3 px-2 md:px-3 py-1 rounded-sm select-none pointer-events-none ${colors} ${className}`}
            style={{ transform: `rotate(${rotation}deg)` }}
            aria-hidden="true"
        >
            {text}
        </div>
    );
}

export default InkStamp;
