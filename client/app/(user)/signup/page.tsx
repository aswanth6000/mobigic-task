import { ParticlesComponent } from "@/components/particles";

const Login = () => {
  return (
    <section className="bg-black dark:bg-white-900">
      <ParticlesComponent />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0   bg-white-200 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white-900 md:text-2xl text-white">
              Sign up to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              // onSubmit={handleLogin}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-white-900 text-white"
                >
                  User name
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  // value={email}
                  // onChange={(e)=>setEmail( e.target.value)}
                  className="bg-white-50 border border-white-300 text-white-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 text-white dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                  placeholder="Username"
                  required
                />
              </div>
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
                  // value={email}
                  // onChange={(e)=>setEmail( e.target.value)}
                  className="bg-white-50 border border-white-300 text-white-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 text-white dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                  placeholder="name@company.com"
                  required
                />
              </div>
              {/* {errors.email && <p className='block mb-2 mt-2 text-sm font-medium text-red-600 dark:text-red-600 text-center'>{errors.email}</p>} */}
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
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  className="bg-white-50 border border-white-300 text-white-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                  placeholder="••••••••"
                  required
                />
                {/* {errors.password && <p className='block mb-2 mt-2 text-sm font-medium text-red-600 dark:text-red-600 text-center'>{errors.password}</p>} */}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-white-900 text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  // value={confirmPassword}
                  // onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white-50 border border-white-300 text-white-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 transition-all duration-500 ease-in-out dark:focus:ring-green-800"
              >
                Sign up
              </button>
              <div className="flex justify-center">
                <p className="text-white font-semibold">Or</p>
              </div>
              <p className="text-sm text-white font-light text-white-500 flex justify-center dark:text-white-400">
                Already have an account yet?&nbsp;{" "}
                <a
                  href="/login"
                  className="font-medium text-green-600 hover:underline dark:text-green-500"
                >
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
