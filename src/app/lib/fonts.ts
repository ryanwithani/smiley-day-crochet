// Import this at the layout level
import { Quicksand, Outfit, Shadows_Into_Light, Caveat } from 'next/font/google';

// Primary body font - Quicksand (friendly, rounded sans-serif with excellent readability)
const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Primary heading font - Outfit (modern, rounded font with good readability but personality)
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Handwritten accent - Shadows Into Light (maintain this for personal touches)
const shadowsIntoLight = Shadows_Into_Light({
  subsets: ['latin'],
  variable: '--font-shadows-into-light',
  weight: '400',
  display: 'swap',
});

// Script accent - Caveat (for product tags, sale badges, short accents)
const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Export the fonts for use in layout.tsx
export const fonts = {
  quicksand,
  outfit,
  shadowsIntoLight,
  caveat,
};