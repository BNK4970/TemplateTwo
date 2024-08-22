"use client";
import { NAVIGATION_DROPDOWN_ADMIN } from "@/data";
import { ChevronDown, Shield } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

interface DropdownMenuProps {
  onLogout: () => void;
  userName?: string | undefined | null;
  userEmail?: string | undefined | null;
  isAdmin: boolean,
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ userEmail, userName, isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = isAdmin
    ? [
        ...NAVIGATION_DROPDOWN_ADMIN.slice(0, NAVIGATION_DROPDOWN_ADMIN.length-1),
        {
          label: "Admin",
          icon: Shield,
          root: "../admin",
        },  
        ...NAVIGATION_DROPDOWN_ADMIN.slice(NAVIGATION_DROPDOWN_ADMIN.length - 1),
      ]
    : NAVIGATION_DROPDOWN_ADMIN;

  return (
    <div className="relative cursor-pointer">
      <div onClick={() => setIsOpen(!isOpen)} className="group grid grid-cols-[auto_1fr] grid-rows-2 gap-x-2">
        <img
          src=""
          alt="User Avatar"
          className="col-span-1 row-span-2 rounded-md size-9 place-self-center bg-primary outline outline-line"
        />
        <div className="row-start-1 row-end-1 col-start-2 flex justify-between items-center text-sm">
          <p>{userName}</p>
          <ChevronDown className={`size-4 duration-200 group-hover:text-primary ${isOpen ? "text-primary" : ""}`} />
        </div>
        <p className="row-start-2 row-end-2 col-start-2 text-secondary text-sm">{userEmail}</p>
      </div>

      <ul
        className={`absolute left-[50%] translate-x-[-50%] p-2 rounded-lg border border-line bg-background mt-2 flex-col gap-1 w-full ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            {index === NAVIGATION_DROPDOWN_ADMIN.length && <div className="h-[1px] w-full bg-line rounded-full"></div>}
            {item.root === "logout" ? (
              <li
                onClick={() => signOut()}
                className="capitalize text-danger hover:bg-[rgb(var(--color-danger),0.1)] duration-200 rounded-md px-3 py-1 flex items-center gap-2"
              >
                <span>{<item.icon className="size-4" />}</span>
                <p>{item.label}</p>
              </li>
            ) : (
              <Link
                href={`/dashboard/${item.root}`}
                onClick={() => setIsOpen(false)}
                className="capitalize text-foreground hover:bg-[rgb(var(--color-foreground),0.1)] duration-200 rounded-md px-3 py-1 flex items-center gap-2"
              >
                <span>{<item.icon className="size-4" />}</span>
                <p>{item.label}</p>
              </Link>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
