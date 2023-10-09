"use client";

import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsGithub } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";
import { useState } from "react";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);

  function handleToggleButton(e) {
    alert('Funcionou porra')

    console.log(e)
    setToggle(true);
    console.log('oi', toggle)
  }

  return (
    <nav className="bg-purple-600 mb-12">
      <div className="flex flex-row items-center justify-between p-3">
        <Image src="/logo.png" alt="logo" width="160" height="160" />

        <button onClick={handleToggleButton}>Testando essa merda</button>

        <div className="flex flex-row items-center">
          <div
            id="navbar-default"
            className="hidden text-neutral font-medium text-xl md:block md:w-auto"
          >
            <a href="" className="p-2">
              About
            </a>
            <a href="" className="p-2">
              Dropdown Config
            </a>
          </div>

          <div className="hidden md:flex p-4">
            <BsGithub size={25} className="text-neutral" />
            <AiFillLinkedin size={25} className="text-neutral ml-3" />
          </div>

          {/* <GiHamburgerMenu size={35} className="text-purple md:hidden" /> */}

          { toggle ? <div
            className="text-neutral font-medium text-xl md:block md:w-auto"
          >
            <a href="" className="p-2">
              About
            </a>
            <a href="" className="p-2">
              Dropdown Config
            </a>
          </div> : null }

          { toggle ? <p>Abriu aqui</p> : null}

          <button
            type="button"
          >
            <GiHamburgerMenu size={35} className="text-purple md:hidden" />
          </button>
        </div>
      </div>
    </nav>
  );
}
