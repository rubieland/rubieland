import { createRootRouteWithContext } from '@tanstack/react-router';
import Layout from '../ui/components/Layout/Layout';

export interface RouterContext {
  isConnected: boolean;
  isAdmin: boolean;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Layout,
});
