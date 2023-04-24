import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import Button from '../Button'
import Link from 'next/link'
import axios from 'axios'

const UserProfile = () => {
  const { data: session }: any = useSession()

  console.log(session, "in profile comp")

  const handleDelete = async (email) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/auth/rest?email=${email}`);
      console.log(response.data);
      signOut(); // or redirect to homepage after delete
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleDeleteAccount = () => {
    handleDelete(session?.user?.email);
  }

  return (
    session ?
      <div className="flex flex-col py-16 items-center min-h-screen bg-charcoal ">
        {
          session &&
          <div className='flex flex-col justify-start py-8 px-6 md:px-10 space-y-4 bg-darkCharcoal rounded-xl shadow-lg '>

            <h1 className='form-input text-gray-700'>
              {
                `Name: ${session?.user?.fullName}`
              }
            </h1>
            <h1 className='form-input text-gray-700'>
              {
                `Email: ${session?.user?.email}`
              }
            </h1>
            <div className='mx-auto pt-4'>
            <Button
                title="Delete Account"
                cls="mx-auto px-4 py-2 rounded-xl shadow-xl duration-150 font-bold hover:scale-105 opacity-90 hover:opacity-70 border text-pomelo border-pomelo bg-darkCharcoal"
                onClick={handleDeleteAccount}
              />
              <Button
                title="Log out"
                cls="mx-auto px-4 py-2 rounded-xl shadow-xl duration-150 font-bold hover:scale-105 opacity-90 hover:opacity-70 border text-pomelo border-pomelo bg-darkCharcoal"
                onClick={signOut} //how to go to home after pressing
              />
            </div>
          </div>
        }
      </div>
      :
      <div className="flex flex-col py-16 items-center min-h-screen bg-charcoal ">
        <Link href="/" className='px-4 py-2 text-black bg-syrah rounded-lg  shadow-xl md:text-sm hover:scale-105 hover:opacity-90 duration-150'>
          Home
        </Link>
      </div>
  )
}

export default UserProfile;
