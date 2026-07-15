'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Menu, Search, UserPlus, LogIn, X, PlusCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile').map((task) => ({ label: task.label, href: task.route })),
    []
  )

  return (
    <header className="sticky top-0 z-50 bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)]">
      {/* Masthead utility bar */}
      <div className="hidden bg-[var(--slot4-ink)] text-[var(--slot4-ink-text)] sm:block">
        <div className="mx-auto flex max-w-[var(--editable-container)] items-center justify-between px-4 py-2 text-[11px] font-medium tracking-[0.08em] sm:px-6 lg:px-8">
          <span className="text-[var(--slot4-ink-muted)]">{globalContent.nav?.tagline || SITE_CONFIG.tagline}</span>
          <Link href="/create" className="inline-flex items-center gap-1.5 text-[var(--slot4-mint)] transition hover:text-white">
            Post a brief <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      <div className="border-b border-[var(--editable-border)] backdrop-blur-md">
        <nav className="mx-auto flex min-h-[84px] w-full max-w-[var(--editable-container)] items-center gap-6 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-14 w-14 object-contain" />
            <span className="editable-display hidden max-w-[220px] truncate text-2xl font-medium italic leading-none tracking-[-0.01em] md:block">{SITE_CONFIG.name}</span>
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] transition ${
                    active
                      ? 'bg-[var(--slot4-accent)] text-white'
                      : 'text-[var(--slot4-page-text)] hover:bg-[var(--slot4-panel-bg)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/about"
              className={`rounded-full px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] transition ${
                pathname === '/about' ? 'bg-[var(--slot4-accent)] text-white' : 'text-[var(--slot4-page-text)] hover:bg-[var(--slot4-panel-bg)]'
              }`}
            >
              About
            </Link>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2.5">
            <button
              type="button"
              onClick={() => setSearchOpen((value) => !value)}
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-[var(--editable-border)] text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] md:inline-flex"
              aria-label="Toggle search"
              aria-expanded={searchOpen}
            >
              <Search className="h-4 w-4" />
            </button>

            {session ? (
              <>
                <Link
                  href="/create"
                  className="hidden items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-5 py-2.5 text-[13px] font-semibold text-[var(--editable-cta-text)] transition hover:bg-[var(--slot4-teal)] sm:inline-flex"
                >
                  <PlusCircle className="h-3.5 w-3.5" /> Post
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="hidden items-center gap-2 rounded-full px-3 py-2.5 text-[13px] font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-flex"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-flex"
                >
                  <LogIn className="h-3.5 w-3.5" /> Login
                </Link>
                <Link
                  href="/signup"
                  className="hidden items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-5 py-2.5 text-[13px] font-semibold text-[var(--editable-cta-text)] transition hover:bg-[var(--slot4-teal)] sm:inline-flex"
                >
                  <UserPlus className="h-3.5 w-3.5" /> Get listed
                </Link>
              </>
            )}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--editable-border)] text-[var(--slot4-page-text)] lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {searchOpen ? (
          <div className="hidden border-t border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] md:block">
            <form action="/search" className="mx-auto flex max-w-[var(--editable-container)] items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
              <Search className="h-4 w-4 shrink-0 text-[var(--slot4-accent)]" />
              <input
                name="q"
                type="search"
                autoFocus
                placeholder="Search briefs, offers, skills, or names"
                className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
              />
              <button className="shrink-0 rounded-full bg-[var(--slot4-accent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[var(--slot4-teal)]">
                Search
              </button>
            </form>
          </div>
        ) : null}
      </div>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-6 lg:hidden">
          <form action="/search" className="mb-6 flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-3">
            <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
            <input name="q" type="search" placeholder="Search briefs, offers, skills…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-muted-text)]" />
          </form>
          <div className="grid gap-1.5">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Post', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Get listed', href: '/signup' }])].map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] ${
                    active
                      ? 'bg-[var(--slot4-accent)] text-white'
                      : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-panel-bg)] hover:text-[var(--slot4-page-text)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {session ? (
              <button type="button" onClick={logout} className="rounded-2xl px-4 py-3.5 text-left text-sm font-semibold uppercase tracking-[0.12em] text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-panel-bg)]">
                Logout
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
