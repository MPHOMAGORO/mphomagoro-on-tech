import React from 'react';
import {useLocation} from '@docusaurus/router';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

import Authors from '@theme-original/BlogPostItem/Header/Authors';
import ShareButton from '@site/src/components/ShareButton';

import styles from './styles.module.css';

function normalizePath(path) {
  if (!path) {
    return '/';
  }

  return path.length > 1
    ? path.replace(/\/+$/, '')
    : path;
}

export default function AuthorsWrapper(props) {
  const location = useLocation();

  const {
    metadata: {title, permalink},
  } = useBlogPost();

  const isPostPage =
    normalizePath(location.pathname) === normalizePath(permalink);

  return (
    <div className={styles.metaRow}>
      <div className={styles.authors}>
        <Authors {...props} />
      </div>

      {isPostPage && (
        <ShareButton title={title} />
      )}
    </div>
  );
}