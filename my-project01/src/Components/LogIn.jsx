import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "./AuthService";
import "./Login.css";
import { ProcessorAnimation} from "./Animations";

export default function LogIn() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const isAuthenticated = await AuthService.checkAuthentication();
      if (isAuthenticated) {
        const user = AuthService.getCurrentUser();
        if (user.role === "Student") {
          navigate("/student-dashboard");
        } else {
          navigate("/admin-dashboard");
        }
      }
    };
    
    checkAuth();
  }, [navigate]);

  function handleChangeUserEmail(e) {
    setUserEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

async function handleSubmit(e) {
    e.preventDefault();

    if (!userEmail || !password) {
      setMessage("Please fill all fields!");
      return;
    }


      try{
      setIsSubmitting(true);
      const data = {userEmail:userEmail,password:password};
      const response = await axios.post("http://localhost:3000/log-in-form-submission",data);
      console.log(response.data.validity);
      if(response.data.validity==1){
      setTimeout(() => {
        localStorage.setItem("UserName",response.data.UserName);
        localStorage.setItem("Email",response.data.email);
        localStorage.setItem("SessionId",response.data.sessionId);
        localStorage.setItem("Role",response.data.role);
        navigate('/student-dashboard');
        setIsSubmitting(false);
      }, 800);
      }else if(response.data.validity==2){
        setTimeout(() => {
          localStorage.setItem("UserName",response.data.UserName);
          localStorage.setItem("Email",response.data.email);
          localStorage.setItem("SessionId",response.data.sessionId);
          localStorage.setItem("Role",response.data.role);
          navigate('/admin-dashboard');
          setIsSubmitting(false);
        }, 800);
      }else{
        setIsSubmitting(false);
        setMessage("Invalid Credentials!");
      }
      }catch(err){
        console.error(err);
        setIsSubmitting(false);
        setMessage("Invalid Credentials!");
      }
  }
//      <EnhancedAnimation/>    
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Animated background elements */}
     
      <ProcessorAnimation/>

      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-2xl relative z-10">
        <div className="bg-indigo-600 p-6">
          <h1 className="text-2xl font-bold text-white text-center">
            Login to ClassGit
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <input
                onChange={handleChangeUserEmail}
                type="text"
                id="Email"
                name="Email"
                placeholder="your.email@example.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none transition-all duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                onChange={handleChangePassword}
                type="password"
                id="Password"
                name="Password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none transition-all duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {message && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm animate-fadeIn">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 ${
              isSubmitting
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Log In"
            )}
          </button>

          <div className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
