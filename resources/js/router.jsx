import { createRouter, createRoute, createRootRoute, redirect, Outlet } from '@tanstack/react-router';
import useAuthStore from './stores/authStore';
import Header from './Components/Header';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';

const RootComponent = () => (
    <div>
        <Header />
        <Outlet />
    </div>
);

const rootRoute = createRootRoute({
    component: RootComponent,
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    beforeLoad: async () => {
        const { isAuthenticated, isAuthenticating } = useAuthStore.getState();

        // Wait for auth check to complete if still loading
        if (isAuthenticating || isAuthenticated === null) {
            // Allow through - component will show loading or redirect after auth resolves
            return;
        }

        if (!isAuthenticated) {
            throw redirect({ to: '/login' });
        }
    },
    component: Dashboard,
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: Login,
});

const routeTree = rootRoute.addChildren([indexRoute, loginRoute]);

export const router = createRouter({ routeTree });
