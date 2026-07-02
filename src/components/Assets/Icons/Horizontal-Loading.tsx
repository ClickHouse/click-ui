import type { SVGAssetProps } from '@/types';
import { cn } from '@/lib/cva';
import Dots_Horizontal from './Dots-Horizontal';
import styles from './Loaders.module.css';

const Horizontal_Loading = ({
  className,
  // `theme` is destructured out so it is not forwarded onto the DOM <svg>: the
  // original wrapped this icon in `styled(Dots_Horizontal)`, which consumed the
  // `theme` prop and never rendered it as an attribute.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme,
  ...props
}: SVGAssetProps) => (
  <Dots_Horizontal
    {...props}
    className={cn(styles['horizontal-loading'], className)}
  />
);

export default Horizontal_Loading;
