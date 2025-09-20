import { Routes, Route } from "react-router";
import { Dashboard } from "../pages/Dashboard";
import { NotFound } from "../pages/NotFound";
import { AppLayout } from "../components/AppLayout";
import { Refound } from "../pages/Refound";
export function ManagerRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="/refound/:id" element={<Refound />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
