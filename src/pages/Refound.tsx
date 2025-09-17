import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";

import { useState } from "react";

import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";

export function Refound() {
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [fileName, setFileName] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(event: React.FormEvent) {
        event.preventDefault();

        console.log({ name, category, amount, fileName });
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
            />
            <div className="flex gap-4">
                <Select
                    required
                    legend="Categoria"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
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
                />
            </div>

            <Upload
                filename={fileName && fileName.name}
                required
                onChange={(e) =>
                    e.target.files && setFileName(e.target.files[0])
                }
            />
            <Button type="submit" isLoading={isLoading}>
                Enviar
            </Button>
        </form>
    );
}
