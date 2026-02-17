import { SVGAssetProps } from './system/types';

const FeatureHexagonLight = (props: SVGAssetProps) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_dd_17_261)">
      <path
        d="M30.2287 7.01192C31.3263 6.38486 32.6737 6.38486 33.7713 7.01192L52.717 17.8351C53.8299 18.4709 54.5167 19.6542 54.5167 20.9358V42.517C54.5167 43.7986 53.8299 44.982 52.717 45.6177L33.7713 56.4409C32.6737 57.068 31.3263 57.068 30.2287 56.4409L11.283 45.6177C10.1701 44.982 9.48334 43.7986 9.48334 42.517V20.9358C9.48334 19.6542 10.1701 18.4709 11.283 17.8351L30.2287 7.01192Z"
        fill="url(#paint0_linear_17_261)"
      />
      <path
        d="M52.9388 17.4469L33.9931 6.62366C32.758 5.91808 31.242 5.91808 30.0069 6.62366L11.0612 17.4469C9.80899 18.1622 9.03619 19.4937 9.03619 20.9358V42.517C9.03619 43.9591 9.80899 45.2906 11.0612 46.006L30.0069 56.8292C31.242 57.5347 32.758 57.5347 33.9931 56.8292L52.9388 46.006C54.191 45.2906 54.9638 43.9591 54.9638 42.517V20.9358C54.9638 19.4937 54.191 18.1622 52.9388 17.4469Z"
        stroke="url(#paint1_linear_17_261)"
        strokeWidth="0.894299"
      />
    </g>
    <path
      d="M32.7827 13.5198L47.3001 21.8132C47.8565 22.1311 48.1999 22.7227 48.1999 23.3636V39.8853C48.1999 40.5261 47.8565 41.1177 47.3001 41.4356L32.7827 49.729C32.2339 50.0426 31.5602 50.0426 31.0114 49.729L16.494 41.4356C15.9375 41.1177 15.5941 40.5261 15.5941 39.8853V23.3636C15.5941 22.7227 15.9375 22.1311 16.494 21.8132L31.0114 13.5198C31.5602 13.2062 32.2339 13.2062 32.7827 13.5198Z"
      fill="url(#paint2_linear_17_261)"
      stroke="white"
      strokeWidth="3.57097"
    />
    <defs>
      <filter
        id="filter0_dd_17_261"
        x="3.81412"
        y="3.87241"
        width="56.3718"
        height="61.7081"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood
          floodOpacity="0"
          result="BackgroundImageFix"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="1.22507"
          operator="erode"
          in="SourceAlpha"
          result="effect1_dropShadow_17_261"
        />
        <feOffset dy="3" />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite
          in2="hardAlpha"
          operator="out"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0823529 0 0 0 0 0.0823529 0 0 0 0 0.0823529 0 0 0 0.15 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_17_261"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="1.22507"
          operator="erode"
          in="SourceAlpha"
          result="effect2_dropShadow_17_261"
        />
        <feOffset dy="3" />
        <feGaussianBlur stdDeviation="3" />
        <feComposite
          in2="hardAlpha"
          operator="out"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0823529 0 0 0 0 0.0823529 0 0 0 0 0.0823529 0 0 0 0.15 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_17_261"
          result="effect2_dropShadow_17_261"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_17_261"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_17_261"
        x1="13.5181"
        y1="6.00001"
        x2="25.6168"
        y2="17.0488"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop
          offset="1"
          stopColor="#292929"
        />
      </linearGradient>
      <linearGradient
        id="paint1_linear_17_261"
        x1="13.5181"
        y1="6.00001"
        x2="25.6168"
        y2="17.0488"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop
          offset="1"
          stopColor="#292929"
        />
      </linearGradient>
      <linearGradient
        id="paint2_linear_17_261"
        x1="17.0499"
        y1="10.9575"
        x2="26.7692"
        y2="19.8334"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop
          offset="1"
          stopColor="#292929"
        />
      </linearGradient>
    </defs>
  </svg>
);

export default FeatureHexagonLight;
