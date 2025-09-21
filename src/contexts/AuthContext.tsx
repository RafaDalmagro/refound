import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

type AuthContext = {
    isLoading: boolean;
    session: null | UserAPIResponse;
    save: (session: UserAPIResponse) => void;
	remove: () => void;
};

const LOCAL_STORAGE_KEY = "@refound";

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<null | UserAPIResponse>(null);
    const [isLoading, setIsLoading] = useState(true);

    function save(data: UserAPIResponse) {
        localStorage.setItem(
            `${LOCAL_STORAGE_KEY}:user`,
            JSON.stringify(data.user)
        );
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token);

        setSession(data);
    }

    function loadUser() {
        const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);
        const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);

        if (user && token) {
            setSession({ user: JSON.parse(user), token });
        }

        setIsLoading(false);
    }

    function remove() {
        setSession(null);
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);

		window.location.href = "/";
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ session, save, isLoading, remove }}>
            {children}
        </AuthContext.Provider>
    );
}
