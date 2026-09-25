function Heading({ as, classes = "", children }) {
  const Component = as;

  const className = `
    ${classes}
    text-center
    text-3xl
    font-primary
    tracking-wider
    text-white
    mx-auto
    sm:text-4xl
    md:text-5xl
  `;

  return <Component className={className}>{children}</Component>;
}

export default Heading;
