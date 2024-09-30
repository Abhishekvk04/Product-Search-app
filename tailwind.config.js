/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          100: '#F5E6D3',
          200: '#E6D0B8',
          300: '#D7BA9C',
          400: '#C8A581',
          500: '#B98F65',
          600: '#A97A4A',
          700: '#8C632D',
          800: '#6F4C10',
        },
      },
      gradientColorStops: theme => ({
        'brown-100': theme('colors.brown.100'),
        'brown-300': theme('colors.brown.300'),
      }),
    },
  },
  plugins: [],
}