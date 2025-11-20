import type { Config } from 'tailwindcss'

// Tailwind CSS v4 - Theme configuration is done in globals.css using @theme
// This config file is optional and mainly used for plugins
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // In v4, you can add plugins here if needed
  // Theme configuration should be in globals.css using @theme directive
}

export default config