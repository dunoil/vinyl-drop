import { Column, Row, Span, Text, defineElement, prop, token } from "@hyper-elements/react";

/**
 * `vinyl.ReleaseCard` — one release, as a record-store card: a red
 * rule, the catalogue number stamp, the artist and title, the
 * format and pressing, and the stock status in its own colour.
 *
 * A custom element because the release is the kit's unit of reuse:
 * the page lists twelve of them, and a mistyped catalogue number or
 * a missing price should be a diagnostic with a path, not a broken
 * page. Props are typed with the prop.* builders, so the checker and
 * the editor both enforce them.
 */
export const ReleaseCard = defineElement({
  type: "vinyl.ReleaseCard",
  label: "Release card",
  description:
    "One release: catalogue number, artist, title, format, pressing, stock, price and status.",
  props: {
    cat: prop.text({ label: "Catalogue number", required: true }),
    artist: prop.text({ label: "Artist", required: true }),
    title: prop.text({ label: "Title", required: true }),
    format: prop.text({ label: "Format", required: true }),
    pressing: prop.text({ label: "Pressing", required: true }),
    stock: prop.text({ label: "Stock", required: true }),
    price: prop.text({ label: "Price", required: true }),
    status: prop.text({ label: "Status", required: true }),
  },
  render: ({ cat, artist, title, format, pressing, stock, price, status }) => {
    const color =
      status === "In stock"
        ? "#166534"
        : status === "Low stock"
          ? "#92400e"
          : "#991b1b";
    return (
      <Column
        style={{
          gap: 8,
          backgroundColor: token("colors.paper"),
          border: { width: 1, style: "solid", color: token("colors.border") },
          borderRadius: 6,
          padding: 18,
        }}
      >
        <Column style={{ apply: ["redRule"], width: 48 }} />
        <Text
          style={{
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          {artist}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 700 }}>{title}</Text>
        <Text style={{ fontSize: 14 }}>
          {format} · {pressing} pressed · {stock} left · ${price}
        </Text>
        <Row style={{ gap: 0 }} stackOnMobile={false}>
          <Column style={{ flex: "none" }}>
            <Text style={{ apply: ["stamp"], color: "#a80000" }}>
              {cat.toUpperCase()}
            </Text>
          </Column>
          <Column />
        </Row>
        <Text style={{ fontSize: 14 }}>
          <Span style={{ fontWeight: 700, color }}>{status}</Span>
        </Text>
      </Column>
    );
  },
});
