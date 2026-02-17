import React from 'react';
import { SVGAssetProps } from './system/types';

const Australia = (props: SVGAssetProps): React.ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={20}
    viewBox="0 0 30 20"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_2882_11964)">
      <path
        fill="#012169"
        d="M29 0H1a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h28a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1Z"
      />
      <mask
        id="mask0_2882_11964"
        width={15}
        height={10}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}
      >
        <path
          fill="#fff"
          d="M0 0h15v10H0V0Z"
        />
      </mask>
      <g mask="url(#mask0_2882_11964)">
        <path
          fill="#000"
          d="m0 0 15 10L0 0Zm15 0L0 10 15 0Z"
        />
        <path
          stroke="#fff"
          strokeWidth={2}
          d="m0 0 15 10m0-10L0 10"
        />
      </g>
      <mask
        id="mask1_2882_11964"
        width={15}
        height={10}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}
      >
        <path
          fill="#fff"
          d="M0 0v5h15v5L0 0Zm15 0H7.5v10H0L15 0Z"
        />
      </mask>
      <g mask="url(#mask1_2882_11964)">
        <path
          fill="#000"
          d="m0 0 15 10L0 0Zm15 0L0 10 15 0Z"
        />
        <path
          stroke="#E4002B"
          strokeWidth={1.333}
          d="m0 0 15 10m0-10L0 10"
        />
      </g>
      <path
        fill="#000"
        d="M7.5 0v10V0ZM0 5h15H0Z"
      />
      <path
        stroke="#fff"
        strokeWidth={3.333}
        d="M7.5 0v10M0 5h15"
      />
      <path
        fill="#000"
        d="M7.5 0v10V0ZM0 5h15H0Z"
      />
      <path
        stroke="#E4002B"
        strokeWidth={2}
        d="M7.5 0v10M0 5h15"
      />
      <path
        fill="#fff"
        d="m7.722 12.104.534 1.708 1.633-.635-.966 1.494 1.501.915-1.74.156.24 1.777-1.202-1.3-1.203 1.3.24-1.777-1.74-.156 1.502-.915-.966-1.494 1.632.635.535-1.708ZM22.504 15l.254.813.777-.302-.46.711.715.436-.828.074.114.846-.572-.619-.573.62.114-.847-.828-.074.715-.436-.46-.711.777.302.255-.813ZM18.808 7.663l.255.813.777-.303-.46.712.715.436-.828.074.114.846-.573-.62-.572.62.114-.846-.829-.074.715-.436-.46-.712.778.303.254-.813ZM22.504 2.519l.254.813.777-.302-.46.711.715.436-.828.074.114.846-.572-.619-.573.62.114-.847-.828-.074.715-.436-.46-.711.777.302.255-.813ZM26.61 5.647l.255.813.777-.302-.46.711.715.436-.828.074.114.846-.573-.619-.573.62.114-.847-.828-.074.715-.436-.46-.711.777.302.255-.813ZM24.354 10.205l.201.507.532.04-.407.353.127.531-.453-.288-.452.288.127-.531-.407-.353.531-.04.201-.507Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_2882_11964">
        <path
          fill="#fff"
          d="M0 0h30v20H0z"
        />
      </clipPath>
    </defs>
  </svg>
);
export default Australia;
