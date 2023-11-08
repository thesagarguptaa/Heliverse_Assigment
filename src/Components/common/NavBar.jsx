import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";

import { logout } from "../../Services/Operations/authAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <div>
      <div className="flex h-14 items-center justify-center  bg-[#000814] border-b-[#2C333F] text-white ">
        <div className="flex w-11/12 max-w-maxContent items-center  justify-between ">
          {/* Image */}
          <Link to="/">
            <button className=" px-[12px] py-[8px]   hover:bg-[#2C333F] transition-all duration-200  rounded-lg">
              Home
            </button>
          </Link>

          {/* Login/SignUp/Dashboard */}

          <div className="flex gap-x-4 items-center">
            {token === null && (
              <Link to="/login">
                <button className="border border-black  px-3 py-2  hover:bg-[#2C333F] transition-all duration-200  rounded-lg">
                  Log in
                </button>
              </Link>
            )}
            {token === null && (
              <Link to="/signup">
                <button className="border border-black  px-3 py-2 hover:bg-[#2C333F] transition-all duration-200  rounded-lg ">
                  Sign Up
                </button>
              </Link>
            )}

            {token !== null && (
              <Link to="/Myteam">
                <button className="border border-black  px-3 py-2  hover:bg-[#2C333F] transition-all duration-200 rounded-lg ">
                  My Teams
                </button>
              </Link>
            )}
            {token !== null && (
              <Link to="/CreateEmployee">
                <button className="border border-black   px-3 py-2  hover:bg-[#2C333F] transition-all duration-200 rounded-lg ">
                  Create New
                </button>
              </Link>
            )}
            {token !== null && (
              <button
                onClick={handleLogout}
                className="border border-black  px-3 py-2   hover:bg-[#2C333F] transition-all duration-200 rounded-lg"
              >
                LogOut
              </button>
            )}
          </div>
        </div>
      </div>

      {/* <FilteredNavBar /> */}
    </div>
  );
};

export default NavBar;
