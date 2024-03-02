import { Outlet, useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { SideBar } from "../components/SideBar";
import { SidebarProvider } from "../hooks/SidebarContext";
import { useEffect } from "react";
import axios from "axios";
import { useNgoDataContext } from "../hooks/NgoDataContext";
import logo from '../assets/logo.svg';
import { strings } from "../utils/costants";




export function AdminLayout() {

    const navigate = useNavigate();
    const { brandData, setBrandData } = useNgoDataContext();


    useEffect(() => {

        const ngoAppStartup = () => {
            const token = localStorage.getItem('access_key');
            axios.defaults.baseURL = import.meta.env.VITE_API_URL;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        ngoAppStartup();

        const checkStatus = async () => {
            try {
                const { data } = await axios.get(`/ngo/register/status`);

                if (data.profile_status === "PENDING") return navigate("/ngo/register", { replace: true });

                setBrandData({ ...brandData, ngo_name: data.ngo_name, ngo_logo: data.ngo_logo });

            } catch (error: any) {
                console.log(error.response.data);
            }
        }

        checkStatus();
    }, []);

    const {
        userData,
        ngoData,
        setUserData,
        setNgoData,
    } = useNgoDataContext();

    useEffect(() => {
        const getUserDetails = async () => {
            const { data } = await axios.get('/ngo/owner');

            setUserData({
                ...userData,
                id: data.id,
                username: data.username,
                email: data.email,
                role: data.role,
                lastLogin: data.last_login,
                name: data.name,
            })
        }



        const getNgoDetails = async () => {
            const { data } = await axios.get(`/ngo/details`);
            const { _id: id, ngo_id, doc: { verified }, event_list, volunteer_associated, properties } = data.ngoDetail;
            const { address, zone_city, state, website, sector, email, phone } = properties;

            setNgoData({
                ...ngoData,
                id,
                ngo_id,
                address,
                verified,
                zone_city,
                event_list,
                volunteer_associated,
                state,
                website,
                sector,
                email,
                phone,
            });


        }

        getUserDetails();
        getNgoDetails();
    }, []);

    return (


        <SidebarProvider>

            <div className="max-h-screen flex flex-col h-full bg-gray-100">
                <PageHeader />
                <div className="sm:grid sm:grid-cols-[auto,1fr] gap-4 sm:flex-grow-1 pt-4 h-full overflow-auto">
                    <SideBar />
                    <div className="overflow-x-hidden">
                        <Outlet />
                        <div className="py-20 flex justify-center items-center">
                            <img id="icon" className='w-10 h-10' src={logo} alt="logo" />
                            <div className="text-lg font-bold"> {strings.APP_NAME} </div>
                        </div>
                    </div>

                </div>

            </div>

        </SidebarProvider>


    );
}