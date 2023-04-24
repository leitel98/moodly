import React from 'react'
import Image from 'next/image'
import Close from '../components/Button/close'
import LoginForm from '../components/Form/LoginForm'
import Link from 'next/link'

const signup = () => {
    return (
        <div className="global-cont">
            <div className="card">
                <LoginForm />
                <Image
                    src="/image.jpg"
                    alt=""
                    width={430}
                    height={100}
                    className='hidden md:block bg-darkCharcoal rounded-xl'
                />
                <Link href="/">
                    <Close />
                </Link>
            </div>
        </div>
    )
}

export default signup