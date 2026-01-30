import { skillGroups } from '../data/skills';

/**
 * Skills component - 3-column grouped skills
 * Layout from code.html lines 187-231
 */
function Skills() {
    return (
        <section className="w-full px-4 md:px-10 py-16 max-w-6xl mx-auto bg-surface-dark/30 rounded-2xl my-8" id="skills">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Section Title */}
                <div className="md:col-span-3">
                    <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-primary block"></span>
                        Skills
                    </h2>
                </div>

                {/* Skills Grid */}
                <div className="md:col-span-9">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {skillGroups.map((group) => (
                            <div key={group.category} className="flex flex-col gap-4">
                                <h3 className="text-white font-bold border-b border-border-dark pb-2">
                                    {group.category}
                                </h3>
                                <ul className="font-mono text-sm text-white/70 space-y-2">
                                    {group.items.map((skill) => (
                                        <li key={skill} className="flex items-center gap-2">
                                            <span className="text-primary">&gt;</span>
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Skills;
