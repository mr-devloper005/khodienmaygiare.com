'use client'

import Link from 'next/link'
import { ArrowUpRight, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile')
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="bg-[var(--slot4-ink)] text-[var(--slot4-ink-text)]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 pb-12 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
              <span className="editable-display text-2xl font-medium italic tracking-[-0.01em]">{SITE_CONFIG.name}</span>
            </Link>
            <p className="editable-display mt-6 max-w-sm text-2xl font-medium leading-snug tracking-[-0.01em]">
              {globalContent.footer?.tagline || 'Where independent talent finds its next brief'}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--slot4-ink-muted)]">{globalContent.footer?.description || SITE_CONFIG.description}</p>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-mint)]">Explore</h3>
            <div className="mt-5 grid gap-3">
              {taskLinks.map((task) => (
                <Link key={task.key} href={task.route} className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-[var(--slot4-ink-muted)] transition hover:text-white">
                  {task.label} <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                </Link>
              ))}
              <Link href="/search" className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-[var(--slot4-ink-muted)] transition hover:text-white">
                Search the directory <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-mint)]">Site</h3>
            <div className="mt-5 grid gap-3">
              {[
                ['About', '/about'],
                ['Contact', '/contact'],
                ...(session ? [['Post a listing', '/create']] : [['Login', '/login'], ['Get listed', '/signup']]),
              ].map(([label, href]) => (
                <Link key={href} href={href} className="text-sm font-medium text-[var(--slot4-ink-muted)] transition hover:text-white">{label}</Link>
              ))}
              {session ? <button type="button" onClick={logout} className="text-left text-sm font-medium text-[var(--slot4-ink-muted)] transition hover:text-white">Logout</button> : null}
            </div>
          </div>

          <div className="flex flex-col items-start">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-mint)]">Get in touch</h3>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--slot4-ink-muted)] transition hover:text-white">
              <Mail className="h-4 w-4" /> Contact form
            </Link>
            <p className="mt-4 max-w-[220px] text-sm leading-6 text-[var(--slot4-ink-muted)]">
              Have a brief ready? Get it in front of the directory in minutes.
            </p>
            <Link
              href="/create"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-mint)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--slot4-ink)] transition hover:-translate-y-0.5 hover:brightness-105"
            >
              Post a brief
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-8 text-xs font-medium tracking-[0.06em] text-[var(--slot4-ink-muted)] sm:flex-row">
          <span>© {year} {SITE_CONFIG.name}. All rights reserved.</span>
          <span>{globalContent.footer?.bottomNote || 'Built for considered work and clear introductions.'}</span>
        </div>
      </div>
    </footer>
  )
}
