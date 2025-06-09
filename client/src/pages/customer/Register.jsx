import { registerUser, resendVerifyAccount, verifyAccount } from '@/redux/features/customer/userSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Loader } from 'lucide-react';

const Register = () => {
    // function for redux to send register : 
    const dispatch = useDispatch()
    const { loading, error, errorMessage, userId, verifyAccountFail, resendEmailSuccess } = useSelector(state => state.user)

    // navigate : 
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const userIdParam = searchParams.get('userId')
    const verifyToken = searchParams.get('verifyToken')

    // state for username and password : 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // function for handle submit form : 
    const handleSubmit = async (event) => {
        event.preventDefault()
        // check if confirm password is correct : 
        if (password !== confirmPassword) {
            toast.error('Confirm password is incorrect!')
            return
        }
        // check if password strong : 
        if (!isStrongPassword(password)) {
            return
        }
        await dispatch(registerUser({ email, password }))
    }

    // handle login by oauth : 
    const handleLoginByOauth = (provider) => {
        // window.location.href = `http://localhost:5000/auth/${provider}`
        window.location.href = `https://rent-vehicle-project.onrender.com/auth/${provider}`
    }
    // resend verify email : 
    const resendVerifyEmail = async () => {
        if (!email) {
            console.log('Dont have email for resend verify email!');
            return
        }
        await dispatch(resendVerifyAccount({ email }))
    }
    const isStrongPassword = (password) => {
        const minLength = 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            toast.error('Password must be at least 8 characters long');
            return false;
        }
        if (!hasUpper) {
            toast.error('Password must include at least one uppercase letter');
            return false;
        }
        if (!hasLower) {
            toast.error('Password must include at least one lowercase letter');
            return false;
        }
        if (!hasDigit) {
            toast.error('Password must include at least one number');
            return false;
        }
        if (!hasSpecial) {
            toast.error('Password must include at least one special character');
            return false;
        }
        return true
    }

    // after dispatch register : 
    useEffect(() => {
        if (userId & !email) {
            toast.success('Register successfuly! Check your email to verify account!')
        }
        if (error) {
            toast.error('Register fail, try again!')
        }
    }, [error, userId])

    // chenk if it is verify account link : 
    useEffect(() => {
        const verify = async () => {
            if (userIdParam && verifyToken) {
                await dispatch(verifyAccount({ userId: userIdParam, verifyToken }))
                window.scrollTo(0, 0);
                navigate('/login')
            }
        }
        verify()
    }, [userIdParam, verifyToken])
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Register for your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 max-w">
                    Or
                    <Link to={'/login'} className="ml-2 font-medium text-blue-600 hover:text-blue-500">
                        login
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
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={e => {
                                        setEmail(e.target.value)
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
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={e => {
                                        setPassword(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="mt-1">
                                <input id="confirmPassword" name="confirmPassword" type="password" required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={e => {
                                        setConfirmPassword(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <label htmlFor="remember_me" className="text-red-500 ml-2 block text-sm">
                                    {verifyAccountFail === false && <button type='button' onClick={() => { resendVerifyEmail() }}>Verify fail ,click here to send email again </button>}
                                </label>

                                <label
                                    className='text-green-600'
                                >
                                    {resendEmailSuccess && 'Resend verify email success! , check your email now!'}
                                </label>
                            </div>

                        </div>

                        <div>
                            <button type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border
                                 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600
                                  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                                   focus:ring-indigo-500"
                            >
                                {loading ? <Loader className='animate-spin' /> : "Register"}
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
                                <button
                                    onClick={() => {
                                        handleLoginByOauth('facebook')
                                    }}
                                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                    <img className="h-5 w-5" src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                                        alt="" />
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        handleLoginByOauth('github')
                                    }}
                                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                    <img className="h-5 w-5" src="https://www.svgrepo.com/show/512317/github-142.svg"
                                        alt="" />
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        handleLoginByOauth('google')
                                    }}
                                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                    <img className="h-6 w-6" src="https://www.svgrepo.com/show/506498/google.svg"
                                        alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register