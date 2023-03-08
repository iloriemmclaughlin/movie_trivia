import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Outlet,
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from '@tanstack/react-router';
import Profile from './components/Profile';
import Homepage from './components/Homepage';

const rootRoute = new RootRoute({
  component: () => {
    return (
      <>
        <Outlet />
      </>
    );
  },
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => {
    return <Homepage />;
  },
});

const profileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'profile',
  component: () => {
    return <Profile userId={1} />;
  },
  errorComponent: () => 'Could not find user.',
});

const routeTree = rootRoute.addChildren([indexRoute, profileRoute]);

// Set up a Router instance
const router = new Router({
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
