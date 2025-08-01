import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import {
  getUser,
  loginUserByEmail,
  resendVerifyAccount,
} from "@/redux/features/customer/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { getUserProfile } from "@/redux/features/customer/userProfileSlice";

const Login = () => {
  // function for redux to send login :
  const dispatch = useDispatch();
  const {
    loading,
    error,
    userId,
    errorMessage,
    unverifyAccount,
    resendEmailSuccess,
  } = useSelector((state) => state.user);

  // get params :
  const [searchParams] = useSearchParams();
  const paramValue = searchParams.get("message");
  useEffect(() => {
    if (paramValue) {
      toast.info(paramValue);
    }
  }, [paramValue]);

  // for oauth , redirect when login or register with oauth success,in server , if success , will res : /login?oauth=success :
  useEffect(() => {
    const fetchData = async () => {
      if (searchParams.get("oauth")) {
        await dispatch(getUserProfile());
        await dispatch(getUser());
        window.scrollTo(0, 0);
        navigate("/");
      }
    };
    fetchData();
  }, []);

  // navigate :
  const navigate = useNavigate();

  // state for username and password :
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // function for handle submit form for login wiht email :
  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(loginUserByEmail({ email, password }));
    await dispatch(getUserProfile());
    window.scrollTo(0, 0);
    navigate("/");
    if (unverifyAccount) {
      toast.error("Unverify Account!");
    }
  };
  // resend verify email :
  const resendVerifyEmail = async () => {
    if (!email) {
      console.log("Dont have email for resend verify email!");
      return;
    }
    await dispatch(resendVerifyAccount({ email }));
  };
  useEffect(() => {
    // toast :
    if (userId) {
      toast.success("Login successfully!");
      navigate("/");
    } else {
      if (error) {
        toast.error(errorMessage || "Login fail ,try again!");
      }
    }
  }, []);

  // handle login by oauth :
  const handleLoginByOauth = (provider) => {
    // window.location.href = `http://localhost:5000/auth/${provider}`
    window.location.href = `https://rent-vehicle-project.onrender.com/auth/${provider}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or
          <Link
            to={"/register"}
            className="ml-1 sm:ml-4 font-medium text-blue-600 hover:text-blue-500"
          >
            create an account
          </Link>
        </p>
      </div>

      <div className="mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 sm:py-8 px-4 sm:px-6 lg:px-10 shadow sm:rounded-lg">
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 md:py-3 placeholder-gray-500
                                         text-gray-900 focus:outline-none focus:ring-indigo-500
                                         focus:border-indigo-500 focus:z-10 text-sm sm:text-base border-2 
                                          ${
                                            error
                                              ? "border-red-400"
                                              : "border-gray-200"
                                          }`}
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 md:py-3
                                     border-2
                                      placeholder-gray-500 text-gray-900 focus:outline-none
                                       focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 
                                       text-sm sm:text-base
                                       ${
                                         error
                                           ? "border-red-400"
                                           : "border-gray-200"
                                       }
                                       `}
                  value={password}
                  placeholder="Enter your password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center">
                <label
                  htmlFor="remember_me"
                  className="block text-xs sm:text-sm text-red-500"
                >
                  {unverifyAccount === true && resendEmailSuccess !== true && (
                    <button
                      onClick={() => {
                        resendVerifyEmail();
                      }}
                      className="text-left"
                    >
                      Unverify Account, resend verify email here!
                    </button>
                  )}
                  {resendEmailSuccess === true && (
                    <p className="text-green-500">
                      Resend email successfully! Check your email
                    </p>
                  )}
                </label>
              </div>

              <div className="text-xs sm:text-sm">
                <Link
                  to={"/forgot-password"}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 md:py-3 px-4 border border-transparent
                                 text-sm sm:text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                    ${
                                      loading
                                        ? "opacity-60 cursor-not-allowed"
                                        : "cursor-pointer"
                                    }
                                 `}
              >
                {loading ? <Loader className="animate-spin" /> : " Log in"}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-2 bg-gray-100 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
              <div>
                <button
                  onClick={() => {
                    handleLoginByOauth("facebook");
                  }}
                  className="w-full hover:opacity-90 flex items-center justify-center px-4 sm:px-8 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <img
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                    alt=""
                  />
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    handleLoginByOauth("github");
                  }}
                  className="w-full hover:opacity-90 flex items-center justify-center px-4 sm:px-8 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <img
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    src="https://www.svgrepo.com/show/512317/github-142.svg"
                    alt=""
                  />
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    handleLoginByOauth("google");
                  }}
                  className="w-full hover:opacity-90 flex items-center justify-center px-4 sm:px-8 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <img
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    src="https://www.svgrepo.com/show/506498/google.svg"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
