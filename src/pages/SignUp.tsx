import { useState } from "react";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

import { z } from "zod";
import { ZodError } from "zod";

import { api } from "../services/api";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

const signUpSchema = z
    .object({
        name: z.string().trim().min(1, { message: "Informe o nome" }),
        email: z.email({ message: "Email inválido" }),
        password: z
            .string()
            .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
        confirmPassword: z.string({ message: "Confirme a senha" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    });

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {
            setIsLoading(true);
            const data = signUpSchema.parse({
                name,
                email,
                password,
                confirmPassword,
            });

            await api.post("/users", data);

            if (
                confirm(
                    "Cadastrado com sucesso! Deseja ir para a tela de login?"
                )
            ) {
                navigate("/");
            }
        } catch (error) {
            if (error instanceof ZodError) {
                return alert(error.issues[0].message);
            }
            if (error instanceof AxiosError) {
                return alert(error.response?.data.message);
            }
            return alert("Erro ao criar conta. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
            <Input
                required
                legend="Nome"
                placeholder="Seu nome"
                onChange={(event) => setName(event.target.value)}
            />
            <Input
                required
                legend="Email"
                type="email"
                placeholder="seu@email.com"
                onChange={(event) => setEmail(event.target.value)}
            />
            <Input
                required
                legend="Senha"
                type="password"
                placeholder="123456"
                onChange={(event) => setPassword(event.target.value)}
            />
            <Input
                required
                legend="Confirmar Senha"
                type="password"
                placeholder="123456"
                onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <Button type="submit" isLoading={isLoading}>
                Criar conta
            </Button>
            <a
                href="/"
                className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear">
                Já possui uma conta? Faça login
            </a>
        </form>
    );
}
