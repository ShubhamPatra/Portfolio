import { useForm, ValidationError } from '@formspree/react';
import { contact } from '../data/contact';

/**
 * Contact component - Zine-style transmit data form with Formspree React
 */
function Contact() {
    const [state, handleSubmit] = useForm("meekrjjb");

    return (
        <section className="max-w-3xl mx-auto mb-10 md:mb-20 px-2 md:px-0" id="contact">
            <div className="pasted-block border-4 md:border-8 border-double border-zine-ink !p-3 sm:!p-4 md:!p-6" style={{ '--rotation': '0.5deg' }}>
                <h3 className="font-pixel text-sm sm:text-lg md:text-3xl mb-4 sm:mb-6 md:mb-8 text-center break-all sm:break-normal">
                    TRANSMIT_DATA
                </h3>

                {state.succeeded ? (
                    <div className="text-center py-10">
                        <div className="text-4xl mb-4">📡</div>
                        <p className="font-pixel text-lg text-zine-red mb-4">TRANSMISSION_RECEIVED!</p>
                        <p className="font-typewriter text-lg">Will respond via carrier pigeon.</p>
                    </div>
                ) : (
                    <form className="space-y-3 sm:space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div className="relative">
                            <label htmlFor="name" className="font-terminal text-base sm:text-lg md:text-2xl block mb-1 sm:mb-2 underline">IDENTITY:</label>
                            <input
                                id="name"
                                className="w-full bg-transparent border-2 border-zine-ink p-2 sm:p-3 md:p-4 font-typewriter text-sm md:text-base focus:ring-0 focus:border-zine-red outline-none"
                                placeholder="Who are you?"
                                type="text"
                                name="name"
                                required
                            />
                            <ValidationError prefix="Name" field="name" errors={state.errors} className="font-terminal text-zine-red text-sm mt-1" />
                        </div>
                        <div className="relative">
                            <label htmlFor="email" className="font-terminal text-base sm:text-lg md:text-2xl block mb-1 sm:mb-2 underline">E_MAIL:</label>
                            <input
                                id="email"
                                className="w-full bg-transparent border-2 border-zine-ink p-2 sm:p-3 md:p-4 font-typewriter text-sm md:text-base focus:ring-0 focus:border-zine-blue outline-none"
                                placeholder="Where do I reply?"
                                type="email"
                                name="email"
                                required
                            />
                            <ValidationError prefix="Email" field="email" errors={state.errors} className="font-terminal text-zine-red text-sm mt-1" />
                        </div>
                        <div className="relative">
                            <label htmlFor="message" className="font-terminal text-base sm:text-lg md:text-2xl block mb-1 sm:mb-2 underline">MESSAGE:</label>
                            <textarea
                                id="message"
                                className="w-full bg-transparent border-2 border-zine-ink p-2 sm:p-3 md:p-4 font-typewriter text-sm md:text-base focus:ring-0 focus:border-zine-ink outline-none resize-none"
                                placeholder="Talk to me..."
                                rows="4"
                                name="message"
                                required
                            ></textarea>
                            <ValidationError prefix="Message" field="message" errors={state.errors} className="font-terminal text-zine-red text-sm mt-1" />
                        </div>

                        <button
                            className="w-full bg-zine-ink text-white font-pixel py-3 sm:py-4 md:py-6 text-[10px] sm:text-sm md:text-xl hover:bg-zine-red transition-colors active:translate-y-1 disabled:opacity-50"
                            type="submit"
                            disabled={state.submitting}
                        >
                            {state.submitting ? 'TRANSMITTING...' : 'SEND_MESSAGE'}
                        </button>
                    </form>
                )}

                <div className="mt-6 sm:mt-8 md:mt-12 flex flex-col items-center gap-2 sm:gap-3 md:gap-4">
                    <p className="font-terminal text-base sm:text-lg md:text-2xl">OR_USE_OLD_TECH:</p>
                    <a
                        className="font-pixel text-[8px] sm:text-xs md:text-base text-zine-blue hover:underline break-all text-center px-2"
                        href={`mailto:${contact.email}`}
                    >
                        {contact.email.toUpperCase()}
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Contact;
