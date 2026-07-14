import { Lock, Mail } from "lucide-react";
import AuthContainer from "../../components/auth/AuthContainer";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useFormik } from "formik";
import { forgotPasswordSchema } from "../../validations/authValidation";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { forgotPasswordThunk } from "../../redux/auth/authThunk";
import { useEffect } from "react";
import { toast } from "sonner";
import { resetAuthSlice } from "../../redux/auth/authSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, loading, message, success } = useAppSelector(
    (state) => state.auth,
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      dispatch(forgotPasswordThunk(values));
    },
  });

  useEffect(() => {
    if (success) {
      toast.success(message);
      dispatch(resetAuthSlice());
      navigate("/login");
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, error, message, navigate, success]);

  return (
    <AuthContainer from="forgotPassword">
      <div className="flex h-screen w-full items-end p-20 px-40">
        <div className="p-8  w-full space-y-10  mt-14 md:mt-0">
          <h2 className="text-6xl font-bold text-center text-[#EDA415]  mb-10">
            Create new Password
          </h2>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col items-center justify-center space-y-6"
          >
            <div className="space-y-6 w-full">
              <Input
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
                icon={<Lock size={24} />}
                name="newPassword"
                type="password"
                placeholder="New Password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.newPassword && formik.errors.newPassword
                    ? formik.errors.newPassword
                    : undefined
                }
              />
            </div>

            <p
              onClick={() => navigate("/login")}
              className="underline font-semibold cursor-pointer hover:text-blue-800"
            >
              back to login
            </p>

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              loading={loading}
            >
              SET PASSWORD
            </Button>
          </form>
        </div>
      </div>
    </AuthContainer>
  );
};

export default ForgotPassword;
