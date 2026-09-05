
function Row({ items, renderItem }) {
  return (
    <div className="flex flex-row">
      {items.map((item, index) => renderItem(item, index))}
    </div>
  );
}

export default Row;
