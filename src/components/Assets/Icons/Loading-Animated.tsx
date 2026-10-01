import type { SVGAssetProps } from '@/types';
import { cn } from '@/lib/cva';
import Loading from './Loading';
import styles from './Loaders.module.css';

const Loading_Animated = ({ className, ...props }: SVGAssetProps) => (
  <Loading
    {...props}
    className={cn(styles['loading-animated'], className)}
  />
);

export default Loading_Animated;
