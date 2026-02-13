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
${variables.imports};
import { LogoThemeProps } from './system/types';

const ${variables.componentName} = (${variables.props}) => (
  ${variables.jsx}
);

export default ${variables.componentName};
`;
  },
};
