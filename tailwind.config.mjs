/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // VS Code theme colors - use CSS custom properties for dynamic theming
        ide: {
          bg: "var(--theme-bg)",
          sidebar: "var(--theme-sidebar)",
          sidebarHover: "var(--theme-sidebar-hover)",
          sidebarActive: "var(--theme-sidebar-active)",
          tab: "var(--theme-tab)",
          tabActive: "var(--theme-tab-active)",
          tabBorder: "var(--theme-tab-border)",
          editor: "var(--theme-editor)",
          statusBar: "var(--theme-status-bar)",
          statusBarHover: "var(--theme-status-bar-hover)",
          activityBar: "var(--theme-activity-bar)",
          border: "var(--theme-border)",
          text: "var(--theme-text)",
          textMuted: "var(--theme-text-muted)",
          textBright: "var(--theme-text-bright)",
          accent: "var(--theme-accent)",
          accentHover: "var(--theme-accent-hover)",
          success: "var(--theme-success)",
          warning: "var(--theme-warning)",
          error: "var(--theme-error)",
          lineNumber: "var(--theme-line-number)",
          selection: "var(--theme-selection)",
          comment: "var(--theme-comment)",
          keyword: "var(--theme-keyword)",
          string: "var(--theme-string)",
          number: "var(--theme-number)",
          type: "var(--theme-type)",
          function: "var(--theme-function)",
          variable: "var(--theme-variable)",
          operator: "var(--theme-operator)",
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
