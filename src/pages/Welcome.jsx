import InfoCard from "../features/welcome/InfoCard";

import Button from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import LogoIcon from "../components/ui/LogoIcon";
import BlobBackground from "../components/ui/BlobBackground";

function Welcome() {
  return (
    <div className="relative min-h-dvh overflow-hidden p-7 bg-slate flex items-center flex-col  justify-center gap-2 font-secondary">
      <BlobBackground />

      <Heading as="h1" classes="md:text-4xl">
        <span className="flex gap-2 items-center md:flex-row flex-col">
          <LogoIcon size="80" /> BINGO
        </span>
      </Heading>

      <p className="text-slate-300 sm:text-lg md:text-xl mt-3 sm:mt-5 md:mt-7 md:tracking-wide text-center">
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
