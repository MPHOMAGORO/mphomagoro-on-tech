import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const topics = [
  {
    title: 'AI Engineering',
    description:
      'Practical experiments, workflows and lessons from applying AI to real software engineering problems.',
    link: '/articles/tags/ai-engineering',
  },
  {
    title: 'GitHub Copilot',
    description:
      'Prompts, agents, skills and engineering workflows for getting more value from GitHub Copilot.',
    link: '/articles/tags/github-copilot',
  },
  {
    title: 'Solution Architecture',
    description:
      'Architecture decisions, trade-offs, diagrams and techniques for designing maintainable systems.',
    link: '/guides/solution-architecture',
  },
  {
    title: 'Software Engineering',
    description:
      'Engineering practices for APIs, distributed systems, cloud platforms and reliable delivery.',
    link: '/guides/software-engineering',
  },
];

function Hero() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroEyebrow}>
            Architecture · AI · Cloud · Engineering
          </div>

          <Heading as="h1" className={styles.heroTitle}>
            Mpho Magoro on Tech
          </Heading>

          <p className={styles.heroSubtitle}>
            Practical thinking on AI Engineering, Solution Architecture and
            Software Engineering.
          </p>

          <p className={styles.heroDescription}>
            Writing about what I build, what I learn, and the engineering
            decisions behind modern software systems.
          </p>

          <div className={styles.heroButtons}>
            <Link
              className="button button--primary button--lg"
              to="/articles">
              Read Articles
            </Link>

            <Link
              className="button button--secondary button--lg"
              to="/guides">
              Browse Guides
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function Topics() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Explore by topic</Heading>
          <p>
            Articles and guides covering the areas I work with and study.
          </p>
        </div>

        <div className={styles.topicGrid}>
          {topics.map((topic) => (
            <Link
              key={topic.title}
              to={topic.link}
              className={styles.topicCard}>
              <Heading as="h3">{topic.title}</Heading>
              <p>{topic.description}</p>
              <span className={styles.cardLink}>Explore →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section className={styles.featuredSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Start here</Heading>
          <p>A few pieces that represent what this site is about.</p>
        </div>

        <div className={styles.featureGrid}>
          <article className={styles.featureCard}>
            <span className={styles.tag}>GitHub Copilot</span>

            <Heading as="h3">
              I Used GitHub Copilot Every Day — Why I Still Took GH-300
            </Heading>

            <p>
              What certification added beyond everyday Copilot usage, and the
              engineering practices that mattered most.
            </p>

            <Link to="/articles">Read article →</Link>
          </article>

          <article className={styles.featureCard}>
            <span className={styles.tag}>Solution Architecture</span>

            <Heading as="h3">
              How to Write an Architecture Decision Record That Actually Helps
            </Heading>

            <p>
              A practical way to capture architectural decisions, alternatives
              and trade-offs without turning ADRs into bureaucracy.
            </p>

            <Link to="/articles">Read article →</Link>
          </article>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className={styles.aboutSection}>
      <div className="container">
        <div className={styles.about}>
          <div>
            <span className={styles.sectionLabel}>ABOUT</span>

            <Heading as="h2">
              Engineering depth. Architecture thinking.
            </Heading>

            <p>
              I'm Mpho Magoro, a senior software engineering and solution
              architecture professional working across cloud, integration,
              identity and distributed systems.
            </p>

            <p>
              This site is where I document the architecture decisions,
              engineering workflows and emerging AI practices I find useful.
            </p>

            <Link to="/about" className={styles.textLink}>
              More about me →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Mpho Magoro on Tech"
      description="AI Engineering, Solution Architecture and Software Engineering">
      <Hero />
      <main>
        <Topics />
        <Featured />
        <About />
      </main>
    </Layout>
  );
}