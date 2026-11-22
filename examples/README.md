# Examples, real artefacts from the demo run

Produced by `npm run render` on the sample drop in
`src/data/drop.ts` (VINYL DROP Records, Drop 7, Friday 27 November
2026). Nothing here is hand-made: if it is in this folder, the
library rendered it.

- `preorder-email.html` / `preorder-email.txt`, the preorder email and its
  plain-text twin (the greeting shows `{{first_name}}` because the
  template uses a MergeTag, which the sending platform fills per
  recipient; the batch personalises the order itself: record, quantity,
  fulfilment, total and catalogue number).
- `store-page.html`, the public drop page.
- `invoice.pdf`, the printed invoice and stock sheet: five A4 pages.
- `cover-card.png`, the drop cover card (1080×1080); the batch makes
  one card per release plus this cover.

Regenerate everything with `npm run check && npm run render`.
