import { useState } from 'react';

/**
 * Header component - Zine-style fixed header (mobile responsive)
 * Exact match of code.html lines 89-99
 * 
 * Requirements: 9.3, 9.5
 * - All nav links have proper href attributes
 * - Implements smooth scroll behavior for hash navigation
 */
function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    /**
     * Handle smooth scroll navigation to sections
     * @param {Event} e - Click event
     * @param {string} targetId - ID of the target section (without #)
     */
    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            // Update URL hash for bookmarking without triggering scroll
            window.history.pushState(null, '', `#${targetId}`);
        }
        // Close mobile menu after navigation
        setMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-[60] p-2 md:p-4 flex flex-wrap gap-2 md:gap-4 items-start pointer-events-none">
            {/* Logo */}
            <div className="pasted-block border-2 border-zine-ink pointer-events-auto !p-2 md:!p-6" style={{ '--rotation': '2deg' }}>
                <div className="font-pixel text-xs md:text-xl uppercase tracking-tighter text-zine-red">Shubham_Dev</div>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden pasted-block border border-zine-ink px-3 py-2 font-terminal text-lg pointer-events-auto"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ '--rotation': '-1deg' }}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
            >
                {menuOpen ? 'CLOSE' : 'MENU'}
            </button>

            {/* Desktop Navigation */}
            <nav aria-label="Main navigation" className="hidden md:flex gap-2 pointer-events-auto">
                <a
                    className="pasted-block border border-zine-ink px-3 py-1 font-terminal text-lg hover:bg-zine-blue hover:text-white transition-all"
                    href="#about"
                    onClick={(e) => handleNavClick(e, 'about')}
                    style={{ '--rotation': '-2deg' }}
                >
                    ABOUT
                </a>
                <a
                    className="pasted-block border border-zine-ink px-3 py-1 font-terminal text-lg hover:bg-zine-red hover:text-white transition-all"
                    href="#experience"
                    onClick={(e) => handleNavClick(e, 'experience')}
                    style={{ '--rotation': '1deg' }}
                >
                    HISTORY
                </a>
                <a
                    className="pasted-block border border-zine-ink px-3 py-1 font-terminal text-lg hover:bg-zine-ink hover:text-white transition-all"
                    href="#projects"
                    onClick={(e) => handleNavClick(e, 'projects')}
                    style={{ '--rotation': '-3deg' }}
                >
                    WORKS
                </a>
                <a
                    className="pasted-block bg-zine-red text-white px-3 py-1 font-pixel text-[10px] hover:translate-y-1 transition-transform"
                    href="#contact"
                    onClick={(e) => handleNavClick(e, 'contact')}
                    style={{ '--rotation': '1deg' }}
                >
                    HIRE_ME
                </a>
            </nav>

            {/* Mobile Navigation */}
            {menuOpen && (
                <nav aria-label="Mobile navigation" className="w-full md:hidden flex flex-col gap-2 pointer-events-auto mt-2">
                    <a
                        className="pasted-block border border-zine-ink px-3 py-2 font-terminal text-lg hover:bg-zine-blue hover:text-white transition-all text-center"
                        href="#about"
                        onClick={(e) => handleNavClick(e, 'about')}
                        style={{ '--rotation': '-1deg' }}
                    >
                        ABOUT
                    </a>
                    <a
                        className="pasted-block border border-zine-ink px-3 py-2 font-terminal text-lg hover:bg-zine-red hover:text-white transition-all text-center"
                        href="#experience"
                        onClick={(e) => handleNavClick(e, 'experience')}
                        style={{ '--rotation': '1deg' }}
                    >
                        HISTORY
                    </a>
                    <a
                        className="pasted-block border border-zine-ink px-3 py-2 font-terminal text-lg hover:bg-zine-ink hover:text-white transition-all text-center"
                        href="#projects"
                        onClick={(e) => handleNavClick(e, 'projects')}
                        style={{ '--rotation': '-0.5deg' }}
                    >
                        WORKS
                    </a>
                    <a
                        className="pasted-block bg-zine-red text-white px-3 py-2 font-pixel text-[10px] hover:translate-y-1 transition-transform text-center"
                        href="#contact"
                        onClick={(e) => handleNavClick(e, 'contact')}
                        style={{ '--rotation': '0.5deg' }}
                    >
                        HIRE_ME
                    </a>
                </nav>
            )}
        </header>
    );
}

export default Header;
