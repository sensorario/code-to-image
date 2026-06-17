declare module '@sensorario/sg-components' {
  import * as React from 'react';

  export interface HeaderProps {
    onNavigate?: (page: string) => void;
    title?: string;
    homePageKey?: string;
  }

  export const Header: React.FC<HeaderProps>;
  export const SGFooter: React.FC;
}
