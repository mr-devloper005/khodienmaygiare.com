import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

/*
  Luxury editorial task surfaces.

  Every task (archive + detail) shares one cohesive identity: warm ivory
  paper, a deep indigo accent, hairline lavender borders, and a serif +
  grotesque type pairing. Per-task copy (kicker / note) still varies so each
  section keeps its own voice. Tokens are delivered via CSS variables (`--tk-*`).
*/

export type TaskTheme = {
  /** short flavour word shown as an eyebrow kicker */
  kicker: string
  /** one-line mood note for the page intro */
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY_FONT = "'Fraunces', 'Times New Roman', Georgia, serif"
const BODY_FONT = "'DM Sans', 'Inter', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

// Shared editorial palette — every task inherits this; only kicker/note differ.
const base = {
  dark: false,
  fontDisplay: DISPLAY_FONT,
  fontBody: BODY_FONT,
  bg: '#fbf8f1',
  surface: '#ffffff',
  raised: '#f2efe2',
  text: '#22224a',
  muted: '#5b5c7c',
  line: '#e3e1ef',
  accent: '#31326f',
  accentSoft: '#a8fbd3',
  onAccent: '#ffffff',
  glow: 'rgba(79,183,179,0.14)',
  radius: '1.5rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Journal', note: 'In-depth reads, guides and stories worth your time.' },
  listing: { ...base, kicker: 'Directory', note: 'Find, compare and connect with local businesses.' },
  classified: { ...base, kicker: 'Briefs & Offers', note: 'Freelance briefs, gigs and offers worth a closer look — posted by people ready to move.' },
  image: { ...base, kicker: 'Gallery', note: 'A visual feed of standout images and galleries.' },
  sbm: { ...base, kicker: 'Saved', note: 'Curated resources and links worth saving.' },
  pdf: { ...base, kicker: 'Library', note: 'Downloadable guides, reports and references.' },
  profile: { ...base, kicker: 'The Directory', note: 'Independent freelancers and studios, presented with the credibility they have earned.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

/** All `--tk-*` tokens + font overrides for a task surface, ready for `style`. */
export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    // Re-point the shared article-body accent vars so post HTML (headings,
    // links) inherits this task's accent instead of the global site accent.
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
