import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";
import { z, ZodError } from "zod";

import { api } from "../services/api";
import { AxiosError } from "axios";

import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";
import fileSvg from "../assets/file.svg";

const refundsSchema = z.object({
    name: z
        .string()
        .min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
    category: z.string().min(1, { message: "Selecione uma categoria" }),
    amount: z.coerce
        .number({ message: "Valor inválido" })
        .positive({ message: "O valor deve ser positivo" }),
});

export function Refound() {
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams<{ id: string }>();

    const navigate = useNavigate();

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (params.id) {
            return navigate(-1);
        }

        try {
            setIsLoading(true);

            if (!file) {
                return alert("Por favor, envie o comprovante da despesa");
            }

            const fileUploadForm = new FormData();
            fileUploadForm.append("file", file);
            
            const response = await api.post("/uploads", fileUploadForm);


            const data = refundsSchema.parse({
                name,
                category,
                amount: amount.replace(",", "."),
            });

            await api.post("/refunds", {
                ...data,
                filename: response.data.filename,
            });

            navigate("/confirm", { state: { fromSubmit: true } });
        } catch (error) {
            if (error instanceof ZodError) {
                return alert(error.issues[0].message);
            }
            if (error instanceof AxiosError) {
                return alert(error.response?.data.message);
            }
            alert("Não foi possível enviar a solicitação");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form
            onSubmit={onSubmit}
            className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-[512px]">
            <header>
                <h1 className="text-xl font-bold text-gray-100">
                    Solicitação de Reembolso
                </h1>
                <p className="text-sm text-gray-200 mt-2 mb-4">
                    Dados da despesa para solicitação de reembolso
                </p>
            </header>

            <Input
                required
                legend="Nome da solicitação"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!!params.id}
            />
            <div className="flex gap-4">
                <Select
                    required
                    legend="Categoria"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={!!params.id}>
                    {CATEGORIES_KEYS.map((category) => (
                        <option key={category} value={category}>
                            {CATEGORIES[category].name}
                        </option>
                    ))}
                </Select>
                <Input
                    required
                    legend="Valor gasto"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={!!params.id}
                />
            </div>
            {params.id ? (
                <a
                    href="https://rafadalmagro.com.br"
                    target="_blank"
                    className="text-sm text-green-100
                font-semibold flex items-center justify-center gap-2 hover:opacity-70 transition ease-linear my-6">
                    <img src={fileSvg} alt="Ícone de arquivo" />
                    Abrir comprovante
                </a>
            ) : (
                <Upload
                    filename={file && file.name}
                    onChange={(e) =>
                        e.target.files && setFile(e.target.files[0])
                    }
                />
            )}

            <Button type="submit" isLoading={isLoading}>
                {params.id ? "Voltar" : "Enviar"}
            </Button>
        </form>
    );
}
