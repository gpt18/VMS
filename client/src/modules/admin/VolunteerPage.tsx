import React, { useState } from "react";
import { Button } from "../../components/Button";
import { IconSelector } from "../../utils/selector";
import { TextField } from "../../components/TextField";
import { Link } from "react-router-dom";

const usersData = [
    {
        id: "23001",
        name: "John Simon",
        photo: "",
        zone: "khora",
        gender: "male",
        role: "volunteer"
    },
    {
        id: "23002",
        name: "Riya Sharma",
        photo: "",
        zone: "noida",
        gender: "female",
        role: "volunteer"
    },
    {
        id: "23001",
        name: "John Simon",
        photo: "",
        zone: "khora",
        gender: "male",
        role: "volunteer"
    },
    {
        id: "23002",
        name: "Riya Sharma",
        photo: "",
        zone: "noida",
        gender: "female",
        role: "volunteer"
    },
    {
        id: "23001",
        name: "John Simon",
        photo: "",
        zone: "khora",
        gender: "male",
        role: "volunteer"
    },
    {
        id: "23002",
        name: "Riya Sharma",
        photo: "",
        zone: "noida",
        gender: "female",
        role: "volunteer"
    },
    {
        id: "23001",
        name: "John Simon",
        photo: "",
        zone: "khora",
        gender: "male",
        role: "volunteer"
    },
    {
        id: "23002",
        name: "Riya Sharma",
        photo: "",
        zone: "noida",
        gender: "female",
        role: "volunteer"
    },

];


const photoFor = {
    male: "https://thumbs.dreamstime.com/b/profile-picture-caucasian-male-employee-posing-office-happy-young-worker-look-camera-workplace-headshot-portrait-smiling-190186649.jpg",
    female: "https://i.pinimg.com/236x/54/6b/2d/546b2d4e9bddbcb894fa8e416739339b.jpg"
}

interface UserType {
    id: string,
    name: string,
    photo: string,
    zone: string,
    gender: string,
    role: string,
}

export function VolunteerPage() {

    const [users, setUsers] = useState<UserType[]>([...usersData]);

    const [newUser, setNewUser] = useState<UserType>({
        id: '123',
        name: '',
        role: 'volunteer',
        gender: 'male',
        zone: '',
        photo: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setNewUser((prev) => ({ ...prev, [name]: value }));

    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setUsers((prev) => ([...prev, newUser]));

        setNewUser({
            ...newUser,
            name: "",
            zone: "",
        })

    }

    function handleReset(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setNewUser({
            ...newUser,
            name: "",
            zone: "",
        })
    }


    return (
        <>
            <div className="container mx-auto pb-80">

                <div className="mx-4 md:mx-14 pb-4">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-3xl sm:text-5xl flex gap-3 items-center">
                            <IconSelector.menuIcon.volunteer />
                            <div>
                                Volunteer
                            </div>
                        </div>

                    </div>

                    <div className="md:flex justify-between">
                        <div className="md:w-3/6">
                            <SearchInput />
                        </div>
                        <div className="my-3 md:m-0 self-center">
                            <Link to={"../vol/new"}><Button variant={"contained"} startIcon={<IconSelector.all.add />}>Add</Button></Link>
                        </div>
                    </div>

                    <div className="mt-6 relative rounded-md border bg-slate-50">
                        <div className="flex justify-between gap-2 p-4 bg-slate-800 text-white rounded-t-md sticky top-0 overflow-x-auto whitespace-nowrap scrollbar-hide">
                            <div className="px-3">
                                Slno
                            </div>
                            <div className="px-3">
                                Volunteer
                            </div>
                            <div className="px-3">
                                Zone
                            </div>
                            <div className="px-3">
                                Email
                            </div>
                            <div className="px-3">
                                Phone
                            </div>
                            <div className="px-3">
                                Address
                            </div>
                            <div className="px-3">
                                Action
                            </div>
                        </div>

                        <div className="flex flex-col p-4 space-y-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
                            {users.map((user, index) => <VolCard key={index} id={user.id} name={user.name} gender={user.gender} zone={user.zone} />)}
                        </div>
                    </div>

                </div>


            </div>
        </>
    );
}

function SearchInput() {
    return (
        <>

            <form>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <IconSelector.all.search className="w-4 h-4 text-gray-500 " />
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search volunteer..." required />
                    <Button variant={"contained"} type="submit" className="absolute end-2.5 bottom-2.5">Search</Button>
                </div>
            </form>

        </>
    );
}

type VolCardProps = {
    id: string,
    name: string,
    zone: string,
    gender: string
}

function VolCard({ name, id, zone, gender }: VolCardProps) {
    return (
        <div className="flex min-w-fit justify-between gap-2 p-4 rounded-lg group/item hover:bg-neutral-100 bg-white items-center ring-1 ring-gray-950/10">
            <div className="px-3">
                1
            </div>

            <div className="flex gap-2 rounded-lg bg-indigo-50 py-2 px-4 flex-shrink-0 cursor-pointer">
                <img src={gender == "male" ? photoFor.male : photoFor.female} alt={gender} className="rounded-full w-12 h-12 bg-cover object-cover" />
                <div className="flex flex-col grow">
                    <div className="text-gray-600 text-xs">#{id}</div>
                    <div className="text-gray-900 font-bold">{name}</div>

                </div>
            </div>

            <div className="px-3">{zone}</div>
            <div className="px-3">abc@gmail.com</div>
            <div className="px-3">9354768011</div>
            <div className="px-3">
                <div className="text-xs text-gray-400">khora colony</div>
                <div className="text-sm">Ghaziabad UP</div>
            </div>

            <Button className="group/view invisible group-hover/item:visible" variant={"chip"} size={"small-chip"} endIcon={<IconSelector.all.arrowRight />}>Edit</Button>
        </div>
    );
}
