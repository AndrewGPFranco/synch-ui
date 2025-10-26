import {defineNuxtRouteMiddleware, useCookie, navigateTo} from 'nuxt/app'

const authStore = useAuthStore();

export default defineNuxtRouteMiddleware((to, from) => {
    const rotasPublicas = new Set(["auth-login", "auth-register"]);
    const token = useCookie("token").value;
    const isValido = authStore.verificaTokenValido();

    if (token && isValido && rotasPublicas.has(to.name as string))
        return navigateTo("/");

    if (rotasPublicas.has(to.name as string)) return;

    if (!token) return navigateTo("/auth/login");

    if (!isValido) {
        useCookie("token").value = null;
        return navigateTo("/auth/login");
    }
});
