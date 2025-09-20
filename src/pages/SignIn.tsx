import { useActionState } from "react";
import { z, ZodError } from "zod";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { ca } from "zod/locales";

const signInSchema = z.object({
    email: z.email({ message: "Email inválido" }),
    password: z
        .string()
        .trim()
        .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

export function SignIn() {
    const [state, formAction, isLoading] = useActionState(signIn, null);
    async function signIn(_: any, formData: FormData) {
        try {
            const data = signInSchema.parse({
                email: String(formData.get("email")),
                password: String(formData.get("password")),
            });
            console.log(data);
        } catch (error) {
            if (error instanceof ZodError) {
                return { message: error.issues[0].message };
            }
            return { message: "Erro ao fazer login. Tente novamente." };
        }
    }

    return (
        <form action={formAction} className="w-full flex flex-col gap-4">
            <Input
                name="email"
                required
                legend="Email"
                type="email"
                placeholder="seu@email.com"
            />
            <Input
                name="password"
                required
                legend="Senha"
                type="password"
                placeholder="123456"
            />

            <p className="text-red-600 font-medium text-sm text-center my-4">
                {state?.message && <span>{state.message}</span>}
            </p>
            <Button type="submit" isLoading={isLoading}>
                Entrar
            </Button>
            <a
                href="/signup"
                className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear">
                Criar conta
            </a>
        </form>
    );
}
