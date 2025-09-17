import { Input } from "../components/Input";
import { useState } from "react";

export function Dashboard() {
    const [name, setName] = useState("");

    function fetchRefounds(e: React.FormEvent) {
        e.preventDefault();

        console.log(name);
    }

    return (
        <div className="bg-gray-500 rounded-xl p-10 md:min-w-[768px] ">
            <h1 className="text-gray-100 font-bold text-xl flex-1">
                Solicitações
            </h1>
            <form
                onSubmit={fetchRefounds}
                className="flex items-center justify-center pb-6 border-b-[1px] border-b-gray-400 md:flex-row gap-3 mt-6">
                <Input
                    placeholder="Pesquisar pelo nome"
                    onChange={(e) => setName(e.target.value)}
                />
            </form>
        </div>
    );
}
