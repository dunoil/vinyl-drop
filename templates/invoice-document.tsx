import {
  Column,
  Document,
  Heading,
  PageFooter,
  PageHeader,
  PageNumber,
  Row,
  Text,
} from "@hyper-elements/react";
import { drop, preorders, releases } from "../src/data/drop";
import type { Store } from "../src/data/drop";
import {
  countByStatus,
  lowStockReleases,
  preorderValue,
  soldOutReleases,
  stockValue,
  totalPreorders,
  totalPressing,
  totalStock,
} from "../src/data/drop";
import { vinylTheme } from "../src/theme";
import { DropStrip, LowStockList, ReleaseTable } from "../src/components/shared";

/**
 * OUTPUT 3 — The printed invoice and stock sheet (Document root ->
 * print HTML via render(), PDF via renderPdf() from
 * @hyper-elements/react/pdf).
 *
 * The formal record pinned behind the counter: page one is the drop
 * itself (pitch, numbers, how to read a release); pages two to four
 * are the twelve releases, four to a page; page five is the invoice
 * totals, the low-stock watch list and the owner's note. Each page
 * carries the same drop strip the email sent, and the footer counts
 * the pages — written for a human holding paper, not a browser print
 * button. Four releases per release page, so no table row is ever
 * cut off at a page edge: a Document page clips what does not fit,
 * it never flows it onto the next page.
 */
export function InvoiceDocument({ store: s = drop }: { store?: Store }) {
  const watch = lowStockReleases();
  const gone = soldOutReleases();
  const pages: (typeof releases)[] = [];
  for (let i = 0; i < releases.length; i += 4) {
    pages.push(releases.slice(i, i + 4));
  }
  return (
    <Document
      theme={vinylTheme}
      size="A4"
      margin={42}
      title={`${s.name} — Drop ${s.dropNo} invoice and stock sheet`}
      lang="en"
      style={{ gap: 20 }}
    >
      <PageHeader style={{ padding: { bottom: 10 } }}>
        <Row style={{ gap: 10, alignItems: "center" }} stackOnMobile={false}>
          <DropStrip releases={releases.slice(0, 6)} cell={8} />
          <Text style={{ fontWeight: 700, fontSize: 11 }}>
            {s.name} · Drop {s.dropNo} · {s.dateLabel} · Invoice and
            stock sheet
          </Text>
        </Row>
      </PageHeader>
      <PageFooter style={{ padding: { top: 10 } }}>
        <Text style={{ fontSize: 10, color: "#57534e" }}>
          Page <PageNumber /> of <PageNumber total /> · One drop file
          rendered this sheet · {s.name} · {s.dateLabel}
        </Text>
      </PageFooter>

      <Document.Page style={{ gap: 16 }}>
        <Column style={{ gap: 4 }}>
          <Text style={{ apply: ["eyebrow"] }}>
            {s.name} presents
          </Text>
          <Heading level={1} style={{ fontSize: 28 }}>
            VINYL DROP — twelve records, one Friday, no repress
          </Heading>
          <Text>
            Drop {s.dropNo} · {s.dateLabel} · {s.hours} ·{" "}
            {s.address} · {s.owner}
          </Text>
        </Column>

        <Text>{s.pitch}</Text>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>The drop in numbers</Heading>
          <Text>
            {releases.length} releases · {totalPressing()} copies
            pressed · {totalStock()} still on the shelf ·{" "}
            {totalPreorders()} preorders · {countByStatus("in-stock")}{" "}
            in stock · {countByStatus("low-stock")} low stock ·{" "}
            {countByStatus("sold-out")} sold out · $
            {preorderValue()} in preorders · ${stockValue()} of stock
            on the shelf · {preorders.length} preorder emails in the
            batch.
          </Text>
        </Column>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>How to read a release</Heading>
          <Text>
            Every release carries its catalogue number, the artist
            and title, the format, the pressing, the stock left and
            the price. In stock means more than twenty copies on the
            shelf. Low stock means twenty or fewer, and no repress is
            coming. Sold out means the pressing is gone; cancelled
            preorders go back on the shelf on release day, first come
            first served.
          </Text>
        </Column>
      </Document.Page>

      {pages.map((pageReleases, i) => (
        <Document.Page key={i} style={{ gap: 16 }}>
          <Column style={{ gap: 4 }}>
            <Heading level={1} style={{ fontSize: 28 }}>
              Releases {pageReleases[0].cat}–
              {pageReleases[pageReleases.length - 1].cat}
            </Heading>
            <Text>
              {pageReleases.length} releases, in catalogue order.
            </Text>
          </Column>
          <ReleaseTable releases={pageReleases} />
        </Document.Page>
      ))}

      <Document.Page style={{ gap: 16 }}>
        <Column style={{ gap: 4 }}>
          <Heading level={1} style={{ fontSize: 28 }}>
            Totals, low stock, and a note from the owner
          </Heading>
          <Text>
            What the drop is worth, what is running out, and what Jo
            wants every customer to know.
          </Text>
        </Column>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>Invoice totals</Heading>
          <Text>
            ${preorderValue()} in preorders across{" "}
            {totalPreorders()} claimed copies. ${stockValue()} of
            stock remains on the shelf across {totalStock()} copies.
            {gone.length} titles sold out before release day.
          </Text>
        </Column>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>Low-stock watch list ({watch.length})</Heading>
          <LowStockList releases={watch} />
        </Column>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>Sold out ({gone.length})</Heading>
          <Text>
            {gone.map((r) => `${r.artist} — ${r.title} (${r.cat})`).join(" · ")}
          </Text>
        </Column>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>A note from the owner</Heading>
          <Text>{s.ownersNote}</Text>
        </Column>

        <Column
          style={{
            gap: 6,
            padding: { top: 12 },
            border: { top: "1px dashed #57534e" },
          }}
        >
          <Text style={{ fontWeight: 700 }}>
            Twelve records, one Friday, no repress — keep this sheet.
          </Text>
          <Text>
            It is the record of the drop: the same catalogue numbers,
            pressings and prices your email carried and the page still
            shows.
          </Text>
        </Column>
      </Document.Page>
    </Document>
  );
}

InvoiceDocument.PreviewProps = { store: drop };
export default InvoiceDocument;
