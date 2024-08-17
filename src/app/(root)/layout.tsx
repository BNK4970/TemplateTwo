import type { Metadata } from "next";
import "../globals.css";
import logo from "../favicon.ico";
import NavBar from "../../components/NavBar";
import { NAVIGATION_BAR_ROOT, APP } from "../../data";
import Footer from "../../components/Footer";
import Provider from './Provider';

export const metadata: Metadata = {
  title: APP.title,
  description: APP.description,
};

export default async function RootLayout({
  children,
}: Readonly<{ 
  children: React.ReactNode;
}>) 
{  
  return (
    <html lang="en">
      <link rel="icon" href={logo.src} />
      {/*  mt-[60px] */}
      <body className={"bg-black min-h-screen w-full h-fit grid grid-rows-[auto_auto] grid-cols-1 flex-col justify-end"}>
        <NavBar title={APP.title} naviagationList={NAVIGATION_BAR_ROOT.map(name=>name.label)} logo={true}/>
        <Provider>
        {children}
        </Provider>
        <Footer/>
      </body>
    </html>
  );
}