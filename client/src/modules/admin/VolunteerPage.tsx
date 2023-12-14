import React, { useState } from "react";
import { Button } from "../../components/Button";
import { IconSelector } from "../../utils/selector";
import { TextField } from "../../components/TextField";

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

    function handleReset (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setNewUser({
            ...newUser,
            name: "",
            zone: "",
        })
    }
      

    return (
        <>
            <div className="container mx-auto grid md:grid-cols-2">

                <div className="col-span-1 mx-4 pb-4">

                    <div className="">
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-lg flex gap-3 items-center">
                                <IconSelector.menuIcon.volunteer />
                                <div className=" font-bold">
                                    Volunteer
                                    <div className="text-xs font-normal text-gray-500">Count: {users.length} </div>
                                </div>
                            </div>
                            <Button variant={"contained"} startIcon={<IconSelector.all.add />}>Add</Button>
                        </div>

                        <SearchInput />


                        <div className="mt-6 space-y-3 pb-80">
                            {users.map((user, index) => <VolCard key={index} id={user.id} name={user.name} gender={user.gender} zone={user.zone} />)}
                        </div>
                    </div>


                </div>
                <div className="px-4 pb-4">
                    <div className="max-w-md rounded-lg p-4 shadow-md border border-gray-300 sticky top-0">
                        <div className="font-bold text-lg mb-4">
                            Add New Volunteer
                        </div>

                        {/* -------- add volunteer form -------- */}
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <TextField placeholder="Full Name" name="name" value={newUser.name} type="text" id="name" onChange={handleChange} required />

                            <TextField placeholder="Zone" name="zone" value={newUser.zone} type="text" id="zone" onChange={handleChange} required />

                            <div className="mt-10 flex gap-5 justify-center items-center">
                                <Button type="reset" variant={"gray"} startIcon={<IconSelector.all.reset />} onClick={handleReset}>Reset</Button>
                                <Button variant={"contained"} type="submit" className="grow">Add</Button>
                            </div>
                        </form>
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
        <div className="flex-shrink-0 min-w-fit group/item hover:bg-neutral-100 w-full flex bg-white rounded-lg overflow-hidden p-4 gap-4 items-center ring-1 ring-gray-950/10">
            <img src={gender == "male" ? photoFor.male : photoFor.female} alt={gender} className="rounded-full w-12 h-12 bg-cover object-cover" />
            <div className="flex flex-col grow">
                <div className="text-gray-600 text-xs">#{id}</div>
                <div className="text-gray-900 font-bold">{name}</div>

                <div className="flex gap-2">
                    <div className="text-gray-700 text-xs">Volunteer</div>
                    <div className="text-gray-500 text-xs">Zone: {zone}</div>
                </div>
            </div>
            <Button className="group/view invisible group-hover/item:visible" variant={"chip"} size={"small-chip"} endIcon={<IconSelector.all.arrowRight />}>View</Button>
        </div>
    );
}
