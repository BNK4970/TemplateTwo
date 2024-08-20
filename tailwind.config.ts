/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    height: {
      section: "calc(100vh - 59px)"
    },
    colors: {
      foreground : "rgb(var(--color-foreground))",
      background : "rgb(var(--color-background))",    
      
      line : "rgb(var(--color-line))",
  
      primary : "rgb(var(--color-primary))",
      secondary : "rgb(var(--color-secondary))",
  
      success : "rgb(var(--color-success))",
      warning : "rgb(var(--color-warning))",
      danger : "rgb(var(--color-danger))",        
    },
  },
  plugins: [],
};
