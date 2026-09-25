import InfoCard from "../features/welcome/InfoCard";

import Button from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import LogoIcon from "../components/ui/LogoIcon";
import BlobBackground from "../components/ui/BlobBackground";

function Welcome() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-slate px-5 py-7 font-secondary sm:px-7">
      <BlobBackground />

      <Heading as="h1">
        <span className="flex flex-col items-center gap-2 sm:flex-row">
          <LogoIcon size={60} />
          <span>BINGO</span>
        </span>
      </Heading>

      <p className="mt-3 max-w-xl text-center text-sm text-slate-300 sm:mt-5 sm:text-lg md:mt-6 md:text-xl md:tracking-wide">
        Mark your numbers. Race the line. Shout first.
      </p>

      <InfoCard />

      <Button to="/game" style="game">
        Let the Game Begin
      </Button>
    </div>
  );
}

export default Welcome;
