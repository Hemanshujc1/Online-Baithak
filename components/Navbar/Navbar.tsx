import React from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "../MobileNav/MobileNav";
// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-[#101418] px-6 py-4 lg:px-10">
      {/* bg-dark-1 */}
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="My Video App"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          OnlineBaithak
        </p>
      </Link>
      {/* <div className="flex-center gap-5">  */}
      {/* clerk - user management */}
      {/* <SignedIn>
        <UserButton />
        </SignedIn>
        <MobileNav />
     </div> */}

      <div className="flex items-center gap-5">
        <SignedOut>
          <div className="flex gap-4">
            <SignInButton mode="modal" forceRedirectUrl="/homepage">
              <Button variant="outline" className="text-white border-white">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal" forceRedirectUrl="/homepage">
              <Button className="bg-white text-black hover:bg-gray-200">
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
          <MobileNav />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
