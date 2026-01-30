import { projects } from '../data/projects';
import SpiderWeb from './SpiderWeb';

/**
 * Projects component - Zine-style evidence section (mobile responsive)
 * With project links (GitHub + Live Demo)
 */
function Projects() {
    const rotations = ['-2deg', '1.5deg', '-1deg', '2deg', '-1.5deg', '1deg', '-0.5deg'];
    const bgColors = ['bg-zine-ink', 'bg-zine-red', '', 'bg-zine-blue', 'bg-zine-ink', 'bg-zine-red', ''];

    return (
        <section id="projects" aria-labelledby="projects-heading" className="mb-20 md:mb-40">
            <div className="relative mb-10 md:mb-20">
                <SpiderWeb position="top-right" size="sm" className="text-zine-red" />
                <div className="absolute inset-0 bg-zine-red h-2 transform -skew-y-2"></div>
                <h2 id="projects-heading" className="relative font-pixel text-2xl md:text-4xl bg-zine-paper px-2 md:px-4 inline-block transform -rotate-2">THE_EVIDENCE</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {projects.map((project, index) => (
                    <article
                        key={project.id}
                        className="pasted-block distressed-border hover:scale-105 transition-transform !p-4 md:!p-6"
                        style={{ '--rotation': rotations[index % rotations.length] }}
                    >
                        {index % 2 === 0 ? <div className="staple"></div> : <div className="tape"></div>}
                        <h3 className={`font-pixel text-xs md:text-sm mb-3 md:mb-4 ${bgColors[index % bgColors.length] || 'border-b-2 border-zine-ink'} ${bgColors[index % bgColors.length] ? 'text-white p-2' : ''}`}>
                            {project.name.toUpperCase().replace(/ /g, '_')}
                        </h3>
                        <p className="font-typewriter text-xs md:text-sm mb-4 md:mb-6">{project.description.slice(0, 100)}...</p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1 md:gap-2 mb-4">
                            {project.stack.slice(0, 3).map(tech => (
                                <span key={tech} className="font-terminal text-sm md:text-lg bg-zine-paper border border-zine-ink px-1 md:px-2">
                                    #{tech.toUpperCase().replace(/[.\s]/g, '')}
                                </span>
                            ))}
                        </div>

                        {/* Project Links */}
                        <div className="flex gap-2 md:gap-4 font-terminal text-sm md:text-lg">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border border-zine-ink px-2 py-1 hover:bg-zine-ink hover:text-white transition-colors"
                                >
                                    [CODE]
                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-zine-red text-white px-2 py-1 hover:bg-zine-blue transition-colors"
                                >
                                    [LIVE]
                                </a>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Projects;
