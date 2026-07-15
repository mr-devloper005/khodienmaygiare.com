import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

// Reduce any content payload — rich HTML, entity-encoded HTML, or already-plain text — to
// a clean plain-text card summary. Card excerpts must never show raw markup regardless of
// what the content API sends. Two tag-strip passes (before + after entity decode) also catch
// entity-encoded markup like &lt;p&gt;.
export function toPlainText(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof post?.summary === 'string' && post.summary) ||
    (typeof content.body === 'string' && content.body) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    ''
  const clean = toPlainText(raw)
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

// Featured card style — large dark editorial cover, used once per section.
export function EditorialFeatureCard({ post, href, label = 'Featured' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group block min-w-0 overflow-hidden ${dc.surface.dark} ${dc.motion.lift}`}>
      <div className="relative min-h-[460px] p-7 sm:p-9 lg:min-h-[560px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,21,48,0.15),rgba(20,21,48,0.92))]" />
        <div className="relative z-10 flex h-full min-h-[400px] flex-col justify-end lg:min-h-[480px]">
          <span className={`${dc.type.eyebrow} ${pal.accentSoftText}`}>{label}</span>
          <h3 className="editable-display mt-5 max-w-3xl text-3xl font-medium leading-[1.08] tracking-[-0.01em] sm:text-4xl lg:text-5xl">{post.title}</h3>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-white/70 sm:text-base">{getEditableExcerpt(post, 190)}</p>
          <span className={`mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--slot4-mint)] px-5 py-3 text-sm font-semibold text-[var(--slot4-ink)]`}>
            View details <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

// Image-first rail card — compact, image-led, used for horizontal browsing rails.
export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group ${dc.layout.minRailCard} block overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
      <div className={`${dc.media.frame} ${dc.media.ratio}`}>
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-[var(--slot4-ink)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-ink-text)]">No. {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="p-5">
        <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{getEditableCategory(post)}</p>
        <h3 className={`editable-display mt-3 line-clamp-3 text-xl font-medium leading-snug tracking-[-0.01em] ${pal.panelText}`}>{post.title}</h3>
        <p className={`mt-3 line-clamp-3 text-sm leading-7 ${pal.softMutedText}`}>{getEditableExcerpt(post, 135)}</p>
      </div>
    </Link>
  )
}

// Editorial / numbered-list card style — minimal image, index-forward.
export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block min-w-0 ${dc.surface.soft} p-5 ${dc.motion.lift}`}>
      <div className="flex items-start gap-4">
        <span className="editable-display flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-ink)] text-sm font-medium text-[var(--slot4-ink-text)]">{index + 1}</span>
        <div className="min-w-0">
          <p className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${pal.accentText}`}><Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}</p>
          <h3 className={`editable-display mt-2 line-clamp-2 text-lg font-medium leading-snug tracking-[-0.01em] ${pal.panelText}`}>{post.title}</h3>
          <p className={`mt-2 line-clamp-2 text-sm leading-6 ${pal.softMutedText}`}>{getEditableExcerpt(post, 105)}</p>
        </div>
      </div>
    </Link>
  )
}

// Horizontal card style — image left, content right, used for dense lists.
export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group grid min-w-0 gap-5 overflow-hidden ${dc.surface.card} p-4 ${dc.motion.lift} sm:grid-cols-[220px_minmax(0,1fr)]`}>
      <div className={`${dc.media.frame} aspect-[16/12] sm:aspect-auto sm:min-h-[190px]`}>
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0 p-2 sm:py-4 sm:pr-5">
        <p className={`${dc.type.eyebrow} ${pal.accentText}`}>No. {String(index + 1).padStart(2, '0')}</p>
        <h2 className={`editable-display mt-3 line-clamp-3 text-2xl font-medium leading-snug tracking-[-0.01em] ${pal.panelText}`}>{post.title}</h2>
        <p className={`mt-4 line-clamp-3 text-sm leading-7 ${pal.softMutedText}`}>{getEditableExcerpt(post, 180)}</p>
        <span className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${pal.accentText}`}>Open listing <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

// Compact grid card style — small image, tight metadata, used for dense browsing grids.
export function CompactGridCard({ post, href }: { post: SitePost; href: string }) {
  const category = getEditableCategory(post)
  return (
    <Link href={href} className={`group block min-w-0 overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
      <div className={`${dc.media.frame} aspect-[4/3]`}>
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--slot4-ink)] shadow-sm">{category}</span>
      </div>
      <div className="p-4">
        <h3 className="editable-display line-clamp-2 text-base font-medium leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 100)}</p>
      </div>
    </Link>
  )
}
