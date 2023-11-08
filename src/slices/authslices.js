import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  respon: localStorage.getItem("respon")
    ? JSON.parse(localStorage.getItem("respon"))
    : null,
  Teamdata: localStorage.getItem("Teamdata")
    ? JSON.parse(localStorage.getItem("Teamdata"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setData(state, value) {
      state.Teamdata = value.payload;
    },

    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setResponse(state, value) {
      state.respon = value.payload;
    },
  },
});

export const {
  setSignupData,
  setLoading,
  setToken,
  setResponse,

  setData,
} = authSlice.actions;

export default authSlice.reducer;
