import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import { loginUser } from '@/redux/features/userSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Loader } from 'lucide-react';

const Login = () => {
    // function for redux to send login : 
    const dispatch = useDispatch()
    const { loading, error, userId, errorMessage } = useSelector(state => state.user)

    // get params : 
    const [searchParams] = useSearchParams();
    const paramValue = searchParams.get("message");
    useEffect(() => {
        if (paramValue) {
            toast.info(paramValue)
        }
    }, [paramValue])

    // navigate : 
    const navigate = useNavigate()

    // state for username and password : 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // function for handle submit form : 
    const handleSubmit = async (event) => {
        event.preventDefault()
        dispatch(loginUser({ email, password }))
    }
    useEffect(() => {
        // toast : 
        if (userId ) {
            toast.success('Login successfully!')
            navigate('/')
        } else {
            if (error) {
                toast.error(errorMessage || 'Login fail ,try again!')
            }
        }
    }, [userId, error])

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Login to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 max-w">
                    Or
                    <Link to={'/register'} className="ml-4 font-medium text-blue-600 hover:text-blue-500">
                        create an account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input id="email" name="email" type="" required
                                    className={`appearance-none rounded-md relative block w-full px-3 py-2 placeholder-gray-500
                                         text-gray-900 focus:outline-none focus:ring-indigo-500
                                         focus:border-indigo-500 focus:z-10 sm:text-sm  border-2 
                                          ${error ? 'border-red-400' : 'border-gray-200'}`}
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value)
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input id="password" name="password" type="password" required
                                    className={`appearance-none rounded-md relative block w-full px-3 py-2
                                     border-2
                                      placeholder-gray-500 text-gray-900 focus:outline-none
                                       focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 
                                       sm:text-sm 
                                       ${error ? 'border-red-400' : 'border-gray-200'}
                                       `}
                                    value={password}
                                    placeholder="Enter your password"
                                    onChange={(event) => {
                                        setPassword(event.target.value)
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember_me" name="remember_me" type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to={'/forgot-password'} className="font-medium text-blue-600 hover:text-blue-500">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                disabled={loading}
                                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent
                                 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                    ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                                 `}
                            >
                                {loading ? <Loader className='animate-spin' /> : ' Log in'}
                            </button>
                        </div>
                    </form>
                    <div className="mt-6">

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-100 text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-3">
                            <div>
                                <a href="#"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                    <img className="h-5 w-5" src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                                        alt="" />
                                </a>
                            </div>
                            <div>
                                <a href="#"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                    <img className="h-5 w-5" src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                                        alt="" />
                                </a>
                            </div>
                            <div>
                                <a href="#"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                    <img className="h-6 w-6" src="https://www.svgrepo.com/show/506498/google.svg"
                                        alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login