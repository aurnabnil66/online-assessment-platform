"use client";

import { RootState } from "@/lib/store";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";

export const Header = () => {
  const authUser = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      {authUser ? (
        <header className="h-20 bg-white border-b px-4 sm:px-8 lg:px-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div>
              <Image
                src={"/resourceLogoHeader.png"}
                alt=""
                height={120}
                width={120}
              />
            </div>
            <span className="text-lg text-slate-700">Dashboard</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-200" />
            <div>
              <p className="text-gray-800 font-semibold">
                {authUser?.name || "Employer"}
              </p>
              <p className="text-sm text-gray-600">Ref. ID - {authUser?.id}</p>
            </div>
            <ChevronDown size={18} />
          </div>
        </header>
      ) : (
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 lg:px-20">
          <div>
            <Image
              src={"/resourceLogoHeader.png"}
              alt=""
              height={120}
              width={120}
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-700">
            Akij Resource
          </h1>
          <div className="w-24 hidden sm:block" />
        </header>
      )}
    </>
  );
};
