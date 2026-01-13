"use client";

import React from "react";
import {
  Provider as TooltipProvider,
  TooltipProviderProps,
} from "@radix-ui/react-tooltip";
import { ToastProvider, ToastProviderProps } from "@/components/Toast/Toast";

export interface ClickUIProvidersProps {
  children: React.ReactNode;
  /**
   * Configuration for Radix UI Tooltip provider
   * @default { delayDuration: 100 }
   */
  tooltipConfig?: Omit<TooltipProviderProps, "children">;
  /**
   * Configuration for Toast provider
   * @default { duration: 4000 }
   */
  toastConfig?: Omit<ToastProviderProps, "children">;
}

/**
 * Client-side UI providers for Toast and Tooltip functionality.
 *
 * **New in v0.1.0:** Replaces the `config.tooltip` and `config.toast` props
 * from ClickUIProvider and the `tooltipConfig`/`toastConfig` props from
 * ServerClickUIProvider to enable true React Server Component support.
 *
 * This component must be used in client components ("use client").
 *
 * @example
 * ```tsx
 * // Next.js App Router (RSC)
 * import { ServerClickUIProvider, ClickUIProviders } from '@clickhouse/click-ui';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <ServerClickUIProvider theme="system">
 *           <ClickUIProviders>
 *             {children}
 *           </ClickUIProviders>
 *         </ServerClickUIProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Client-side app
 * import { ClickUIProvider, ClickUIProviders } from '@clickhouse/click-ui';
 *
 * export default function App() {
 *   return (
 *     <ClickUIProvider theme="system">
 *       <ClickUIProviders
 *         tooltipConfig={{ delayDuration: 100 }}
 *         toastConfig={{ duration: 3000 }}
 *       >
 *         <YourApp />
 *       </ClickUIProviders>
 *     </ClickUIProvider>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Custom configuration
 * <ClickUIProviders
 *   tooltipConfig={{
 *     delayDuration: 200,
 *     skipDelayDuration: 300
 *   }}
 *   toastConfig={{
 *     duration: 5000,
 *     swipeDirection: 'right'
 *   }}
 * >
 *   {children}
 * </ClickUIProviders>
 * ```
 */
export const ClickUIProviders: React.FC<ClickUIProvidersProps> = ({
  children,
  tooltipConfig = { delayDuration: 100 },
  toastConfig = { duration: 4000 },
}) => {
  return (
    <ToastProvider {...toastConfig}>
      <TooltipProvider {...tooltipConfig}>{children}</TooltipProvider>
    </ToastProvider>
  );
};
