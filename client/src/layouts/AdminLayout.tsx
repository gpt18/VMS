import { Outlet, useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { SideBar } from "../components/SideBar";
import { SidebarProvider } from "../hooks/SidebarContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserContext } from "../hooks/UserContext";


export function AdminLayout() {
    // const navigate = useNavigate();

    // const {setName} = useUserContext();

    // const [permission, setPermission] = useState(false);
   
    
    // useEffect(() => {
    //     async function checkPermission() {
    //         try {
    //             if(localStorage.getItem("id")){
    //                 const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/ngo/${localStorage.getItem("id")}`, {
    //                     headers: {
    //                         Authorization: "Bearer " + localStorage.getItem("access_key")
    //                     }
    //                 });
    
    //                 setPermission(data.allowed);
    //                 setName(data.name);
    //             }
    //         } catch (error: any) {
    //             console.log(error.message)
    //             if(localStorage.getItem("id")){
    //                 navigate("/login");
    //             }
                
    //         }

    //     }

    //     checkPermission();

    // });

    // useEffect(() => {
    //     navigateBasedOnRole();
    // }, [permission])

    // function navigateBasedOnRole() {
    //     if (!permission && localStorage.getItem("role") != "ngo") {
    //         toast.error("You are Not Authorized");
    //         navigate("/login");
    //     }
    // }

    const navigate = useNavigate();
    const { setName } = useUserContext();
    const [permission, setPermission] = useState(false);

    useEffect(() => {
        const checkPermission = async () => {
            const id = localStorage.getItem("id");
            if (!id) return;

            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/ngo/${id}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("access_key")
                    }
                });

                setPermission(data.allowed);
                setName(data.name);
            } catch (error: any) {
                console.log(error.message);
                localStorage.clear();
                navigate("/login")
            }
        };

        checkPermission();
    }, [navigate, setName]);

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (!permission && role !== "ngo") {
            toast.error("You are Not Authorized");
            navigate("/login");
        }
    }, [navigate, permission]);


    return (
        permission &&
        
        <SidebarProvider>
            
            <div className="max-h-screen flex flex-col">    
                <PageHeader />
                <div className="sm:grid sm:grid-cols-[auto,1fr] sm:flex-grow-1 overflow-auto">
                    <SideBar />
                    <div className="overflow-x-hidden">
                        <Outlet />
                    </div>
                </div>
            </div>
            
        </SidebarProvider>
        

    );
}