import type {HTMLAttributes} from 'react';
import clsx from 'clsx';

export type IconProps = HTMLAttributes<HTMLElement>;

function createIcon(name: string) {
  return function PrimeIcon({className, ...props}: IconProps) {
    return <i className={clsx('pi', `pi-${name}`, className)} aria-hidden="true" {...props} />;
  };
}

export const SparkleIcon = createIcon('sparkles');
export const ArrowUpRightIcon = createIcon('arrow-up-right');
export const DocumentIcon = createIcon('file');
export const RingIcon = createIcon('circle');
export const CubeIcon = createIcon('box');
export const CodeIcon = createIcon('code');
export const TerminalIcon = createIcon('desktop');
export const ChipIcon = createIcon('microchip');
export const ShareIcon = createIcon('share-alt');
