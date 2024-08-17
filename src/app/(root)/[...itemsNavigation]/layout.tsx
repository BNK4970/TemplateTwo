import React from "react";
import { NAVIGATION_BAR_ROOT } from "../../../data";

// Définition des types pour props
interface Props {
  children: React.ReactNode;
  params: {
    itemsNavigation: string[];
  };
}

const Layout: React.FC<Props> = ({ children, params }) => {
  // Extraire le premier segment de l'URL
  const path = params.itemsNavigation[0] || "home"; 

  // Trouver l'élément de navigation correspondant ou utiliser une valeur par défaut
  const navItem =
    NAVIGATION_BAR_ROOT.find((item) => item.label === path) || NAVIGATION_BAR_ROOT[0];

  return (
    <section className="px-[15%] pt-8 mt-[63px] flex flex-col gap-8 h-section">
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold capitalize text-xl">{navItem.title}</h1>
        <h2 className="text-[#888]">{navItem.subtitle}</h2>
      </div>
      {children}
    </section>
  );
};

export default Layout;
