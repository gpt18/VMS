
import logo from '../../assets/logo.svg'
import { ElementType, useEffect } from 'react';
import { IconSelector } from '../../utils/selector';
import { useNgoDataContext } from '../../hooks/NgoDataContext';

export function DashboardPage() {
    const {
        brandData,
        userData,
        ngoData,
    } = useNgoDataContext();

    return (
        <>
            <div className="container mx-auto sm:px-8 px-4 pb-4">
                <HeroSection ngoName={brandData.ngo_name} logo={brandData.ngo_logo} login={userData.lastLogin} />
                <div className='text-xl my-6 p-4 font-bold'>
                    Overview [{ngoData.ngo_id}]
                </div>
                <div className='flex flex-col gap-4 md:flex-row'>
                    <CardInsight Icon={IconSelector.menuIcon.volunteer} title='Volunteer Joined' count={ngoData.volunteer_associated.length} />
                    <CardInsight Icon={IconSelector.menuIcon.event} title='Event Done' count={24} />
                    <CardInsight Icon={IconSelector.menuIcon.request} title='Form Filled' count={150} />
                </div>
            </div>
        </>
    );
}

type HeroSectionProps = {
    ngoName: string | null,
    logo: string,
    login: string,
}


function HeroSection(props: HeroSectionProps) {
    const date = new Date(props.login);
    const dateString = date.toLocaleString();
    return (
        <>
            <div className="bg-slate-800 text-white rounded-xl max-w-fit p-4 relative drop-shadow-lg">
                <img src={props.logo || logo} alt="" className='min-w-20 max-h-20' />

                <div className='text-2xl'>
                    {props.login != "Invalid Date" ? "Welcome Back!" : "Welcome,"}
                </div>
                <div className='text-4xl pb-3'>
                    {props.ngoName || "SDRK Manavadhikar Foundation"}
                </div>
                {props.login != "Invalid Date" && <><hr className='w-1/3 pb-3' />
                    <div>
                        Last Login: {dateString}
                    </div></>}
            </div>
        </>
    );
}

type CardInsightProps = {
    Icon: ElementType,
    title: string,
    count: number
}

function CardInsight({ Icon, title, count }: CardInsightProps) {
    return (
        <div className='text-xl bg-gray-100 rounded-lg border border-secondary-border p-4 flex gap-4 items-center md:flex-col justify-between'>
            <div className='flex gap-4 items-center md:flex-col'>
                <Icon />
                <div className=''>{title}</div>
            </div>
            <div className='text-4xl font-bold'>
                {count}
            </div>
        </div>
    );
}