import AuthLayout from "../components/ui/AuthLayout";
import SignInForm from "../features/auth/SignInForm";

function SignIn() {
  return (
    <AuthLayout mb="3" heading="Welcome Back!">
      <SignInForm />
    </AuthLayout>
  );
}

export default SignIn;
