import AuthLayout from "../components/ui/AuthLayout";
import SignUpOptions from "../features/auth/SignUpOptions";

function SignUp() {
  return (
    <AuthLayout mb="8" heading="Join the Fun!">
      <SignUpOptions />
    </AuthLayout>
  );
}

export default SignUp;
