import {
  Button,
  Column,
  Grid,
  Heading,
  Page,
  Row,
  Section,
  Text,
  token,
} from "@hyper-elements/react";
import { drop, releases } from "../src/data/drop";
import type { Store } from "../src/data/drop";
import {
  countByStatus,
  lowStockReleases,
  soldOutReleases,
  stockStatus,
  totalPreorders,
  totalPressing,
  totalStock,
} from "../src/data/drop";
import { vinylTheme } from "../src/theme";
import {
  DropLine,
  DropStrip,
  KitFooter,
  LowStockList,
} from "../src/components/shared";
import { ReleaseCard } from "../src/components/release-card";
import { STATUS_LABELS } from "../src/data/drop";

/**
 * OUTPUT 2, The public drop page (Page root -> responsive web
 * HTML, no client-side JavaScript).
 *
 * The email's public twin. Where the email must survive Outlook,
 * the page gets the full retro treatment: a black hero, the
 * twelve-release drop strip, every release as a typed
 * vinyl.ReleaseCard grouped by stock status, and the low-stock
 * watch list.
 */
export function StorePage({ store: s = drop }: { store?: Store }) {
  const inStock = releases.filter((r) => stockStatus(r) === "in-stock");
  const low = releases.filter((r) => stockStatus(r) === "low-stock");
  const soldOut = releases.filter((r) => stockStatus(r) === "sold-out");
  const watch = lowStockReleases();
  const gone = soldOutReleases();
  return (
    <Page
      theme={vinylTheme}
      width={1100}
      title={`VINYL DROP, Drop ${s.dropNo} · ${s.dateLabel}`}
      description={s.pitch}
      lang="en"
      style={{ gap: 0 }}
    >
      <Section
        style={{
          backgroundColor: "#141414",
          padding: [48, 40],
          gap: 20,
          mobile: { padding: [32, 20] },
        }}
        tokens={{
          colors: {
            foreground: "#fff7ed",
            muted: "#e8dcc0",
            primary: "#f3ddb8",
          },
        }}
      >
        <Row style={{ gap: 32, alignItems: "start" }}>
          <Column style={{ gap: 14 }}>
            <Text
              style={{
                color: "#e8dcc0",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {`${s.name} · Drop ${s.dropNo}`}
            </Text>
            <Heading
              level={1}
              style={{ fontSize: 46, mobile: { fontSize: 32 } }}
            >
              VINYL DROP, twelve records, one Friday, no repress
            </Heading>
            <Text style={{ fontSize: 17 }}>
              {s.dateLabel} · {s.hours} · {s.address} · {s.owner}
            </Text>
            <Text style={{ fontSize: 17 }}>{s.pitch}</Text>
            <DropLine store={s} />
            <Row style={{ gap: 12 }}>
              <Button href="https://vinyldrop.example/drops/7/preorder">
                Preorder the drop
              </Button>
              <Button
                href="https://vinyldrop.example/drops/7"
                variant="secondary"
                style={{ color: "#141414" }}
              >
                Browse the crates
              </Button>
            </Row>
          </Column>
          <Column style={{ gap: 10 }}>
            <DropStrip releases={releases.slice(0, 6)} cell={14} />
            <Text style={{ apply: ["quiet"], color: "#e8dcc0" }}>
              The sleeve mark: one square per release, hot red and
              the release's stock colour, the same mark your email
              and invoice carry.
            </Text>
          </Column>
        </Row>
      </Section>

      <Section style={{ padding: [36, 40], gap: 24, mobile: { padding: [24, 20] } }}>
        <Heading level={2}>The drop in numbers</Heading>
        <Text style={{ fontSize: 17 }}>
          {releases.length} releases · {totalPressing()} copies
          pressed · {totalStock()} still on the shelf ·{" "}
          {totalPreorders()} preorders · {countByStatus("in-stock")}{" "}
          in stock · {countByStatus("low-stock")} low stock ·{" "}
          {countByStatus("sold-out")} sold out.
        </Text>
        <DropStrip releases={releases} cell={12} perRow={12} />
        <Text style={{ color: token("colors.muted"), fontSize: 13 }}>
          The drop strip: one square per release, red and the
          release's stock colour, in catalogue order.
        </Text>

        <Heading level={2}>In stock ({inStock.length})</Heading>
        <Grid columns={2} style={{ gap: 16 }}>
          {inStock.map((r) => (
            <ReleaseCard
              key={r.cat}
              cat={r.cat}
              artist={r.artist}
              title={r.title}
              format={r.format}
              pressing={String(r.pressing)}
              stock={String(r.stock)}
              price={String(r.price)}
              status={STATUS_LABELS[stockStatus(r)]}
            />
          ))}
        </Grid>

        <Heading level={2}>Low stock ({low.length})</Heading>
        <Text style={{ color: token("colors.muted"), fontSize: 13 }}>
          Twenty copies or fewer, and no repress is coming. These go
          first on release morning.
        </Text>
        <Grid columns={2} style={{ gap: 16 }}>
          {low.map((r) => (
            <ReleaseCard
              key={r.cat}
              cat={r.cat}
              artist={r.artist}
              title={r.title}
              format={r.format}
              pressing={String(r.pressing)}
              stock={String(r.stock)}
              price={String(r.price)}
              status={STATUS_LABELS[stockStatus(r)]}
            />
          ))}
        </Grid>

        <Heading level={2}>Sold out ({soldOut.length})</Heading>
        <Text style={{ color: token("colors.muted"), fontSize: 13 }}>
          Gone before the doors opened. Ask at the counter about the
          waiting list for cancelled preorders.
        </Text>
        <Grid columns={2} style={{ gap: 16 }}>
          {soldOut.map((r) => (
            <ReleaseCard
              key={r.cat}
              cat={r.cat}
              artist={r.artist}
              title={r.title}
              format={r.format}
              pressing={String(r.pressing)}
              stock={String(r.stock)}
              price={String(r.price)}
              status={STATUS_LABELS[stockStatus(r)]}
            />
          ))}
        </Grid>

        <Heading level={2}>Low-stock watch list ({watch.length})</Heading>
        <LowStockList releases={watch} />
        <Heading level={2}>Sold out ({gone.length})</Heading>
        <Text>
          {gone.map((r) => `${r.artist}, ${r.title} (${r.cat})`).join(" · ")}
        </Text>
        <Text style={{ color: token("colors.muted"), fontSize: 13 }}>
          Questions: {s.contact}. Drop {s.dropNo} lands{" "}
          {s.dateLabel}, {s.hours}, at {s.address}.
        </Text>
      </Section>

      <Section style={{ padding: [28, 40], mobile: { padding: [20, 20] } }}>
        <KitFooter />
      </Section>
    </Page>
  );
}

StorePage.PreviewProps = { store: drop };
export default StorePage;
