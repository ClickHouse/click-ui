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
      // preset-default's cleanupIds minifies ids down to "a", "b", ... Assets render as
      // inline SVGs, so without a per-component prefix those ids collide whenever two
      // assets mount together and url(#a) binds to the wrong node.
      'prefixIds',
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
