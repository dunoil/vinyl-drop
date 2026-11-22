import {
  Column,
  Row,
  Span,
  Table,
  TableCell,
  TableRow,
  Text,
  token,
} from "@hyper-elements/react";
import type { Release, Store } from "../data/drop";
import { STATUS_COLORS, STATUS_LABELS, stockStatus } from "../data/drop";

/**
 * Shared components, plain functions returning elements, used under
 * several roots, which is exactly why the emailed pressing and the
 * printed invoice can never disagree about a catalogue number or a
 * price.
 */

/**
 * The DropStrip: a record-store ruler of alternating hot-red and
 * black squares, one per release, coloured by that release's stock
 * status when given the releases. Built from a Row of fixed-width
 * Columns with an explicit width, never a Grid, never an Svg, never
 * an image, because an Email cannot hold an Svg and inboxes block
 * images. It is the drop, drawn as a sleeve spine.
 */
export function DropStrip({
  releases,
  cell = 12,
  perRow,
}: {
  releases: Release[];
  cell?: number;
  /** Split the strip into rows of this many squares, so a long strip fits a narrow column. */
  perRow?: number;
}) {
  const rows: Release[][] = [];
  const size = perRow ?? releases.length;
  for (let i = 0; i < releases.length; i += size) {
    rows.push(releases.slice(i, i + size));
  }
  return (
    <Column style={{ gap: 3 }}>
      {rows.map((row, r) => (
        <Row
          key={r}
          style={{ gap: 3, width: row.length * cell + (row.length - 1) * 3 }}
          stackOnMobile={false}
        >
          {row.map((t, i) => (
            <Column
              key={t.cat}
              style={{
                backgroundColor:
                  (r * size + i) % 2 === 0
                    ? "#e10600"
                    : STATUS_COLORS[stockStatus(t)],
                border: {
                  width: 1,
                  style: "solid",
                  color:
                    (r * size + i) % 2 === 0
                      ? "#e10600"
                      : STATUS_COLORS[stockStatus(t)],
                },
                width: cell,
                height: cell,
                borderRadius: 2,
              }}
            />
          ))}
        </Row>
      ))}
    </Column>
  );
}

export function Wordmark({ store }: { store: Store }) {
  // Six sleeve squares, one per side of the drop's first three LPs:
  // hot red and black alternating, a Row of fixed-width Columns
  // with an explicit width.
  const cells = [0, 1, 2, 3, 4, 5];
  return (
    <Row style={{ gap: 12, alignItems: "center" }} stackOnMobile={false}>
      <Row
        style={{ gap: 3, width: 6 * 9 + 5 * 3 }}
        stackOnMobile={false}
      >
        {cells.map((i) => (
          <Column
            key={i}
            style={{
              backgroundColor: i % 2 === 0 ? "#e10600" : "#141414",
              border: {
                width: 1,
                style: "solid",
                color: i % 2 === 0 ? "#e10600" : "#141414",
              },
              width: 9,
              height: 9,
              borderRadius: 2,
            }}
          />
        ))}
      </Row>
      <Column style={{ gap: 0 }}>
        <Text style={{ fontWeight: 700, fontSize: 17, letterSpacing: 1 }}>
          {store.name.toUpperCase()}
        </Text>
        <Text style={{ apply: ["quiet"] }}>
          Drop {store.dropNo} · {store.dateLabel}
        </Text>
      </Column>
    </Row>
  );
}

export function Eyebrow({ children }: { children: string }) {
  return <Text style={{ apply: ["eyebrow"] }}>{children}</Text>;
}

/** The drop in one line. Used by email, page, canvas. */
export function DropLine({ store }: { store: Store }) {
  return (
    <Text style={{ apply: ["mono"], color: token("colors.muted") }}>
      {`Drop ${store.dropNo} · ${store.dateLabel} · ${store.hours} · ${store.address}`}
    </Text>
  );
}

/** The release board, as a table, email, page and invoice PDF.
 *  TableCells hold text and inline Spans directly, never a nested Text.
 *  `compact` drops the Pressing and Stock columns: a 600px email
 *  cannot hold seven columns without squeezing the record names, and
 *  the email already states the pressing and the stock in prose. */
export function ReleaseTable({
  releases,
  compact = false,
}: {
  releases: Release[];
  compact?: boolean;
}) {
  return (
    <Table>
      <TableRow header>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Cat. no.</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Record</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Format</Span>
        </TableCell>
        {compact ? null : (
          <TableCell>
            <Span style={{ fontWeight: 700 }}>Pressing</Span>
          </TableCell>
        )}
        {compact ? null : (
          <TableCell>
            <Span style={{ fontWeight: 700 }}>Stock</Span>
          </TableCell>
        )}
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Price</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Status</Span>
        </TableCell>
      </TableRow>
      {releases.map((r) => (
        <TableRow key={r.cat}>
          <TableCell>
            <Span style={{ fontWeight: 700 }}>{r.cat}</Span>
          </TableCell>
          <TableCell>
            <Span style={{ fontWeight: 700 }}>{r.artist}</Span>
            {`, ${r.title}`}
          </TableCell>
          <TableCell>{r.format}</TableCell>
          {compact ? null : <TableCell>{r.pressing}</TableCell>}
          {compact ? null : <TableCell>{r.stock}</TableCell>}
          <TableCell>${r.price}</TableCell>
          <TableCell>
            <Span
              style={{
                fontWeight: 700,
                color: STATUS_COLORS[stockStatus(r)],
              }}
            >
              {STATUS_LABELS[stockStatus(r)]}
            </Span>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

/** Releases running low, page and invoice PDF. */
export function LowStockList({ releases }: { releases: Release[] }) {
  return (
    <Column style={{ gap: 6 }}>
      {releases.map((r) => (
        <Text key={r.cat}>
          <Span style={{ fontWeight: 700 }}>
            {r.artist}, {r.title}
          </Span>
          {` (${r.cat}) · ${r.stock} left of ${r.pressing} pressed · $${r.price}`}
        </Text>
      ))}
    </Column>
  );
}

export function KitFooter() {
  return (
    <Column style={{ gap: 6, alignItems: "center" }}>
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        VINYL DROP Records · 14 Groove Street, Bristol · Twelve new
        releases on the last Friday of every month
      </Text>
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        One drop file rendered this, email, page, invoice and stock
        sheet, and cover cards, with Hyper Elements.
      </Text>
    </Column>
  );
}

export function DropHeading({ store }: { store: Store }) {
  return (
    <Column style={{ gap: 8 }}>
      <Eyebrow>{`${store.name} presents`}</Eyebrow>
      <Text
        style={{
          fontWeight: 700,
          fontSize: 34,
          lineHeight: 1.2,
        }}
      >
        VINYL DROP, twelve records, one Friday, no repress
      </Text>
      <Text style={{ fontSize: 17 }}>
        Drop {store.dropNo} · {store.dateLabel} · {store.hours}
      </Text>
    </Column>
  );
}
