import OrderedListItem from "../../components/ui/OrderedListItem";

function InfoCard() {
  return (
    <ol className="my-3 w-full max-w-175 space-y-2 rounded-xl border-2 border-ocean-500/20 bg-ocean-500/30 px-4 py-5 text-justify font-secondary text-sm leading-relaxed text-slate-800 shadow-xl dark:border-[rgba(255,255,255,0.15)] dark:bg-white/10 dark:text-slate-200 sm:my-5 sm:px-8 sm:py-7 sm:text-base md:my-7 md:px-10 md:py-9 md:text-lg">
      <OrderedListItem number={1}>
        <strong>Get your card</strong> — Each player gets a card with 25
        numbers, shuffled fresh for every round.
      </OrderedListItem>

      <OrderedListItem number={2}>
        <strong>Follow the calls</strong> — Numbers are called one at a time and
        automatically marked on every player’s card. Keep an eye on the board if
        you miss a call.
      </OrderedListItem>

      <OrderedListItem number={3}>
        <strong>Get Bingo!</strong> — Complete a row, column, or diagonal to
        mark each letter of BINGO. Complete all 5 lines to win the game.
      </OrderedListItem>
    </ol>
  );
}

export default InfoCard;
