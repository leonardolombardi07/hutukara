interface BreakpointColumnMap {
  xs: number;
  sm: number;
  md: number;
  lg: number;
}

export function calculateSizesFromColumns(
  breakpointColumnMap: BreakpointColumnMap
) {
  const breakpointValues = heuristicallyGetBreakpointsMaxWidths();
  const totalWidth = 100;

  const sizes = Object.entries(breakpointColumnMap).map(
    ([breakpoint, columns]) => {
      return `(max-width: ${
        breakpointValues[breakpoint as keyof typeof breakpointValues]
      }px) ${totalWidth / columns}vw`;
    }
  );

  return sizes.join(", ");
}

export function heuristicallyGetBreakpointsMaxWidths(): BreakpointColumnMap {
  // Leo: Breakpoints are part of the theme. The dimensions we need are used at build time, so I don't think we can use the theme here. That's why this is heuristical.
  return {
    xs: 600,
    sm: 900,
    md: 1200,
    lg: 1600,
  };
}
