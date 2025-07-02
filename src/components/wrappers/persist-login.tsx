import { useAuthStore } from "@/stores/auth-store";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { refresh } from "@/lib/refresh-token";
import LoadingSpinner from "../common/loading-spinner";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token, setToken } = useAuthStore();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const response = await refresh();
        setToken(response.data.accessToken);
      } catch {
        setToken(null);
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
  }, [token, setToken]);

  return <>{isLoading ? <LoadingSpinner landing /> : <Outlet />}</>;
};

export default PersistLogin;
