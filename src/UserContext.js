import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const local = localStorage.getItem("user");

    if (local) {
      setUser(JSON.parse(local));
      setReady(true);
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
}
