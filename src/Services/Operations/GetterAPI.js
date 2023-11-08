// import { useDispatch } from "react-redux";
// const dispatch = useDispatch();

import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { blogpoints } from "../apis";

import { setFilterData } from "../../slices/authslices";

const { GETALLBLOG_API, GETUSERBLOG_API, GETFILTERED_API } = blogpoints;

export async function getALLblogs() {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    console.log("BEFORE Calling BACKEND API FOR For All blogs");
    const response = await apiConnector("GET", GETALLBLOG_API);
    console.log("AFTER Calling BACKEND API FOR All blogs");

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");
  }
  toast.dismiss(toastId);
  return result;
}
export async function getFiltered(SearchId, Filter) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    console.log("i am in get", SearchId, Filter);
    console.log("BEFORE Calling BACKEND API FOR For All blogs");
    const response = await apiConnector("POST", GETFILTERED_API, {
      SearchId,
      Filter,
    });
    console.log("AFTER Calling BACKEND API FOR All blogs");

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.find;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");
  }
  toast.dismiss(toastId);
  return result;
}

export async function getUserblogs(token) {
  const toastId = toast.loading("Loading...");
  console.log("i am in frontend code");
  let result = [];
  try {
    console.log("BEFORE Calling BACKEND API FOR For User blogs");
    const response = await apiConnector("POST", GETUSERBLOG_API, { token });
    console.log("AFTER Calling BACKEND API FOR User blogs");

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    console.log(response.data.update.teams);

    result = response.data.update.teams;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not User BLOGS");
  }
  toast.dismiss(toastId);
  return result;
}
