function Heading({ as, classes, children }) {
  const Component = as;
  const className = `${classes} text-white font-primary text-3xl tracking-wider mx-auto text-center`;
  return <Component className={className}>{children}</Component>;
}

export default Heading;
