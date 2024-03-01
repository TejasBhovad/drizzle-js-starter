"use client";
import React from "react";
import { useSession } from "next-auth/react";
import SignInButton from "@/components/SignInButton";
import SignOutButton from "@/components/SignOutButton";
const page = () => {
  const { data: session, status } = useSession();
  if (session && status === "authenticated") {
    return (
      <div className="text-white w-full h-full items-center justify-center flex flex-col gap-2">
        <span>Welcome, {session.user.name}</span>
        <SignOutButton />
      </div>
    );
  }
  else {
      if (status === "loading") {
        return (
          <div className="text-white w-full h-full items-center justify-center flex flex-col gap-2">
            <span>Loading...</span>
          </div>
        );
      }
        else {
            return (
            <div className="text-white w-full h-full items-center justify-center flex flex-col gap-2">
                <span>Not signed in</span>
                <SignInButton />
            </div>
            );
      }
    }
};

export default page;
