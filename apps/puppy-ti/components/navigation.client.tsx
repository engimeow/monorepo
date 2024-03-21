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

  const closeMenu = useCallback(() => {
    setIsOpen(false);
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
          <Link href="/" className={linkStyle} onClick={closeMenu}>
            Home
          </Link>
          <Link href="/free-test" className={linkStyle} onClick={closeMenu}>
            Free Test
          </Link>
          <Link href="/contributors" className={linkStyle} onClick={closeMenu}>
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
            <Link href="/sign-in" className={linkStyle} onClick={closeMenu}>
              Sign In
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
