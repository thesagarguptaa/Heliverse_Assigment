import React from "react";

import { getALLblogs } from "../Services/Operations/GetterAPI";
import { useState, useEffect } from "react";
import Spinner from "../Components/common/Spinner/Spinner";
import AllBlogs from "../Components/display/AllBlogs";
import NavBar from "../Components/common/NavBar";
import SearchButton from "./SearchButton";

const Home = () => {
  const [Cards, setCards] = useState([]);
  // const [Cards2, setCards2] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(18);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Cards.slice(indexOfFirstPost, indexOfLastPost);

  console.log("current post", currentPosts);
  // setCards2(currentPosts);

  const PrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const NextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const getEnrolledCourses = async () => {
    try {
      const response = await getALLblogs();
      setCards(response);
    } catch (error) {
      console.log("Unable to Fetch Enrolled Courses");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div>
      <NavBar />
      <SearchButton />

      <div className=" mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl flex justify-center items-center  ">
        ALL Employee
      </div>

      {!Cards ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : !Cards.length ? (
        <p className="flex justify-center items-center mt-36 font-bold leading-10 underline text-[35px] text-[#F1F2FF]">
          You have to create any blog
        </p>
      ) : (
        <div>
          <div className="grid  xs:gridcols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh] text-white">
            {currentPosts.map((item) => (
              <AllBlogs post={item} />
            ))}
          </div>

          <div className="flex h-14 items-center justify-center bg-[#000814]  text-white">
            <div className="flex w-11/12 max-w-maxContent items-center  justify-between">
              <button
                onClick={PrevPage}
                className="border border-black  px-3 py-2 hover:bg-[#2C333F] transition-all duration-200  rounded-lg"
              >
                Prev Page{" "}
              </button>
              <p> {currentPage} </p>
              <button
                onClick={NextPage}
                className="border border-black  px-3 py-2 hover:bg-[#2C333F] transition-all duration-200  rounded-lg"
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
