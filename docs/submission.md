### Which challenge are you entering?
Hyper Elements Template Challenge (November 2026)

### Project name
VINYL DROP: Twelve records, one Friday, no repress, a record store release kit (preorder email, drop page, printed invoice and stock-sheet PDF, cover-art cards from one drop file)

### Project description

One drop file in → **12 personalised preorder emails, a 5-page printed invoice and stock-sheet PDF, a public drop page and 13 cover-art cards** out, from one theme and one set of shared components.

A release drop's paperwork fails in a predictable way: the email says one thing, the wall sheet another, and the sleeve in the customer's hand says a third, a different pressing, a different price, a catalogue number spelled two ways. This kit makes that impossible by construction. Every catalogue number, pressing and price lives in one drop file: the email quotes it, the page's cards carry it, and the printed invoice prints it next to the owner's note.

- **Preorder email** (`Email` → `render()`), the news leads: your copy is reserved for pickup or shipping, with the pressing scarcity, the order total and the catalogue stamp. No Svg, no remote images: the DropStrip (one square per release, hot red and the release's stock colour) is a `Row` of fixed-width `Column`s, so it survives image-blocking inboxes. The table is the compact five-column form, because a 600px email cannot hold seven columns without squeezing the record names; the pressing and stock are already in the prose. `MergeTag` greeting; plain-text twin from the same render.
- **Drop page** (`Page` → `render()`), black hero, the twelve-release drop strip, every release as a typed `vinyl.ReleaseCard` grouped by stock status (7 in stock, 3 low stock, 2 sold out), the low-stock watch list, phone styles, no client-side JavaScript.
- **Printed invoice and stock sheet** (`Document` → `renderPdf()`), the record pinned behind the counter: page one is the drop itself (numbers, how to read a release), pages two to four are the twelve releases, four to a page, page five is the invoice totals, the low-stock watch list and the owner's note. `PageHeader`/`PageFooter` with `PageNumber`. No browser makes this PDF.
- **Cover-art cards** (`Canvas` → `renderImage()`), 1080×1080 PNGs: the drop cover, plus one card per release with artist, title, blurb and pressing numbers in poster type. Server-rendered; fonts in as bytes; nothing fetched.

**Measured on the demo run (22 Nov 2026):** 12 preorder emails · 5 invoice pages in one PDF · 13 cover cards · 12 releases, 3,800 copies pressed, 882 on the shelf, 1,069 preorders · $28,403 in preorders, $14,641 of stock on the shelf · **gate: 0 errors, 0 warnings** · full batch in **2.4s**.

**Corrections pass:** drop data is deterministic (no clock, no randomness), so fixing one record re-renders only that record, the other 11 emails are byte-identical.

### Public GitHub repository URL
https://github.com/dunoil/vinyl-drop

### How did you use Hyper Elements?

- **One `defineTheme()`** carries all four roots, black, cream paper, hot red for shapes only, dark red for text accents, mono catalogue numbers, Inter bold headings with tight letter spacing, per-format overrides: the Document and the Canvas are forced to Inter because satori only draws the font bytes it is given. One deliberate constraint shaped it: phone styles are an error in a Document or a Canvas, so the theme carries no `mobile` blocks, Email/Page templates set their own.
- **Shared components across roots** (`Wordmark`, `DropStrip`, `DropLine`, `ReleaseTable`, `LowStockList`) are why the emailed pressing and the printed one are the same pressing.
- **The mark is built from layout primitives on purpose.** An Email cannot hold an Svg, so the DropStrip is Rows of fixed-width Columns, and it recolours automatically per release, because the squares are data on the releases. A 12-cell strip overflows a hero column, so it splits into rows of 12; the gate's layout check caught that before it shipped.
- **A custom element with `defineElement()`**: `vinyl.ReleaseCard` with typed props (`prop.text`). A mistyped catalogue number or a missing price is a diagnostic with a path, before anything renders.
- **`validate()` as a gate, not a linter.** The batch validates before writing a single file. `out/checks.json` makes the verdict a file instead of a claim.
- **`@hyper-elements/email-clients`** for client proof (`npm run clients`): 5 previews of the email as classic Outlook, Gmail and Apple Mail draw it; screenshots in `docs/`.
- **CLI-ready**: `npx hyper-elements check templates/` reports **4 templates: 0 errors, 0 warnings, 0 skipped** (verified 22 Nov 2026).
- **Written for agents too** (`AGENTS.md`): ten invariants an agent must not break.

**Run it:** `npm install && npm run check && npm run render && npm run make` (12 emails) · `npm run make:sample` (4) · `npm run clients`. Node 20+. `examples/` holds one artefact of each kind.

### Live preview URL (optional)
No hosted preview. `examples/` in the repository contains the preorder email (HTML + plain text), the drop page, the printed invoice and stock sheet as a PDF and the cover card PNG, all from the demo run, and `docs/` holds screenshots of every output, including the email as Outlook and Gmail render it.

### Submission confirmation
- [x] I have starred the Hyper Elements repository. (Starred 18 Nov 2026 for the SOWN entry; same account.)
- [x] My repository is public and contains the complete source code and required README.
- [x] My submission meets the requirements of the selected challenge.

---

**Discussion:** https://github.com/hyper-elements/hyper-elements/discussions/333 (posted 23 Nov 2026)
