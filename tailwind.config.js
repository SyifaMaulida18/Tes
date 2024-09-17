/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#06549D", // header background
        secondary: "#9CCEFC", // nav bar background
        'primary-dark': '#0275a7',
        'light-gray': '#F1F4F5',
        'dark-gray': '#9E9E9E',
        'white': '#FFFFFF',
        'blue-light': '#CFE9E6',
        'login-bg': '#f4f7fc',
        'form-gray': '#e2e8f0',
        'button-hover': '#004e92',
      },
      spacing: {
        '69': '17.25rem',
        '71': '17.75rem',
      },
      fontSize: {
        '2xl': '1.5rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
      },
      fontFamily: {
        appearance: ['Appearance', 'sans-serif', 'Poppins'], // Add Appearance font
        poppins: ['Poppins', 'sans-serif'],
      },
      width: {
        '1/3': '33.3333%',
        '2/3': '66.6667%',
      },
      minWidth: {
        '320': '320px', // Example min-width
      },
    },
  },
  plugins: [],
};
