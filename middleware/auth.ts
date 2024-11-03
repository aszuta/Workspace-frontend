import { useUserStore } from '~/store/user';

export default defineNuxtRouteMiddleware((to, from) => {
    const isLoggedIn = useUserStore().isLoggedIn;

    if(!isLoggedIn && to.path !== '/login') return navigateTo('/login');
});