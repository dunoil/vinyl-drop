import {
  Canvas,
  Column,
  Heading,
  Row,
  Text,
} from "@hyper-elements/react";
import { drop, releases } from "../src/data/drop";
import type { Release, Store } from "../src/data/drop";
import {
  countByStatus,
  totalPreorders,
  totalPressing,
  totalStock,
} from "../src/data/drop";
import { STATUS_LABELS, stockStatus } from "../src/data/drop";
import { vinylTheme } from "../src/theme";
import { DropStrip } from "../src/components/shared";

/**
 * OUTPUT 4 — The cover-art card (Canvas root, 1080 x 1080 -> PNG).
 *
 * A square social card rendered on the server with renderImage().
 * The batch makes thirteen cards: the drop cover, plus one per
 * release. Fonts are passed in as bytes by the scripts; nothing is
 * fetched. The theme's canvas format forces Inter here — satori
 * only has the Inter bytes we give it. The Canvas root takes no
 * tokens prop; colours are set on the elements directly.
 */
export function CoverCard({
  store: s = drop,
  release,
}: {
  store?: Store;
  release?: Release;
}) {
  const isCover = !release;
  return (
    <Canvas
      theme={vinylTheme}
      width={1080}
      height={1080}
      title={
        isCover
          ? `${s.name} — Drop ${s.dropNo} cover`
          : `${release.artist} — ${release.title}`
      }
      lang="en"
      style={{
        padding: 72,
        gap: 28,
        justifyContent: "space-between",
        backgroundColor: "#141414",
      }}
    >
      <Row style={{ gap: 16, alignItems: "center" }} stackOnMobile={false}>
        <DropStrip releases={releases.slice(0, 6)} cell={16} />
        <Column style={{ gap: 0 }}>
          <Text
            style={{ fontWeight: 700, fontSize: 30, letterSpacing: 2, color: "#fff7ed" }}
          >
            {s.name.toUpperCase()}
          </Text>
          <Text style={{ fontSize: 20, color: "#e8dcc0" }}>
            Drop {s.dropNo} · {s.dateLabel}
          </Text>
        </Column>
      </Row>

      <Column style={{ gap: 24 }}>
        <Column style={{ backgroundColor: "#e10600", height: 18, borderRadius: 4 }} />
        {isCover ? (
          <>
            <Text style={{ apply: ["eyebrow"], fontSize: 20, color: "#e8dcc0" }}>
              {`Drop ${s.dropNo} · ${s.dateLabel}`}
            </Text>
            <Heading
              level={1}
              style={{
                fontSize: 96,
                lineHeight: 1.1,
                color: "#fff7ed",
              }}
            >
              Twelve records. One Friday. No repress.
            </Heading>
            <Text style={{ fontSize: 28, color: "#fff7ed" }}>
              {releases.length} releases · {totalPressing()} copies
              pressed · {totalPreorders()} preorders ·{" "}
              {countByStatus("sold-out")} already sold out.
            </Text>
          </>
        ) : (
          <>
            <Text style={{ apply: ["eyebrow"], fontSize: 20, color: "#e8dcc0" }}>
              {`${release.cat} · ${release.format} · ${release.genre}`}
            </Text>
            <Heading
              level={1}
              style={{
                fontSize: 88,
                lineHeight: 1.1,
                color: "#fff7ed",
              }}
            >
              {release.artist}
            </Heading>
            <Text style={{ fontSize: 40, fontWeight: 700, color: "#fff7ed" }}>
              {release.title}
            </Text>
            <Text style={{ fontSize: 28, color: "#fff7ed" }}>
              {release.blurb}
            </Text>
            <Text style={{ fontSize: 28, color: "#e8dcc0" }}>
              {release.pressing} pressed · {release.stock} left · $
              {release.price} ·{" "}
              {STATUS_LABELS[stockStatus(release)]}
            </Text>
          </>
        )}
      </Column>

      <Column style={{ gap: 14 }}>
        <Text style={{ apply: ["mono"], fontSize: 22, color: "#e8dcc0" }}>
          {`${releases.length} releases · ${totalPressing()} pressed · ${totalStock()} on the shelf · ${totalPreorders()} preorders`}
        </Text>
        <Text style={{ apply: ["mono"], fontSize: 22, color: "#e8dcc0" }}>
          {`${countByStatus("in-stock")} in stock · ${countByStatus("low-stock")} low stock · ${countByStatus("sold-out")} sold out`}
        </Text>
        <Text style={{ fontSize: 20, color: "#e8dcc0" }}>
          {s.name} · {s.owner} · {s.contact}
        </Text>
      </Column>
    </Canvas>
  );
}

CoverCard.PreviewProps = { store: drop };
export default CoverCard;
