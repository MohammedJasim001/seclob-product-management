import { useFormik } from "formik";
import { loginSchema } from "../../validations/authValidation.ts";
import Input from "../../components/ui/Input.tsx";
import Button from "../../components/ui/Button.tsx";
import AuthContainer from "../../components/auth/AuthContainer.tsx";
import { Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook.ts";
import { loginUserThunk } from "../../redux/auth/authThunk.ts";
import { useEffect } from "react";
import { toast } from "sonner";
import { resetAuthSlice } from "../../redux/auth/authSlice.ts";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, loading, message, success } = useAppSelector(
    (state) => state.auth,
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUserThunk(values));
    },
  });

  useEffect(() => {
    if (success) {
      toast.success(message);
      dispatch(resetAuthSlice());
      navigate("/");
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, error, message, navigate, success]);

  return (
    <AuthContainer from="login">
      <div className="flex h-screen w-full items-end p-20 px-40">
        <div className="p-8  w-full space-y-10  mt-14 md:mt-0">
          <h2 className="text-6xl font-bold text-center text-[#EDA415]  mb-10">
            Sign In to Your Account
          </h2>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col items-center justify-center space-y-6"
          >
            <div className="space-y-6 w-full">
              <Input
                variant="auth"
                icon={<Mail size={24} />}
                name="email"
                type="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : undefined
                }
              />

              <Input
                variant="auth"
                icon={<Lock size={24} />}
                name="password"
                type="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : undefined
                }
              />
            </div>

            <p
              onClick={() => navigate("/forgot-password")}
              className="underline font-semibold cursor-pointer hover:text-blue-800"
            >
              forgot password?
            </p>

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={loading}
            >
              SIGN IN
            </Button>
          </form>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Login;
