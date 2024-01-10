import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { IconSelector } from '../utils/selector';

type mainHeaderProps = {
    appName?: string,
    icon: string,
    menu: {
        tag: string,
        link: string,
    }[]

}

function MainHeader(props: mainHeaderProps) {

    const { appName = 'Voluntāsk' } = props;

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>

            <div className="header">
                <div className="container mx-auto flex items-center">
                    <Link to="/" className='flex gap-2 items-center p-4 flex-1'>
                        <img id="icon" className='w-10 h-10' src={props.icon} alt="logo" />
                        <div className="text-lg font-bold"> {appName} </div>
                    </Link>
                    <nav className='md:flex gap-10 items-center p-4 hidden'>
                        {
                            props.menu.map((item, index) => {
                                return <Link to={item.link} key={index} className='hover:text-blue-700'> {item.tag} </Link>
                            })
                        }
                        <Link to={"/login"}>
                            <Button variant={"dark"} endIcon={<BsBoxArrowUpRight />}>Login</Button>
                        </Link>
                    </nav>

                    <div className="md:hidden p-4">
                        <Button variant={'ghost'} size={'icon'} className="text-xl" onClick={() => setIsOpen(!isOpen)}>
                            <FiMenu />
                        </Button>
                    </div>
                </div>

            </div>

            {/* Off-canvas */}
            <div
                className={`md:hidden fixed top-0 right-0 w-full h-full bg-slate-50 overflow-auto transition-transform duration-200 ease-in-out
          ${isOpen ? '-translate-x-0' : 'translate-x-full'}`}
            >
                <div className='flex flex-col h-full'>

                    <div className='text-4xl p-4 text-right'> <button onClick={() => setIsOpen(!isOpen)}> <IconSelector.all.close /> </button></div>

                    <div className='flex flex-col h-full items-center justify-between p-4 mt-16'>
                        <ul>
                            {
                                props.menu.map((item, index) => {
                                    return <>
                                        <li className='p-2 text-center'><Link to={item.link} key={index} className='hover:text-blue-700 font-bold text-2xl'> {item.tag} </Link></li>
                                    </>
                                })
                            }
                        </ul>
                        <div>
                            <Link to={"/login"}>
                                <Button variant={"dark"} endIcon={<BsBoxArrowUpRight />}>Login</Button>
                            </Link>
                        </div>
                        <div>
                        <Link to="/" className='flex gap-2 items-center p-4 flex-1'>
                        <img id="icon" className='w-10 h-10' src={props.icon} alt="logo" />
                        <div className="text-lg font-bold"> {appName} </div>
                    </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainHeader;