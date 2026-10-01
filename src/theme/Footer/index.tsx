import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

const links = [
  {label: 'Articles', to: '/articles'},
  {label: 'Guides', to: '/guides'},
  {label: 'About', to: '/about'},
];

export default function Footer(): ReactNode {
  return (
    <footer className={styles.footerWrap}>
      <div className={`container ${styles.footer} glass`}>
        <div className={styles.brand}>
          <img
            src={useBaseUrl('/img/mm-mark.svg')}
            alt=""
            width={32}
            height={32}
          />
          <strong>Mpho Magoro on Tech</strong>
          <span className={styles.divider} aria-hidden="true" />
          <span className={styles.meta}>
            © {new Date().getFullYear()} · mphomagoro.com. All rights reserved.
          </span>
        </div>

        <nav aria-label="Footer">
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
