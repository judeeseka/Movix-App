import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-6 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-2">
        Oops! The page you're looking for doesn't exist.
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        It might have been moved or deleted.
      </p>
      <Button
        onClick={() => navigate("/")}
        className="px-6 flex justify-center items-center bg-gradient-to-r from-amber-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 cursor-pointer"
      >
        Go back home
      </Button>
    </div>
  );
};

export default NotFound;
