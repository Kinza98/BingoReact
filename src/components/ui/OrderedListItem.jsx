function OrderedListItem({ children, number }) {
  return (
    <li className="flex items-start gap-2 sm:gap-3">
      <span className="shrink-0 text-sm sm:text-base flex items-center justify-center bg-amber/30 sm:w-7 sm:h-7 w-5 h-5 text-amber rounded-full mt-1 font-bold font-primary pb-1">
        {number}
      </span>

      <span>{children}</span>
    </li>
  );
}

export default OrderedListItem;
