import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'A curated directory for independent freelancers',
      description: 'Browse freelance briefs, offers, and verified professional profiles in one considered, editorial-quality directory.',
      openGraphTitle: 'A curated directory for independent freelancers',
      openGraphDescription: 'Freelance briefs and profiles, presented with the credibility they deserve.',
      keywords: ['freelance directory', 'freelance briefs', 'independent professionals', 'classified marketplace'],
    },
    hero: {
      badge: 'For independent professionals',
      title: ['A considered home for', 'freelance work and the people behind it.'],
      description: 'Post a brief, browse fresh offers, or step into a directory of independent professionals — presented with the clarity and credibility serious work deserves.',
      primaryCta: { label: 'Browse briefs & offers', href: '/classified' },
      secondaryCta: { label: 'Post a brief', href: '/create' },
      searchPlaceholder: 'Search briefs, offers, skills, or names',
      focusLabel: 'In focus',
      featureCardBadge: 'currently in focus',
      featureCardTitle: 'The latest brief leads the homepage.',
      featureCardDescription: 'Fresh listings rotate through the centre of the experience without changing how the directory works underneath.',
    },
    intro: {
      badge: 'How the directory works',
      title: 'A quieter way to post work and be found for it.',
      paragraphs: [
        'This directory pairs two things: short, practical briefs from people who need work done, and considered profiles from the independent professionals ready to do it.',
        'Instead of a noisy feed, every listing gets the same clean, editorial treatment — so a well-written brief and a well-built profile both get the attention they deserve.',
        'Start from either side — a brief or a profile — and keep discovering related work without losing your place.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'A search-first homepage built around briefs and profiles.',
        'Two connected sections: Briefs & Offers, and the Freelancer Directory.',
        'A calmer browsing rhythm designed for considered decisions.',
        'Direct contact paths — no unnecessary steps between interest and outreach.',
      ],
      primaryLink: { label: 'Browse briefs', href: '/classified' },
      secondaryLink: { label: 'Post a brief', href: '/create' },
    },
    cta: {
      badge: 'Get listed',
      title: 'Post a brief and get in front of the right people.',
      description: 'One clear listing is all it takes to be found.',
      primaryCta: { label: 'Post a brief', href: '/create' },
      secondaryCta: { label: 'Contact the team', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our approach',
    title: 'A calmer, more considered way to find and be found for freelance work.',
    description: `${slot4BrandConfig.siteName} pairs freelance briefs and offers with the independent professionals ready to deliver them — in one editorial-quality directory.`,
    paragraphs: [
      'Instead of a crowded, low-signal marketplace, we keep every listing to the same clean standard — whether it is a brief looking for the right person, or a profile looking for the right project.',
      'Whether someone starts by posting a brief or by browsing profiles, they can keep exploring related work without losing context.',
    ],
    values: [
      {
        title: 'Clarity first',
        description: 'We prioritize clean structure and honest detail so briefs and profiles are easy to compare and act on.',
      },
      {
        title: 'Two sides, one standard',
        description: 'Briefs & Offers and the Freelancer Directory stay connected, so discovery feels natural from either side.',
      },
      {
        title: 'Built on trust',
        description: 'Clear contact paths and consistent presentation help genuine work and genuine people stand out.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Tell us what you are trying to post, find, or fix.',
    description: 'Whether it is a brief, a profile, or a general question about the directory, we will route it to the right place instead of a generic support queue.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search briefs, offers, freelancer profiles, and categories across the directory.',
    },
    hero: {
      badge: 'Search the directory',
      title: 'Find the right brief or the right freelancer, faster.',
      description: 'Use keywords, skills, or categories to search across every active brief and profile in the directory.',
      placeholder: 'Search briefs, offers, skills, or names',
    },
    resultsTitle: 'Latest across the directory',
  },
  create: {
    metadata: {
      title: 'Post to the directory',
      description: 'Post a new brief, offer, or freelancer profile.',
    },
    locked: {
      badge: 'Directory access',
      title: 'Login to post a brief or profile.',
      description: 'Use your account to open the posting workspace and add a new brief, offer, or profile to the directory.',
    },
    hero: {
      badge: 'Posting workspace',
      title: 'Post a brief, offer, or profile.',
      description: 'Choose the listing type, add the details, and publish a clean post with images, links, a summary, and the full description.',
    },
    formTitle: 'Listing details',
    submitLabel: 'Publish listing',
    successTitle: 'Your listing is live.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to the directory.',
      description: 'Login to keep browsing, manage your listings, and post new briefs or profiles from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Directory access',
      title: 'Create your account and get listed.',
      description: 'Create an account to open the posting workspace, save your details, and publish briefs or profiles to the directory.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'More from the directory',
      fallbackDescription: 'This profile will appear here in full once details are published.',
      visitButton: 'Visit website',
    },
  },
} as const
