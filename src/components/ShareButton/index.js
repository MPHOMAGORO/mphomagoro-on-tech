import React, {useState} from 'react';
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
      <svg
        className={styles.shareIcon}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 16V4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <path
          d="M8 8L12 4L16 8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M6 11V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V11"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>

      <span className={styles.label}>
        {copied ? 'Copied' : 'Share'}
      </span>
    </button>
  );
}