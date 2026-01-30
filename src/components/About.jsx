import { personal } from '../data/personal';
import { skillGroups } from '../data/skills';
import SpiderWeb from './SpiderWeb';

/**
 * About component - Zine-style manifesto and skills (mobile responsive)
 * Updated:  4 skill categories
 */
function About() {
    return (
        <section id="about" aria-labelledby="about-heading" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-20 md:mb-40 relative">
            <article className="pasted-block border-2 border-zine-ink self-start !p-4 md:!p-6" style={{ '--rotation': '2deg' }}>
                <h2 id="about-heading" className="font-pixel text-lg md:text-2xl mb-4 md:mb-8 border-b-4 border-zine-red pb-2 inline-block">MANIFESTO</h2>
                <p className="font-typewriter text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                    The web used to be fun. It was messy. It was human. I'm a software engineer who refuses to let everything become a sterile white box with rounded corners.
                </p>
                <p className="font-typewriter text-base md:text-lg leading-relaxed">
                    {personal.about.split('\n')[0]}
                </p>
            </article>
            <article className="relative" id="skills">
                <div className="pasted-block bg-zine-blue text-white distressed-border !p-4 md:!p-10" style={{ '--rotation': '-3deg' }}>
                    <h3 className="font-pixel text-base md:text-xl mb-4 md:mb-6">TOOLKIT.DAT</h3>
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        {skillGroups.map((group) => (
                            <div key={group.category}>
                                <h4 className="font-pixel text-[8px] md:text-[10px] text-zine-paper/70 mb-2">{group.category.toUpperCase()}</h4>
                                <ul className="font-terminal text-base md:text-xl space-y-1">
                                    {group.items.slice(0, 4).map(skill => (
                                        <li key={skill} className="hover:text-zine-paper text-sm md:text-xl">- {skill.toUpperCase()}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <SpiderWeb position="bottom-right" size="sm" className="text-zine-paper opacity-30" />
                <div className="absolute -bottom-6 md:-bottom-10 -right-2 md:-right-5 font-pixel text-3xl md:text-6xl opacity-10 select-none">SKILLS</div>
            </article>
        </section>
    );
}

export default About;
