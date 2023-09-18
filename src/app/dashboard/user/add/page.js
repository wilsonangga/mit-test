import React from 'react'
import Navbar from '@/app/component/Navbar'
import Header from '@/app/component/Header'
import AddUser from '@/app/component/AddUser'

const page = () => {
    return (
        <div className='flex min-h-screen bg-[#F8F9FC]'>
            <Navbar />
            <div className="w-full">
                <Header />
                <AddUser />
            </div>
        </div>
    )
}

export default page