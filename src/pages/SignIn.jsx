import AuthLayout from "../components/ui/AuthLayout";
import SignInForm from "../features/auth/SignInForm";
import useNavigationAnimation from "../hooks/usePageTransition";

function SignIn() {
  const shouldAnimate = useNavigationAnimation();
  console.log(shouldAnimate);
  

  return (
    <div className={shouldAnimate ? "animate-slide-in" : ""}>
      <AuthLayout mb="3" heading="Welcome Back!">
        <SignInForm />
      </AuthLayout>
    </div>
  );
}

export default SignIn;
