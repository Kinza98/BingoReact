import AuthLayout from "../components/ui/AuthLayout";
import ResetPasswordForm from "../features/auth/ResetPasswordForm";
import useNavigationAnimation from "../hooks/usePageTransition";

function ResetPassword() {
  const shouldAnimate = useNavigationAnimation();

  return (
    <div className={shouldAnimate ? "animate-slide-in" : ""}>
    <AuthLayout mb="3" heading="Reset Your Password">
      <ResetPasswordForm />
    </AuthLayout>
    </div>
  );
}

export default ResetPassword;
