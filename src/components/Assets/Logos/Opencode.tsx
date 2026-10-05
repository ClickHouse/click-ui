import type { SVGAssetProps } from '@/types';

const OpencodeBase = ({ theme, ...props }: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    fill="none"
    viewBox="0 0 28 28"
    {...props}
  >
    <path
      fill={theme === 'dark' ? '#4B4646' : '#CFCECD'}
      d="M19.6 22.4H8.4V11.2H19.6V22.4Z"
    />
    <path
      fill={theme === 'dark' ? '#F1ECEC' : '#211E1E'}
      d="M19.6 5.6H8.4V22.4H19.6V5.6ZM25.2 28H2.8V0H25.2V28Z"
    />
  </svg>
);

const Opencode = ({ theme, ...props }: SVGAssetProps) => (
  <OpencodeBase
    theme={theme ?? 'light'}
    {...props}
  />
);

export default Opencode;
