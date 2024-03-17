"use client";
import { NavigationSignOut } from "@puppy-ti/components/navigation-signout";
import { NavigationSignIn } from "@puppy-ti/components/navigation-signin";
import Link from "next/link";
import { useCallback, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { PiUserCircleThin } from "react-icons/pi";

const linkStyle = "text-black text-xl w-full text-center p-4 hover:bg-gray-100";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex justify-between items-center p-4 h-14 min-h-14">
      <button onClick={handleIsOpen}>
        <IoIosMenu size="1.5rem" />
      </button>

      <div>
        <PiUserCircleThin size="1.5rem" />
      </div>
      {isOpen && (
        <div className="fixed top-14 left-0 w-full h-[calc(100%-56px)] z-50 flex flex-col items-center bg-gray-50">
          <Link className={linkStyle} href="/">
            Home
          </Link>
          <Link className={linkStyle} href="/free-test">
            Free Test
          </Link>
          <Link className={linkStyle} href="/contributors">
            Contributors
          </Link>
          <NavigationSignOut setIsOpen={setIsOpen} />
          <NavigationSignIn />
        </div>
      )}
    </div>
  );
};
