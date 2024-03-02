import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { IconSelector } from "../../utils/selector";
import { Link } from "react-router-dom";
import { useNgoDataContext } from "../../hooks/NgoDataContext";
import axios from "axios";

import UserProfileIcon from "../../components/UserProfileIcon";


type volunteerProps = {
    email: string;
    gender: string;
    name: string;
    phone: string;
    photo: string;
    status: string;
    vol_id: string;
    _id: string;
};

export function VolunteerPage() {


    const { ngoData } = useNgoDataContext();
    const [volunteers, setVolunteers] = useState<volunteerProps[]>([]);

    useEffect(() => {
        const getAllVolunteers = async () => {
            if (ngoData.id) {
                try {
                    const response = await axios.get(`/ngo/${ngoData.id}/volunteers`);
                    if (Array.isArray(response.data)) {
                        setVolunteers(response.data);
                    } else {
                        console.error('API response is not an array');
                    }
                } catch (error) {
                    console.error('Error fetching volunteers:', error);
                }
            }
        };
        getAllVolunteers();
    }, [ngoData.id]);


    return (
        <>
            <div className="mx-auto max-w-screen-2xl p-4 md:px-6 2xl:px-10">

                <div className="flex justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-black">
                        <div className="flex items-center gap-2"><IconSelector.menuIcon.volunteer /> Volunteer</div>
                    </h2>
                    {
                        volunteers.length > 0 
                        &&
                        <Link to={"../vol/new"}><Button variant={"contained"} startIcon={<IconSelector.all.add />}>Add</Button></Link>

                    }

                </div>

                {/* <div className="md:flex justify-between my-4">
                    <div className="md:w-1/2">
                        <SearchInput />
                    </div>
                    <div className="my-3 md:m-0 self-center">
                    </div>
                </div> */}

                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Photo
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ID
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Phone
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {volunteers.length > 0 ? volunteers.map((volunteer) => (
                                            <tr key={volunteer._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <UserProfileIcon fullName={volunteer.name} photo={volunteer.photo}/>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 hover:text-indigo-700 hover:underline">
                                                        <Link to={`/ngo/vol/${volunteer._id}`}>
                                                        {volunteer.vol_id}
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 capitalize">{volunteer.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{volunteer.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{volunteer.phone}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500 rounded-full bg-orange-50 border border-orange-200 text-center px-2 py-1">{volunteer.status}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500 flex gap-2">
                                                        <Button variant={"ghost"} size={"icon"} className="text-blue-500" title="Edit"><IconSelector.all.edit/></Button>
                                                        <Button variant={"ghost"} size={"icon"} className="text-red-500" title="Delete"><IconSelector.all.delete/></Button>
                                                        
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                            :
                                            <tr>
                                                <td colSpan={7} className="px-6 py-4">
                                                    <div className="flex flex-col items-center">
                                                        <h1 className="text-xl font-medium">No Volunteer</h1>
                                                        <div className="text-sm text-gray-500">Click on + Add Button to add new volunteer into you organization.</div>
                                                        <Link to={"../vol/new"} className="pt-10"><Button variant={"contained"} startIcon={<IconSelector.all.add />}>Add</Button></Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
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
