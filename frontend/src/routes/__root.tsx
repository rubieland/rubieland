import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

export interface RouterContext {
  isConnected: boolean;
  isAdmin: boolean;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Outlet,
});
