import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout";
import { Home } from "@/features/landing-page";
import { MovieDetails, MovieHome } from "@/features/movies";
import { SeriesHome } from "@/features/series";
import { Login, Onboarding, Register } from "@/features/auth";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="movies" element={<MovieHome />} />
          <Route path="movies/:slug" element={<MovieDetails />} />
          <Route path="tv-series" element={<SeriesHome />} />
        </Route>
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
