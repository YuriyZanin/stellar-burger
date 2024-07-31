import { error } from 'console';
import {
  fetchUser,
  login,
  logout,
  register,
  updateProfile,
  initialState
} from './userSlice';
import userSliceReducer from './userSlice';

describe('тест асинхронных экшенов', () => {
  describe('загрузка пользователя', () => {
    it('тест fetchUser.pending', () => {
      const action = {
        type: fetchUser.pending.type
      };

      const newState = userSliceReducer(initialState, action);
      expect(newState).toEqual({
        user: null,
        isAuthChecked: false,
        error: null
      });
    });

    it('тест fetchUser.rejected', () => {
      const action = {
        type: fetchUser.rejected.type,
        error: { message: 'test' }
      };

      const newState = userSliceReducer(initialState, action);
      expect(newState).toEqual({
        user: null,
        isAuthChecked: true,
        error: 'test'
      });
    });

    it('тест fetchUser.fulfilled', () => {
      const action = {
        type: fetchUser.fulfilled.type,
        payload: { user: 'test' }
      };

      const newState = userSliceReducer(initialState, action);
      expect(newState).toEqual({
        user: 'test',
        isAuthChecked: true
      });
    });
  });

  describe('регистрация пользователя', () => {
    it('тест register.pending', () => {
      const action = {
        type: register.pending.type
      };

      const newState = userSliceReducer(initialState, action);
      expect(newState).toEqual({
        user: null,
        isAuthChecked: false,
        error: null
      });
    });

    it('тест register.rejected', () => {
      const action = {
        type: register.rejected.type,
        error: { message: 'test' }
      };

      const newState = userSliceReducer(initialState, action);
      expect(newState).toEqual({
        user: null,
        isAuthChecked: true,
        error: 'test'
      });
    });

    it('тест register.fulfilled', () => {
      const action = {
        type: register.fulfilled.type,
        payload: { user: 'test' }
      };

      const newState = userSliceReducer(initialState, action);
      expect(newState).toEqual({
        user: 'test',
        isAuthChecked: true
      });
    });
  });

  describe('авторизация пользователя', () => {
    it('тест login.pending', () => {
      const action = {
        type: login.pending.type
      };

      const newState = userSliceReducer(initialState, action);
      expect(newState).toEqual({
        user: null,
        isAuthChecked: false,
        error: null
      });
    });

    it('тест login.rejected', () => {
      const action = {
        type: login.rejected.type,
        error: { message: 'test' }
      };

      const newState = userSliceReducer(initialState, action);
      expect(newState).toEqual({
        user: null,
        isAuthChecked: true,
        error: 'test'
      });
    });

    it('тест login.fulfilled', () => {
      const action = {
        type: login.fulfilled.type,
        payload: { user: 'test' }
      };

      const newState = userSliceReducer(initialState, action);
      expect(newState).toEqual({
        user: 'test',
        isAuthChecked: true,
        error: null
      });
    });
  });

  describe('выход из системы пользователя', () => {
    it('тест logout.fulfilled', () => {
      const action = {
        type: logout.fulfilled.type
      };

      const newState = userSliceReducer(initialState, action);
      expect(newState).toEqual({
        user: null,
        isAuthChecked: true
      });
    });
  });

  describe('обновления профиля пользователя', () => {
    it('тест updateProfile.pending', () => {
      const action = {
        type: updateProfile.pending.type
      };

      const newState = userSliceReducer(initialState, action);
      expect(newState).toEqual({
        user: null,
        isAuthChecked: false,
        error: null
      });
    });

    it('тест updateProfile.rejected', () => {
      const action = {
        type: updateProfile.rejected.type,
        error: { message: 'test' }
      };

      const newState = userSliceReducer(initialState, action);
      expect(newState).toEqual({
        user: null,
        isAuthChecked: true,
        error: 'test'
      });
    });

    it('тест updateProfile.fulfilled', () => {
      const action = {
        type: updateProfile.fulfilled.type,
        payload: { user: 'test' }
      };

      const newState = userSliceReducer(initialState, action);
      expect(newState).toEqual({
        user: 'test',
        isAuthChecked: true
      });
    });
  });
});
