"use client"
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [inputType, setInputType] = useState("password")

    const togglePassword = () => {
        inputType === "password" ? setInputType("text") : setInputType("password")
    }

    const checkEmptyEmailPass = () => {
        if (!email || !password) {
            !email && setErrorEmail(true)
            !password && setErrorPassword(true)
            return true
        } else {
            setErrorEmail(false)
            setErrorPassword(false)
            return false
        }
    }

    const handleLogin = () => {
        if (checkEmptyEmailPass()) return
        if (email !== "admin@gmail.com" && password !== "admin123") {
            Swal.fire({
                icon: "error",
                title: "Email or Password is wrong"
            })
            return
        } else {
            Swal.fire({
                icon: "success",
                title: "Login success"
            }).then((res) => {
                if (res.isConfirmed) {
                    router.push('/dashboard')
                }
            })
        }
    }

    return (
        <div>
            <h1 className='font-semibold text-3xl mb-2'>Login to Kelontong.Store</h1>
            <span className='text-sm block mb-6'>Manage your kelontong now</span>

            <div className='flex flex-col gap-4'>
                <div className='flex flex-col'>
                    <label htmlFor="email" className='font-medium text-xs block mb-3'>Email</label>
                    <input type="email" placeholder="Input your email" className={`bg-[#FAFAFA] px-4 py-3 rounded-lg text-sm font-medium outline-none block mb-1 ${errorEmail && 'border border-red-600'}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <span className={`text-red-600 text-xs font-medium ${errorEmail ? 'block' : 'hidden'}`}>Email is required</span>
                </div>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="email" className='font-medium text-xs'>Kata Sandi</label>
                    <div className='w-full relative'>
                        <input type={inputType} placeholder="Input your password" className={`bg-[#FAFAFA] pl-4 pr-10 py-3 rounded-lg text-sm font-medium outline-none w-full ${errorPassword && 'border border-red-600'}`} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Image src="eye.svg" width={16} height={16} alt="eye" className='absolute top-4 right-4 cursor-pointer' onClick={() => togglePassword()} />
                        <span className={`text-red-600 text-xs font-medium ${errorPassword ? 'block' : 'hidden'}`}>Password is required</span>
                    </div>
                </div>
                <button className='bg-[#008CFF] rounded-lg py-3 font-semibold text-sm text-white' onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default Login