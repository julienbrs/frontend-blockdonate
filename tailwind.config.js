/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            sans: ["Montserrat", "sans-serif"],
        },
        colors: {
            fieryorange: "#EA580C",
            lightgrey: "#64748B",
        },
        extend: {
            width: {
                custom: "w-${roundedWidth}",
            },
        },
    },
    plugins: [],
}
