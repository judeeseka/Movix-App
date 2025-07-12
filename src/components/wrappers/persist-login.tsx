import { useAuthStore } from "@/stores/auth-store";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "../common/loading-spinner";
import { getAuthData, refresh } from "@/lib/services/auth-service";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token, setToken, setUser } = useAuthStore();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const response = await refresh();
        setToken(response.data.accessToken);

        const userData = await getAuthData();
        setUser(userData.data);
      } catch {
        setToken(null);
        setUser(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    if (!token) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [token, setToken, setUser]);

  return <>{isLoading ? <LoadingSpinner landing /> : <Outlet />}</>;
};

export default PersistLogin;
