import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout";
import { Home } from "@/features/landing-page";
// import { Home } from "@/features/movies";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
