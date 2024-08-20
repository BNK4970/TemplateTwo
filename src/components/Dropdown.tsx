"use client";
import { NAVIGATION_DROPDOWN_ADMIN } from "@/data";
import { signOut } from "next-auth/react";
import React, { useState } from "react";

interface DropdownMenuProps {
  onLogout: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative cursor-pointer">
      <img src="" alt="pp" className="rounded-full aspect-square h-full bg-primary outline outline-line" onClick={() => setIsOpen(!isOpen)} />

      <ul
        className={`absolute left-[50%] translate-x-[-50%] p-2 rounded-lg border border-line bg-background mt-2 flex-col gap-1 w-fit ${isOpen ? "flex" : "hidden"}`}
      >
        {NAVIGATION_DROPDOWN_ADMIN.map((name,index)=>(
          index == NAVIGATION_DROPDOWN_ADMIN.length-1 ? 
          <React.Fragment key={index}>
            <div className="h-[1px] w-full bg-line rounded-full"></div>
            <li onClick={()=> signOut()} key={index} className="capitalize text-danger hover:bg-[rgb(var(--color-danger),0.1)] duration-200 rounded-md px-3 py-1">{name.label}</li> 
          </React.Fragment>
          : 
          <li onClick={()=>setIsOpen(!isOpen)} key={index} className="capitalize text-foreground hover:bg-[rgb(var(--color-foreground),0.1)] duration-200 rounded-md px-3 py-1">{name.label}</li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
