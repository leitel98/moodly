import React, { useState } from 'react'
import { loginUser } from '../../helpers'
import Button from '../Button'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

const LoginForm = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const router = useRouter()

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      setLoading(true)

      const loginRes = await loginUser({ email, password })

      if (loginRes && !loginRes.ok) {
        setSubmitError(loginRes.error || "")
      }
      else {
        router.push("/")
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data?.error
        setSubmitError(errorMsg)
        router.push("/api/auth/error")
      }
    }
    setLoading(false)
  }

  const handleGoogleSignIn = (event: React.FormEvent<Element>) => {
    event.preventDefault();

    signIn("google", { callbackUrl: "http://localhost:3000/" });
  };


  return (
    <div className="p-6 space-y-4 md:p-20">
      <h2 className="font-mono mb-4 text-4xl text-pomelo font-bold text-center">
        Log In
      </h2>
      <p className="mb-6 max-w-xs text-center font-sans font-light text-white">
        Login to your account
      </p>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col items-center w-6xl">

          {/* Input fields */}
          <input
            type="email"
            placeholder={'Email'}
            value={email}
            name="email"
            onChange={handleEmailChange}
            required
            className="form-input"
          />

          <input
            type="password"
            placeholder={'Password'}
            value={password}
            name="password"
            onChange={handlePasswordChange}
            required
            className="form-input"
          />
          {/* @I do not count with an email api */}
          <Link href={"/"} className='mt-4 max-w-sm text-center'>
            <span className="text-center max-w-sm font-thin text-swamp">
              We do not count yet with a password recovery system
            </span>
          </Link>
        </div>


        {/* middle content */}
        <div className="flex flex-row w-full items-center justify-center mt-6">
          <Button
            title={"Login"}
            type='submit'
            disabled={loading}
            cls='purple-B'
          />
        </div>

        {
          submitError &&
          <p className="error-msg">
            {submitError}
          </p>
        }

      </form>

      {/* <div className="mt-8 border-b border-b-gray-300"></div> */}

      {/* bottom */}
      {/* <p className="py-6 text-sm font-thin text-center text-swamp">or log in with</p> */}
      {/* bottom buttons cont */}
      {/* <div className="flex flex-col space-x-0 space-y-6 md:flex-row md:space-x-4 md:space-y-0 md: max-w-xl">
        <button className='media-link'>
          <img src="facebook.png" className='w-9' alt="" />
          <span className='font-thin text-gray-200'>Facebook</span>
        </button>
        <button
          className='media-link md:w-full'
          onClick={handleGoogleSignIn}
        >
          <img src="google.png" className='w-9' alt="" />
          <span className='font-thin text-gray-200'>Google</span>
        </button> */}
      {/* </div> */}
    </div>
  )
}

export default LoginForm