"use client";
import { useSession } from "next-auth/react";
import SignInButton from "@/components/SignInButton";
import SignOutButton from "@/components/SignOutButton";

const Navbar = ({ children }) => {
  const { data: session, status } = useSession();
  return (
    <div className="w-full h-full bg-black">
      <div className="w-full h-12 bg-white/10 absolute p-2">
        {status === "loading" && <span>Loading...</span>}
        {session && status === "authenticated" && (
          <>
            <span>Welcome, {session.user.name}</span>
            <SignOutButton />
          </>
        )}
        {!session && status !== "loading" && <SignInButton />}
      </div>
      <div className="w-full h-full pt-12">{children}</div>
    </div>
  );
};

export default Navbar;
