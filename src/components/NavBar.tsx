import React from "react";
import Link from "next/link";
import icon from '../app/favicon.ico'
import Button from "./Button";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import AuthButton from "./AuthButton";

interface Props {
  logo?: boolean;
  title: any;
  naviagationList: string[];
  gap?: "sm" | "md" | "lg" | "xl";
}

export const NavBar: React.FC<Props> = async ({
  logo,
  title,
  naviagationList,
  gap,
}) => {
  const getGapClass = (gap?: "sm" | "md" | "lg" | "xl") => {
    switch (gap) {
      case "sm":
        return "gap-4";
      case "md":
        return "gap-8";
      case "lg":
        return "gap-16";
      case "xl":
        return "gap-24";
      default:
        return "gap-8";
    }
  };
  
  const session = await getServerSession()

  return (
    <header className="z-50 bg-background fixed border-b border-1 border-[#151515] top-0 w-full px-[10%] py-4 grid grid-cols-[1fr_auto_1fr] justify-between content-center max-h-16 mobileL:px-[2%] mobileL:justify-between mobileL:grid-cols-2">
      {logo ? (
        <div className="flex items-center gap-1 h-full">
          <img src={icon.src} alt="logo" className="h-[60px] aspect-square" />
          <span className="text-primary font-bold text-2xl">{title}</span>
        </div>
      ) : (
        <span className="flex items-center text-primary font-bold text-2xl">{title}</span>
      )}
      <ul className={`flex place-self-center ${getGapClass(gap)} mobileL:hidden`}>
        {naviagationList.map((name, index) => (
          <li key={index}>
            <Link 
          href={index === 0 ? ('/') : (`/${name}`)} 
          key={index} 
          className="capitalize hover:text-primary duration-200">
            {name}
            </Link>
          </li>
        ))}
      </ul>
      <div className={`justify-self-end flex ${getGapClass(gap)} mobileL:hidden items-center`}>
        {!!session && 
        <>
          <AuthButton/>
        </>}
        {!session &&
        <>
          <Button color="secondary" radius="md" variant="light" link={`/login`}>Login</Button>
          <Button color="primary" radius="md" variant="flat" link={`/register`}>Register</Button>
        </>}
      </div>

      <Button addClassName="hidden justify-self-end mobileL:block" radius="md" color="primary">
        a
      </Button>
    </header>
  );
};

export default NavBar;
