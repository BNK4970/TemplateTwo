"use client";
import React from "react";
import Link from "next/link";
import icon from "../app/favicon.ico";
import Button from "./Button";
import { useSession, signOut } from "next-auth/react";
import { NAVIGATION_BAR_ROOT, NAVIGATION_BAR_ADMIN } from "@/data";
import DropdownMenu from "./Dropdown";

// btn à droite
interface CTAProps {}
export const CTA: React.FC<CTAProps> = () => {
  const { data: session, status } = useSession();
  switch (status) {
    case "loading":
      return <p>Loading...</p>;
    case "authenticated":
      return <DropdownMenu onLogout={() => signOut()} />;
    case "unauthenticated":
      return (
        <>
          <Link href={"/login"}>
            <Button color="secondary" variant="light" radius="md">
              Login
            </Button>
          </Link>
          <Link href={"/register"}>
            <Button color="primary" variant="flat" radius="md">
              Register
            </Button>
          </Link>
        </>
      );
  }
};

// liens au centre
interface NavProps {}
export const Nav: React.FC<NavProps> = () => {
  const { data: session, status } = useSession();
  switch (status) {
    case "loading":
      return <li>Loading...</li>;
    case "authenticated":
      return (
        <>
          {NAVIGATION_BAR_ADMIN.map((name, index) => (
            <li key={index}>
              <Link
                href={index === 0 ? "/dashboard" : "/dashboard/" + name.label}
                className="capitalize hover:text-primary duration-200"
              >
                {name.label}
              </Link>
            </li>
          ))}
        </>
      );
    case "unauthenticated":
      return (
        <>
          {NAVIGATION_BAR_ROOT.map((name, index) => (
            <li key={index}>
              <Link
                href={index === 0 ? "/" : name.label || "#"}
                className="capitalize hover:text-primary duration-200"
              >
                {name.label}
              </Link>
            </li>
          ))}
        </>
      );
  }
};

interface Props {
  logo?: boolean;
  title: string;
  gap?: "sm" | "md" | "lg" | "xl";
}

export const NavBar: React.FC<Props> = ({ logo, title, gap }) => {
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

  return (
    <header className="z-50 bg-background fixed border-b border-1 border-[#151515] top-0 w-full px-[10%] py-4 grid grid-cols-[1fr_auto_1fr] justify-between content-center max-h-16 mobileL:px-[2%] mobileL:justify-between mobileL:grid-cols-2">
      {/* côté gauche */}
      {logo ? (
        <div className="flex items-center gap-1 h-full">
          <img src={icon.src} alt="logo" className="h-[60px] aspect-square" />
          <span className="text-primary font-bold text-2xl">{title}</span>
        </div>
      ) : (
        <span className="flex items-center text-primary font-bold text-2xl">
          {title}
        </span>
      )}
      {/* centre */}
      <ul
        className={`flex place-self-center ${getGapClass(gap)} mobileL:hidden`}
      >
        <Nav />
      </ul>
      {/* côté droit */}
      <div
        className={`justify-self-end flex ${getGapClass(
          gap
        )} mobileL:hidden items-center`}
      >
        <CTA />
      </div>
    </header>
  );
};

export default NavBar;
