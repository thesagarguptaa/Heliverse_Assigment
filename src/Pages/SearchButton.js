import React from "react";
import { Link } from "react-router-dom";

const SearchButton = () => {
  return (
    <div
      className="flex justify-center  text-white
"
    >
      <Link to="/Filtered">
        <button className="border border-black  px-[12px] py-[8px]   hover:bg-[#2C333F] transition-all duration-200 rounded-lg ">
          Filter
        </button>
      </Link>
    </div>
  );
};

export default SearchButton;
