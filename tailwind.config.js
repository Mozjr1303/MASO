/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./app.{js,ts,jsx,tsx}",
        "./App.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./services/**/*.{js,ts,jsx,tsx}"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                alchemy: {
                    50: '#e0f7fa',
                    100: '#b2ebf2',
                    400: '#26c6da',
                    500: '#00e5ff',
                    600: '#2979ff',
                    700: '#651fff',
                    800: '#4a148c',
                    900: '#1a0033',
                },
                slate: {
                    850: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                }
            }
        },
    },
    plugins: [],
}
