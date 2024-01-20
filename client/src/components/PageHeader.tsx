import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.svg';
import { Button } from "./Button";
import { useSidebarContext } from "../hooks/SidebarContext";
import { IconSelector } from "../utils/selector";
import { useNgoDataContext } from "../hooks/NgoDataContext";

export function PageHeader() {

    const navigate = useNavigate();

    function handleLogout(){
        localStorage.clear();
        navigate("/");
    }

    return (
        <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
            <PageHeaderFirstSection />
            {/* <div className="md:flex hidden justify-center items-center flex-grow">
                <div className="text-lg bg-gradient-to-l from-indigo-500 to-blue-500 rounded-md text-white px-2">
                    {orgName}
                </div>
            </div> */}
            <div className="flex flex-row md:gap-2 flex-shrink-0 ">
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                    <IconSelector.menuIcon.logout />
                </Button>

            </div>
        </div>
    );
}

export function PageHeaderFirstSection() {

    const { toggle, isSmallOpen } = useSidebarContext();
    const { brandData } = useNgoDataContext();

    return <div className="flex gap-4 items-center flex-shrink-0">
        <Button onClick={toggle} variant="ghost" size="icon">
            {isSmallOpen ? (
                <IconSelector.menuIcon.close className="w-5 h-5" />
            ) :  (
                <IconSelector.menuIcon.menuBar className="w-5 h-5" />
            )}
        </Button>
        <Link to={"/ngo"}>
            <div className="flex flex-row gap-2 font-bold">
                <img src={ brandData.ngo_logo || logo } className="h-6 " />
                {isSmallOpen ? <div className="overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[50px]">{brandData.ngo_name}</div> : `${brandData.ngo_name}`}
            </div>
        </Link>
    </div>
}