"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCircleUser,
  faGear,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { User } from "../../types/User";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import api from "@/app/api/userapi";
import { useToast } from "@/app/providers/ToastProvider";
import { redirect, useRouter } from "next/navigation";

export default function Topbar() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: user, error } = useQuery<User>({
    queryKey: ["userinfo1"],
    queryFn: async () => {
      return (await api.findme()).data;
    },
    initialData: () => {
      const data = queryClient.getQueryData<User>(["userinfo"]);
      return data || undefined;
    },
  });

  if (error) {
    showToast(error.message, "info");
  }

  return (
    <div className="navbar fixed m-2 rounded-lg px-7  py-0 bg-base-100 z-[9999]">
      <div className="flex-1">
        <Image
          src="/images/yourways_logo.png"
          width={500}
          height={500}
          alt="Logo"
          className="w-20 h-20 object-contain"
        />
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <FontAwesomeIcon
                className="h-6 w-6 hover:text-red-500 duration-300"
                icon={faBell}
              />
              <span className="badge badge-sm indicator-item">5</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">Nothing</span>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end ps-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                src="/images/avatar.jpg"
                width={500}
                height={500}
                alt="Logo"
                className="w-30 h-30 object-contain"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <p className="">
                <FontAwesomeIcon className="w-3 h-3" icon={faCircleUser} />
                {user?.lastName}
              </p>
            </li>
            <li>
              <p>
                <FontAwesomeIcon className="w-3 h-3" icon={faGear} />
                Settings
              </p>
            </li>
            <li>
              <p
                onClick={async () => {
                  await signOut({ callbackUrl: "/home", });
                }}
              >
                <FontAwesomeIcon
                  className="w-3 h-3"
                  icon={faRightFromBracket}
                />
                Logout
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
