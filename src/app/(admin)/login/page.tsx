// app/auth/signin/page.tsx

"use client";
import "../../globals.css";
import Form from "./Form";
import Image from 'next/image'
import logo from '../../favicon.ico'
import Link from "next/link";
// 401: existe pas
const SignInPage = () => {
  return (
    <div className="p-8 place-self-center grid gap-6 outline outline-1 outline-[#151515] rounded-lg">
      {/* img */}
	  <div className="mx-auto">
        <Image
          src={logo}
          width={50}
          height={50}
          alt="Picture of the website"
        />
      </div>
	  {/* title + txt */}
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl">Welcome back</h1>
        <p className="text-primary">please entrer your details.</p>
      </div>
      <Form />
	  {/* register */}
	  <div className="flex items-center justify-between">
	  <p>Don't have an account</p>
	  <Link href={'/register'} className="text-primary">
			Register
		</Link>
	  </div>
    </div>
  );
};

export default SignInPage;
