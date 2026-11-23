/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Manrope"', 'system-ui', 'sans-serif'],
        body:    ['"Inter"',   'system-ui', 'sans-serif'],
        // Keep these aliased so any leftover font-serif / font-sans
        // classes degrade gracefully to Manrope instead of Georgia
        serif:   ['"Manrope"', 'system-ui', 'sans-serif'],
        sans:    ['"Inter"',   'system-ui', 'sans-serif'],
      },
      colors: {
        // ── Brand palette ──────────────────────────────────────────────
        brand: {
          white:     '#FFFFFF',
          bg:        '#F4F7F3',   // light background (body, portal bg)
          primary:   '#315B45',   // primary green (buttons, links, active states)
          secondary: '#6F9278',   // secondary green (sub-labels, icons)
          dark:      '#26352D',   // dark text (headings, body copy)
          accent:    '#B58A55',   // warm gold accent (time, advisory contexts)
        },
        // ── shadcn/ui CSS-variable tokens (keep for ui/* components) ──
        border:     'hsl(var(--border))',
        input:      'hsl(var(--input))',
        ring:       'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
