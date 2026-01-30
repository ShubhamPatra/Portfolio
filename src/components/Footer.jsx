/**
 * Footer component - Zine-style footer (mobile responsive)
 * Exact match of code.html lines 235-239
 */
function Footer() {
    return (
        <footer className="p-4 md:p-10 text-center font-terminal text-base md:text-xl">
            <div className="inline-block border-t-2 border-zine-ink pt-3 md:pt-4 px-4 md:px-8 transform rotate-1">
                <span className="block md:inline">(C) 2004-2026 SHUBHAM_DEV_ARCHIVE</span>
                <span className="hidden md:inline"> | </span>
                <span className="block md:inline">POWERED BY TAILWIND &amp; COFFEE</span>
                <span className="hidden md:inline"> | </span>
                <span className="block md:inline text-zine-red">END_OF_LINE</span>
            </div>
        </footer>
    );
}

export default Footer;
