import Link from 'next/link'
import {
  ArrowRight, Bookmark, Building2, ChevronRight, FileText, Image as ImageIcon,
  Megaphone, MessageSquare, Search, ShieldCheck, Sparkles, UserRound, Zap,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import {
  ArticleListCard, CompactGridCard, CompactIndexCard, EditorialFeatureCard, RailPostCard,
  getEditablePostImage, postHref,
} from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const taskIcon: Record<TaskKey, typeof FileText> = {
  article: FileText,
  listing: Building2,
  classified: Megaphone,
  image: ImageIcon,
  sbm: Bookmark,
  pdf: FileText,
  profile: UserRound,
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

// Latest posts' real images (newest first, deduped, placeholders dropped).
function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

// Merge the primary feed with the time-window feeds so home always has content,
// even when one source comes back empty for this site.
function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

/* --------------------------- Search-first hero -------------------------- */
export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool)
  const featured = pool[0]
  const [titleLead, titleTail] = pagesContent.home.hero.title
  const categories = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile')

  return (
    <section className="border-b border-[var(--editable-border)] bg-[var(--slot4-page-bg)]">
      <div className={`grid gap-14 py-14 pb-24 sm:py-20 sm:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center ${container}`}>
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">
            <Sparkles className="h-3.5 w-3.5" /> {pagesContent.home.hero.badge}
          </p>
          <h1 className="editable-display mt-6 text-balance text-5xl font-medium leading-[1.05] tracking-[-0.01em] sm:text-6xl lg:text-[4rem]">
            {titleLead} <span className="italic text-[var(--slot4-accent)]">{titleTail}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.home.hero.description}</p>

          <form action="/search" className="mt-9 flex w-full max-w-xl overflow-hidden rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] shadow-[0_16px_50px_rgba(31,32,90,0.10)]">
            <div className="flex flex-1 items-center gap-2.5 pl-6">
              <Search className="h-5 w-5 shrink-0 text-[var(--slot4-accent)]" />
              <input
                name="q"
                placeholder={pagesContent.home.hero.searchPlaceholder}
                className="w-full bg-transparent py-4 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
              />
            </div>
            <button className="shrink-0 bg-[var(--slot4-accent)] px-7 text-sm font-semibold text-white transition hover:bg-[var(--slot4-teal)]">
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {categories.map((task) => {
              const Icon = taskIcon[task.key] || FileText
              return (
                <Link
                  key={task.key}
                  href={task.route}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-2 text-sm font-medium text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]"
                >
                  <Icon className="h-3.5 w-3.5" /> {task.label}
                </Link>
              )
            })}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[var(--editable-border)] pt-6 text-sm text-[var(--slot4-muted-text)]">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[var(--slot4-accent)]" /> Verified profiles</span>
            <span className="inline-flex items-center gap-2"><Zap className="h-4 w-4 text-[var(--slot4-accent)]" /> New briefs weekly</span>
            <span className="hidden items-center gap-2 sm:inline-flex"><MessageSquare className="h-4 w-4 text-[var(--slot4-accent)]" /> Direct contact, no middleman</span>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-[var(--slot4-ink)] lg:aspect-[4/5]">
            <EditableHeroCollage images={heroImages} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,21,48,0.05),rgba(20,21,48,0.6))]" />
          </div>
          {featured ? (
            <div className="absolute -bottom-10 left-1/2 w-[88%] -translate-x-1/2 rounded-[1.5rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 shadow-[0_24px_60px_rgba(31,32,90,0.18)] sm:left-6 sm:w-[80%] sm:translate-x-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{pagesContent.home.hero.focusLabel}</p>
              <p className="editable-display mt-2 line-clamp-2 text-lg font-medium leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)]">{featured.title}</p>
              <Link href={postHref(primaryTask, featured, primaryRoute)} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)] hover:underline">
                View listing <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

/* ------------------------ Image-first browsing rail ---------------------- */
export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).slice(0, 10)
  if (!pool.length) return null
  return (
    <section className="bg-[var(--slot4-panel-bg)]">
      <div className={`py-14 sm:py-16 ${container}`}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">Fresh in the directory</p>
            <h2 className="editable-display mt-2 text-3xl font-medium tracking-[-0.01em] sm:text-4xl">Newest briefs and profiles</h2>
          </div>
          <Link href={primaryRoute} className="hidden items-center gap-1 text-sm font-semibold text-[var(--slot4-accent)] hover:underline sm:inline-flex">
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className={`mt-8 ${dc.layout.rail}`}>
          {pool.map((post, index) => (
            <RailPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------- Featured + editorial list split ------------------ */
export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  if (!pool.length) return null
  const [feature, ...rest] = pool
  const secondary = rest.slice(0, 4)

  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">In focus</p>
            <h2 className="editable-display mt-2 text-3xl font-medium tracking-[-0.01em] sm:text-4xl">This week&rsquo;s standout listing</h2>
          </div>
          <Link href={primaryRoute} className="hidden items-center gap-1 text-sm font-semibold text-[var(--slot4-accent)] hover:underline sm:inline-flex">
            Browse {taskLabel(primaryTask).toLowerCase()} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <EditorialFeatureCard post={feature} href={postHref(primaryTask, feature, primaryRoute)} label={taskLabel(primaryTask)} />
          {secondary.length ? (
            <div className="grid gap-4">
              {secondary.map((post, index) => (
                <ArticleListCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

/* --------------------- Time-based discovery collections ------------------ */
const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'Posted in the last 7 days' },
  browse: { eyebrow: 'Popular now', title: 'Getting the most attention' },
  index: { eyebrow: 'From the archive', title: 'Worth a second look' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  // Use the real time windows; fall back to slicing posts so the page stays full.
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, index) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        return (
          <section key={section.key} className={index % 2 === 0 ? 'bg-[var(--slot4-panel-bg)]' : 'bg-[var(--slot4-page-bg)]'}>
            <div className={`py-14 sm:py-16 ${container}`}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{copy.eyebrow}</p>
                  <h2 className="editable-display mt-2 text-3xl font-medium tracking-[-0.01em] sm:text-4xl">{copy.title}</h2>
                </div>
                <Link href={section.href || primaryRoute} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[var(--slot4-accent)] hover:underline">
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post) => (
                  <CompactGridCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* ------------------------------ Directory list --------------------------- */
export function EditableDirectoryList({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).slice(0, 8)
  if (!pool.length) return null
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`py-14 sm:py-16 ${container}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">At a glance</p>
        <h2 className="editable-display mt-2 text-3xl font-medium tracking-[-0.01em] sm:text-4xl">Recently added to the directory</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {pool.map((post, index) => (
            <CompactIndexCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- CTA band ------------------------------ */
export function EditableHomeCta() {
  const cta = pagesContent.home.cta
  return (
    <section id="get-listed" className="scroll-mt-24 bg-[var(--slot4-ink)]">
      <div className={`flex flex-col items-center gap-6 py-16 text-center sm:py-20 ${container}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--slot4-mint)]">{cta.badge}</p>
        <h2 className="editable-display max-w-2xl text-3xl font-medium tracking-[-0.01em] text-[var(--slot4-ink-text)] sm:text-4xl">
          {cta.title}
        </h2>
        <p className="max-w-xl text-base text-[var(--slot4-ink-muted)] sm:text-lg">{cta.description}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={cta.primaryCta.href} className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-mint)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-ink)] transition hover:brightness-105">
            {cta.primaryCta.label}
          </Link>
          <Link href={cta.secondaryCta.href} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
            {cta.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
