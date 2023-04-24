import React from 'react'
import Image from 'next/image'
import Close from '../components/Button/close'
import SignupForm from '../components/Form/SignupForm'
import Link from 'next/link'

const signup = () => {
    return (
        <div className="global-cont">
            <div className="card">
                <SignupForm />
                <Image
                    src="/image.jpg"
                    alt=""
                    width={430}
                    height={100}
                    className='hidden md:block rounded-xl'
                />
                <Link href="/">
                    <Close />
                </Link>
            </div>
        </div>
    )
}

export default signup