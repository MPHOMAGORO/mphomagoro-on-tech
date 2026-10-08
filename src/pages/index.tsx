import type {ComponentType, ReactNode, SVGProps} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import HeroIllustration from '@site/src/components/HeroIllustration';
import {
  ArrowUpRightIcon,
  ChipIcon,
  CodeIcon,
  CubeIcon,
  DocumentIcon,
  RingIcon,
  SparkleIcon,
  TerminalIcon,
} from '@site/src/components/Icons';

import styles from './index.module.css';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;
type Accent = 'blue' | 'violet' | 'mint' | 'peach';

const topics: {label: string; link: string; Icon: IconComponent; accent: Accent}[] = [
  {
    label: 'AI Engineering',
    link: '/articles/tags/ai-engineering',
    Icon: DocumentIcon,
    accent: 'blue',
  },
  {
    label: 'GitHub Copilot',
    link: '/articles/tags/github-copilot',
    Icon: RingIcon,
    accent: 'violet',
  },
  {
    label: 'Architecture',
    link: '/articles/tags/architecture',
    Icon: CubeIcon,
    accent: 'peach',
  },
  {
    label: 'Software Engineering',
    link: '/guides/software-engineering',
    Icon: CodeIcon,
    accent: 'mint',
  },
];

const latestArticles = [
  {
    title: 'When Should You Create An ADR',
    description: 'Everyday use meets a few unexpected lessons.',
    tag: 'Architecture',
    date: '30 Sep 2026',
    dateTime: '2026-09-30',
    image: '/img/articles/when-to-create-an-adr/crossroads.png',
    link: '/articles/when-to-create-an-adr',
  },
  {
    title: 'How GitHub Copilot Customisation Actually Fits Together',
    description: 'Prompts, instructions, skills, agents, hooks and MCP — made clearer.',
    tag: 'GitHub Copilot',
    date: '23 Sep 2026',
    dateTime: '2026-09-23',
    image: '/img/articles/prompts-vs-instructions-vs-skills-vs-agents/hero.png',
    link: '/articles/github-copilot-customisation',
  },
  {
    title: 'I Used GitHub Copilot Every Day — GH-300 Still Taught Me These Things',
    description: 'Everyday use meets a few unexpected lessons.',
    tag: 'AI Engineering',
    date: '11 Sep 2026',
    dateTime: '2026-09-11',
    image: '/img/articles/github-copilot-gh300/hero.png',
    link: '/articles/gh300-github-copilot-lessons',
  },
];

const guides: {
  title: string;
  description: string;
  link: string;
  Icon: IconComponent;
  accent: Accent;
}[] = [
  {
    title: 'AI Engineering',
    description: 'Practical patterns experiments, workflows and lessons from applying AI in software engineering problems.',
    link: '/guides/ai-engineering/introduction',
    Icon: ChipIcon,
    accent: 'blue',
  },
  {
    title: 'GitHub Copilot',
    description: 'Understand and shape your coding assistant.',
    link: '/guides/github-copilot',
    Icon: TerminalIcon,
    accent: 'violet',
  },
  {
    title: 'Software Engineering',
    description: 'Engineering practices for building scalable and maintainable software.',
    link: '/guides/software-engineering',
    Icon: CodeIcon,
    accent: 'mint',
  },
  {
    title: 'Solution Architecture',
    description: 'Architecture decisions, trade-offs and best practices.',
    link: '/guides/solution-architecture',
    Icon: CubeIcon,
    accent: 'peach',
  },
];

function Hero() {
  return (
    <header className={styles.hero}>
      <div className={clsx('container', styles.heroGrid)}>
        <div className={styles.heroCopy}>
          <span className={styles.badge}>
            <SparkleIcon className={styles.badgeIcon} />
          Architecture · AI · Cloud · Engineering
          </span>

          <p className={styles.eyebrow}>Mpho Magoro on Tech</p>

          <Heading as="h1" className={styles.heroTitle}>
            Big ideas. Better decisions.
            <span className={styles.gradientText}>A little curiosity.</span>
          </Heading>

          <p className={styles.heroSubtitle}>
     Practical thinking on AI Engineering, Solution Architecture and Software Engineering.
          </p>

          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="/articles">
              Find your next read
              <ArrowUpRightIcon className={styles.buttonIcon} />
            </Link>
            <Link className="button button--secondary button--lg" to="/guides">
              Explore guides
            </Link>
          </div>
        </div>

        <div className={styles.heroArt}>
          <HeroIllustration />
        </div>
      </div>
    </header>
  );
}

function Topics() {
  return (
    <section className="container" aria-label="Topics">
      <nav className={clsx('glass', styles.topicBar)}>
        <span className={styles.topicLabel}>
          Topics <span aria-hidden="true">/</span>
        </span>
        <ul className={styles.topicList}>
          {topics.map(({label, link, Icon, accent}) => (
            <li key={label}>
              <Link to={link} className={styles.topicChip}>
                <span className={clsx(styles.iconTile, styles[accent])}>
                  <Icon />
                </span>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

function LatestArticles() {
  return (
    <section className={clsx('container', styles.section)}>
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.eyebrow}>Latest articles</p>
          <Heading as="h2" className={styles.sectionTitle}>
            Fresh ideas, straight from the keyboard.
          </Heading>
        </div>
        <Link to="/articles" className={styles.arrowLink}>
          All articles <ArrowUpRightIcon />
        </Link>
      </div>

      <div className={styles.articleGrid}>
        {latestArticles.map((article) => (
          <Link
            key={article.link}
            to={article.link}
            className={clsx('glass', styles.articleCard)}>
            <div className={styles.articleImage}>
              <img src={article.image} alt="" loading="lazy" />
            </div>
            <div className={styles.articleBody}>
              <div className={styles.articleMeta}>
                <span className={styles.pill}>{article.tag}</span>
                <span aria-hidden="true" className={styles.metaDash} />
                <time dateTime={article.dateTime}>{article.date}</time>
              </div>
              <Heading as="h3" className={styles.articleTitle}>
                {article.title}
              </Heading>
              <p className={styles.articleDescription}>{article.description}</p>
              <span className={styles.arrowLink}>
                Read article <ArrowUpRightIcon />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Guides() {
  return (
    <section className={clsx('container', styles.section)}>
      <div className={styles.sectionHeader}>
        <div>
          <Heading as="h2" className={styles.sectionTitle}>
            Pick a rabbit hole.
          </Heading>
          <p className={styles.sectionLead}>
            Friendly starting points for deeper technical thinking.
          </p>
        </div>
        <span className={styles.status}>Growing collection</span>
      </div>

      <div className={styles.guideGrid}>
        {guides.map(({title, description, link, Icon, accent}) => (
          <Link key={title} to={link} className={clsx('glass', styles.guideCard)}>
            <span className={clsx(styles.iconTile, styles.iconTileLarge, styles[accent])}>
              <Icon />
            </span>
            <div>
              <Heading as="h3" className={styles.guideTitle}>
                {title}
              </Heading>
              <p className={styles.guideDescription}>{description}</p>
              <span className={styles.arrowLink}>
                Explore guide <ArrowUpRightIcon />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function AboutTeaser() {
  return (
    <section className={clsx('container', styles.section, styles.aboutSection)}>
      <div className={styles.aboutCopy}>
        <Heading as="h2" className={styles.sectionTitle}>
          Hey, I’m Mpho.
        </Heading>
        <p className={styles.sectionLead}>
         Writing about what I build, what I learn, and the engineering decisions behind modern software systems.
        </p>
        <Link to="/about" className={styles.arrowLink}>
          More about me <ArrowUpRightIcon />
        </Link>
      </div>

      <svg
        className={styles.aboutArt}
        viewBox="0 0 480 180"
        aria-hidden="true">
        <defs>
          <radialGradient id="about-orb" cx="0.35" cy="0.3" r="0.75">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.45" stopColor="#9fc2ff" />
            <stop offset="1" stopColor="#6e58ff" />
          </radialGradient>
          <linearGradient id="about-wave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6c7bff" stopOpacity="0.2" />
            <stop offset="0.5" stopColor="#8b5cff" />
            <stop offset="1" stopColor="#4de3ff" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <circle cx="300" cy="90" r="88" fill="#c8b8ff" opacity="0.25" />
        <path
          d="M10 110 C 90 40, 150 170, 240 100 S 390 40, 470 90"
          fill="none"
          stroke="url(#about-wave)"
          strokeWidth="2.5"
        />
        <path
          d="M10 130 C 110 80, 170 180, 260 120 S 400 80, 470 120"
          fill="none"
          stroke="url(#about-wave)"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <g stroke="#5b61d6" strokeWidth="1" opacity="0.5">
          <line x1="200" y1="40" x2="200" y2="120" />
          <line x1="300" y1="30" x2="300" y2="110" />
          <line x1="390" y1="20" x2="390" y2="80" />
        </g>
        <g fill="#2a2f6b">
          <circle cx="200" cy="120" r="3" />
          <circle cx="300" cy="110" r="3" />
          <circle cx="390" cy="80" r="3" />
        </g>
        <circle cx="110" cy="100" r="20" fill="url(#about-orb)" />
        <rect x="370" y="20" width="96" height="60" rx="10" fill="#ffffff" opacity="0.55" />
        <g fill="#9aa3e8" opacity="0.8">
          <rect x="384" y="34" width="56" height="5" rx="2.5" />
          <rect x="384" y="47" width="42" height="5" rx="2.5" />
          <rect x="384" y="60" width="50" height="5" rx="2.5" />
        </g>
      </svg>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Mpho Magoro on Tech"
      description="AI Engineering, Architecture and Software Engineering">
      <Hero />
      <main className={styles.main}>
        <Topics />
        <LatestArticles />
        <Guides />
        <AboutTeaser />
      </main>
    </Layout>
  );
}
