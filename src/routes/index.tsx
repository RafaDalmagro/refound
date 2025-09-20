import { BrowserRouter } from "react-router";

import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";
import { Loading } from "../components/Loading";

const isLoading = true;

import { ManagerRoutes } from "./ManagerRoutes";
export function Routes() {
    if (isLoading) {
        return <Loading />;
    }
    return (
        <BrowserRouter>
            {/* <AuthRoutes /> */}
            {/* <EmployeeRoutes /> */}
            <AuthRoutes />
        </BrowserRouter>
    );
}
