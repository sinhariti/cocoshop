"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  token?: string; // Include the token as part of the user state
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Initialize user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    try {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/api/users/login", {
        email,
        password,
      });

      const { user: loggedInUser, token } = response.data;
      console.log(response.data);
      // Include token in the user object
      const userWithToken = { ...loggedInUser, token };

      // Save to localStorage
      localStorage.setItem("token", token);

      // Update the user state
      setUser(userWithToken);
      console.log("Successfully logged in!");
      router.push("/"); // Redirect to home page
    } catch (error: any) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");  
      throw new Error(
        error.response?.data?.message || "An error occurred during login."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/api/users/signup", {
        name,
        email,
        password,
      });
      
      console.log("Successfully signed up!");
      router.push("/login");
    } catch (error: any) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");  
      throw new Error(
        error.response?.data?.message || "An error occurred during signup."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

