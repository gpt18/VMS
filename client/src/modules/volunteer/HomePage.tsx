import axios from "axios";
import { useEffect } from "react";

export function VolHomePage() {

    async function sendData() {
        console.log("Sending data");
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/test`,{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_key")
            }
        });
        console.log(data);
    }

    useEffect(() => { 
        console.log("Volunteer home page");
    }, []);


    return (
        <>
        <h1>Welcome to Volunteer home page</h1>
        <button onClick={sendData}>Send</button>
        </>
    );
}