import React, {useState} from 'react';
import {ShareIcon} from '@site/src/components/Icons';
import styles from './styles.module.css';

export default function ShareButton({title}) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: title || document.title,
          url,
        });

        return;
      }

      await navigator.clipboard.writeText(url);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      // User cancelling the native share sheet is not an error
      if (error?.name !== 'AbortError') {
        console.error('Unable to share page:', error);
      }
    }
  }

  return (
    <button
      type="button"
      className={styles.shareButton}
      onClick={handleShare}
      aria-label="Share this article"
      title="Share this article"
    >
      <ShareIcon className={styles.shareIcon} />

      <span className={styles.label}>
        {copied ? 'Copied' : 'Share'}
      </span>
    </button>
  );
}