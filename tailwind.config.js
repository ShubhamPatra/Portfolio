/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#19e65e",
                "background-light": "#f6f8f6",
                "background-dark": "#112116",
                "surface-dark": "#1a3323",
                "border-dark": "#244730",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "mono": ["Fira Code", "monospace"],
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
        },
    },
    plugins: [],
}
