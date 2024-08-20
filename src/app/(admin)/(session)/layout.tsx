import '../../globals.css'
import { redirect } from 'next/navigation';
import {  authOptions } from '../../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { APP, NAVIGATION_BAR_ADMIN } from '@/data';
import NavBar from '@/components/NavBar';

export default async function AuthLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    const session = await getServerSession(authOptions);
    if (!session) {
      return redirect('/');
    } else {
      return (
        <html>
         <body>
          <NavBar title={APP.title}/>
         <section className="w-full h-section grid place-items-center">
           {children}
         </section>
         </body>
        </html>
       )
    }
    
  }