import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout";
import { Home } from "@/features/landing-page";
import { MovieHome } from "@/features/movies";
import { SeriesHome } from "@/features/series";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<MovieHome />} />
          <Route path="tv-series" element={<SeriesHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
