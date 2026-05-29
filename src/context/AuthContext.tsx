import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext =
  createContext<any>(null);

export const AuthProvider = ({
  children,
}: any) => {

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {

      setUser(JSON.parse(storedUser));

    }

  }, []);

  const login = (userData: any) => {

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const logout = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);