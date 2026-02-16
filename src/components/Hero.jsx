import { personal } from '../data/personal';
import MarginNote from './MarginNote';

/**
 * Hero component - Zine-style hero section (mobile responsive)
 * Exact match of code.html lines 101-117
 */
function Hero() {
    return (
        <section id="hero" aria-labelledby="hero-heading" className="relative flex flex-col lg:flex-row items-center gap-6 md:gap-10 mb-16 md:mb-32">
            <MarginNote text="pg. 01 // init_sequence" side="left" className="top-10" />
            <div className="pasted-block distressed-border w-full lg:max-w-[44rem] z-10 !p-4 md:!p-6" style={{ '--rotation': '-1deg' }}>
                <div className="tape hidden md:block"></div>
                <div className="mb-3 md:mb-4 bg-zine-ink text-white inline-block px-2 md:px-4 py-1 font-pixel text-[8px] md:text-xs">
                    STATUS: {personal.availableForWork ? 'ONLINE' : 'OFFLINE'}
                </div>
                <h1 id="hero-heading" className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-pixel text-zine-ink leading-none mb-4 md:mb-6">
                    HELLO!<br />
                    <span className="text-zine-red">I'M {personal.name.split(' ')[0].toUpperCase()}</span>
                </h1>
                <p className="font-typewriter text-base md:text-xl lg:text-2xl text-zine-ink leading-tight max-w-lg italic">
                    {personal.tagline} Sometimes it's pretty, sometimes it's just code held together by duct tape and high-latency dreams.
                </p>
            </div>
            <div className="relative w-full max-w-sm md:max-w-md lg:-ml-20 mt-6 lg:mt-0">
                <div className="pasted-block border-4 border-zine-blue !p-2" style={{ '--rotation': '3deg' }}>
                    <div className="staple"></div>
                    <img
                        alt="Developer Terminal"
                        className="w-full aspect-square object-cover"
                        src="/hero-dev.svg"
                    />
                    <div className="font-pixel text-[6px] md:text-[8px] mt-2 text-zine-blue">FIG. 01: SYSTEM_CRITICAL_FAILURE_OR_ART?</div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
