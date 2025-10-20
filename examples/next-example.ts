/**
 * Example: Using Click UI with Next.js
 */

import type { NextConfig } from 'next';
import { nextClickUIConfig } from '@clickhouse/click-ui/config';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Your other Next.js config...
};

// Wrap your config with Click UI plugin
// Auto-discovers click-ui.config.ts in project root
export default nextClickUIConfig()(nextConfig);

// Or with options:
// export default nextClickUIConfig({
//   configPath: './click-ui.config.ts',
//   cssOutput: 'theme-vars.css',
//   verbose: true,
// })(nextConfig);

// Alternative syntax (more explicit):
// const withClickUI = nextClickUIConfig();
// export default withClickUI(nextConfig);
