"use client"
import { ParticlesComponent } from "@/components/particles"
import useFormValidation from "@/hooks/validation";
import { FormEvent, useState } from "react";
import axios from "../../../config/axios";
import { useRouter } from "next/navigation";


const Login = () => {
  const [err, setErr] = useState('')
  const [error, setError] = useState('')
  const [load, setLoad] = useState(false)
  const {email, setEmail, errors, password, setPassword} = useFormValidation()
  const router = useRouter()

  const sendUserData = async (userData: any) => {
    try {
      setLoad(true)
      axios.post('/login', userData, {
        headers: {
          "Content-Type": 'application/json' 
        }
      }).then((response) => {
        console.log('response',response.data)
        if(response.status === 200){
          const token = response.data.token
          localStorage.setItem('token', token);
          router.push('/userhome')
          setLoad(false)
        }else{
          setLoad(false)
          setError(response.data.message)
        }
      }).catch((error) => {
        setLoad(false)
        setError(error.response.data.message)        
      })
    } catch (error) {
      console.error('Error sending user data to server:', error);
    }
  };


  const handleLogin = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const userData :any ={
      email: email,
      password: password,
    }
      sendUserData(userData)
  }

  return (
    <section className="bg-black dark:bg-white-900 h-auto">
      <ParticlesComponent/>
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0   bg-white-200 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-white-900 md:text-2xl text-white">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" 
          onSubmit={handleLogin}
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white-900 text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e)=>setEmail( e.target.value)}
                className="bg-white-50 border border-white-300 text-white-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 text-black dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                placeholder="name@company.com"
                required
              />
            </div>
            {errors.email && <p className='block mb-2 mt-2 text-sm font-medium text-red-600 dark:text-red-600 text-center'>{errors.email}</p>}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white-900 text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                className="bg-white-50 border border-white-300 text-white-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 text-black dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 transition-all duration-500 ease-in-out dark:focus:ring-green-800 ${
                load ? 'cursor-not-allowed opacity-50' : ''
              }`}
              disabled={load}
            >
              Sign in
            </button>
            <div className="flex justify-center">
            <p className="text-white font-semibold">Or</p>
            </div>
            <div className=" flex justify-center">
            </div>
            {errors.password && <p className='block mb-2 mt-2 text-sm font-medium text-red-600 dark:text-red-600 text-center'>{errors.password}</p>}
                {err && <p className='block mb-2 mt-2 text-sm font-medium text-red-600 dark:text-red-600 text-center'>{err}</p>}
                {error && <p className='block mb-2 mt-2 text-sm font-medium text-red-600 dark:text-red-600 text-center'>{error}</p>}

            <p className="text-sm text-white font-light text-white-500 flex justify-center dark:text-white-400">
              Dont have an account yet?&nbsp;{' '}
              <a href="/signup" className="font-medium text-green-600 hover:underline dark:text-green-500">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
  )
}
export default Login
