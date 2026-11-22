Templates use Hyper Elements (@hyper-elements/react).
If it isn't installed, install it with react and react-dom.
Before writing a template, read node_modules/@hyper-elements/react/GUIDE.md.

Validate every template, fix errors, review warnings, and inspect outline() before rendering.

# VINYL DROP invariants, do not break these

1. ONE source of truth. All content comes from src/data/drop.ts.
   Never hard-code release, preorder or drop data inside a template.
2. ONE theme. All styling tokens live in src/theme.ts (defineTheme).
   Templates refer to tokens with token("..."); they do not invent palettes.
3. The DropStrip is Rows of fixed-width Columns, never a Grid, never
   an Svg and never an Image. An Email cannot hold an Svg; the strip
   must survive image-blocking inboxes. A Grid mark scatters when its
   columns stretch, the strip is a Row with an explicit width, split
   into rows of 12 (perRow) so it fits a narrow column.
4. No Svg in templates/preorder-email.tsx. No remote images in the email at all.
5. No margins anywhere. Space between blocks is the parent's gap;
   space inside a box is its padding. Roots take no padding.
6. Styles go in style={{ }}, never as props. A root's width is a prop.
7. typeInk is for text; hot red #e10600 is for shapes. Never set
   body text in bright red, contrast fails on paper. Text ink is
   black #141414 or dark red #a80000 (≥ 4.5:1 on cream). Status
   colours are dark green/amber/red, text-safe.
8. Every template default-exports its component and sets PreviewProps,
   so `npx hyper-elements check templates/` keeps working.
9. The gate runs first. scripts/check.tsx (or the gate inside
   make-drop.tsx) must pass before any batch render. Never delete the
   gate to make a run pass.
10. Drop data is deterministic. No Date.now(), no Math.random()
    in src/data/drop.ts, a corrections run must re-render only
    changed records. (Date.now() in the batch script only times the run.)
