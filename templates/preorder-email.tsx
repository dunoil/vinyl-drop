import {
  Button,
  Column,
  Email,
  Heading,
  Link,
  MergeTag,
  Span,
  Text,
} from "@hyper-elements/react";
import { drop, samplePreorder, releaseFor } from "../src/data/drop";
import type { Preorder, Store } from "../src/data/drop";
import { STATUS_LABELS, stockStatus } from "../src/data/drop";
import { vinylTheme } from "../src/theme";
import {
  DropLine,
  KitFooter,
  ReleaseTable,
  Wordmark,
} from "../src/components/shared";

/**
 * OUTPUT 1, The preorder email (Email root -> email-safe HTML + a
 * plain-text twin from the same render).
 *
 * No Svg, no remote images: the DropStrip is layout, so the
 * preorder survives image-blocking inboxes. The news leads, a
 * preorder email is, first, the verdict on the customer's record:
 * reserved and ready for pickup or shipping, or sold out before
 * release day, with the waiting list as the honest answer.
 */
export function PreorderEmail({
  store: s = drop,
  preorder = samplePreorder,
}: {
  store?: Store;
  preorder?: Preorder;
}) {
  const release = releaseFor(preorder.cat);
  const status = stockStatus(release);
  const total = preorder.quantity * release.price;
  const news =
    preorder.fulfilment === "Pickup"
      ? `Good news: your copy of ${release.title} by ${release.artist} is reserved and ready for pickup on release day.`
      : `Good news: your copy of ${release.title} by ${release.artist} is reserved and ships on release day.`;
  const scarcity =
    status === "sold-out"
      ? `This title sold out before release day, but your preorder is safe: it was claimed before the last copy went.`
      : status === "low-stock"
        ? `Only ${release.stock} copies are still on the shelf after preorders. This pressing will not be repressed.`
        : `${release.stock} copies are still on the shelf after preorders, from a pressing of ${release.pressing}.`;
  return (
    <Email
      theme={vinylTheme}
      width={600}
      previewText={`${preorder.order}, ${news}`}
      title={`${s.name}, Preorder ${preorder.order}`}
      lang="en"
      style={{ gap: 20 }}
    >
      <Column style={{ apply: ["card"] }}>
        <Wordmark store={s} />
        <Heading level={1} style={{ mobile: { fontSize: 26 } }}>
          Your record is reserved, <MergeTag name="first_name" />
        </Heading>
        <Text style={{ fontSize: 17, fontWeight: 700 }}>{news}</Text>
        <Text>{scarcity}</Text>
        <DropLine store={s} />
        <ReleaseTable releases={[release]} compact />
        <Text style={{ fontSize: 14 }}>
          <Span style={{ fontWeight: 700 }}>Order: </Span>
          {preorder.order} ·{" "}
          <Span style={{ fontWeight: 700 }}>Quantity: </Span>
          {preorder.quantity} ·{" "}
          <Span style={{ fontWeight: 700 }}>Total: </Span>${total} ·{" "}
          <Span style={{ fontWeight: 700 }}>Status: </Span>
          {STATUS_LABELS[status]}.
        </Text>
        <Text style={{ fontSize: 14 }}>
          {preorder.fulfilment === "Pickup"
            ? `Pickup is at ${s.address}, ${s.hours} from ${s.dateLabel}, bring this order number, `
            : `Shipping goes out on ${s.dateLabel} from ${s.address}, your order number is `}
          <Span style={{ apply: ["mono"], fontWeight: 700 }}>
            {preorder.order}
          </Span>
          . {release.format} · {release.cat} · {release.genre}.
        </Text>
        <Heading level={2}>The drop</Heading>
        <Text>
          Drop {s.dropNo} lands {s.dateLabel}: twelve records, one
          Friday, no repress. Two titles are already sold out; the
          rest are on the wall until they are gone.
        </Text>
        <Button href="https://vinyldrop.example/drops/7">
          See the full drop
        </Button>
        <Text style={{ apply: ["quiet"] }}>
          Order {preorder.order} · {release.cat} · {release.artist} ,{" "}
          {release.title} · {s.name}, drop {s.dropNo},{" "}
          {s.dateLabel}.
        </Text>
      </Column>
      <KitFooter />
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        You receive this email because you preordered a record from
        VINYL DROP Records.{" "}
        <Link href="{{unsubscribe_url}}">Unsubscribe</Link>
      </Text>
    </Email>
  );
}

PreorderEmail.PreviewProps = { store: drop, preorder: samplePreorder };
export default PreorderEmail;
