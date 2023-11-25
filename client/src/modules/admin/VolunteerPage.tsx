import { Button } from "../../components/Button";
import { IconSelector } from "../../utils/selector";

export function VolunteerPage() {
    return (
        <>
            <div className="container mx-auto">
                <div className="flex p-2">
                    <input typeof="search" placeholder="Search Volunteer" className="grow md:grow-0 border-b-2 hover:border-indigo-600 mr-4"></input>
                    <Button variant={"default"} size={"icon"} ><IconSelector.all.search /></Button>
                </div>
                <div className="flex justify-between mt-7 mb-4 items-center">
                    <div className="text-2xl flex gap-3 items-center">
                        <IconSelector.menuIcon.volunteer/>Volunteer
                    </div>
                    <Button variant={"open"} className="bg-blue-700 text-white flex items-center justify-between px-4"><IconSelector.all.add /> Add</Button>
                </div>

                <div>
                    <VolCard/>
                </div>
            </div>
        </>
    );
}

function VolCard() {
    return (
        <div className="rounded-lg bg-indigo-100 p-4 shadow">
            photo
            <div>
                <div className="text-lg">Name</div>
                <div className="text-slate-500">#28930</div>
                role
                zone
            </div>
        </div>
    );
}