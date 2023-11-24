import { PageHeader } from "../components/PageHeader";
import { SideBar } from "../components/SideBar";
import { SidebarProvider } from "../hooks/SidebarContext";

export function AdminLayout() {

    const org = "SDRK Manavadhikar Foundation";

    return (
        <SidebarProvider>

            <div className="max-h-screen flex flex-col">
                <PageHeader orgName={org} />
                <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
                    <SideBar />
                    <div className="overflow-x-hidden px-8 pb-4">
                        <div className="sticky top-0 bg-white z-10 pb-4 md:hidden flex">
                            <div className="text-lg bg-gradient-to-l from-indigo-500 to-blue-500 rounded-md text-white px-2">
                                {org}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </SidebarProvider>
    );
}