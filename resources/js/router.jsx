import { createRouter, createRoute, createRootRoute, redirect, Outlet } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import useAuthStore from './stores/authStore';
import Header from './Components/Header';

const Dashboard = lazy(() => import('./Components/Dashboard'));
const Login = lazy(() => import('./Components/Login'));

const RootComponent = () => (
    <div>
        <Header />
        <Suspense fallback={<div className="max-w-7xl mx-auto px-4">Loading...</div>}>
            <Outlet />
        </Suspense>
    </div>
);

const rootRoute = createRootRoute({
    component: RootComponent,
});

// Helper to wait for auth state to resolve
const waitForAuth = async () => {
    const state = useAuthStore.getState();
    if (!state.isAuthenticating && state.isAuthenticated !== null) {
        return state;
    }

    // Wait for auth to resolve
    return new Promise((resolve) => {
        const unsubscribe = useAuthStore.subscribe((state) => {
            if (!state.isAuthenticating && state.isAuthenticated !== null) {
                unsubscribe();
                resolve(state);
            }
        });
    });
};

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    beforeLoad: async () => {
        const { isAuthenticated } = await waitForAuth();

        if (isAuthenticated) {
            throw redirect({ to: '/dashboard' });
        }
    },
    component: Login,
});

const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    beforeLoad: async () => {
        const { isAuthenticated } = await waitForAuth();

        if (!isAuthenticated) {
            throw redirect({ to: '/' });
        }
    },
    component: Dashboard,
});

const routeTree = rootRoute.addChildren([indexRoute, dashboardRoute]);

export const router = createRouter({ routeTree });
