import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser, UserLogin, UserSignup } from "../models/user";
import axios from "axios";
import { apiUrl } from "../utils/env";
import toast from "react-hot-toast";

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  login: (user: UserLogin) => void;
  logout: () => void;
  register: (user: UserSignup) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentUser = localStorage.getItem("user");

    if (token && currentUser) {
      setToken(token);
      setUser(JSON.parse(currentUser));
    } else {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, []);

  async function login(userInfo: UserLogin) {
    try {
      const user = await axios.post(`${apiUrl}/auth/login`, userInfo);
      setUser(user.data);
      setToken(user.data.token);
      localStorage.setItem("token", user.data.token);
      localStorage.setItem("user", JSON.stringify(user.data));
    } catch (error) {
      toast.error("Invalid email or password");
    }
  }

  function logout() {
    console.log("Logging out");
  }

  async function register(userInfo: UserSignup) {
    try {
      await axios.post(`${apiUrl}/auth/signup`, {
        ...userInfo,
        confirmPassword: userInfo.password,
      });
    } catch (error) {
      toast.error("An error occurred");
      throw new Error(JSON.stringify(error));
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
