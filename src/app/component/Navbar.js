import React from 'react'
import Image from 'next/image'

const Navbar = () => {
    return (
        <div className='w-60 bg-[#005299] gap-14 px-5 py-7 md:flex md:flex-col hidden'>
            <p className='font-semibold text-xl text-white'>Dashboard</p>
            <div>
                <div className='flex gap-1 items-center rounded-md bg-[#004580] px-3 py-2 cursor-pointer'>
                    <Image src="/product.svg" width={24} height={24} alt="user" />
                    <span className='text-sm font-semibold text-white'>User</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar