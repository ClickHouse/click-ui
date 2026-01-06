#!/usr/bin/env node

import fs from "fs";
import path from "path";

const CONFIG_BODY = `  // Optional: Customize the storage key for theme persistence
  // storageKey: 'click-ui-theme',

  // Optional: Customize light mode theme
  // theme: {
  //   global: {
  //     color: {
  //       brand: '#FFCC00',
  //       background: {
  //         default: '#FFFFFF'
  //       }
  //     }
  //   },
  //   button: {
  //     space: {
  //       x: '1rem',
  //       y: '0.5rem'
  //     },
  //     radii: {
  //       all: '0.375rem'
  //     }
  //   }
  // },

  // Optional: Dark mode overrides
  // If not defined, theme values are used for dark mode too
  // dark: {
  //   global: {
  //     color: {
  //       background: {
  //         default: '#0D1117'
  //       },
  //       text: {
  //         default: '#F0F6FC'
  //       }
  //     }
  //   }
  // },

  // Optional: Tooltip configuration
  // tooltipConfig: {
  //   delayDuration: 100,
  //   skipDelayDuration: 300,
  //   disableHoverableContent: false,
  // },

  // Optional: Toast configuration
  // toastConfig: {
  //   duration: 4000,
  //   swipeDirection: 'right',
  //   swipeThreshold: 50,
  // },`;

const CONFIG_TEMPLATES = {
  ts: `import type { ThemeConfig } from '@clickhouse/click-ui/theme';

const config: ThemeConfig = {
${CONFIG_BODY}
};

export default config;
`,
  js: `/** @type {import('@clickhouse/click-ui/theme').ThemeConfig} */
const config = {
${CONFIG_BODY}
};

export default config;
`
};

export const initCommand = options => {
  const format = options.format === "js" ? "js" : "ts";
  const filename = `click-ui.config.${format}`;
  const targetPath = path.join(process.cwd(), filename);
  const configExt = format === "ts" ? "ts" : "js";

  // Check if config already exists
  if (fs.existsSync(targetPath) && !options.force) {
    console.error(`❌ ${filename} already exists. Use --force to overwrite.`);
    process.exit(1);
  }

  // Write config file
  try {
    fs.writeFileSync(targetPath, CONFIG_TEMPLATES[format], "utf-8");
    console.log(`✅ Created ${filename}\n`);
    console.log("📝 Next steps:\n");
    console.log(`   1. Customize your theme in ${filename}\n`);
    console.log("   2. Generate your custom theme CSS:\n");
    console.log("      npx click-ui generate\n");
    console.log("   3. Import the generated CSS in your app:\n");
    console.log("      import '@clickhouse/click-ui/style.css';");
    console.log("      import './public/cui-custom-theme.css'; // Your custom theme\n");
    console.log("   4. Use ClickUIProvider in your app:\n");
    console.log("      import { ClickUIProvider } from '@clickhouse/click-ui';\n");
    console.log("      <ClickUIProvider>");
    console.log("        {/* Your app */}");
    console.log("      </ClickUIProvider>\n");
    console.log("   🎨 Your custom theme will be applied!");
  } catch (error) {
    console.error(`❌ Failed to create config file: ${error.message}`);
    process.exit(1);
  }
};
