"use client";
import Link from "next/link";
import { useCallback, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { PiUserCircleThin } from "react-icons/pi";
import { clsx } from "clsx";

const linkStyle = "text-black text-xl w-full text-center p-4 hover:bg-gray-100";

interface NavigationUIProps {
  isSignedIn: boolean;
}

export const NavigationUI = ({ isSignedIn }: NavigationUIProps) => {
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
        <div className="fixed top-14 left-0 w-full h-[calc(100%-56px)] z-50 flex flex-col items-center bg-gray-50 ">
          <Link className={linkStyle} href="/">
            Home
          </Link>
          <Link className={linkStyle} href="/free-test">
            Free Test
          </Link>
          <Link className={linkStyle} href="/contributors">
            Contributors
          </Link>
          {isSignedIn ? (
            <form className="w-full" action="/api/auth/sign-out" method="post">
              <button
                className={clsx([linkStyle, "text-red-500"])}
                type="submit"
              >
                Sign out
              </button>
            </form>
          ) : (
            <Link className={linkStyle} href="/sign-in">
              Sign In
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
