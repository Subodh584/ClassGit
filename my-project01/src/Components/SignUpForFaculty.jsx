import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthService from "./AuthService";
import { ClassGitAnimation } from "./Animations";

const PASSWORD_MIN_LENGTH = 8;

export default function SignUpForFaculty() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [section, setSection] = useState ("");
  const [fName, setFName] = useState ("");
  const [lName, setLName] = useState ("");
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [OTPbyUser, setOTPbyUser] = useState("");
  const [OTPbyServer, setOTPbyServer] = useState("");
  const [loading, setLoading] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordErr, setPasswordErr] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [otpMessage, setOtpMessage] = useState("");
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

  useEffect(() => {
    if (!password) {
      setPasswordErr("Password is required");
    } else if (password.length < PASSWORD_MIN_LENGTH) {
      setPasswordErr("Password must be at least 8 characters");
    } else if (confirmPassword && password !== confirmPassword) {
      setPasswordErr("Passwords don't match!");
    } else {
      setPasswordErr("");
    }
  }, [confirmPassword, password]);

  async function handleSendOTP() {
    if (emailError || !userEmail) return;

    try {
      setLoading(true);
      setOtpSent(true);
      const response = await axios.post("http://localhost:3000/verify", {
        email: userEmail,
      });
      if (response.data === -1) {
        throw new Error("Failed to send OTP");
      }
      setOTPbyServer(response.data);
    } catch (error) {
      setMessage("Failed to send OTP. Please try again.");
      setOtpSent(false);
    } finally {
      setLoading(false);
    }
  }

  const handleResendOTP = async () => {
    setResendDisabled(true);
    await handleSendOTP();

    setResendTimer(30);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  async function handleVerifyButton() {
    const userOTP = String(OTPbyUser);
    const serverOTP = String(OTPbyServer);

    if (userOTP === serverOTP) {
      setVerified(true);
      setOtpMessage("OTP verified successfully!");
    } else {
      setOtpMessage("Invalid OTP. Please try again.");
    }
  }

  function handleChangeEmail(e) {
    const value = e.target.value;
    setUserEmail(value);
    if (!value.trim()) {
      setEmailError("Email is required");
    } else if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  function handleChangeSection(e){
    setSection(e.target.value)
  }

  function handleChangeFName(e){
    setFName(e.target.value)
  }
  function handleChangeLName(e){
    setLName(e.target.value)
  }


  function handleChangeOTP(e) {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOTPbyUser(value);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordErr || emailError) return;
    try {
      setIsSubmitting(true);
      const data = {userEmail:userEmail, section:section, fName:fName, lName:lName, password:password, role:"Teacher"}
      const response = await axios.post("http://localhost:3000/sign-up-form-submission",data);
      console.log(response.data);
      if(response.data.name === "error"){
        setMessage("Registeration failed as email aready registered!");
        setIsSubmitting(false);
      }else{
        setTimeout(() => {
          navigate("/login");
          setIsSubmitting(false);
        }, 1800);}
    } catch (error) {
      setMessage("Registration failed. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
       <ClassGitAnimation/>
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-2xl">
        <div className="bg-indigo-600 p-6">
          <h1 className="text-2xl font-bold text-white text-center">
            Sign Up For Faculty
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
                onChange={handleChangeEmail}
                type="email"
                id="Email"
                name="Email"
                placeholder="abc@gmail.com"
                disabled={verified}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
                  emailError
                    ? "border-red-500 focus:ring-red-200"
                    : verified
                    ? "border-green-500 bg-green-50 focus:ring-green-200"
                    : "border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
                } ${verified ? "opacity-60" : ""}`}
              />
              {verified && (
                <div className="absolute right-3 top-2.5 text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            {emailError && (
              <p className="text-sm text-red-600 mt-1 animate-fadeIn">
                {emailError}
              </p>
            )}
          </div>

          {!otpSent ? (
            <button
              onClick={handleSendOTP}
              type="button"
              disabled={!!emailError || !userEmail}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                !!emailError || !userEmail
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              }`}
            >
              Send OTP
            </button>
          ) : null}

          {otpSent && !verified ? (
            !loading ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="space-y-2">
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter OTP
                  </label>
                  <input
                    onChange={handleChangeOTP}
                    type="text"
                    id="otp"
                    name="otp"
                    pattern="\d{6}"
                    maxLength={6}
                    value={OTPbyUser}
                    placeholder="Enter 6-digit OTP"
                    required
                    className="w-full px-4 py-2 text-center tracking-widest border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none transition-all duration-200"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleVerifyButton}
                    type="button"
                    disabled={OTPbyUser.length !== 6}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                      OTPbyUser.length !== 6
                        ? "bg-indigo-300 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    }`}
                  >
                    Verify OTP
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={resendDisabled}
                    className={`flex-1 py-2 px-4 border rounded-lg font-medium transition-all duration-200 ${
                      resendDisabled
                        ? "border-gray-300 text-gray-400 cursor-not-allowed"
                        : "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    {resendTimer > 0
                      ? `Resend in ${resendTimer}s`
                      : "Resend OTP"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center py-4 animate-pulse">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mr-1 animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-indigo-600 rounded-full mr-1 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
                <span className="ml-2 text-sm text-gray-600">
                  Sending OTP...
                </span>
              </div>
            )
          ) : null}

          {otpMessage && (
            <div
              className={`p-3 rounded-lg text-sm animate-fadeIn ${
                otpMessage.includes("Invalid")
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}
            >
              {otpMessage}
            </div>
          )}

          <div
            className={`space-y-4 ${
              verified ? "animate-fadeIn" : "opacity-40"
            }`}
          >

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor="fname"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  onChange={handleChangeFName}
                  type="text"
                  id="fname"
                  name="fname"
                  disabled={!verified}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none transition-all duration-200"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="Lname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  onChange={handleChangeLName}
                  type="text"
                  id="Lname"
                  name="Lname"
                  disabled={!verified}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                onChange={handleChangePassword}
                type="password"
                id="Password"
                name="Password"
                disabled={!verified}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="ConfirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                onChange={handleChangeConfirmPassword}
                type="password"
                id="ConfirmPassword"
                name="ConfirmPassword"
                disabled={!verified}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none transition-all duration-200"
              />
            </div>

            {passwordErr && verified && (
              <p className="text-sm text-red-600 animate-fadeIn">
                {passwordErr}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={
              !verified || isSubmitting || !!passwordErr || !!emailError
            }
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 ${
              !verified || isSubmitting || !!passwordErr || !!emailError
                ? "bg-indigo-300 cursor-not-allowed"
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
                Signing up...
              </span>
            ) : (
              "Submit"
            )}
          </button>

          {message && message !== otpMessage && (
            <div
              className={`p-3 rounded-lg text-sm animate-fadeIn ${
                message.includes("failed")
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}
            >
              {message}
            </div>
          )}

          <div className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
            >
              Sign In
            </a>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
