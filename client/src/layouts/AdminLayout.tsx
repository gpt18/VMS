import { Outlet } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { SideBar } from "../components/SideBar";
import { SidebarProvider } from "../hooks/SidebarContext";
import { DashboardPage } from "../modules/admin/DashboardPage";


export function AdminLayout() {

    const org = "SDRK Manavadhikar Foundation";

    return (
        <SidebarProvider>
            <div className="max-h-screen flex flex-col">
                <PageHeader />
                <div className="sm:grid sm:grid-cols-[auto,1fr] sm:flex-grow-1 overflow-auto">
                    <SideBar />
                    <div className="overflow-x-hidden">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}