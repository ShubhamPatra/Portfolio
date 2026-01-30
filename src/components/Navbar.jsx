import { useState } from 'react';

/**
 * Navbar component - Sticky header with navigation
 * Layout from code.html lines 62-83
 */
function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: '#about', label: 'About' },
        { href: '#experience', label: 'Experience' },
        { href: '#skills', label: 'Skills' },
        { href: '#projects', label: 'Projects' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background-light/90 dark:bg-background-dark/90 border-b border-gray-200 dark:border-border-dark">
            <div className="px-4 md:px-10 py-4 flex items-center justify-between max-w-6xl mx-auto w-full">
                {/* Logo */}
                <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-primary">terminal</span>
                    <h2 className="text-lg font-bold tracking-tight">ShubhamDev</h2>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            className="text-sm font-medium hover:text-primary transition-colors"
                            href={link.href}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* CTA Button */}
                <a
                    className="hidden md:flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-9 px-4 bg-primary hover:bg-opacity-90 transition-opacity text-background-dark text-sm font-bold tracking-wide"
                    href="#contact"
                >
                    <span>Get in touch</span>
                </a>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className="material-symbols-outlined">
                        {mobileMenuOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <nav className="md:hidden border-t border-border-dark bg-background-dark/95 backdrop-blur-md">
                    <div className="px-4 py-4 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                className="text-sm font-medium hover:text-primary transition-colors"
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            className="flex cursor-pointer items-center justify-center rounded-lg h-9 px-4 bg-primary text-background-dark text-sm font-bold"
                            href="#contact"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Get in touch
                        </a>
                    </div>
                </nav>
            )}
        </header>
    );
}

export default Navbar;
