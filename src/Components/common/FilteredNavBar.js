import React from "react";
import { useState } from "react";
import { getFiltered } from "../../Services/Operations/GetterAPI";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner/Spinner";
import { Link } from "react-router-dom";

import AllBlogs from "../display/AllBlogs";

const FilteredNavBar = () => {
  const navigate = useNavigate();

  const [Cards, setCards] = useState([]);

  const [formData, setFormData] = useState({
    SearchId: "",
    Filter: "Domain",
  });

  const { SearchId, Filter } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const getFilter = async () => {
    try {
      console.log("values are here handle on getFilter :- ", SearchId, Filter);
      const response = await getFiltered(SearchId, Filter, navigate);
      setCards(response);

      // dispatch(setFilterData(response));
    } catch (error) {
      console.log("Unable to Fetch Filtered");
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // const respon = dispatch(getFiltered(SearchId, Filter, navigate));
    console.log("values are here handle on submit :- ", SearchId, Filter);
    getFilter(SearchId, Filter, navigate);
  };

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
    if (currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div>
        <div className="flex lg:flex-row flex-col lg:h-20 w-11/12 items-center border-b-[#2C333F] justify-between text-white">
          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col lg:flex-row items-center w-11/12 justify-between"
          >
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-20 ml-20 ">
              <input
                required
                type="text"
                name="SearchId"
                value={formData.SearchId}
                onChange={handleOnChange}
                placeholder="Search me"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                // className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                className="  rounded-[0.5rem]  h-12 w-96 bg-[#161D29] p-3 text-[#F1F2FF]"
              />

              <select
                id="Filter"
                name="Filter"
                value={formData.Filter}
                onChange={handleOnChange}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="  rounded-[0.5rem] h-12 bg-[#161D29]  p-3 text-[#F1F2FF]"
              >
                <option>Domain</option>
                <option>Gender</option>
              </select>

              <div className="flex justify-between lg:gap-10">
                <button className="px-3 py-2 hover:bg-[#2C333F] transition-all duration-200  rounded-lg">
                  Search Me
                </button>

                <Link to="/">
                  <button className="px-3 py-2 hover:bg-[#2C333F] transition-all duration-200  rounded-lg">
                    Home
                  </button>
                </Link>
              </div>
            </div>

            {/* <button
            type="submit"
            className="mt-6 w-full rounded-[8px] bg-[#FFF970] py-[4px] px-[6px] font-medium text-[#000814]"
          ></button> */}
          </form>
        </div>
      </div>

      <div>
        <div className=" mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl flex justify-center items-center  ">
          Filter Employee
        </div>

        {!Cards ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : !Cards.length ? (
          <p className="flex justify-center items-center mt-36 font-bold leading-10 underline text-[35px] text-[#F1F2FF]">
            You have to apply Filter
          </p>
        ) : (
          <div>
            <div className="grid  xs:gridcols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
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
    </div>
  );
};

export default FilteredNavBar;
