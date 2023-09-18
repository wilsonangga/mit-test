"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Swal from 'sweetalert2'

const UserList = () => {
    const router = useRouter()
    const [userList, setUserList] = useState()
    const [totalPage, setTotalPage] = useState()
    const [activePage, setActivePage] = useState(1)

    const handleDelete = (id) => {
        Swal.fire({
            icon: "warning",
            tittle: "Delete Item",
            text: "Are you sure to delete user?"
        }).then((res) => {
            if (res.isConfirmed) {
                fetch(`https://fakestoreapi.com/users/${id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "User has been deleted"
                        })
                    })
            }
        })

    }

    const prevPage = () => {
        if (activePage > 1) {
            setActivePage((activePage) => activePage - 1)
        }
    }

    const nextPage = () => {
        if (activePage < totalPage) {
            setActivePage((activePage) => activePage + 1)
        }
    }

    useEffect(() => {
        fetch(`https://fakestoreapi.com/users`)
            .then(res => res.json())
            .then(json => { setUserList(json), setTotalPage(Math.ceil(json.length) / 5) })
    }, [])

    return (
        <div className='pl-6 pr-10 py-10'>
            <div className="flex justify-between items-center">
                <h1 className='text-2xl font-semibold'>User</h1>
                <button className='bg-[#008CFF] rounded-lg py-3 w-40 text-sm font-semibold text-white' onClick={() => router.push('/dashboard/user/add')}>Add User</button>
            </div>

            <div className='mt-4'>
                <div className="flex font-medium text-sm bg-white border-b-2 py-3">
                    <div className='flex-[0.1] pl-4'>ID</div>
                    <div className='flex-[0.2] pl-4'>Name</div>
                    <div className='flex-[0.2] pl-4'>Username</div>
                    <div className='flex-[0.2] pl-4'>Email</div>
                    <div className='flex-[0.3] pl-4'>Action</div>
                </div>
                <div>
                    {
                        userList?.slice((activePage - 1) * 5, activePage * 5)?.map((item, index) => (
                            <div className={`flex font-medium text-sm py-3 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FC]'}`} key={index}>
                                <div className='flex-[0.1] pl-4'>{item?.id}</div>
                                <div className='flex-[0.2] pl-4'>{item?.name?.firstname} {item?.name?.lastname}</div>
                                <div className='flex-[0.2] pl-4'>{item?.username}</div>
                                <div className='flex-[0.2] pl-4'>{item?.email}</div>
                                <div className='flex-[0.3] pl-4'>
                                    <div className="flex items-center gap-2">
                                        <Image src="/eye.png" width={16} height={16} alt="edit" className='cursor-pointer' onClick={() => router.push(`/dashboard/user/${item?.id}`)} />
                                        <Image src="edit.svg" width={16} height={16} alt="edit" className='cursor-pointer' onClick={() => router.push(`/dashboard/user/edit/${item?.id}`)} />
                                        <Image src="/delete.png" width={16} height={16} alt="edit" className='cursor-pointer' onClick={() => handleDelete(item?.id)} />
                                    </div>
                                </div>
                            </div>))
                    }
                </div>

                <div className='flex justify-between mt-6'>
                    <span className='text-sm text-[#909EAB]'>Showing page {activePage} from {totalPage}</span>
                    <div className='flex gap-2 items-center'>
                        <Image src="chevrons-left-active.svg" width={24} height={24} alt="left" className="cursor-pointer" onClick={() => prevPage()} />
                        <span>{activePage}</span>
                        <Image src="chevrons-right-active.svg" width={24} height={24} alt="right" className="cursor-pointer" onClick={() => nextPage()} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserList