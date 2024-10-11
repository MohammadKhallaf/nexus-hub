/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          main: '#2328FD',
          light: '#6367FE',
          dark: '#1B1FC7',
          contrastText: '#FFFFFF',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          main: '#02C3FE',
          light: '#4DD2FE',
          dark: '#0198C7',
          contrastText: '#000000',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        tertiary: {
          main: '#2349A0',
          light: '#4A6BC7',
          dark: '#1A3778',
          contrastText: '#FFFFFF',
        },
        background: 'hsl(var(--background))',
        text: {
          primary: '#000000',
          secondary: '#424242',
          disabled: '#757575',
        },
        error: {
          main: '#D32F2F',
          light: '#EF5350',
          dark: '#C62828',
          contrastText: '#FFFFFF',
        },
        warning: {
          main: '#ED6C02',
          light: '#FF9800',
          dark: '#E65100',
          contrastText: '#000000',
        },
        info: {
          main: '#0288D1',
          light: '#03A9F4',
          dark: '#01579B',
          contrastText: '#FFFFFF',
        },
        success: {
          main: '#2E7D32',
          light: '#4CAF50',
          dark: '#1B5E20',
          contrastText: '#FFFFFF',
        },
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animate'),
  ],
};
