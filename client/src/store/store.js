import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/Home/userSlicer';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});