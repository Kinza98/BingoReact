import AuthLayout from "../components/ui/AuthLayout";
import SignUpOptions from "../features/auth/SignUpOptions";
import useNavigationAnimation from "../hooks/usePageTransition";

function SignUp() {
  const shouldAnimate = useNavigationAnimation();

  return (
    <div className={shouldAnimate ? "animate-slide-in" : ""}>
      <AuthLayout mb="5" heading="Join the Fun!">
        <SignUpOptions />
      </AuthLayout>
    </div>
  );
}

export default SignUp;
