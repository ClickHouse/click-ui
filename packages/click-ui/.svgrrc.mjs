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
import { SVGAssetProps } from '../types';

const ${variables.componentName} = (props: SVGAssetProps) => (
  ${variables.jsx}
);

export default ${variables.componentName};
`;
  },
};
