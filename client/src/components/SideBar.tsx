import { Children, ElementType, ReactNode } from "react";

import { buttonStyles } from "./Button";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { useSidebarContext } from "../hooks/SidebarContext";
import { PageHeaderFirstSection } from "./PageHeader";
import { IconSelector } from "../utils/selector";

export function SideBar() {

    const { isLargeOpen, isSmallOpen, close } = useSidebarContext();

    return (
        <>
            <aside className={`hidden sticky top-0 overflow-y-auto scrollbar-hidden pb-4 sm:flex flex-col ml-1 mb-1 bg-white rounded ${isLargeOpen ? "lg:hidden" : "lg:flex"}`}>
                <SmallSidebarItem Icon={IconSelector.menuIcon.home} title="Home" url="/ngo" />
                <SmallSidebarItem Icon={IconSelector.menuIcon.request} title="Request" url="request" />
                <SmallSidebarItem Icon={IconSelector.menuIcon.volunteer} title="Volunteer" url="vol" />
                <SmallSidebarItem Icon={IconSelector.menuIcon.event} title="Event" url="event" />
                <SmallSidebarItem Icon={IconSelector.menuIcon.user} title="Profile" url="profile" />
            </aside>
            {isSmallOpen && (
                <div onClick={close} className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50" />
            )}
            <aside className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 bg-white rounded-e ${isLargeOpen ? "lg:flex" : "lg:hidden"} ${isSmallOpen ? "flex z-[999] bg-white h-full " : "hidden"}`}>
                <div className="lg:hidden py-4 px-2 sticky top-0 bg-white">
                    <PageHeaderFirstSection />
                </div>
                <LargeSidebarSection>
                    <LargeSidebarItem isActive Icon={IconSelector.menuIcon.home} title="Home" url="/ngo" />
                    <LargeSidebarItem Icon={IconSelector.menuIcon.request} title="Request" url="request" />
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection title="Volunteer">
                    <LargeSidebarItem Icon={IconSelector.menuIcon.volunteer} title="Volunteer" url="vol" />
                    <LargeSidebarItem Icon={IconSelector.menuIcon.card} title="IdCard" url="card" />
                    <LargeSidebarItem Icon={IconSelector.menuIcon.archive} title="Archive" url="archive" />
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection title="Event">
                    <LargeSidebarItem Icon={IconSelector.menuIcon.event} title="Event" url="event" />
                    <LargeSidebarItem Icon={IconSelector.menuIcon.calender} title="Schedule" url="schedule" />
                </LargeSidebarSection>
                <LargeSidebarSection title="Settings">
                    <LargeSidebarItem Icon={IconSelector.menuIcon.user} title="Profile" url="profile" />
                    <LargeSidebarItem Icon={IconSelector.menuIcon.logout} title="Logout" url="" />
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

function LargeSidebarSection({ children, title, visibleItemCount = Number.POSITIVE_INFINITY }: LargeSidebarSectionProps) {
    const childrenArray = Children.toArray(children).flat();
    const visibleChildren = childrenArray.slice(0, visibleItemCount)
    return (
        <div>
            {title && <div className="ml-4 mt-2 text-base text-slate-600 mb-1 uppercase">{title}</div>}
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
    const { onlySmallClose } = useSidebarContext();

    return <Link to={url} className={twMerge(buttonStyles({ variant: "ghost" }), `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary my-2 border-r-4 border-slate-600" : "undefined"}`)} onClick={onlySmallClose}>
        <Icon className="w-5 h-5" />
        <div className="whitespace-nowrap overflow-hidden text-md text-ellipsis"> {title} </div>
    </Link>
}

