"use client"

import { FormEvent } from "react"

export default function Form() {
    // video ytb
  const handleSubmitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const response = await fetch(`api/auth/register`, ({
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email')?.toString(),
        password: formData.get('password')?.toString()
      })
    }))
    console.log({response})
  }
    return (
    <form onSubmit={handleSubmitRegister} className="flex flex-col gap-4 mx-auto">
        <input name="email" type="email" className="text-[#000] py-1 px-3 rounded-md"/>
        <input name="password" type="password" className="text-[#000] py-1 px-3 rounded-md"/>
        <button type="submit" className="bg-[#fff] text-[#000] rounded-md">register</button>
      </form>
    )
}