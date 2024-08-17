"use client"

import { signOut } from "../api/auth/[...nextauth]/route"

export default function Logout() {
    return(
        <span onClick={()=> {
            signOut()
        }}>
            Logout
        </span>
    )
}