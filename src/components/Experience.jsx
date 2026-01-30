import { experiences } from '../data/experience';

/**
 * Experience component - Zine-style redacted resume (mobile responsive)
 * Exact match of code.html lines 149-173
 */
function Experience() {
    return (
        <section className="mb-20 md:mb-40" id="experience">
            <h3 className="font-pixel text-xl md:text-3xl mb-8 md:mb-12 text-center transform -rotate-1 underline decoration-zine-red decoration-wavy">
                REDACTED RESUME
            </h3>
            <div className="space-y-8 md:space-y-12 max-w-4xl mx-auto">
                {experiences.map((exp, index) => (
                    <div key={exp.id} className="flex flex-col md:flex-row gap-0">
                        <div
                            className={`${index === 0 ? 'bg-zine-ink' : 'bg-zine-blue'} text-white font-pixel text-[8px] md:text-[10px] p-3 md:p-4 w-full md:w-48 shrink-0 flex items-center justify-center z-10`}
                            style={{ transform: index === 0 ? 'rotate(1deg)' : 'rotate(-2deg)' }}
                        >
                            {exp.period.toUpperCase()}
                        </div>
                        <div
                            className="pasted-block border-2 border-zine-ink flex-grow md:-ml-2 -mt-2 md:mt-0 !p-4 md:!p-6"
                            style={{ '--rotation': index === 0 ? '-0.5deg' : '1deg' }}
                        >
                            <h4 className="font-pixel text-sm md:text-lg mb-2">{exp.role.toUpperCase()}</h4>
                            <div className={`font-terminal text-lg md:text-xl ${index === 0 ? 'text-zine-red' : 'text-zine-blue'} mb-3 md:mb-4`}>
                                @ {exp.company.toUpperCase()}
                            </div>
                            <p className="font-typewriter text-sm md:text-base">{exp.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Experience;
