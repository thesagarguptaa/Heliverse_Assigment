import toast from "react-hot-toast";

import { setLoading, setToken, setResponse } from "../../slices/authslices";

import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";

const { SIGNUP_API, LOGIN_API } = endpoints;

const CREATEBLOG_API = "http://localhost:4000/api/v1/Create";

const CREATETEAM_API = "http://localhost:4000/api/v1/Team";

export function signUp(Name, email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      console.log(Name, email, password);
      const response = await apiConnector("POST", SIGNUP_API, {
        Name,
        email,
        password,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      console.log(email, password);
      console.log("Printing base url auth: ", process.env.REACT_APP_BASE_URL);
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response.data.message);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Login Successful");
      console.log(response);

      dispatch(setToken(response.data.token));
      dispatch(setResponse(response.data.user));
      console.log(response.data.user);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("respon", JSON.stringify(response.data.user));

      navigate("/");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

//CREATEBLOG_API
export function createBlog(
  first_name,
  last_name,
  email,
  gender,
  domain,
  token,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      console.log(
        "i am in createBlog api ",
        first_name,
        last_name,
        email,
        gender,
        domain
      );
      console.log(CREATEBLOG_API);
      const response = await apiConnector(
        "POST",
        CREATEBLOG_API,
        {
          first_name,
          last_name,
          email,
          gender,
          domain,
          token,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("CREATE_BLOG API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("CREATE Successful");

      navigate("/");
    } catch (error) {
      console.log("CREATE BLOG API ERROR............", error);
      toast.error("CREATE Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
export function createTeam(post, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      console.log("i am in auth api", post, token);
      const response = await apiConnector("POST", CREATETEAM_API, {
        post,
        token,
      });

      console.log("CREATE_BLOG API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("CREATE Successful");
      navigate("/Myteam");
    } catch (error) {
      console.log("CREATE BLOG API ERROR............", error);
      toast.error("CREATE Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

//LOGOUT
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    localStorage.removeItem("token");
    toast.success("Logged Out");
    navigate("/");
  };
}
