const authStore = useAuthStore();

export default defineNuxtRouteMiddleware((to, from) => {
    const rotasPublicas = ['auth-login', 'user-register'];
    const token = useCookie('token').value;
    const isValido = authStore.verificaTokenValido();

    if (token && isValido && rotasPublicas.includes(to.name as string))
        return navigateTo('/');

    if (rotasPublicas.includes(to.name as string))
        return;

    if (!token)
        return navigateTo('/auth/login');

    if (!isValido) {
        useCookie('token').value = null;
        return navigateTo('/auth/login');
    }
});