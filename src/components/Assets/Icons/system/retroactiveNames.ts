import { IconName } from './types';
import { resolveAssetName } from '@/components/Assets/config';

export const resolveFlagName = (name: string): IconName => {
  return resolveAssetName(name) as IconName;
};
