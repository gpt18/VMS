import { Children, ElementType, ReactNode } from "react";
import { FiGitPullRequest, FiHome, FiLogOut, FiUser } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { Button, buttonStyles } from "./Button";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { BsArchive, BsCalendar, BsCalendar3, BsCreditCard2Front, BsPeople } from "react-icons/bs";
import { useSidebarContext } from "../hooks/SidebarContext";

export function SideBar() {

    const { isLargeOpen, isSmallOpen } = useSidebarContext();

    return (
        <>
            <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1  ${isLargeOpen ? "lg:hidden" : "lg:flex"}`}>
                <SmallSidebarItem Icon={FiHome} title="Home" url="" />
                <SmallSidebarItem Icon={FiGitPullRequest} title="Request" url="" />
                <SmallSidebarItem Icon={BsPeople} title="Volunteer" url="" />
                <SmallSidebarItem Icon={RxDashboard} title="Event" url="" />
                <SmallSidebarItem Icon={FiUser} title="Profile" url="" />
            </aside>
            <aside className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${isLargeOpen ? "lg:flex" : "lg:hidden"} ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}>
                <LargeSidebarSection>
                    <LargeSidebarItem isActive Icon={FiHome} title="Home" url="" />
                    <LargeSidebarItem Icon={FiGitPullRequest} title="Request" url="" />
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection title="Volunteer">
                    <LargeSidebarItem Icon={BsPeople} title="Volunteer" url=""/>
                    <LargeSidebarItem Icon={BsCreditCard2Front} title="IdCard" url=""/>
                    <LargeSidebarItem Icon={BsArchive} title="Archive" url="" />
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection title="Event">
                    <LargeSidebarItem Icon={RxDashboard} title="Event" url=""/>
                    <LargeSidebarItem Icon={BsCalendar3} title="Schedule" url=""/>
                </LargeSidebarSection>
                <LargeSidebarSection title="Settings">
                    <LargeSidebarItem Icon={FiUser} title="Profile" url=""/>
                    <LargeSidebarItem Icon={FiLogOut} title="Logout" url=""/>
                </LargeSidebarSection>
            </aside>
        </>
    );
}

type SmallSidebarItemProps = {
    Icon: ElementType,
    title: string,
    url: string
}

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
    return <Link to={url} className={twMerge(buttonStyles({ variant: "ghost" }), "py-4 px-1 flex flex-col items-center rounded-lg gap-1")}>
        <Icon className="w-4 h-4" />
        <div className="text-sm"> {title} </div>
    </Link>
}

type LargeSidebarSectionProps = {
    children: ReactNode,
    title?: string,
    visibleItemCount?: number
}

function LargeSidebarSection({ children, title, visibleItemCount = Number.POSITIVE_INFINITY } : LargeSidebarSectionProps) {
    const childrenArray = Children.toArray(children).flat();
    const visibleChildren = childrenArray.slice(0, visibleItemCount)
    return (
        <div>
            { title && <div className="ml-4 mt-2 text-base text-slate-600 mb-1 uppercase">{title}</div>}
            {visibleChildren}
        </div>
    );
}

type LargeSidebarItemProps = {
    Icon: ElementType,
    title: string,
    url: string,
    isActive?: boolean
}

function LargeSidebarItem({ Icon, title, url, isActive = false }: LargeSidebarItemProps) {
    return <Link to={url} className={twMerge(buttonStyles({ variant: "ghost" }), `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary my-2" : "undefined"}`)}>
        <Icon className="w-5 h-5" />
        <div className="whitespace-nowrap overflow-hidden text-md text-ellipsis"> {title} </div>
    </Link>
}