import React from "react";
import { deleteblogs } from "../../Services/Operations/Butt";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserBlogs = ({ blog, index }) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const DELETEME = async () => {
    try {
      console.log("i am in delete me blog", blog._id);
      const response = await deleteblogs(token, blog._id, navigate);
      console.log(response);
    } catch (error) {
      console.log("Unable to Fetch Enrolled Courses");
    }
  };

  useEffect(() => {}, []);

  // console.log("blod", blog._id);

  return (
    <div>
      <div className="flex flex-row items-center justify-center transition duration-200 p-4   h-48 bg-gray-900 rounded-lg">
        <div className="mr-8 -ml-8 ">
          <img src={blog.avatar} />
        </div>

        <div className="text-white">
          <h1 className=" font-semibold    text-xl">
            {blog.first_name} {blog.last_name}
          </h1>

          <p className=" mt-2 text-white  text-lg"> {blog.email} </p>

          <p className="ml-12">{blog.domain}</p>
          <p className=" ml-8">{blog.gender}</p>

          <button
            onClick={DELETEME}
            className="bg-slate-800 hover:bg-black text-white px-2 py-1 rounded-lg  mt-4   ml-4"
          >
            DELETE ME
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserBlogs;
