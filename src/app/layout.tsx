import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const client = new QueryClient();

const AppLayout = () => {
  return (
    <QueryClientProvider client={client}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
};

export default AppLayout;
