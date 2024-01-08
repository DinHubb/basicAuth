import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth"

export default defineNuxtRouteMiddleware((to) => {
    const { authenticated, userName, userRole } = storeToRefs<ReturnType<typeof useAuthStore>>(useAuthStore());
    const token = useCookie('token');
    const user = useCookie('user');
    
    if (token.value) {
        authenticated.value = true;
        userName.value = user.value || '';
    }

    if (token.value && to?.name === 'login') {
        return navigateTo('/')
    } 

    if (!token.value && to?.name !== 'login' && to?.name !== 'register') {
        return navigateTo('/login');
    }

    if (!token.value && to?.name === 'register' && to.fullPath !== '/register') {
        return navigateTo('/register');
    }
});