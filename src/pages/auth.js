import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signin, signup } from "../actions/auth";
import { AUTH } from "../constants/actionTypes";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export default function Auth() {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

console.log(initialState)




  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) { // true register data
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history)); // else login form data send
    }
  };

  const googleSuccess = async (res) => {
    // console.log(res)
    const result = res?.profileObj; // my google account info and account image name....
    const token = res?.tokenId;  // google token


//***this google login data well be in redux and localstorage not sended to sdatabase

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () =>
    alert("Google Sign In was unsuccessful. Try again later");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="grid grid-cols-1 gap-4 place-items-center h-80 ...">
      <div className=" form-container">
        <form
          onSubmit={handleSubmit}
          class="bg-white   shadow-md rounded px-8 pt-6 pb-8 mb-10"
        >
          {isSignup && (
            <>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                 
                >
                  firstName
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      
     name='firstName'
                  type="text"
                  onChange={handleChange}
           
                  placeholder="firstName"
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
              
                >
                  lastName
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name='lasttName'
                  type="text"
                  onChange={handleChange}
                  placeholder="lastName"
                />
              </div>
            </>
          )}

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
            
            >
              email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name='email'
              type="email"
              onChange={handleChange}
              placeholder="email"
            />
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              
            >
              password
            </label>
            <input
             name='password'
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="password"
            />
          </div>

          {isSignup && (
            <>
              <input
              
              onChange={handleChange}
              name="confirmPassword"  half />
            </>
          )}

          <button
            type="submit"
            className=" mt-3 pr-4 pl-4  bg-blue-400 rounded-lg ml-2 p-2 font-serif"
          >
            {isSignup ? "signup" : "signin"}
          </button>

<div className=" mb-3 mt-3 text-center ">
  

          <GoogleLogin
            clientId="1071594199915-o7e241gh9kvpl8pdfem0mkqgjv3prhor.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                className="   bg-yellow-300 rounded-lg p-2 relative  left-14"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
          
                variant="contained"
              >
                Google Sign In
              </button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />


</div>



          <div>
            <p>
              {" "}
              {!isSignup
                ? "yo have to register here"
                : "are you already have account and registered"}
              <div className=" text-center mt-2 ">
                <p className="   m-auto" onClick={switchMode}>
                  {!isSignup ? "Register" : "Login"}
                </p>
              </div>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}




// afer login with google recive user info from google in console.log

// 
