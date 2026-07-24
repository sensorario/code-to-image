declare module '@sensorario/sg-components' {
  import * as React from 'react';

  export interface HeaderProps {
    onNavigate?: (page: string) => void;
    title?: string;
    homePageKey?: string;
  }

  export interface QuadratoHeaderProps {
    title?: string;
    homePageKey?: string;
    onNavigate?: (page: string) => void;
    cookieName?: string;
    username?: string | null;
    onLogin: (username: string, password: string) => void | Promise<void>;
    onLogout?: () => void;
    onUserAuthenticated?: (isAuthenticated: boolean, username: string | null) => void;
  }

  export const Header: React.FC<HeaderProps>;
  export const QuadratoHeader: React.FC<QuadratoHeaderProps>;
  export const SGFooter: React.FC;
}
