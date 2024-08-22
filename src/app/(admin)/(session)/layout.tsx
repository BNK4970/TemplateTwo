import '../../globals.css'
import { redirect } from 'next/navigation';
import {  authOptions } from '../../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { APP, NAVIGATION_BAR_ADMIN } from '@/data';
import NavBar from '@/components/NavBar';
import React from 'react';

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
         <body className='min-h-screen h-screen grid grid-rows-1'>
          <NavBar title={APP.title}/>
         <React.Fragment>
           {children}
         </React.Fragment>
         </body>
        </html>
       )
    }
    
  }