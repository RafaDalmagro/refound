import { useState } from "react";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(event: React.FormEvent) {
        event.preventDefault();

        console.log(email, password);
    }

    return (
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
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
