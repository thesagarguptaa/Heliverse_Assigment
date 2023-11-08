import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../Services/Operations/authAPI";
import { useState } from "react";
import NavBar from "../Components/common/NavBar";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    password: "",
  });

  const { Name, email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(Name, email, password, navigate));
  };

  return (
    <div>
      <NavBar />
      <div className="bg-[#000814] h-screen flex items-center justify-center">
        <div className="bg-[#000814] rounded-lg shadow-md w-96">
          <h1 className="text-[30px] font-bold flex justify-center items-center  mb-4 text-[#F1F2FF]">
            Sign In
          </h1>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-[#F1F2FF]">
                Name
              </label>
              <input
                required
                type="text"
                name="Name"
                value={Name}
                onChange={handleOnChange}
                placeholder="Enter Your Name"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                // className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                className="w-full rounded-[0.5rem] bg-[#161D29] p-[12px] text-[#F1F2FF]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block  text-[#F1F2FF]">
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder="Enter Your email"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                // className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                className="w-full rounded-[0.5rem] bg-[#161D29] p-[12px] text-[#F1F2FF]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-[#F1F2FF]">
                Password
              </label>
              <input
                required
                type="password"
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                // className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                className="w-full rounded-[0.5rem] bg-[#161D29] p-[12px] text-[#F1F2FF]"
              />
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-[#FFF970] py-[8px] px-[12px] font-medium text-[#000814]"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
