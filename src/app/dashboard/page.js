import React from 'react'
import Navbar from '../component/Navbar'
import Header from '../component/Header'
import UserList from '../component/UserList'

const page = () => {
    return (
        <div className='flex min-h-screen bg-[#F8F9FC]'>
            <Navbar />
            <div className='w-full'>
                <Header />
                <UserList />
            </div>
        </div>
    )
}

export default page