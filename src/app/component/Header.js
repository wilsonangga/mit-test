"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Header = () => {
    const router = useRouter()
    const [showNav, setShowNav] = useState(false)

    return (
        <div className='bg-white shadow-md w-full px-10 py-6 flex justify-between md:justify-end relative'>
            <Image src="/menu.svg" width={24} height={24} alt="logout" className="cursor-pointer block md:hidden" onClick={() => setShowNav(true)} />
            <Image src="/logout.svg" width={24} height={24} alt="logout" onClick={() => router.push("/")} className="cursor-pointer" />
            <div className={`w-60 bg-[#005299] gap-14 px-5 py-7 flex flex-col fixed top-0 bottom-0 left-0 z-50 ${showNav ? 'block' : 'hidden'}`}>
                <div className="flex justify-between">
                    <p className='font-semibold text-xl text-white'>Dashboard</p>
                    <Image src="/x-button.png" width={20} height={20} alt="cross" onClick={() => setShowNav(false)} />
                </div>
                <div>
                    <div className='flex gap-1 items-center rounded-md bg-[#004580] px-3 py-2 cursor-pointer'>
                        <Image src="/product.svg" width={24} height={24} alt="User" />
                        <span className='text-sm font-semibold text-white'>User</span>
                    </div>
                </div>
            </div>
            {/* <div className='bg-red-500 fixed top-0 bottom-0 left-0 z-10 w-48'>s</div> */}
        </div>
    )
}

export default Header