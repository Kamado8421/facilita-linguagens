'use client';
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type User = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  xp: number;
  profileUrl: string;
  password?: string;
  createdAt: Date | string;
  emailVerified: Date | null;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser(session.user as User);
    } else {
      setUser(null);
    }
  }, [session, status]);

  return (
    <UserContext.Provider value={{ user, loading: status === "loading" }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

