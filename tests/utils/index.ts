import { ThemeName } from '../../src/theme/theme.types';

export const getStoryUrl = (storyId: string, theme?: ThemeName) => {
  let url = `/iframe.html?path=/story/${storyId}`;
  if (theme) {
    url += `&globals=theme:${theme}`;
  }
  return url;
};
