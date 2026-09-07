import BlobBackground from "../components/ui/BlobBackground";
import Heading from "../components/ui/Heading";
// import { Link } from "react-router-dom";
import BingoBatch from "../components/ui/BingoBatch";
import Button from "../components/ui/Button";
import InfoCard from "../features/welcome/InfoCard";

function Welcome() {
  return (
    <div className="relative min-h-dvh overflow-hidden p-7 bg-slate flex items-center flex-col  justify-center gap-2 font-secondary">
      <BlobBackground />
      <BingoBatch classes="mb-3 md:mb-5" />

      <Heading as="h1" classes="md:text-5xl tracking-widest">
        BINGO
      </Heading>

      <p className="text-slate-300 sm:text-lg md:text-xl mt-3 sm:mt-5 md:mt-7 md:tracking-wide text-center">
        Mark your numbers. Race the line. Shout first.
      </p>

      <InfoCard />

      <Button
        to="/game"
        // aria-label="button"
        style="game"
        // className="text-center md:max-w-80 w-full bg-amber font-semibold md:font-bold md:min-w-48 transition-transform duration-100 hover:scale-105 md:py-4 xs:px-5 p-2 rounded-lg font-secondary text-slate outline-0 cursor-pointer text-sm xs:text-lg shadow-lg md:shadow-[3px_3px_4px_rgba(0,0,0,0.3)]"
      >
        Let the Game Begin
      </Button>
    </div>
  );
}

export default Welcome;
