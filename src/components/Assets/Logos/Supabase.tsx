import { SVGAssetProps } from './system/types';

const Supabase = (props: SVGAssetProps) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#supabase_clip0)">
      <g clipPath="url(#supabase_clip1)">
        <path
          d="M13.9639 23.3479C13.354 24.1127 12.1173 23.6936 12.1026 22.7171L11.8877 8.43359H21.5332C23.2802 8.43359 24.2546 10.4428 23.1683 11.8052L13.9639 23.3479Z"
          fill="url(#supabase_paint0)"
        />
        <path
          d="M13.9639 23.3479C13.354 24.1127 12.1173 23.6936 12.1026 22.7171L11.8877 8.43359H21.5332C23.2802 8.43359 24.2546 10.4428 23.1683 11.8052L13.9639 23.3479Z"
          fill="url(#supabase_paint1)"
          fillOpacity="0.2"
        />
        <path
          d="M10.0414 0.364739C10.6513 -0.40016 11.888 0.0189491 11.9027 0.995529L11.9969 15.279H2.47212C0.725009 15.279 -0.249386 13.2697 0.837018 11.9074L10.0414 0.364739Z"
          fill="#3ECF8E"
        />
      </g>
    </g>
    <defs>
      <linearGradient
        id="supabase_paint0"
        x1="11.8877"
        y1="11.6006"
        x2="20.4492"
        y2="15.2067"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#249361" />
        <stop
          offset="1"
          stopColor="#3ECF8E"
        />
      </linearGradient>
      <linearGradient
        id="supabase_paint1"
        x1="8.08707"
        y1="6.41914"
        x2="11.9705"
        y2="13.7609"
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop
          offset="1"
          stopOpacity="0"
        />
      </linearGradient>
      <clipPath id="supabase_clip0">
        <rect
          width="24"
          height="24"
          fill="white"
        />
      </clipPath>
      <clipPath id="supabase_clip1">
        <rect
          width="23.25"
          height="24"
          fill="white"
          transform="translate(0.375 -0.0751953)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default Supabase;
