import { Route, Routes } from "react-router";

import { Refound } from "../pages/Refound";
import { NotFound } from "../pages/NotFound";

export function EmployeeRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Refound />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
