import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsGithub } from "react-icons/bs";
import { AiFillLinkedin } from 'react-icons/ai'

export default function Navbar() {
    return <nav className="bg-purple-600 mb-12">

        <div className="flex flex-row items-center justify-between p-3">
            <Image src="/logo.png" alt="logo" width="160" height="160" />

            <div className="flex flex-row items-center">
                <div className="hidden md:inline text-neutral font-medium text-xl">
                    <a href="" className="p-2">About</a>
                    <a href="" className="p-2">Dropdown Config</a>
                </div>

                <div className="hidden md:flex p-4">
                    <BsGithub size={25} className="text-neutral" />
                    <AiFillLinkedin size={25} className="text-neutral ml-3" />
                </div>
                
                <GiHamburgerMenu size={35} className="text-purple md:hidden" />
            </div>
        </div>

        
    </nav>
}