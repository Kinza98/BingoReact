import AuthLayout from "../components/ui/AuthLayout";
import ResetPasswordForm from "../features/auth/ResetPasswordForm";

function ResetPassword() {
  return (
    <AuthLayout mb="3" heading="Reset Your Password">
      <ResetPasswordForm />
    </AuthLayout>
  );
}

export default ResetPassword;
