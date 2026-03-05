// TODO: Maybe make the FlagName an AssetName or resolveFlagName
// a generic util that takes T
// to allow refactoring and making this process reusable
// at the moment there are concurrent versions
// e.g. Icons/system/retroactiveNames.t
import { FlagName } from './types';
import { resolveAssetName } from '@/components/Assets/config';

export const resolveFlagName = (name: string): FlagName => {
  return resolveAssetName(name) as FlagName;
};
