'use client';

import {signIn} from 'next-auth/react'
import { useState } from 'react'


export default function SigninPage(){
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const res=await signIn('credentials',{
            email,
            password,
            redirect:false
        })
        if(res.ok){
            alert("welcome")
        }
        else{
            alert("Invalid credentials")
        }
    }
    return (
        <div className='flex  justify-center w-full items-center h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 justify-center bg-white px-20 py-20 '>
            <h1>Signin</h1>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <div className='flex w-full justify-center'><button type="submit">Sign In</button></div>
        </form>
        </div>
      );
}