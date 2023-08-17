"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

interface User {
  id: number;
  username: string;
  avatar: string;
}

export default function Navbar() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>(null!);
  useEffect(() => {
    if (session) {
      fetch("/api/user")
        .then((res) => res.json())
        .then((data) => setUser(data.user));
    }
  }, [session]);

  return (
    <>
      {user && (
        <>
          <div className="fixed flex flex-row bg-slate-100 shadow text-black w-full p-4 justify-end sticky">
            <Link href="/user/settings">
              <div className="flex flex-row justify-center items-center content-center mr-4">
                <Cog8ToothIcon className="h-4 w-4 mr-1" />
                <p className="text-lg">Settings</p>
              </div>
            </Link>
            <Link href="/post/new">
              <div className="flex flex-row justify-center items-center content-center mr-4">
                <PencilSquareIcon className="h-4 w-4 mr-1" />
                <p className="text-lg">Write</p>
              </div>
            </Link>
            <Link href={`/user/${user.username}`}>
              <div className="flex flex-row justify-center items-center">
                <Image
                  src={`/avatars/${user.avatar}`}
                  alt={user.username}
                  height={30}
                  width={30}
                  className="rounded-full"
                />
              </div>
            </Link>
          </div>
        </>
      )}
    </>
  );
}
