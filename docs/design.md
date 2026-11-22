# VINYL DROP, design notes

## Concept

A template kit for an independent record store's monthly release
drop. One drop file renders the preorder email, the public drop
page, the printed invoice and stock sheet (PDF) and the cover-art
cards. Domain and style are deliberately the opposite pole from a
warm-wood repair cafe: black `#141414`, cream paper `#f7f0dd`, hot
red `#e10600` for shapes only, dark red `#a80000` for text accents,
mono catalogue numbers, Inter bold headings with tight letter
spacing and uppercase kickers for a condensed retro feel.

Signature: the **DropStrip**, one square per release, hot red
alternating with the release's stock colour (in stock green
`#166534`, low stock amber `#92400e`, sold out red `#991b1b`), plus the **catalogue stamp** (VD-0701 … VD-0712) that follows every
release from the data file into the page cards, the email table and
the invoice PDF. One file, one drop: that is the product idea and
the design idea at once.

## Build lessons (from the gate and the screenshot review, all fixed)

1. Theme element defaults are flat style objects, no `style:`
   wrapper, and no nested `elements` inside a Table entry
   (`TableCell` gets its own top-level entry).
2. Theme defaults reject `padding: {x, y}`, use the array form
   `[vertical, horizontal]` there (and, in this version, in Section
   styles too).
3. `TableCell` holds text and inline `Span`s directly, never a
   nested `Text`. Inline runs inside `Text` are `Span`s, not nested
   `Text`s.
4. An Email has no `subject` prop and a root has no padding.
5. A mark built from a Grid scatters if its columns stretch, the
   DropStrip is Rows of fixed-width Columns with an explicit width.
   A 12-cell strip overflows a hero column, so the strip splits into
   rows of 12 (`perRow`) and the hero keeps the six-cell sleeve mark.
6. **A Document page clips what does not fit; it never flows it
   onto the next page.** Four releases per release page, five pages
   in all, and every page verified from the actual PDF with
   `pdfinfo`, not from the print HTML.
7. Inter ships at 400 and 700 only in this kit's font files: a
   heading at 800 draws in the nearest weight and warns in the
   render diagnostics, so headings are 700 throughout.
8. Satori only draws the fonts it is given as bytes: the theme's
   `formats.canvas` forces Inter on Canvas headings and text, while
   the Document keeps Inter too, no serif anywhere in this kit.
9. A stamp `Text` alone in a `Row` stretches to the full width,    wrap it in a `flex: "none"` Column beside an empty Column so it
   hugs its text.
10. A 600px email cannot hold a seven-column table without squeezing
    the record names to one word per line, so the email uses the
    compact table (five columns, no Pressing or Stock): the email
    already states the pressing and the stock in prose. The full
    seven-column table stays in the invoice PDF, where the page is
    wide enough.
11. Deterministic data is a feature, not a nicety: the twelve
    releases and twelve preorders are fixed arrays, and the batch's
    counts (7 in stock, 3 low stock, 2 sold out, $28,403 in
    preorders) are computed from them, never typed. Read the
    outline, not just the error count.
