import type { ReactNode } from "react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

interface AuthContainerProps {
  children: ReactNode;
  from: "login" | "register" | "forgotPassword";
}

const AuthContainer = ({ children, from }: AuthContainerProps) => {
  const navigate = useNavigate();

  const isLogin = from === "login";

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="grid h-screen lg:grid-cols-5">
      {/* Form */}
      <div
        className={`col-span-3 flex items-center justify-center ${
          isLogin ? "order-1" : "order-2"
        }`}
      >
        {children}
      </div>

      {/* Background Image Section */}
      <div
        className={`col-span-2 ${
          isLogin ? "order-2" : "order-1"
        } bg-cover bg-center bg-no-repeat flex flex-col items-center gap-3 justify-center text-white px-8 relative`}
        style={{
          backgroundImage: "url('/auth.png')",
        }}
      >
        <h1 className="text-5xl font-bold mb-4">
          {isLogin ? "Welcome Back!" : "Hello, Friend!"}
        </h1>

        <p className="text-center text-lg max-w-sm leading-relaxed mb-10 text-gray-100">
          {isLogin
            ? "To keep connected with us please login with your personal information."
            : "Enter your personal details and start your journey with us."}
        </p>

        <Button
          variant="secondary"
          onClick={
            isLogin
              ? () => handleNavigate("/register")
              : () => handleNavigate("/login")
          }
        >
          {isLogin ? "SIGN UP" : "SIGN IN"}
        </Button>
      </div>
    </div>
  );
};

export default AuthContainer;
