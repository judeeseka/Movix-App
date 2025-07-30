import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout";
import { Home } from "@/features/landing-page";
import { MovieDetails, MovieHome } from "@/features/movies";
import { SeriesHome } from "@/features/series";
import { Login, Onboarding, Register } from "@/features/auth";
import { Favourites, Profile, WatchLists } from "@/features/profile";
import RequireAuth from "@/components/wrappers/require-auth";
import PersistLogin from "@/components/wrappers/persist-login";
import NotFound from "@/components/pages/not-found";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="movies" element={<MovieHome />} />
            <Route path="movies/:slug" element={<MovieDetails />} />
            <Route path="tv-series" element={<SeriesHome />} />

            <Route element={<RequireAuth />}>
              <Route path="profile" element={<Profile />} />
              <Route path="favourites" element={<Favourites />} />
              <Route path="watchlists" element={<WatchLists />} />
            </Route>
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/onboarding" element={<Onboarding />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
