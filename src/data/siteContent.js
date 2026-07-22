/** Migrated from GoDaddy Website Builder content at https://mycomicbooks.ca (2026). */

export const site = {
  name: 'My Comic Books',
  legalName: 'My Comic Books',
  domain: 'mycomicbooks.ca',
  metaDescription:
    'Online comic book store that offers vintage, hard to find books.',
  ogDescription: 'Your ultimate source for comics, collectibles, and more!',
  email: 'sales@mycomicbooks.ca',
  /** Inbox for contact form submissions */
  contactEmail: 'rollen77@gmail.com',
  themeColor: '#fec52d',
}

export const heroCopy = {
  kicker: 'Comic Books Galore.',
  title: 'Discover the World of Comic Books',
  subtitle: 'Your online destination for comic books and more.',
}

/** Theme song — plays on homepage landing (browser may require one click). */
export const themeSong = {
  title: 'Red Hoodie Hare',
  src: '/site/audio/red-hoodie-hare.mp3',
  loop: true,
  volume: 0.45,
}

export const quotes = [
  {
    text: 'A PICTURE IS WORTH A THOUSAND WORDS BUT A COMIC BOOK IS WORTH A MILLION.',
    attribution: 'For the love of comic books',
    image: '/site/hero-mycomicbooks.png',
    imageAlt: 'Hare mascot reading a comic book in an armchair',
  },
]

export const comicIssue = {
  title: 'Hare: The Hero Within',
  issue: 'Issue #1 — The Great Escape',
  subtitle: '1st appearance of Hare',
  pages: [
    { src: '/site/gallery-hare-1.jpg', alt: 'Hare: The Hero Within — page 1' },
    { src: '/site/gallery-hare-2.jpg', alt: 'Hare: The Hero Within — page 2' },
    { src: '/site/gallery-hare-3.jpg', alt: 'Hare: The Hero Within — page 3' },
  ],
  /** Drop your narration MP3 at public/site/comics/hare-issue-1.mp3 */
  audio: {
    src: '/site/comics/hare-issue-1.mp3',
    title: 'Listen to Issue #1',
    description: 'Audio narration for The Great Escape.',
  },
}

export const newsletter = {
  title: 'Be the first to hear about new arrivals, popular comics, and upcoming sales.',
  body: 'Contact us for pricing details.',
}

export const podcast = {
  title: 'My Comic Books Podcast',
  body: 'Stream episodes covering keys, market moves, and collecting stories.',
  /**
   * Add episodes here to stream on the homepage.
   * Use audioUrl for an MP3/M4A file (local under /public or a CDN URL),
   * or embedSrc for a Spotify / Apple Podcasts / Buzzsprout iframe src.
   *
   * Example:
   * { id: 'ep-1', title: 'Episode 1', description: '…', date: '2026-01-15', audioUrl: '/podcasts/ep1.mp3' }
   * { id: 'ep-2', title: 'Episode 2', description: '…', date: '2026-02-01', embedSrc: 'https://open.spotify.com/embed/episode/…' }
   */
  episodes: [
    {
      id: 'comic-collecting-unveiled',
      title: 'Comic Collecting Unveiled',
      description:
        'A deep dive into the world of comic book collecting — keys, grading, and what makes a book worth chasing.',
      audioUrl: '/podcasts/comic-collecting-unveiled.mp3',
    },
  ],
}

/** Logo animation — hero panel on the right; plays once, then replays every 60s. */
export const vimeo = {
  id: '845698047',
  hash: '5aea1142fc',
  replayIntervalMs: 60_000,
}

export const posts = [
  {
    slug: 'the-art-of-comic-book-collecting',
    title: 'The Art of Comic Book Collecting',
    summary: 'Collecting Strategies and Best Practices',
    date: '2025-01-12',
    image: '/site/blog-blob.png',
    body: [
      'Collecting Strategies and Best Practices',
      'Whether you are curating a long box or chasing graded keys, a clear focus helps you enjoy the hunt and protect your investment. Start with the characters and eras you love, learn grading basics, and buy the best copy you can afford for the shelf.',
    ],
  },
  {
    slug: 'will-the-x-men-and-fantastic-four-movies-boost-comic-book-demand',
    title: 'Will the X-Men and Fantastic Four Movies Boost Comic Book Demand?',
    summary:
      'The revival of the X-Men and Fantastic Four film franchises has sparked renewed interest in superhero narratives. This resurgence in cinematic storytelling is likely to boost demand for comic books, as audiences seek to explore the source material behind their favorite characters.',
    date: '2025-01-08',
    image: '/site/blog-marvel.jpg',
    body: [
      'The revival of the X-Men and Fantastic Four film franchises has sparked renewed interest in superhero narratives. This resurgence in cinematic storytelling is likely to boost demand for comic books, as audiences seek to explore the source material behind their favorite characters.',
      'If you are hunting first appearances or iconic runs, we can help you track down copies in the condition you want. Reach out with your want list.',
    ],
  },
  {
    slug: 'why-superhero-movie-mania-made-vintage-comics-so-valuable',
    title: 'Why Superhero Movie Mania Made Vintage Comics so Valuable',
    summary: 'The Rise of Superhero Movies and Their Cultural Impact',
    date: '2025-01-02',
    image: '/site/blog-vintage.webp',
    body: [
      'The Rise of Superhero Movies and Their Cultural Impact',
      'Hollywood blockbusters introduced generations of fans to characters first printed decades ago. That spotlight often sends readers back to the original stories—and collectors toward the books that started it all.',
    ],
  },
  {
    slug: 'the-joy-and-value-of-collecting-comic-books',
    title: 'The Joy and Value of Collecting Comic Books',
    summary:
      'Collecting comic books is more than a hobby; it’s a blend of nostalgia, art appreciation, storytelling, and even savvy investing. Whether you are drawn to the vibrant artwork, compelling narratives, or the thrill of finding a rare issue, comic book collecting offers something for everyone.',
    date: '2024-12-16',
    image: '/site/blog-joy.jpg',
    body: [
      'Collecting comic books is more than a hobby; it’s a blend of nostalgia, art appreciation, storytelling, and even savvy investing. Whether you are drawn to the vibrant artwork, compelling narratives, or the thrill of finding a rare issue, comic book collecting offers something for everyone.',
      'We stock vintage and hard-to-find books alongside newer releases. Email us with what you are looking for and we will reply with availability and pricing.',
    ],
  },
]

export function postBySlug(slug) {
  return posts.find((p) => p.slug === slug)
}
