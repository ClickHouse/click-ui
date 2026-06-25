import { createContext, useContext } from 'react';

export type PortalContainer = HTMLElement | null;

export const PortalContainerContext = createContext<PortalContainer>(null);

export const usePortalContainer = (): PortalContainer => {
  return useContext(PortalContainerContext);
};

export const useResolvedPortalContainer = (
  container?: PortalContainer
): PortalContainer => {
  const contextContainer = usePortalContainer();

  return container === undefined ? contextContainer : container;
};
