import { LogoThemeProps } from './system/types';

const AWS_KINESIS = (props: LogoThemeProps) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      fill="none"
      fillRule="evenodd"
      transform="matrix(1.600000023841858, 0, 0, 1.600000023841858, 0, 0)"
    >
      <path
        d="M0 0h40v40H0z"
        fill="url(#aws-kinesis-gradient)"
      />
      <path
        d="M9.886 31.107h1.005c0-4.043 2.626-8.176 22.109-8.176v-1.006c-20.368 0-23.114 4.642-23.114 9.182M12.773 34h1.004c0-3.64 0-9.14 19.223-9.14v-1.007c-18.665 0-20.227 5.013-20.227 10.147M8.004 13.75H7c0 3.555 4.788 5.81 14.233 6.75C11.788 21.438 7 23.694 7 27.25h1.004c0-2.333 3.247-6.247 24.996-6.247v-1.007c-21.749 0-24.996-3.913-24.996-6.246m2.887-3.857H9.886c0 4.54 2.746 9.181 23.114 9.181v-1.006c-19.483 0-22.11-4.133-22.11-8.175M33 16.139v1.007c-18.665 0-20.227-5.013-20.227-10.146h1.004c0 3.64 0 9.14 19.223 9.14"
        fill="#FFF"
      />
    </g>
    <defs>
      <linearGradient
        x1="0%"
        y1="100%"
        x2="100%"
        y2="0%"
        id="aws-kinesis-gradient"
      >
        <stop
          stopColor="#4D27A8"
          offset="0"
        />
        <stop
          stopColor="#A166FF"
          offset="1"
        />
      </linearGradient>
    </defs>
  </svg>
);

export default AWS_KINESIS;
