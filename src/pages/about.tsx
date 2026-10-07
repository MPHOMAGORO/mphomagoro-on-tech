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
            <h1>About Me</h1>

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

            <h3>Why I Write</h3>
            <p>
             I write primarily to document what I learn.
            </p>
            <p>
              When I come across an idea, concept, or approach that I find useful, writing about it forces me to organise it in a way that I can understand and return to later. Instead of relying on scattered notes, bookmarks, or memory, I build a body of knowledge that grows with me.
            </p>

            <p>
              It also helps me become a better communicator. Whether I am explaining an architecture decision, a technical concept, or something I have learned through experience, writing makes me practise turning complex ideas into something structured and understandable.
            </p>

            <p>
              Publishing what I learn extends the reach of those ideas beyond my own notes. It creates opportunities to connect with people who are thinking about similar problems and, hopefully, produces something useful for someone facing a problem I have already spent time thinking through.
            </p>
            <p>
              So this site is partly a knowledge base, partly a thinking tool, and partly a way of sharing what I learn along the way.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
