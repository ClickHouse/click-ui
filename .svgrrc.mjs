export default {
  typescript: true,
  ref: false,
  memo: false,
  svgo: true,
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
    ],
  },
  template: (variables, { tpl }) => {
    return tpl`
import { LogoThemeProps } from './system/types';

const ${variables.componentName} = (props: LogoThemeProps) => (
  ${variables.jsx}
);

export default ${variables.componentName};
`;
  },
};
