import { useNavigate } from "react-router-dom";
import { IconSelector } from "../utils/selector";
import { Button } from "./Button";
import { ReactNode } from "react";

type PageTitleProps = {
    title: string;
    children?: ReactNode;
}

export function PageTitle({ title, children }: PageTitleProps) {
    const navigate = useNavigate();
    return (
        <h2 className="text-2xl font-semibold text-black flex justify-between">
            <div className="flex items-center gap-2">
                <Button variant={'gray'} onClick={() => navigate(-1)} size={'icon'}><IconSelector.all.back /></Button>
                {title}
            </div>
            {children}
        </h2>
    );
}