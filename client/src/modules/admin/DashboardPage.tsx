
import logo from '../../assets/logo.svg'
import { ElementType } from 'react';
import { IconSelector } from '../../utils/selector';

export function DashboardPage() {
    return (
        <>
            <div className="container mx-auto">
                <HeroSection />
                <div className='text-xl my-6 p-4 font-bold'>
                    Overview
                </div>
                <div className='flex flex-col gap-4 md:flex-row'>
                    <CardInsight Icon={IconSelector.menuIcon.volunteer} title='Volunteer Joined' count={100} />
                    <CardInsight Icon={IconSelector.menuIcon.event} title='Event Done' count={24} />
                    <CardInsight Icon={IconSelector.menuIcon.request} title='Form Filled' count={150} />
                </div>
            </div>
        </>
    );
}


function HeroSection() {
    return (
        <>
            <div className="bg-slate-800 text-white rounded-xl max-w-[600px] p-4 relative drop-shadow-lg">
                <div className='flex flex-row-reverse'>
                    <div className='self-center'>
                        <img src={logo} alt="" className='min-w-20 max-h-20' />
                    </div>
                    <div className='flex-grow self-center'>
                        <div className='text-2xl'>
                            Welcome Back!
                        </div>
                        <div className='text-4xl pb-3'>
                            SDRK Manavadhikar Foundation
                        </div>
                        <hr className='w-1/3 pb-3' />
                        <div>
                            Last Login: Sat 25 Nov, 2023 02:52 PM
                        </div>
                    </div>
                </div>
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
            <div className='text-4xl font-bold pl-4'>
                {count}
            </div>
        </div>
    );
}