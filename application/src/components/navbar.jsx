"use client";

import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsGithub } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";
import { useState } from "react";

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleConfigModal, setToggleConfigModal] = useState(false);

  function handleToggleMenu() {
    if (toggleMenu) setToggleMenu(false);
    else setToggleMenu(true);
  }

  function handleToggleMenuItem(event) {
    const valueNameAttr = event.target.name;

    if (valueNameAttr === 'configuration') {
      setToggleConfigModal(true)
      setToggleMenu(false)
    }    
  }

  return (
    <nav className="bg-purple-600 mb-12 ">
      {toggleConfigModal && (
            <>
              <div className="absolute top-[90px] inset-x-0 max-w-full z-100 flex justify-center duration-500 transition-all">
                <div className="w-10/12 bg-purple-900 text-neutral p-4 flex flex-col items-center">
                  {/* modal-header */}
                  <div>
                    <h5>Title</h5>
                    <button onClick={() => setToggleConfigModal(false)}>Close</button>
                  </div>
                  {/* modal-body */}
                  <div>
                    <form>
                      <div className="">
                        <label htmlFor="">Dark theme</label>
                        <input type="checkbox" />
                      </div>
                      <div className="">
                        <label htmlFor="">Sound alert when hit price</label>
                        <input type="text" />
                        <legend>aqui vai ser um range</legend>
                      </div>
                      <div className="">
                        <label htmlFor="">Update time</label>
                        <select id="updateTime">
                          <option value="">5 minutes</option>
                          <option value="">10 minutes</option>
                          <option value="">15 minutes</option>
                        </select>
                      </div>

                      <button type="submit">Save</button>
                      <button type="reset"></button>
                    </form>
                  </div>
                  {/* modal-footer */}
                  <div></div>
                </div>
              </div>
              
              <div className="backdrop-brightness-50 bg-white/30"></div>
            </>
          )}
      <div className="flex flex-row items-center justify-between p-3">
        <Image src="/logo.png" alt="logo" width="160" height="160" />

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

          {toggleMenu && (
            <div className="absolute top-[90px] inset-x-0 max-w-full z-50 flex justify-center duration-500 transition-all">
              <div className="w-80 bg-purple-900 text-neutral p-4 flex flex-col items-center">
                <a className="pb-4 font-semibold text-lg" href="">
                  About
                </a>
                <a className="pb-4 font-semibold text-lg" name="configuration" onClick={handleToggleMenuItem}>
                  Configuration
                </a>
                <a className="pb-4 font-semibold text-lg" href="">
                  About
                </a>
                <a className="pb-4 font-semibold text-lg" href="">
                  About
                </a>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleToggleMenu}
            className="md:hidden"
          >
            {toggleMenu ? (
              <GiHamburgerMenu size={35} className="text-purple" />
            ) : (
              <GiHamburgerMenu size={35} className="text-purple" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
