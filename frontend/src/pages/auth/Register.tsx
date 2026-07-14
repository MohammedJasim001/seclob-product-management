import { useFormik } from "formik";
import { signupSchema } from "../../validations/authValidation";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthContainer from "../../components/auth/AuthContainer";
import { User, Mail, Lock } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { registerUserThunk } from "../../redux/auth/authThunk";
import { useEffect } from "react";
import { toast } from "sonner";
import { resetAuthSlice } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useAppDispatch();
  const { message, error, loading, success } = useAppSelector(
    (state) => state.auth,
  );
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      dispatch(registerUserThunk(values));
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
    <AuthContainer from="register">
      <div className="flex h-screen w-full items-end p-20 px-40">
        <div className="p-8  w-full space-y-10  mt-14 md:mt-0">
          <h2 className="text-6xl font-bold text-center text-[#EDA415]  mb-10">
            Create Account
          </h2>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col items-center justify-center space-y-6"
          >
            <div className="space-y-6 w-full">
              <Input
                icon={<User size={24} />}
                name="name"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : undefined
                }
              />

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

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              loading={loading}
            >
              SIGN UP
            </Button>
          </form>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Register;
