import React, { createContext, useEffect, useReducer } from 'react';
import { whoami } from '../api';

export enum Actions {
  LOGIN = 'login',
  LOGOUT = 'logout'
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

interface IAuthState {
  user: IUser | null;
  authenticated: boolean;
}

interface IAction {
  type: Actions.LOGIN | Actions.LOGOUT;
  payload: IUser | null;
}

interface IAuthContext extends IAuthState {
  dispatch: React.Dispatch<IAction>;
}

export const AuthContext = createContext<IAuthContext>({
  authenticated: false,
  user: null,
  dispatch: () => undefined
});

const authReducer = (state: IAuthState, action: IAction) => {
  switch (action.type) {
    case Actions.LOGIN:
      return {
        ...state,
        user: action.payload,
        authenticated: true
      };
    case Actions.LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: null
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authenticated: false
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await whoami();
        dispatch({ type: Actions.LOGIN, payload: user });
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
