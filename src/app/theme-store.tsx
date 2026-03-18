import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { ThemeContext, type ThemeMode } from './use-theme'
type ThemeTokens = Record<string, string>

const THEME_KEY = 'dashboard-theme-mode'

const brandTokens: Record<ThemeMode, ThemeTokens> = {
  light: {
    background: '190 32% 97%',
    foreground: '191 48% 13%',
    card: '0 0% 100%',
    'card-foreground': '191 48% 13%',
    popover: '0 0% 100%',
    'popover-foreground': '191 48% 13%',
    primary: '183 81% 36%',
    'primary-foreground': '0 0% 100%',
    secondary: '190 33% 93%',
    'secondary-foreground': '191 48% 13%',
    muted: '188 28% 91%',
    'muted-foreground': '195 18% 35%',
    accent: '165 67% 41%',
    'accent-foreground': '0 0% 100%',
    destructive: '0 72% 51%',
    'destructive-foreground': '0 0% 100%',
    border: '187 25% 84%',
    input: '187 25% 84%',
    ring: '183 81% 36%',
    radius: '0.9rem',
  },
  dark: {
    background: '193 43% 9%',
    foreground: '184 24% 91%',
    card: '193 39% 12%',
    'card-foreground': '184 24% 91%',
    popover: '193 39% 12%',
    'popover-foreground': '184 24% 91%',
    primary: '177 71% 46%',
    'primary-foreground': '195 45% 11%',
    secondary: '193 31% 17%',
    'secondary-foreground': '184 24% 91%',
    muted: '193 28% 19%',
    'muted-foreground': '189 16% 70%',
    accent: '165 68% 47%',
    'accent-foreground': '195 45% 11%',
    destructive: '0 70% 45%',
    'destructive-foreground': '0 0% 100%',
    border: '190 22% 24%',
    input: '190 22% 24%',
    ring: '177 71% 46%',
    radius: '0.9rem',
  },
}

function applyTokens(mode: ThemeMode) {
  const root = document.documentElement
  Object.entries(brandTokens[mode]).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value)
  })
  root.classList.toggle('dark', mode === 'dark')
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') {
      return 'light'
    }
    const savedMode = window.localStorage.getItem(THEME_KEY)
    return savedMode === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    applyTokens(mode)
    window.localStorage.setItem(THEME_KEY, mode)
  }, [mode])

  const value = useMemo(
    () => ({
      mode,
      toggleMode: () => setMode((current) => (current === 'dark' ? 'light' : 'dark')),
    }),
    [mode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
