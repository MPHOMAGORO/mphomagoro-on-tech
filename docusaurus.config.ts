import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Mpho Magoro on Tech',
  tagline: 'AI Engineering, Solution Architecture and Software Engineering',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://mphomagoro.com',

  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'MPHOMAGORO', 
  projectName: 'mphomagoro-on-tech', 

  onBrokenLinks: 'throw',

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
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Mpho Magoro on Tech', 
      items: [
        {
          to: '/articles', 
          label: 'Articles', 
          position: 'left'
        },
        {
          to: '/guides', 
          label: 'Guides', 
          position: 'left'
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
    copyright: `© ${new Date().getFullYear()} Mpho Magoro on Tech`,
  },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
