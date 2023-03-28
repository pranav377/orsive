module.exports = {
    darkMode: 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        ripple: (theme) => ({
            colors: theme('colors'),
        }),
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('tailwindcss-ripple')(),
        require('@tailwindcss/forms'),
    ],
};
