import { Route, Routes } from "react-router";

import { Refound } from "../pages/Refound";
import { NotFound } from "../pages/NotFound";
import { AppLayout } from "../components/AppLayout";

export function EmployeeRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Refound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
