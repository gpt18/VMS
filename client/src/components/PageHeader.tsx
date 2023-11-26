import { Link } from "react-router-dom";
import logo from '../assets/logo.svg';
import { FiUser } from "react-icons/fi";
import { strings } from "../utils/costants";
import { Button } from "./Button";
import { useSidebarContext } from "../hooks/SidebarContext";
import { IconSelector } from "../utils/selector";

export function PageHeader() {

    return (
        <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
            <PageHeaderFirstSection />
            {/* <div className="md:flex hidden justify-center items-center flex-grow">
                <div className="text-lg bg-gradient-to-l from-indigo-500 to-blue-500 rounded-md text-white px-2">
                    {orgName}
                </div>
            </div> */}
            <div className="flex flex-row md:gap-2 flex-shrink-0 ">
                <Button variant="ghost" size="icon">
                    <FiUser />
                </Button>

            </div>
        </div>
    );
}

export function PageHeaderFirstSection() {

    const { toggle, isLargeOpen, isSmallOpen } = useSidebarContext();

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
                <img src={logo} className="h-6" />
                {strings.APP_NAME}
            </div>
        </Link>
    </div>
}