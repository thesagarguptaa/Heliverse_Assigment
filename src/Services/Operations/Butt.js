import toast from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { blogpoints } from "../apis";
const { DELETEBLOG_API } = blogpoints;

export async function deleteblogs(token, Id, navigate) {
  const toastId = toast.loading("Loading...");
  console.log("deleteblog", token, Id);
  try {
    console.log("BEFORE Calling BACKEND API FOR For User blogs");
    console.log(DELETEBLOG_API);
    const response = await apiConnector("post", DELETEBLOG_API, {
      token,
      Id,
    });
    console.log("AFTER Calling BACKEND API FOR User blogs");

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    console.log(response);
    navigate("/");
  } catch (error) {
    console.log("DELETEBLOG_API API ERROR............", error);
    toast.error("Could Not DELETE");
  }
  toast.dismiss(toastId);
}
