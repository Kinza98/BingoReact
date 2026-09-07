import AuthLayout from "../components/ui/AuthLayout";
import ForgotPasswordForm from "../features/auth/ForgotPasswordForm";

function ForgotPassword() {
  return (
    <AuthLayout mb="3" heading="Forgot Password?">
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

export default ForgotPassword;
