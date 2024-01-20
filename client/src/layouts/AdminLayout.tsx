import { Outlet, useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { SideBar } from "../components/SideBar";
import { SidebarProvider } from "../hooks/SidebarContext";
import { useEffect } from "react";
import axios from "axios";
import { useNgoDataContext } from "../hooks/NgoDataContext";



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
                // const token = localStorage.getItem("access_key");
                // const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/ngo/register/status`, {
                //     headers: {
                //         Authorization: `Bearer ${token}`
                //     }
                // });
                const { data } = await axios.get(`/ngo/register/status`);
                
                if(data.profile_status === "PENDING") return navigate("/ngo/register");

                setBrandData({...brandData, ngo_name: data.ngo_name, ngo_logo: data.ngo_logo});

            } catch (error: any) {
                console.log(error.response.data);
            }
        }

        checkStatus();
    }, [])

    return (


        <SidebarProvider>

            <div className="max-h-screen flex flex-col">
                <PageHeader />
                <div className="sm:grid sm:grid-cols-[auto,1fr] sm:flex-grow-1 overflow-auto">
                    <SideBar />
                    <div className="overflow-x-clip">
                        <Outlet />
                    </div>
                </div>
            </div>

        </SidebarProvider>


    );
}