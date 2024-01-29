import { useNgoDataContext } from "../../hooks/NgoDataContext";
import { IconSelector } from "../../utils/selector";

export default function NgoProfile() {
    const { brandData, ngoData, userData } = useNgoDataContext();
    return (
        <div className="md:pb-4 md:pe-4 h-full">
            <div className="flex md:flex-row flex-col-reverse gap-4 p-4 md:p-6 bg-gray-100 rounded-md min-h-full">
                <div className="flex-1">
                    <div className="text-2xl font-semibold mb-6">NGO Profile</div>
                    <div className="rounded-xl bg-white p-4 shadow-md space-y-10">
                        <div className="flex md:gap-6 gap-4 items-center">
                            <div className="h-20 w-20">
                                <img decoding="async" src={brandData.ngo_logo} alt="" className="" />
                            </div>
                            <div>
                                <div className="font-light text-2xl">
                                    {brandData.ngo_name}
                                </div>
                                <div className="flex flex-col md:flex-row md:gap-4">
                                    <div>NGO ID: <b> {ngoData.ngo_id}</b></div>
                                    <div className="text-gray-500 text-sm inline-flex items-center">{ngoData.id} <IconSelector.all.copy/></div>
                                </div>
                            </div>
                        </div>
                        <div className="md:flex md:gap-6 gap-4">
                            <div className="md:w-1/2 border rounded p-2">
                                <div className="text-lg mb-6">Basic Details</div>
                                <div>
                                Sector: {ngoData.sector}
                                    <br />
                                    Zone City: {ngoData.zone_city}
                                    <br />
                                    Events: {ngoData.event_list.length}
                                    <br />
                                    Volunteers: {ngoData.volunteer_associated.length}
                                    <br />
                                    Website: {ngoData.website}
                                </div>
                            </div>
                            <div className="md:w-1/2 border rounded p-2">
                                <div className="text-lg mb-6">Contact Details</div>
                                <div>
                                    Email: {ngoData.email}
                                    <br />
                                    Phone: {ngoData.phone}
                                    <br />
                                    Address: {ngoData.address}
                                    <br />
                                    State: {ngoData.state}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:px-6">
                    <div className="text-2xl font-semibold mb-6">User Profile</div>
                    <div className="rounded-xl bg-white p-4 shadow-md space-y-4">
                        <div>
                            <div className="text-xs font-semibold">User ID</div>
                            <div className="text-gray-500 text-sm inline-flex items-center">{userData.id} <IconSelector.all.copy/></div>
                        </div>
                        <div>
                            <div className="text-gray-700 text-xs">Username</div>
                            <div className="font-medium">@{userData.username}</div>
                        </div>
                        <div>
                            <div className="text-gray-700 text-xs">Email</div>
                            <div className="font-medium">{userData.email}</div>
                        </div>
                        <div>
                            <div className="text-gray-700 text-xs">Role</div>
                            <div className="font-medium">{userData.role}</div>
                        </div>
                        <div>
                            <div className="text-gray-700 text-xs">Last Login</div>
                            <div className="font-medium">{new Date(userData.lastLogin).toUTCString()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

