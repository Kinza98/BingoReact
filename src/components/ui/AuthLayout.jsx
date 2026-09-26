import BlobBackground from "./BlobBackground";
import ConfettiSquaresBackground from "./ConfettiSquaresbackground";
import Heading from "./Heading";

function AuthLayout({ heading, children, mb }) {
  const classMB = `mb-${mb}`;

  return (
    <div className="z-10 flex h-dvh w-screen relative flex-col items-center justify-center p-5 xs:p-9 bg-ocean-500/30">
      {/* <ConfettiSquaresBackground /> */}
      <BlobBackground />
      <Heading as="h1" classes={`md:text-5xl md:mb-5  ${classMB}`}>
        {heading}
      </Heading>{" "}
      {children}
    </div>
  );
}

export default AuthLayout;
