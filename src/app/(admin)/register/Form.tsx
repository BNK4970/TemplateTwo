"use client"

import { Input } from "@/components/Input"
import { FormEvent } from "react"

export default function Form() {
    // video ytb
  const handleSubmitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const response = await fetch(`api/auth/register`, ({
      method: 'POST',
      body: JSON.stringify({
        firtstname: formData.get('firtstname')?.toString(),
        lastname: formData.get('lastname')?.toString(),
        username: formData.get('username')?.toString(),
        email: formData.get('email')?.toString(),
        password: formData.get('password')?.toString()
      })
    }))
    console.log({response})
  }
    return (
    <form onSubmit={handleSubmitRegister} className=" gap-4 col-span-2 grid grid-cols-2 grid-flow-row">
      <div className="gap-2 col-span-2 grid grid-cols-2">
        <Input name={"firtstName"} type={"text"} children={"firtst name"} addClassName="col-span-1"/>
        <Input name={"lastName"} type={"text"} children={"Last name"} addClassName="col-span-1"/>
      </div>
      <Input name={"username"} type={"text"} children={"Username"} addClassName="col-span-2"/>
      <Input name={"email"} type={"email"} children={"Email"} addClassName="col-span-2"/>
      <Input name={"password"} type={"password"} children={"Password"} addClassName="col-span-2"/>
        <button type="submit" className="bg-[#fff] text-[#000] rounded-md col-span-2">register</button>
      </form>
    )
}