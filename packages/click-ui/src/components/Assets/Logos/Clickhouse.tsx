import type { SVGAssetProps } from '@/types';

const ClickhouseDark = (props: SVGAssetProps) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="5"
      y="5"
      width="5.9998"
      height="53.9982"
      rx="1.45943"
      fill="white"
    />
    <rect
      x="17"
      y="5"
      width="5.9998"
      height="53.9982"
      rx="1.45943"
      fill="white"
    />
    <rect
      x="29.001"
      y="5"
      width="5.9998"
      height="53.9982"
      rx="1.45943"
      fill="white"
    />
    <rect
      x="40.998"
      y="5"
      width="5.9998"
      height="53.9982"
      rx="1.45943"
      fill="white"
    />
    <rect
      x="53.001"
      y="26.0005"
      width="5.9998"
      height="11.9996"
      rx="1.45943"
      fill="white"
    />
  </svg>
);

const ClickhouseLight = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="54"
    height="54"
    viewBox="0 0 54 54"
    fill="none"
    {...props}
  >
    <rect
      width="5.9998"
      height="53.9982"
      rx="1.45943"
      fill="#161517"
    />
    <rect
      x="12"
      width="5.9998"
      height="53.9982"
      rx="1.45943"
      fill="#161517"
    />
    <rect
      x="24.001"
      width="5.9998"
      height="53.9982"
      rx="1.45943"
      fill="#161517"
    />
    <rect
      x="35.998"
      width="5.9998"
      height="53.9982"
      rx="1.45943"
      fill="#161517"
    />
    <rect
      x="48.001"
      y="21.0005"
      width="5.9998"
      height="11.9996"
      rx="1.45943"
      fill="#161517"
    />
  </svg>
);

const Clickhouse = ({ theme, ...props }: SVGAssetProps) => {
  if (theme === 'dark') {
    return <ClickhouseDark {...props} />;
  }

  return <ClickhouseLight {...props} />;
};

export default Clickhouse;
