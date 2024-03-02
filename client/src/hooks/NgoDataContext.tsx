import { ReactNode, createContext, useContext, useState } from "react";


type NgoBrandData = {
    ngo_name: string;
    ngo_logo: string;
};

type NgoData = {
    id: string;
    ngo_id: string;
    address: string;
    verified: boolean;
    zone_city: string[];
    event_list: [];
    volunteer_associated: [];
    state: string;
    website: string;
    sector: string;
    email: string;
    phone: string;
}

type UserData = {
    id: string;
    username: string;
    role: string;
    email: string,
    lastLogin: string,
    name: string;

}

type NewVolunteerData = {
    steps: number;
    user: {
        id: string;
        vid: string;
        name: string;
    }
}


type NgoDataProviderProps = {
    children: ReactNode;
};

type NgoDataContextProps = {
    brandData: NgoBrandData;
    setBrandData: (brandData: NgoBrandData) => void;
    userData: UserData;
    setUserData: (userData: UserData) => void;
    ngoData: NgoData;
    setNgoData: (ngoData: NgoData) => void;
    newVolData: NewVolunteerData;
    setNewVolData: (newVolData: NewVolunteerData) => void;
};

const NgoDataContext = createContext<NgoDataContextProps | null>(null);

export function useNgoDataContext() {
    const value = useContext(NgoDataContext);

    if (value == null) throw Error("Connot use outside of NgoDataProvider")

    return value;
}

export function NgoDataProvider({ children }: NgoDataProviderProps) {

    const [brandData, setBrandData] = useState<NgoBrandData>({
        ngo_name: '',
        ngo_logo: '',
    });

    const [userData, setUserData] = useState<UserData>({
        id: '',
        username: '',
        email: '',
        lastLogin: '',
        role: '',
        name: '',
    });

    const [ngoData, setNgoData] = useState<NgoData>({
        id: '',
        ngo_id: '',
        address: '',
        verified: false,
        zone_city: [],
        event_list: [],
        volunteer_associated: [],
        state: '',
        website: '',
        sector: '',
        email: '',
        phone: '',
    });

    const [newVolData, setNewVolData] = useState<NewVolunteerData>({
        steps: 0,
        user: {
            id: '',
            vid: '',
            name: '',
        }
    })

    return (
        <NgoDataContext.Provider value={{
            brandData,
            setBrandData,
            userData,
            setUserData,
            ngoData,
            setNgoData,
            newVolData,
            setNewVolData,
        }}>
            {children}
        </NgoDataContext.Provider>
    );
}