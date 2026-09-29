import type {ReactNode} from 'react';

import styles from './styles.module.css';

type BlockProps = {
  cx: number;
  cy: number;
  size: number;
  height: number;
  tint?: 'blue' | 'violet' | 'mint';
};

// An isometric glass block: `cx`/`cy` is the centre of the top face.
function Block({cx, cy, size, height, tint = 'blue'}: BlockProps) {
  const half = size / 2;
  const top = `${cx},${cy - half} ${cx + size},${cy} ${cx},${cy + half} ${cx - size},${cy}`;
  const left = `${cx - size},${cy} ${cx},${cy + half} ${cx},${cy + half + height} ${cx - size},${cy + height}`;
  const right = `${cx},${cy + half} ${cx + size},${cy} ${cx + size},${cy + height} ${cx},${cy + half + height}`;

  return (
    <g className={styles.block}>
      <polygon points={left} fill={`url(#hi-left-${tint})`} />
      <polygon points={right} fill={`url(#hi-right-${tint})`} />
      <polygon points={top} fill={`url(#hi-top-${tint})`} />
    </g>
  );
}

function Badge({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x="-22"
        y="-22"
        width="44"
        height="44"
        rx="12"
        fill="url(#hi-badge)"
        stroke="#ffffff"
        strokeOpacity="0.9"
      />
      <g
        fill="none"
        stroke="#3346ff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round">
        {children}
      </g>
    </g>
  );
}

const tints = {
  blue: ['#ffffff', '#cfdcff', '#a9bcff'],
  violet: ['#ffffff', '#e1d4ff', '#bda5ff'],
  mint: ['#ffffff', '#cff3ec', '#9fe1d6'],
};

export default function HeroIllustration(): ReactNode {
  return (
    <svg
      className={styles.illustration}
      viewBox="0 0 560 440"
      role="img"
      aria-label="Illustration of a friendly robot assembling glass building blocks connected by glowing data pipes">
      <defs>
        {Object.entries(tints).map(([name, [light, mid, deep]]) => (
          <g key={name}>
            <linearGradient id={`hi-top-${name}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={light} stopOpacity="0.95" />
              <stop offset="1" stopColor={mid} stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id={`hi-left-${name}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={mid} stopOpacity="0.85" />
              <stop offset="1" stopColor={deep} stopOpacity="0.55" />
            </linearGradient>
            <linearGradient id={`hi-right-${name}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={deep} stopOpacity="0.8" />
              <stop offset="1" stopColor={deep} stopOpacity="0.45" />
            </linearGradient>
          </g>
        ))}

        <linearGradient id="hi-pipe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4de3ff" />
          <stop offset="0.5" stopColor="#6c7bff" />
          <stop offset="1" stopColor="#b56bff" />
        </linearGradient>

        <linearGradient id="hi-badge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#dfe6ff" stopOpacity="0.9" />
        </linearGradient>

        <linearGradient id="hi-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#e3e5ff" stopOpacity="0.45" />
        </linearGradient>

        <linearGradient id="hi-robot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#e6e9ff" />
          <stop offset="1" stopColor="#f3dcff" />
        </linearGradient>

        <linearGradient id="hi-visor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b1f4b" />
          <stop offset="1" stopColor="#2c2170" />
        </linearGradient>

        <radialGradient id="hi-orb" cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#9fc2ff" />
          <stop offset="1" stopColor="#6e58ff" />
        </radialGradient>

        <filter id="hi-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>

        <filter id="hi-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* Soft floor shadow */}
      <ellipse
        cx="290"
        cy="360"
        rx="240"
        ry="60"
        fill="#6c6cff"
        opacity="0.16"
        filter="url(#hi-shadow)"
      />

      {/* Floating UI panel with a small flow diagram */}
      <g className={styles.floatSlow}>
        <rect
          x="330"
          y="22"
          width="190"
          height="128"
          rx="16"
          fill="url(#hi-panel)"
          stroke="#ffffff"
          strokeOpacity="0.9"
        />
        <g fill="#8e9bff" opacity="0.7">
          <rect x="350" y="44" width="46" height="6" rx="3" />
          <rect x="350" y="58" width="30" height="6" rx="3" />
        </g>
        <g fill="none" stroke="#8e9bff" strokeWidth="2" opacity="0.8">
          <rect x="420" y="40" width="34" height="22" rx="6" />
          <rect x="400" y="92" width="34" height="22" rx="6" />
          <rect x="462" y="92" width="34" height="22" rx="6" />
          <path d="M437 62v14M417 92V76h62v16" />
        </g>
      </g>

      {/* Base platform */}
      <Block cx={290} cy={300} size={230} height={16} tint="violet" />

      {/* Glowing data pipes */}
      <g fill="none" strokeLinecap="round">
        <path
          d="M150 300 C 200 330, 240 330, 290 300 S 390 260, 440 280"
          stroke="url(#hi-pipe)"
          strokeWidth="12"
          opacity="0.45"
          filter="url(#hi-glow)"
        />
        <path
          className={styles.pipe}
          d="M150 300 C 200 330, 240 330, 290 300 S 390 260, 440 280"
          stroke="url(#hi-pipe)"
          strokeWidth="5"
        />
        <path
          d="M290 300 C 300 330, 350 350, 400 335"
          stroke="url(#hi-pipe)"
          strokeWidth="4"
          opacity="0.7"
        />
      </g>

      {/* Database */}
      <g>
        <path
          d="M110 230 v58 a42 16 0 0 0 84 0 v-58"
          fill="url(#hi-left-blue)"
          stroke="#ffffff"
          strokeOpacity="0.8"
        />
        <ellipse
          cx="152"
          cy="230"
          rx="42"
          ry="16"
          fill="url(#hi-top-blue)"
          stroke="#ffffff"
        />
        <path
          d="M110 252 a42 16 0 0 0 84 0 M110 272 a42 16 0 0 0 84 0"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.8"
        />
      </g>

      {/* Central cube stack */}
      <Block cx={300} cy={236} size={52} height={52} tint="blue" />
      <Block cx={300} cy={176} size={40} height={40} tint="violet" />

      {/* Right pedestal with cloud */}
      <Block cx={440} cy={242} size={46} height={34} tint="mint" />
      <g className={styles.floatFast}>
        <path
          d="M412 214h58a18 18 0 0 0 1-36 26 26 0 0 0-50-6 20 20 0 0 0-9 42z"
          fill="url(#hi-top-blue)"
          stroke="#ffffff"
          strokeWidth="1.5"
        />
      </g>

      {/* Icon badges */}
      <g className={styles.floatFast}>
        <Badge x={300} y={128}>
          <circle cx="0" cy="0" r="6" />
          <path d="M0 -12v4M0 8v4M-12 0h4M8 0h4M-8.5 -8.5l2.8 2.8M5.7 5.7l2.8 2.8M-8.5 8.5l2.8-2.8M5.7 -5.7l2.8-2.8" />
        </Badge>
      </g>
      <g className={styles.floatSlow}>
        <Badge x={384} y={196}>
          <circle cx="-6" cy="-6" r="3.5" />
          <circle cx="7" cy="0" r="3.5" />
          <circle cx="-6" cy="7" r="3.5" />
          <path d="M-3 -4.5l6.5 3M-3 5.5l6.5-3.5" />
        </Badge>
      </g>

      {/* Friendly robot */}
      <g className={styles.robot}>
        <line x1="200" y1="36" x2="200" y2="54" stroke="#9aa6ff" strokeWidth="3" />
        <circle cx="200" cy="32" r="7" fill="url(#hi-orb)" />
        <rect
          x="150"
          y="52"
          width="100"
          height="78"
          rx="34"
          fill="url(#hi-robot)"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <rect x="164" y="68" width="72" height="44" rx="20" fill="url(#hi-visor)" />
        <path
          d="M180 94 q8 -10 16 0 M204 94 q8 -10 16 0"
          fill="none"
          stroke="#5ff0ff"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="146" cy="92" r="9" fill="url(#hi-robot)" stroke="#c9d0ff" />
        <circle cx="254" cy="92" r="9" fill="url(#hi-robot)" stroke="#c9d0ff" />
        <path
          d="M168 132 q32 20 64 0 v26 a32 20 0 0 1 -64 0z"
          fill="url(#hi-robot)"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <path
          d="M232 146 q26 4 36 30"
          fill="none"
          stroke="#c7ceff"
          strokeWidth="9"
          strokeLinecap="round"
        />
      </g>

      {/* Floating orbs */}
      <circle className={styles.floatSlow} cx="520" cy="210" r="11" fill="url(#hi-orb)" />
      <circle className={styles.floatFast} cx="78" cy="170" r="8" fill="url(#hi-orb)" />
      <circle className={styles.floatSlow} cx="360" cy="372" r="6" fill="url(#hi-orb)" />
    </svg>
  );
}
