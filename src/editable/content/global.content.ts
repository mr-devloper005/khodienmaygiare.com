import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Independent reading platform',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'A directory for independent talent',
    primaryLinks: [
      { label: 'Briefs & Offers', href: '/classified' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Browse briefs & offers', href: '/classified' },
      secondary: { label: 'Post a brief', href: '/create' },
    },
  },
  footer: {
    tagline: 'Where independent talent finds its next brief',
    description: 'A curated marketplace pairing freelance briefs and offers with the independent professionals ready to deliver them.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Briefs & Offers', href: '/classified' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for considered work and clear introductions.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
