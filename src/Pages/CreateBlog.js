import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createBlog } from "../Services/Operations/authAPI";
import { useSelector } from "react-redux/es/hooks/useSelector";
import NavBar from "../Components/common/NavBar";

const CreateBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    domain: "",
  });

  const { first_name, last_name, email, gender, domain } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createBlog(first_name, last_name, email, gender, domain, token, navigate)
    );
  };

  return (
    <div>
      <NavBar />

      <div className="bg-[#000814] h-screen flex items-center justify-center">
        <div className="bg-[#000814] p-8 rounded-lg shadow-md w-96">
          <h1 className="text-[30px] font-bold flex justify-center items-center  mb-4 text-[#F1F2FF]">
            Create New Employee
          </h1>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-4">
              <label htmlFor="first_name" className="block text-[#F1F2FF]">
                First Name
              </label>
              <input
                required
                type="text"
                name="first_name"
                value={first_name}
                onChange={handleOnChange}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                // className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                className="w-full rounded-[0.5rem] bg-[#161D29] p-[12px] text-[#F1F2FF]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="last_name" className="block text-[#F1F2FF]">
                Last Name
              </label>
              <input
                required
                type="text"
                name="last_name"
                value={last_name}
                onChange={handleOnChange}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                // className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                className="w-full rounded-[0.5rem] bg-[#161D29] p-[12px] text-[#F1F2FF]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-[#F1F2FF]">
                Email
              </label>
              <input
                required
                name="email"
                value={email}
                onChange={handleOnChange}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                // className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                className="w-full rounded-[0.5rem] bg-[#161D29] p-[12px] text-[#F1F2FF]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="gender" className="block text-[#F1F2FF]">
                Gender
              </label>
              <input
                required
                type="text"
                name="gender"
                value={gender}
                onChange={handleOnChange}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                // className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                className="w-full rounded-[0.5rem] bg-[#161D29] p-[12px] text-[#F1F2FF]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="domain" className="block text-[#F1F2FF]">
                Domain
              </label>
              <input
                required
                type="text"
                name="domain"
                value={domain}
                onChange={handleOnChange}
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
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
