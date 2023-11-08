import React from "react";
import UserBlogs from "../Components/display/UserBlogs";
import { useState, useEffect } from "react";
import { getUserblogs } from "../Services/Operations/GetterAPI";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Spinner from "../Components/common/Spinner/Spinner";
import { useDispatch } from "react-redux";
import { setData } from "../slices/authslices";
import NavBar from "../Components/common/NavBar";

const Myblogs = () => {
  const dispatch = useDispatch();

  const [Cards, setCards] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { Teamdata } = useSelector((state) => state.auth);

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserblogs(token);
      setCards(response);
      dispatch(setData(response));
      localStorage.setItem("Teamdata", JSON.stringify(response));
    } catch (error) {
      console.log("Unable to Fetch Enrolled Courses");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  console.log(" here is my cards ", Cards);

  return (
    <div>
      <NavBar />
      <div className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl flex justify-center items-center  ">
        My Team
      </div>
      {!Cards ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : !Cards.length ? (
        <p className="flex justify-center items-center mt-36 font-bold leading-10 underline text-[35px] text-[#F1F2FF]">
          You have to create any Team
        </p>
      ) : (
        <div className="grid  xs:gridcols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
          {Cards.map((blog, index) => (
            <UserBlogs blog={blog} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Myblogs;
