import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const Navbar = () => {
  const { data: session } = useSession()
  return (
    <nav className="flex flex-row px-4 md:px-6 py-4 pb-4 pl-6 justify-between items-center bg-slate-800">
      <div className='flex flex-row space-x-2 items-center'>
        <Image
          src="/moose.png"
          alt=''
          width={80}
          height={100}
          className='rounded-xl'
        />
        <Link href={"/"} className='px-2 py-1 text-white text-3xl font-bold items-center justify-center'>
          Moodly
        </Link>
      </div>
      {/* Buttons container */}
      <div className="flex flex-row px-2 pt-2 md:px-4 justify-center items-center space-x-4 md:space-x-6 font-bold md:text-xl text-sm">
        {
          session ?
            <Link href="/" className='px-4 py-2 text-black bg-syrah rounded-lg  shadow-xl md:text-sm hover:scale-105 hover:opacity-90 duration-150'>
              Home
            </Link>
            :
            <Link href="/signup" className='py-4 px-6 bg-swamp opacity-90 text-white rounded-xl  shadow-md'>
              Sign Up
            </Link>
        }

        {
          session ?
            <Link
              rel="stylesheet"
              href="/profile"
              className='flex flex-col space-y-0 justify-center items-center group'
            >
              <Image
                src={"/prof.png"}
                alt=''
                width={50}
                height={100}
                className='group-hover:scale-105 duration-150'
              />
              <p className='text-gray-300 px-1 first-letter:font-normal group-hover:scale-105 duration-150 rounded-lg md:text-sm'>
                Profile
              </p>
            </Link>
            :
            <Link href="/login" className='py-4 px-6 bg-pomelo opacity-90 text-white rounded-xl  shadow-md'>
              Log In
            </Link>
        }

      </div>
    </nav>
  )
}

export default Navbar