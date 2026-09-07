function OrderedListItem({ children, number }) {
  return (
    <li className="flex items-start gap-3">
      <span className="shrink-0 flex items-center justify-center bg-amber/30 w-7 h-7 text-amber rounded-full font-bold font-primary">
        {number}
      </span>

      <span>{children}</span>
    </li>
  );
}

export default OrderedListItem;
