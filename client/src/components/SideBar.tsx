import { ElementType } from "react";
import { FiHome } from "react-icons/fi";
import { Button, buttonStyles } from "./Button";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export function SideBar() {
    return (
        <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden">
            <SmallSidebarItem Icon={FiHome} title="Home" url="/" />
        </aside>
    );
}

type SmallSidebarItemProps = {
    Icon: ElementType,
    title: string,
    url: string
}

function SmallSidebarItem( { Icon, title, url } : SmallSidebarItemProps) {
    return <Link to={url} className={twMerge(buttonStyles({variant: "ghost"}), "py-4 px-1 flex flex-col items-center rounded-lg gap-1")}>
        <Icon className="w-5 h-5"/>
        <div className="text-sm"> {title} </div>
    </Link>
}