"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

const EditUser = () => {
    const router = useRouter()
    const pathName = usePathname()

    const [data, setData] = useState({
        email: "",
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        city: "",
        street: "",
        number: 3,
        zipcode: "12926-3874",
        lat: "-37.3159",
        long: "81.1496",
        phone: "089475837488"
    })

    const getUserDetail = () => {
        fetch(`https://fakestoreapi.com/users/${parseInt(pathName.split("/")[4])}`)
            .then(res => res.json())
            .then(json => setData({ ...data, email: json.email, password: json.password, username: data.username, firstname: json.name.firstname, lastname: json.name.lastname, city: json.address.city, street: json.address.street }))
    }

    const checkEmpty = () => {
        if (!data.email || !data.username || !data.password || !data.firstname || !data.lastname || !data.city || !data.street || !data.number || !data.zipcode || !data.lat || !data.long || !data.phone) {
            Swal.fire({
                icon: "error",
                title: "There are still empty data",
                text: "Complete the data"
            })
            return true
        }
        return false
    }

    const handleSubmit = () => {
        if (!checkEmpty()) {
            fetch(`https://fakestoreapi.com/users/${parseInt(pathName.split("/")[4])}`, {
                method: "PUT",
                body: JSON.stringify(
                    {
                        email: data.email,
                        username: data.username,
                        password: data.password,
                        name: {
                            firstname: data.firstname,
                            lastname: data.lastname
                        },
                        address: {
                            city: data.city,
                            street: data.street,
                            number: data.number,
                            zipcode: data.zipcode,
                            geolocation: {
                                lat: data.lat,
                                long: data.long
                            }
                        },
                        phone: data.phone
                    }
                )
            })
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "User updated successfully"
                    }).then((res) => {
                        if (res.isConfirmed) {
                            router.push("/dashboard")
                        }
                    })
                })
        }
    }

    useEffect(() => {
        getUserDetail()
    }, [])

    return (
        <div className='my-10 mx-8'>
            <div className="flex gap-4">
                <Image src="/chevron-left.svg" width={24} height={24} alt="chevron-left" onClick={() => router.push('/dashboard')} className="cursor-pointer" />
                <h1 className='text-2xl font-semibold'>View User</h1>
            </div>

            <div className='flex flex-col gap-6 mt-7'>
                <div className='flex flex-col w-72 gap-2'>
                    <label htmlFor="name" className='font-medium text-xs'>Email</label>
                    <input type="email" className="bg-white rounded-lg px-4 py-3 outline-none text-sm" placeholder='Input email' value={data?.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                </div>

                <div className='flex flex-col w-72 gap-2'>
                    <label htmlFor="name" className='font-medium text-xs'>Username</label>
                    <input type="text" className="bg-white rounded-lg px-4 py-3 outline-none text-sm" placeholder='Input username' value={data?.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
                </div>

                <div className='flex flex-col w-72 gap-2'>
                    <label htmlFor="name" className='font-medium text-xs'>Password</label>
                    <input type="password" className="bg-white rounded-lg px-4 py-3 outline-none text-sm" placeholder='Input password' value={data?.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                </div>

                <div className='flex flex-col w-72 gap-2'>
                    <label htmlFor="name" className='font-medium text-xs'>Firstname</label>
                    <input type="text" className="bg-white rounded-lg px-4 py-3 outline-none text-sm" placeholder='Input firstname' value={data?.firstname} onChange={(e) => setData({ ...data, firstname: e.target.value })} />
                </div>

                <div className='flex flex-col w-72 gap-2'>
                    <label htmlFor="name" className='font-medium text-xs'>Lastname</label>
                    <input type="text" className="bg-white rounded-lg px-4 py-3 outline-none text-sm" placeholder='Input lastname' value={data?.lastname} onChange={(e) => setData({ ...data, lastname: e.target.value })} />
                </div>

                <div className='flex flex-col w-72 gap-2'>
                    <label htmlFor="name" className='font-medium text-xs'>City</label>
                    <input type="text" className="bg-white rounded-lg px-4 py-3 outline-none text-sm" placeholder='Input city' value={data?.city} onChange={(e) => setData({ ...data, city: e.target.value })} />
                </div>

                <div className='flex flex-col w-72 gap-2'>
                    <label htmlFor="name" className='font-medium text-xs'>Street</label>
                    <input type="text" className="bg-white rounded-lg px-4 py-3 outline-none text-sm" placeholder='Input street' value={data?.street} onChange={(e) => setData({ ...data, street: e.target.value })} />
                </div>

                <button className='bg-[#008CFF] w-72 py-3 text-white font-semibold rounded-lg text-sm' onClick={() => handleSubmit()}>Save</button>
            </div>
        </div>
    )
}

export default EditUser