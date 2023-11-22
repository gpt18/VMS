import { PageHeader } from "../components/PageHeader";
import { SideBar } from "../components/SideBar";

export function AdminLayout() {

    const org = "SDRK Manavadhikar Foundation";

    return (
        <div className="max-h-screen flex flex-col">
            <PageHeader orgName={org}/>
            <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
                <SideBar />
                <div className="overflow-x-hidden px-8 pb-4">
                    <div className="sticky top-0 bg-white z-10 pb-4 md:hidden flex">
                        <div className="text-lg">
                        {org}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}