import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        v: 'var(--v)',
        'v-glow': 'var(--v-glow)',
        bg: 'var(--bg)',
        'bg-2': 'var(--bg-2)',
        fg: 'var(--fg)',
        mid: 'var(--mid)',
        low: 'var(--low)',
        line: 'var(--line)',
        'l-bg': 'var(--l-bg)',
        'l-ink': 'var(--l-ink)',
        'l-mid': 'var(--l-mid)',
        'l-line': 'var(--l-line)',
      },
      fontFamily: {
        mark: 'var(--mark)',
        sans: 'var(--sans)',
        jp: 'var(--jp)',
        mono: 'var(--mono)',
      },
    },
  },
  plugins: [],
};

export default config;
