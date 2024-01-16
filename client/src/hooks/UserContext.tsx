import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type UserProviderProps = {
    children: ReactNode
}

type UserContextProps = {
    uname: string,
    setName: (name: string) => void
}

const UserContext = createContext<UserContextProps | null>(null);

export function useUserContext() {
    const value = useContext(UserContext);

    if(value == null) throw Error("Connot use outside of UserProvider")

    return value;
}

export function UserProvider({ children }: UserProviderProps) {

    const [uname, setUname] = useState('');

    useEffect(() => {

    },[]);

    function setName(name: string) {
        setUname(name);
    }


    return <UserContext.Provider value={{uname, setName}}>
        {children}
    </UserContext.Provider>
}