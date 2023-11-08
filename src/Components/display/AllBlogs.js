import React from "react";
import { createTeam } from "../../Services/Operations/authAPI";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const AllBlogs = ({ post }) => {
  console.log("post", post);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { Teamdata } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const AddtoCart = () => {
    console.log("Team data", Teamdata);
    console.log("Post", post.email);

    const data = Teamdata.filter((item) => item.email === post.email);

    console.log("data", data);
    if (data.length === 0) {
      dispatch(createTeam(post, token, navigate));
    } else {
      toast.error("Already in team");
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-center transition duration-200 p-4  overflow-hidden h-48 bg-gray-900 rounded-lg">
        <div>
          <div className="mr-8 -ml-8 ">
            <img src={post.avatar} alt="" />
          </div>
        </div>

        <div className="text-white">
          <div className="flex flex-row gap-5 ">
            <p>{post.id} </p>
            <h1 className=" font-semibold    text-xl">
              {post.first_name} {post.last_name}
            </h1>
          </div>

          <p className=" mt-2 text-white  text-lg"> {post.email} </p>

          <p className="ml-12">{post.domain}</p>
          <p className=" ml-8">{post.gender}</p>

          <button
            onClick={AddtoCart}
            className="bg-slate-800 hover:bg-black text-white px-2 py-1 rounded-lg  mt-4   ml-4"
          >
            Add to Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
