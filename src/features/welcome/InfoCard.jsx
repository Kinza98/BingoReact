import OrderedListItem from "../../components/ui/OrderedListItem";

function InfoCard() {
  return (
    <ol className="bg-white/10 hyphens-auto sm:py-8 py-6 md:py-10 px-6 sm:px-8 md:px-10 border-[rgba(255,255,255,0.15)] text-justify border-2 rounded-xl shadow-xl text-slate-200 my-3 sm:my-5 md:my-7 md:text-lg max-w-175 font-secondary space-y-2">
      <OrderedListItem number={1}>
        <strong>Get your card</strong> — Each player gets a card with 25
        numbers, shuffled fresh for every round.
      </OrderedListItem>{" "}
      <OrderedListItem number={2}>
        <strong>Follow the calls</strong> — Numbers are called one at a time and
        automatically marked on every player’s card. Keep an eye on the board if
        you miss a call.
      </OrderedListItem>{" "}
      <OrderedListItem number={3}>
        <strong>Get Bingo!</strong> — Complete a row, column, or diagonal to
        mark each letter of BINGO. Complete all 5 lines to win the game.
      </OrderedListItem>
    </ol>
  );
}

export default InfoCard;
