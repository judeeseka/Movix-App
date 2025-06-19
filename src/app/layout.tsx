import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

const client = new QueryClient();

const AppLayout = () => {
  return (
    <QueryClientProvider client={client}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
};

export default AppLayout;
