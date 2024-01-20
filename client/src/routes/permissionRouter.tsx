import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Role } from "../utils/costants";

type PermissionProps = {
    children: React.ReactNode;
    role: Role[];
};

export default function RestrictedRouteTo({ children, role }: PermissionProps) {
    const navigate = useNavigate();
    const [permission, setPermission] = useState(false);

    useEffect(() => {
        const checkPermission = async () => {
            const token = localStorage.getItem("access_key");
            if (!token) navigate("/login");

            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/auth`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (data.p && role.includes(data.r.toUpperCase())) setPermission(true);
                else navigate("/login");

            } catch (error) {
                console.log("Error checking permission");
                navigate("/login");
            }
        };

        checkPermission();
    }, []);


    return <>{permission ? children : null}</>;
}