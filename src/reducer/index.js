import { combineReducers } from "@reduxjs/toolkit";

import authReducers from "../slices/authslices";

const rootReducer = combineReducers({
  auth: authReducers,
});

export default rootReducer;
