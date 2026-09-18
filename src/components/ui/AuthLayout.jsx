import ConfettiSquaresBackground from "./ConfettiSquaresbackground";
import Heading from "./Heading";

function AuthLayout({ heading, children, mb }) {
  const classMB = `mb-${mb}`;
  return (
    <div className="w-screen z-10 h-dvh bg-ocean-700 flex items-center justify-center p-5 xs:p-9 relative flex-col">
      <ConfettiSquaresBackground />
      <Heading as="h1" classes={`md:text-5xl ${classMB}`}>
        {heading}
      </Heading>{" "}
      {children}
    </div>
  );
}

export default AuthLayout;
