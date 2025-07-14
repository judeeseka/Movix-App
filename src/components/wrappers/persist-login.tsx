import { useAuthStore } from "@/stores/auth-store";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "../common/loading-spinner";
import { getAuthData, refresh } from "@/lib/services/auth-service";
import { useFavouriteStore } from "@/stores/favourite-store";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token, setToken, setUser } = useAuthStore();
  const { setFavourites } = useFavouriteStore();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const response = await refresh();
        setToken(response.data.accessToken);

        if (response.success) {
          const userData = await getAuthData();
          setUser({
            userId: userData.data.userId,
            username: userData.data.username,
            isOnboarded: userData.data.isOnboarded,
            avatarUrl: userData.data.avatarUrl,
          });
          setFavourites(userData.data.favorites);
        }
      } catch {
        setToken(null);
        setUser(null);
        setFavourites([]);
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
  }, [token, setToken, setUser, setFavourites]);

  return <>{isLoading ? <LoadingSpinner landing /> : <Outlet />}</>;
};

export default PersistLogin;
