/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'inner': 'inset 0 6px 4px 0 rgb(0 0 0 / 0.2)',
        'inner-bt': 'inset 0 -6px 4px 0 rgb(0 0 0 / 0.2)',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'pallet-0': '#05161A',
        'pallet-1': '#072E33',
        'pallet-2': '#0c7075',
        'pallet-3': '#0F969C',
        'pallet-4': '#6da5c0',
        'pallet-5': '#294d61',
        'pallet-6': '#17E9E1',
      },
      fontFamily: {
        sans: ['var(--font-bebasNeue)'],
        mono: ['var(--font-inter)'],
        roboto: ['var(--font-roboto)']
      },
    },
  },
  plugins: [],
}
