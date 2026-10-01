import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Mpho Magoro on Tech',
  tagline: 'AI Engineering, Solution Architecture and Software Engineering',
  favicon: 'img/favicon/favicon.ico',

  // Set the production url of your site here
  url: 'https://mphomagoro.com',

  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'MPHOMAGORO', 
  projectName: 'mphomagoro-on-tech', 

  onBrokenLinks: 'throw',

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap',
      type: 'text/css',
    },
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'guides',
          sidebarPath: './sidebars.ts',
          routeBasePath: 'guides',
        },
        blog: {
          path: 'articles',
          routeBasePath: 'articles',
          blogSidebarCount: 0,
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },

          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-8BQ8W900ZZ',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/mpho-magoro-social-card.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Mpho Magoro',
      logo: {
        alt: 'Mpho Magoro on Tech',
        src: 'img/mm-mark.svg',
      },
      items: [
        {
          to: '/articles', 
          label: 'Articles', 
          position: 'right',
        },
        {
          to: '/guides', 
          label: 'Guides', 
          position: 'right'
        },
         {
          to: '/about', 
          label: 'About', 
          position: 'right'
        },
      ],
    },
  footer: {
    style: 'light',
    links: [],
    copyright: `© ${new Date().getFullYear()} Mpho Magoro. All rights reserved.`,
  },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
