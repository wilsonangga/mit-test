import Image from 'next/image'
import Login from './component/Login'

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <Login />
    </div>
  )
}
