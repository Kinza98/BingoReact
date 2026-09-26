import AuthLayout from "../components/ui/AuthLayout";
import ForgotPasswordForm from "../features/auth/ForgotPasswordForm";
import useNavigationAnimation from "../hooks/usePageTransition";

function ForgotPassword() {

  const shouldAnimate = useNavigationAnimation();

  return (
    <div className={shouldAnimate ? "animate-slide-in" : ""}>
    <AuthLayout mb="3" heading="Forgot Password?">
      <ForgotPasswordForm />
    </AuthLayout>
    </div>
  );
}

export default ForgotPassword;
