import React, { useState } from 'react'
import InputErrors from '../../../types/error'
import { getErrorMsg, loginUser } from '../../helpers'
import Button from '../Button'
import { useRouter } from 'next/router'
import axios, { AxiosError } from 'axios'

const SignupForm = () => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [validationErrors, setValidationErrors] = useState<InputErrors[]>([])
  const [submitError, setSubmitError] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  //validates the data format
  const validateData = (): boolean => {
    const err = []

    if (data.fullName?.length < 4) {
      err.push({ fullName: "Full name must be atleast 4 characters long" })
    }
    else if (data.fullName?.length > 30) {
      err.push({ fullName: "Full name should be less than 30 characters" })
    }
    else if (data.password?.length < 6) {
      err.push({ password: "Password should be atleast 6 characters long" })
    }
    else if (data.password !== data.confirmPassword) {
      err.push({ confirmPassword: "Passwords don't match" })
    }

    setValidationErrors(err)

    if (err.length > 0) {
      return false
    }
    else {
      return true
    }
  }

  //signup button push actions => creates a user.
  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const isValid = validateData()

    if (isValid) {
      try {
        setLoading(true)
        const apiRes = await axios.post("http://localhost:3000/api/auth/rest", data)

        if (apiRes?.data?.success) {
          // save data in session using next auth

          const loginRes = await loginUser({
            email: data.email,
            password: data.password
          })

          if (loginRes && !loginRes.ok) {
            setSubmitError(loginRes.error || "")
          }
          else {
            router.push("/")
          }
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data?.error
          setSubmitError(errorMsg)
          router.push("/error")
        }
      }
      setLoading(false)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  return (
    <div className="p-6 md:p-20">
      {/* top cont */}
      <h2 className="font-mono mb-6 text-4xl font-bold text-center text-pomelo">
        Sign Up
      </h2>
      <p className="mb-8 max-w-xs text-center font-sans font-light text-white">
        Have a user! Live the thrilling adventure of having a useless account.
      </p>

      {/* form */}
      <form onSubmit={handleSignup}>
        <div className="flex flex-col items-center">
          {/* Input fields */}
          <input
            type="text"
            placeholder={'Full Name'}
            value={data.fullName}
            name="fullName"
            onChange={handleInputChange}
            required
            className="form-input"
          />
          {
            getErrorMsg("fullName", validationErrors) &&
            <p className='error-msg'>
              {getErrorMsg("fullName", validationErrors)}
            </p>
          }

          <input
            type="email"
            placeholder={'Email'}
            value={data.email}
            name="email"
            onChange={handleInputChange}
            required
            className="form-input"
          />

          <input
            type="password"
            placeholder={'Password'}
            value={data.password}
            name="password"
            onChange={handleInputChange}
            required
            className="form-input"
          />
          {
            getErrorMsg("password", validationErrors) &&
            <p className='error-msg'>
              {getErrorMsg("password", validationErrors)}
            </p>
          }

          <input
            type="password"
            placeholder={'Confirm Password'}
            value={data.confirmPassword}
            name="confirmPassword"
            onChange={handleInputChange}
            required
            className="form-input"
          />

          {
            getErrorMsg("confirmPassword", validationErrors) &&
            <p className='error-msg'>
              {getErrorMsg("confirmPassword", validationErrors)}
            </p>
          }
        </div>

        {/* middle content */}
        <div className="flex flex-row w-full items-center justify-center mt-4">

          <Button
            title={"Register"}
            type='submit'
            cls='purple-B'
            //true para llamar a la api y falso luego de que se ejecuta
            disabled={loading}
          />

        </div>
        {
          submitError &&
          <p className='error-msg'>
            {submitError}
          </p>
        }
      </form>

      {/* <div className="mt-6 border-b border-b-gray-300"></div> */}

      {/* bottom */}
      {/* <p className="py-6 text-sm font-thin text-center text-swamp">or sign up with</p> */}
      {/* bottom buttons cont */}
      {/* <div className="flex flex-col space-x-0 space-y-6 md:flex-row md:space-x-4 md:space-y-0"> */}
        {/* <button className='media-link'>
          <img src="facebook.png" className='w-9' alt="" />
          <span className='font-thin text-white'>Facebook</span>
        </button> */}
        {/* <button className='media-link md:w-full'>
          <img src="google.png" className='w-9' alt="" />
          <span className='font-thin text-white'>Google</span>
        </button> */}
      {/* </div> */}
    </div>
  )
}

export default SignupForm