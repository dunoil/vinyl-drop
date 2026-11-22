import { defineTheme } from "@hyper-elements/react";

/**
 * VINYL DROP theme — "bold retro": black, cream paper, hot red for
 * shapes, condensed-feel Inter bold with tight letter spacing and
 * uppercase kickers.
 *
 * One theme serves all four roots, so it carries NO `mobile` blocks
 * (phone styles are an error in a Document or a Canvas); Email and
 * Page templates set their own phone styles.
 *
 * Hot red #e10600 is a shape colour only — it never sets body text.
 * Text ink is black #141414 or dark red #a80000 (both >= 4.5:1 on
 * the cream paper). Status colours are dark enough to be text: in
 * stock green #166534, low stock amber #92400e, sold out red
 * #991b1b. Headings are Inter 700 throughout: the kit ships Inter
 * at 400 and 700 only.
 */
export const vinylTheme = defineTheme({
  colors: {
    background: "#f7f0dd",
    paper: "#fffdf4",
    foreground: "#141414",
    muted: "#57534e",
    primary: "#a80000",
    primaryForeground: "#fff7ed",
    border: "#d8cdb2",
    red: "#e10600",
    black: "#141414",
    grey: "#4b5563",
    inStock: "#166534",
    lowStock: "#92400e",
    soldOut: "#991b1b",
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 28, xl: 44 },
  fontSizes: { sm: 12, md: 15, lg: 19, xl: 30 },
  lineHeights: { tight: 1.25, normal: 1.55 },
  fonts: {
    body: "Inter, Helvetica, Arial, sans-serif",
    heading: "Inter, Helvetica, Arial, sans-serif",
    mono: "'Cascadia Code', Consolas, 'Courier New', monospace",
  },
  radii: { sm: 2, md: 6 },
  elements: {
    Heading: {
      fontFamily: "Inter, Helvetica, Arial, sans-serif",
      fontWeight: 700,
      letterSpacing: -0.5,
      by: {
        level: {
          1: { fontSize: 34 },
          2: { fontSize: 23 },
          3: { fontSize: 16 },
        },
      },
    },
    Text: { fontSize: 15, lineHeight: 1.55 },
    Button: {
      backgroundColor: "#a80000",
      fontWeight: 700,
      padding: [12, 22],
      borderRadius: 2,
      hover: { backgroundColor: "#7f0000" },
      variants: {
        secondary: {
          backgroundColor: "#fffdf4",
          color: "#141414",
          border: { width: 1, style: "solid", color: "#141414" },
          hover: { backgroundColor: "#f7f0dd" },
        },
        small: { fontSize: 13, padding: [8, 14] },
      },
    },
    Table: { border: { bottom: "1px solid #d8cdb2" } },
    TableCell: { padding: [10, 8], fontSize: 13 },
  },
  styles: {
    card: {
      backgroundColor: "#fffdf4",
      padding: 28,
      gap: 16,
      borderRadius: 6,
      border: { width: 1, style: "solid", color: "#d8cdb2" },
    },
    quiet: { color: "#57534e", fontSize: 12 },
    eyebrow: {
      color: "#a80000",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 2,
      textTransform: "uppercase",
    },
    stamp: {
      fontFamily: "'Cascadia Code', Consolas, 'Courier New', monospace",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 1,
      padding: [5, 10],
      border: { width: 1, style: "dashed", color: "#a80000" },
      borderRadius: 4,
    },
    mono: {
      fontFamily: "'Cascadia Code', Consolas, 'Courier New', monospace",
      fontSize: 13,
    },
    redRule: {
      backgroundColor: "#e10600",
      height: 4,
      borderRadius: 2,
    },
    blackRule: {
      backgroundColor: "#141414",
      height: 4,
      borderRadius: 2,
    },
  },
  formats: {
    email: { elements: { Button: { borderRadius: 2 } } },
    document: {
      styles: { quiet: { fontSize: 10 } },
      elements: {
        Text: { fontSize: 11, lineHeight: 1.45 },
        Heading: { fontFamily: "Inter, Helvetica, Arial, sans-serif" },
      },
    },
    canvas: {
      elements: {
        Heading: { fontFamily: "Inter, Helvetica, Arial, sans-serif" },
        Text: { fontFamily: "Inter, Helvetica, Arial, sans-serif" },
      },
    },
  },
});

declare module "@hyper-elements/react" {
  interface Register {
    theme: typeof vinylTheme;
  }
}
