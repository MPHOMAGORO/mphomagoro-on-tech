import type {ReactNode} from 'react';
import Layout from '@theme/Layout';

export default function AboutPage(): ReactNode {
  return (
    <Layout
      title="About"
      description="About Mpho Magoro and the work published on this site.">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>About</h1>

            <p>
              I’m Mpho Magoro, a software engineering and solution architecture
              professional focused on cloud, integration, identity and distributed
              systems.
            </p>

            <p>
              This site is where I document the engineering workflows, architecture
              decisions and AI practices I find useful in practice.
            </p>

            <p>
              My work sits at the intersection of software delivery, system design
              and practical AI adoption — with an emphasis on making technical work
              clearer, more reliable and easier to reason about.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
