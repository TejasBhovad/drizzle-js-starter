"use client";
import { useSession } from "next-auth/react";
import SignInButton from "@/components/SignInButton";
import SignOutButton from "@/components/SignOutButton";

const Navbar = ({ children }) => {
  const { data: session } = useSession();
  return (
    <div className="w-full h-full bg-black">
      <div className="w-full h-12 bg-white/10 absolute p-2">
        {session ? (
          <div className="flex items-center justify-between">
            <h1 className="text-white font-semibold">
              Welcome, {session.user.name}
            </h1>
            <SignOutButton />
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
      <div className="w-full h-full pt-12">{children}</div>
    </div>
  );
};

export default Navbar;
