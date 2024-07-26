import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../utils/cookie';

export interface TUserState {
  user?: TUser | null;
  error?: string | null;
  isAuthChecked: boolean;
}

const initialState: TUserState = {
  user: null,
  isAuthChecked: false
};

export const fetchUser = createAsyncThunk(
  'user/get',
  async () => await getUserApi()
);

export const login = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const logout = createAsyncThunk('user/logout', async () => {
  const response = await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
  return response;
});

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (data: Partial<TRegisterData>) => await updateUserApi(data)
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      });
    builder
      .addCase(register.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isAuthChecked = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      });
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isAuthChecked = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.error = null;
      });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isAuthChecked = true;
    });
    builder
      .addCase(updateProfile.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isAuthChecked = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectError: (state) => state.error,
    selectIsAuthChecked: (state) => state.isAuthChecked
  }
});

export const { selectError, selectUser, selectIsAuthChecked } =
  userSlice.selectors;

export default userSlice.reducer;
