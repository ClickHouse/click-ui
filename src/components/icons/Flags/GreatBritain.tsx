import * as React from "react";
const GreatBritain = (props: React.SVGAttributes<SVGElement>): React.ReactElement => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={20}
        viewBox="0 0 30 20"
        fill="none"
        {...props}
    >
        <g clip-path="url(#clip0_472_6341)">
            <g clip-path="url(#clip1_472_6341)">
                <path d="M30 0H0V20H30V0Z" fill="#00247D"/>
                <path d="M0 0L30 20M30 0L0 20" stroke="white" stroke-width="3.46613"/>
                <path d="M0 0L30 20M30 0L0 20" stroke="#CF142B" stroke-width="2.3094"/>
                <path d="M15 0V20M0 10H30" stroke="white" stroke-width="5.77688"/>
                <path d="M15 0V20M0 10H30" stroke="#CF142B" stroke-width="3.46613"/>
            </g>
        </g>
        <defs>
            <clipPath id="clip0_472_6341">
                <rect width="30" height="20" rx="1" fill="white"/>
            </clipPath>
            <clipPath id="clip1_472_6341">
                <rect width="30" height="20" fill="white"/>
            </clipPath>
        </defs>
    </svg>
);
export default GreatBritain;
