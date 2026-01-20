/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // VS Code Dark+ theme colors
        ide: {
          bg: "#1e1e1e",
          sidebar: "#252526",
          sidebarHover: "#2a2d2e",
          sidebarActive: "#37373d",
          tab: "#2d2d2d",
          tabActive: "#1e1e1e",
          tabBorder: "#252526",
          editor: "#1e1e1e",
          statusBar: "#007acc",
          statusBarHover: "#1f8ad2",
          activityBar: "#333333",
          border: "#3c3c3c",
          text: "#cccccc",
          textMuted: "#808080",
          textBright: "#ffffff",
          accent: "#007acc",
          accentHover: "#1f8ad2",
          success: "#4ec9b0",
          warning: "#dcdcaa",
          error: "#f14c4c",
          lineNumber: "#858585",
          selection: "#264f78",
          comment: "#6a9955",
          keyword: "#569cd6",
          string: "#ce9178",
          number: "#b5cea8",
          type: "#4ec9b0",
          function: "#dcdcaa",
          variable: "#9cdcfe",
          operator: "#d4d4d4",
        },
      },
      fontFamily: {
        code: [
          '"Fira Code"',
          '"JetBrains Mono"',
          "Consolas",
          "Monaco",
          "monospace",
        ],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        code: ["13px", { lineHeight: "1.5" }],
        "code-sm": ["12px", { lineHeight: "1.5" }],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
        cursor: "cursor 1s ease-in-out infinite",
        "loading-bar": "loadingBar 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(-10px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        cursor: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        loadingBar: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [],
};
