/**
 * Console easter egg — ASCII art banner + info sections
 * Inspired by Bruno Simon's portfolio console greeting
 */

const banner = `
███████╗██╗  ██╗██╗   ██╗██████╗ ██╗  ██╗ █████╗ ███╗   ███╗
██╔════╝██║  ██║██║   ██║██╔══██╗██║  ██║██╔══██╗████╗ ████║
███████╗███████║██║   ██║██████╔╝███████║███████║██╔████╔██║
╚════██║██╔══██║██║   ██║██╔══██╗██╔══██║██╔══██║██║╚██╔╝██║
███████║██║  ██║╚██████╔╝██████╔╝██║  ██║██║  ██║██║ ╚═╝ ██║
╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝

██████╗  █████╗ ████████╗██████╗  █████╗
██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗
██████╔╝███████║   ██║   ██████╔╝███████║
██╔═══╝ ██╔══██║   ██║   ██╔══██╗██╔══██║
██║     ██║  ██║   ██║   ██║  ██║██║  ██║
╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝
`;

function box(title, lines) {
  const inner = lines.map((l) => `║ ${l}`).join("\n");
  return `╔═ ${title} ${"═".repeat(Math.max(0, 40 - title.length))}╗\n${inner}\n╚${"═".repeat(43)}╝`;
}

export function printConsoleGreeting() {
  // Main banner
  console.log(
    `%c${banner}`,
    "color: #b91c1c; font-family: monospace; font-size: 12px; font-weight: bold;"
  );

  // Intro
  console.log(
    `%c${box("Intro", [
      "Well well well… inspecting my portfolio, are we? I respect the hustle.",
      "Go ahead, dig through the source. No secrets here — just clean code (mostly).",
      "Crafted with React, Tailwind CSS & Vite — because life's too short for slow builds.",
    ])}`,
    "color: #f3f4f1; font-family: monospace; font-size: 12px;"
  );

  // Socials
  console.log(
    `%c${box("Socials", [
      "Email    ⇒ shubhampatra635@gmail.com",
      "GitHub   ⇒ https://github.com/ShubhamPatra",
      "LinkedIn ⇒ https://www.linkedin.com/in/patrashubham/",
    ])}`,
    "color: #6d8fd4; font-family: monospace; font-size: 12px;"
  );

  // Tech Stack
  console.log(
    `%c${box("Tech Stack", [
      "React 19  ⇒ https://react.dev/",
      "Vite 7    ⇒ https://vitejs.dev/",
      "Tailwind 4 ⇒ https://tailwindcss.com/",
      "Deployed on GitHub Pages",
    ])}`,
    "color: #b91c1c; font-family: monospace; font-size: 12px;"
  );

  // Projects
  console.log(
    `%c${box("Featured Projects", [
      "Split-It      ⇒ https://split-it.live",
      "CodeTogether  ⇒ https://codetogetherfrontend.onrender.com/",
      "CareerConnect ⇒ https://careerconnect.infinityfreeapp.com",
      "Nyxfolio      ⇒ https://v1.shubhampatra.dev",
      "Nyx           ⇒ https://nyxai.onrender.com/",
    ])}`,
    "color: #6d8fd4; font-family: monospace; font-size: 12px;"
  );

  // Hire me
  console.log(
    `%c${box("Open to Work", [
      "I'm currently looking for new opportunities!",
      "If you like what you see, let's talk.",
      "shubhampatra635@gmail.com",
    ])}`,
    "color: #b91c1c; font-family: monospace; font-size: 12px; font-weight: bold;"
  );
}
