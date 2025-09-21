import { createContext } from "react";
import { useState } from "react";

type AuthContext = {
    session: null | UserAPIResponse;
    save: (session: UserAPIResponse) => void;
};

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<null | UserAPIResponse>(null);

    function save(session: UserAPIResponse) {
        setSession(session);
    }

    return (
        <AuthContext.Provider value={{ session, save }}>
            {children}
        </AuthContext.Provider>
    );
}
