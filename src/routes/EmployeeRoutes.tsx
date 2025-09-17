import { Route, Routes } from "react-router";

import { Refound } from "../pages/Refound";
import { NotFound } from "../pages/NotFound";
import { AppLayout } from "../components/AppLayout";
import { Confirm } from "../pages/Confirm";

export function EmployeeRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Refound />} />
                <Route path="/confirm" element={<Confirm />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
