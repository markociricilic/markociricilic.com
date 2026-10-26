"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"

// Runs in <head> before first paint so the page never flashes the wrong theme.
// Uses the visitor's saved choice, otherwise their system preference.
export const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var d=document.documentElement;d.dataset.theme=t;d.style.colorScheme=t}catch(e){}})()`

type ThemeContextValue = { isDark: boolean; toggle: () => void }

const ThemeContext = createContext<ThemeContextValue>({ isDark: false, toggle: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.dataset.theme === "dark")
  }, [])

  const toggle = useCallback(() => {
    const next = !isDark
    const theme = next ? "dark" : "light"
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.colorScheme = theme
    try {
      localStorage.setItem("theme", theme)
    } catch {}
    setIsDark(next)
  }, [isDark])

  return <ThemeContext.Provider value={{ isDark, toggle }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeToggle() {
  const { isDark, toggle } = useTheme()

  return (
    <button className="toggle" onClick={toggle} aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}>
      {isDark ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
