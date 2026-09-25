import { HiPencilAlt, HiPlay, HiRefresh } from "react-icons/hi";

import ActionButton from "../../components/ui/ActionButton";

function CardSetupActions({ onWrite, onRefresh, onStartPlaying }) {
  return (
    <div className="mt-7 w-full max-w-xl xs:mt-8 sm:mt-10">
      <div className="flex w-full items-center justify-center gap-1 xs:gap-2 sm:gap-5">
        {/* Make My Own */}
        <ActionButton
          onClick={onWrite}
          icon={
            <HiPencilAlt className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-6 sm:w-6" />
          }
          title="Make My Own"
          description="Customize it"
          className="
            max-sm:max-w-[90px]
            md:min-w-40
            border border-neon-500
            bg-neon-500/50
            hover:bg-neon-500
          "
          iconClassName="bg-neon-800 group-hover:bg-gray-900"
          titleClassName="text-slate-300"
          descriptionClassName="text-slate-500"
        />

        {/* Shuffle */}
        <ActionButton
          onClick={onRefresh}
          icon={
            <HiRefresh className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-180 xs:h-4 xs:w-4 sm:h-6 sm:w-6" />
          }
          title="Shuffle It"
          description="Mix things up"
          className="
            max-sm:max-w-[90px]
                        md:min-w-40

            border border-neon-900
            bg-success/70
            hover:bg-success
          "
          iconClassName="bg-neon-800 group-hover:bg-neon-700"
          titleClassName="text-slate-300"
          descriptionClassName="text-text/50"
        />

        {/* Start Playing */}
        <ActionButton
          onClick={onStartPlaying}
          icon={
            <HiPlay className="h-3.5 w-3.5 translate-x-0.5 xs:h-4 xs:w-4 sm:h-6 sm:w-6" />
          }
          title="Start Playing"
          description="Let's go!"
          className="
            max-sm:max-w-[72px]
                        md:min-w-40

            bg-amber
            text-slate-900
            shadow-lg
            hover:shadow-xl
          "
          iconClassName="bg-slate-900/10"
          titleClassName="font-bold"
          descriptionClassName="opacity-70"
        />
      </div>
    </div>
  );
}

export default CardSetupActions;
