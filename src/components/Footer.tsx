import React from "react";
import Image from "next/image";
import Button from "./Button";
import { FOOTER, APP } from "../data";
import logo from "../app/favicon.ico";
import Link from "next/link";
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { Input } from "./Input";

// Fonction pour obtenir le composant d'icône en fonction du nom du réseau social
const getIconComponent = (social: string): React.ReactNode | null => {
  switch (social.toLowerCase()) {
    case 'instagram':
      return <Instagram />;
    case 'facebook':
      return <Facebook />;
    case 'twitter':
      return <Twitter />;
    default:
      return null;
  }
};

// Interface pour les props du composant Title
interface TitleProps {
  children: React.ReactNode;
}

// Composant Title pour afficher les titres dans le footer
export const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <h1 className="text-secondary text-2xl font-semibold text-start capitalize w-fit">
      {children}
    </h1>
  );
};

// Interface pour les props du composant Footer
interface Props {}

// Composant Footer principal
export const Footer: React.FC<Props> = () => {
  return (
    <footer className="bg-black row-start-2 row-end-2 border-t border-1 border-[#202020] h-fit py-8 px-[10%] w-full flex flex-col gap-6">
      <section className="flex items-center justify-between p-8 bg-primary rounded-lg mobileL:flex-col">
        <h1 className="font-bold text-3xl">Subscribe to our Newsletter</h1>
        <form className="h-fit grid grid-cols-[auto_auto] items-center justify-stretch gap-4">
          <Input id="newsLetter" name="email" type="email">
            Enter
          </Input>
          <Button variant="solid" color="primary">
            Submit
          </Button>
        </form>
      </section>
      
      <section className="grid grid-cols-4 grid-rows-[auto_1fr] gap-x-8 items-center text-center">
        <div className="flex items-center gap-1 col-span">
          <Image src={logo} alt="logo" className="w-20 aspect-square" />
          <h1 className="text-2xl font-semibold">{APP.title}</h1>
        </div>
        
        <p className="text-[#888] text-start place-self-start col-span row-start-2 row-end-2">
          {APP.description}
        </p>
        
        {/* Liste des éléments du footer */}
        {FOOTER.map((item, index) => (
          <React.Fragment key={index}>
            <Title>{item.label}</Title>
            <ul className="row-start-2 row-end-2 w-fit place-self-start">
              {item.items.map((subItem, subIndex) => {
                if (typeof subItem === 'object' && subItem.socials) {
                  const IconComponent = getIconComponent(subItem.socials);
                  return IconComponent ? (
                    <li key={subIndex} className="text-start flex items-center gap-2 w-fit">
                      <Link href={subItem.link} className="w-fit aspect-square inline-flex items-center justify-center">
                        {IconComponent}
                      </Link>
                    </li>
                  ) : null;
                } else {
                  return (
                    <li key={subIndex} className="text-start capitalize">
                      {subItem.toString()}
                    </li>
                  );
                }
              })}
            </ul>
          </React.Fragment>
        ))}
      </section>
    </footer>
  );
};

export default Footer;
