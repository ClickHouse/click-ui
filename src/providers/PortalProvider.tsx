import { ReactElement, ReactNode } from 'react';
import { PortalContainerContext, type PortalContainer } from './PortalContext';

export interface PortalProviderProps {
  children: ReactNode;
  container?: PortalContainer;
}

export const PortalProvider = ({
  children,
  container = null,
}: PortalProviderProps): ReactElement => {
  return (
    <PortalContainerContext.Provider value={container}>
      {children}
    </PortalContainerContext.Provider>
  );
};
