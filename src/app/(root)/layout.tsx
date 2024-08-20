import type { Metadata } from "next";
import "../globals.css";
import logo from "../favicon.ico";
import NavBar from "../../components/NavBar";
import { APP } from "../../data";
import Footer from "../../components/Footer";
import Provider from './Provider';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

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
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect('/dashboard');
  } else {
  return (
    <html lang="en">
      <link rel="icon" href={logo.src} />
      {/*  mt-[60px] */}
      <body className={"bg-black min-h-screen w-full h-fit grid grid-rows-[auto_auto] grid-cols-1 flex-col justify-end"}>
        <Provider>
        <NavBar title={APP.title} logo={true}/>
        {children}
        </Provider>
        <Footer/>
      </body>
    </html>
  );
}
}