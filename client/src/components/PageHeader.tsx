import { Link } from "react-router-dom";
import logo from '../assets/logo.svg';
import { IoMenu } from "react-icons/io5";
import { FiUser, FiAlignLeft } from "react-icons/fi";
import { strings } from "../utils/costants";
import { Button } from "./Button";

type PageHeaderProps = {
    orgName: string
}

export function PageHeader( { orgName } : PageHeaderProps ) {
    return (
        <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
            <div className="flex gap-4 items-center flex-shrink-0">
                <Button variant="ghost" size="icon" > <IoMenu/> </Button>
                <Link to={"/ngo"}>
                    <div className="flex flex-row gap-2 font-bold">
                        <img src={logo} className="h-6" />
                        {strings.APP_NAME}
                    </div>
                </Link>
            </div>
            <div className="md:flex hidden justify-center items-center flex-grow">
            { orgName }
            </div>
            <div className="flex flex-row md:gap-2 flex-shrink-0 ">
                <Button variant="ghost" size="icon">
                    <FiUser/>
                </Button>
                
            </div>
        </div>
    );
}