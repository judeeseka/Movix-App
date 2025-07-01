import { useAuthStore } from "@/stores/auth-store";
import { useEffect, useState } from "react";
import { refresh } from "../api/client";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "@/components/shared/loading-spinner";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token, setToken } = useAuthStore();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const response = await refresh(); // returns token
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
