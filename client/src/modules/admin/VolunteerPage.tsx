import { Button } from "../../components/Button";
import { IconSelector } from "../../utils/selector";

const users = [
    {
        id: 23001,
        name: "John Simon",
        photo: "",
        zone: "khora",
        gender: "male"
    },
    {
        id: 23002,
        name: "Riya Sharma",
        photo: "",
        zone: "noida",
        gender: "female"
    },
    {
        id: 23003,
        name: "Mohammed Ali",
        photo: "",
        zone: "delhi",
        gender: "male"
    },
    {
        id: 23004,
        name: "Lisa Chen",
        photo: "",
        zone: "gurgaon",
        gender: "female"
    },
    {
        id: 23005,
        name: "Rajesh Kumar",
        photo: "",
        zone: "faridabad",
        gender: "male"
    },
    {
        id: 23006,
        name: "Maria Garcia",
        photo: "",
        zone: "ghaziabad",
        gender: "female"
    },
    {
        id: 23007,
        name: "Kevin Smith",
        photo: "",
        zone: "meerut",
        gender: "male"
    },
    {
        id: 23008,
        name: "Aisha Khan",
        photo: "",
        zone: "agra",
        gender: "female"
    },
    {
        id: 23009,
        name: "David Lee",
        photo: "",
        zone: "jaipur",
        gender: "male"
    },
    {
        id: 23010,
        name: "Priya Patel",
        photo: "",
        zone: "lucknow",
        gender: "female"
    }
];


const photoFor = {
    male: "https://thumbs.dreamstime.com/b/profile-picture-caucasian-male-employee-posing-office-happy-young-worker-look-camera-workplace-headshot-portrait-smiling-190186649.jpg",
    female: "https://i.pinimg.com/236x/54/6b/2d/546b2d4e9bddbcb894fa8e416739339b.jpg"
}

export function VolunteerPage() {
    return (
        <>
            <div className="container mx-auto sm:px-8 px-4 pb-4">
                <div className="grid md:grid-cols-3">
                    <div className="col-span-2">
                        <div className="flex p-4">
                            <input typeof="search" placeholder="Search Volunteer" className="grow md:grow-0 border-b-2 hover:border-indigo-600 mr-4"></input>
                            <Button variant={"default"} size={"icon"} ><IconSelector.all.search /></Button>
                        </div>
                        <div className=" p-4 mt-2">
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-2xl flex gap-3 items-center">
                                    <IconSelector.menuIcon.volunteer />Volunteer
                                </div>
                                <Button className="font-bold" variant={"contained"} startIcon={<IconSelector.all.add />}>Add</Button>
                            </div>

                            <div className="flex flex-col gap-4">
                                {users.map(user => <VolCard key={user.id} id={user.id} name={user.name} gender={user.gender} zone={user.zone} />)}
                            </div>
                        </div>
                    </div>
                    <div className="px-4">
                        <div className="text-xl my-6 p-4 font-bold rounded shadow sticky top-4">
                            Details
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

type VolCardProps = {
    id: number,
    name: string,
    zone: string,
    gender: string
}

function VolCard({ name, id, zone, gender }: VolCardProps) {
    return (
        <div className="w-full flex bg-white shadow-lg rounded-lg overflow-hidden p-4 gap-4 items-center">
            <img src={gender == "male" ? photoFor.male : photoFor.female} alt={gender} className="rounded-full w-12 h-12 bg-cover object-cover" />
            <div className="flex flex-col grow">
            <div className="text-gray-600 text-xs">#{id}</div>
            <div className="text-gray-900 font-bold">{name}</div>
            
            <div className="flex gap-2">
            <div className="text-gray-700 text-xs">Volunteer</div>
            <div className="text-gray-500 text-xs">Zone: {zone}</div>
            </div>
            </div>
            <Button variant={"chip"} size={"small-chip"} endIcon={<IconSelector.all.arrowRight/>}>View</Button>
        </div>
    );
}
