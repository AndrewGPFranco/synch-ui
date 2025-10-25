import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import type { IUser } from "~/types/IUser";
import ResponseAPI from "@/utils/ResponseAPI";
import { useFetch, useCookie } from 'nuxt/app';
import type { IUserLogin } from "~/types/IUserLogin";
import type { IDecodeJWT } from "~/types/IDecodeJWT";

interface LoginResponse {
    response: string;
}

export const useAuthStore = defineStore("auth-store", {
    state: () => ({
        user: {} as IUser
    }),
    actions: {
        async login(input: IUserLogin): Promise<ResponseAPI<string>> {
            const { data, error } = await useFetch<LoginResponse>('/api/v1/user/login', {
                baseURL: 'http://localhost:8080',
                method: 'POST',
                body: input,
            });

            if (error.value)
                return new ResponseAPI(true, 'Erro ao realizar login!');

            if (data.value) {
                useCookie('token').value = data.value.response;
                const decoded: IDecodeJWT = jwtDecode(data.value.response);
                await this.getUserLogged(decoded.id, data.value.response);
                return new ResponseAPI(false, 'Login realizado com sucesso!');
            }

            return new ResponseAPI(true, 'Erro inesperado, tente novamente!');
        },
        verificaTokenValido(): boolean {
            const token: string | null | undefined = useCookie('token').value;

            if (token === null || token === undefined || token === "") return false;

            const decoded: IDecodeJWT = jwtDecode(token);
            const dataExpericaoToken = new Date(decoded.exp * 1000);

            if (dataExpericaoToken < new Date()) {
                useCookie('token').value = null;
                return false;
            }

            return true;
        },
        async getUserLogged(id: string, token: string): Promise<void> {
            try {
                const data = await $fetch<any>(`/api/v1/user/${id}`, {
                    baseURL: 'http://localhost:8080',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                this.user = data.response;
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        }
    },
});