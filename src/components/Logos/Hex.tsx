import { LogoThemeProps } from './system/types';

const Hex = (props: LogoThemeProps) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_5323_3456)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.3494 20V28.2548H10.2804V20H2V28.2606V28.2837V36.5439V44.8276H10.2804V32.3852H12.3494V44.8276H20.6327V20H12.3494ZM22.6901 20V44.8276H41.3228V34.4732H33.0386V40.6388H30.9697V32.3852H41.3228V20H22.6901ZM30.9697 28.2548V24.1379H33.0386V28.2548H30.9697ZM53.7291 28.2548V20H62.0124V26.2069L57.8745 30.3486L62.0124 34.4902V44.8276H53.7291V32.3852H51.6601V44.8276H43.3797V34.4902L47.5222 30.3486L43.3797 26.2069V20H51.6601V28.2548H53.7291Z"
        fill="#473982"
      />
    </g>
    <defs>
      <clipPath id="clip0_5323_3456">
        <rect
          width="60"
          height="24.8276"
          fill="white"
          transform="translate(2 20)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default Hex;
