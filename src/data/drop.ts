/**
 * The drop file, the kit's single source of truth.
 *
 * One record store drop renders the preorder email, the public drop
 * page, the printed invoice and stock sheet (PDF) and the cover-art
 * cards. Change `drop` or `releases` and every artefact agrees,
 * because every artefact reads this file.
 *
 * Everything here is fixed text: no clock, no randomness. A
 * corrections run re-renders only the records that changed.
 */

export type Format = "LP" | "12-inch" | "7-inch";

export type StockStatus = "in-stock" | "low-stock" | "sold-out";

export interface Release {
  /** "VD-0701", the catalogue number printed on every artefact. */
  cat: string;
  artist: string;
  title: string;
  /** "Indie rock" */
  genre: string;
  format: Format;
  /** Copies pressed for this drop. */
  pressing: number;
  /** Copies still on the shelf. */
  stock: number;
  /** Price in dollars. */
  price: number;
  /** Preorders taken before release day. */
  preorders: number;
  /** One line about the record, for the page and the card. */
  blurb: string;
}

export interface Preorder {
  /** "VD-ORD-701" */
  order: string;
  customer: string;
  /** Catalogue number of the record ordered. */
  cat: string;
  /** Copies ordered. */
  quantity: number;
  /** "Pickup" | "Ship" */
  fulfilment: "Pickup" | "Ship";
}

export interface Store {
  name: string;
  /** 7 */
  dropNo: number;
  /** "Friday 27 November 2026", printed on every artefact. */
  dateLabel: string;
  hours: string;
  address: string;
  owner: string;
  /** One-paragraph pitch used by the email and the page hero. */
  pitch: string;
  /** The owner's note, printed in the invoice PDF. */
  ownersNote: string;
  contact: string;
}

export const drop: Store = {
  name: "VINYL DROP Records",
  dropNo: 7,
  dateLabel: "Friday 27 November 2026",
  hours: "10:00-19:00",
  address: "14 Groove Street, Bristol",
  owner: "Jo Reyes",
  pitch:
    "Twelve records, one Friday, no repress. VINYL DROP is an independent record store that drops twelve new releases on the last Friday of every month: every pressing is numbered, every sleeve is on the wall for the week, and when a title sells out it is gone. This drop has 3,800 copies across twelve titles, 1,069 of them already claimed by preorder. Two titles sold out before the doors opened. The list below is the whole drop, with the pressing, the stock and the price of every record.",
  ownersNote:
    "Thank you for queuing, preordering and flipping through the crates with us. A pressing is a promise: the number on your sleeve is the number we pressed, and we do not press more. If your record says sold out, ask at the counter about the waiting list, cancelled preorders go back on the shelf on release day, first come first served. If it says low stock, come early: the last three copies of a title never last the morning. Jo Reyes, VINYL DROP Records",
  contact: "hello@vinyldrop.example",
};

export const releases: Release[] = [
  { cat: "VD-0701", artist: "The Static Bloom", title: "Night Bus to Nowhere", genre: "Indie rock", format: "LP", pressing: 300, stock: 42, price: 28, preorders: 118, blurb: "Guitars recorded at 2 a.m. on a night bus route that no longer runs. The chorus arrives like headlights." },
  { cat: "VD-0702", artist: "Copper Kettle Club", title: "Brass and Bone", genre: "Jazz", format: "LP", pressing: 250, stock: 18, price: 26, preorders: 96, blurb: "A brass band that learned to swing in a kitchen. Trombone, tuba and a drummer who never sits down." },
  { cat: "VD-0703", artist: "Low Tide Choir", title: "Saltwater Hymnal", genre: "Folk", format: "LP", pressing: 300, stock: 0, price: 30, preorders: 141, blurb: "Four voices, one harmonium, recorded in a boathouse at low tide. Sold out before the doors opened." },
  { cat: "VD-0704", artist: "Paloma Voss", title: "Paper Moons", genre: "Dream pop", format: "7-inch", pressing: 500, stock: 203, price: 12, preorders: 64, blurb: "Two songs about paper moons and real ones. The B-side is a waltz played on a toy piano." },
  { cat: "VD-0705", artist: "The Meridian Line", title: "Longitude", genre: "Post-rock", format: "LP", pressing: 200, stock: 7, price: 32, preorders: 88, blurb: "One forty-minute track per side, built from a single guitar figure that walks east until it runs out of land." },
  { cat: "VD-0706", artist: "Fern and Fable", title: "Hedgerow", genre: "Folk", format: "LP", pressing: 300, stock: 55, price: 27, preorders: 73, blurb: "Songs written while walking the same hedgerow for a year. Fiddle, banjo and a field recording of rain." },
  { cat: "VD-0707", artist: "DJ Needlepoint", title: "Stitch in Time", genre: "Electronic", format: "12-inch", pressing: 400, stock: 129, price: 18, preorders: 52, blurb: "Four club cuts sewn from disco loops and sewing-machine percussion. The title track runs at 118 BPM, exactly." },
  { cat: "VD-0708", artist: "The Glass Bees", title: "Hive Mind", genre: "Shoegaze", format: "LP", pressing: 250, stock: 0, price: 29, preorders: 132, blurb: "Guitars like a swarm and a voice underneath it all. The second pressing sold out too. No third." },
  { cat: "VD-0709", artist: "Rosa Mar", title: "Tide Tables", genre: "Bossa nova", format: "7-inch", pressing: 500, stock: 311, price: 11, preorders: 41, blurb: "Two songs in Portuguese about tides that keep their own time. Nylon-string guitar, brushed drums, sea air." },
  { cat: "VD-0710", artist: "Operator 88", title: "Dial Tone", genre: "Synthwave", format: "LP", pressing: 300, stock: 26, price: 28, preorders: 97, blurb: "Analog synths recorded through a telephone exchange. Every track is named after a number you can still dial." },
  { cat: "VD-0711", artist: "The Winter Apples", title: "Orchard Static", genre: "Indie rock", format: "LP", pressing: 200, stock: 3, price: 31, preorders: 109, blurb: "Recorded in a cold orchard shed with the door open. Three copies left, and one of them has a dented corner." },
  { cat: "VD-0712", artist: "The Long Exhale", title: "Slow Parade", genre: "Ambient", format: "LP", pressing: 300, stock: 88, price: 26, preorders: 58, blurb: "A parade that walks at half speed. Tape loops, a cello, and the sound of a marching band heard from three streets away." },
];

export const preorders: Preorder[] = [
  { order: "VD-ORD-701", customer: "Priya", cat: "VD-0701", quantity: 1, fulfilment: "Pickup" },
  { order: "VD-ORD-702", customer: "Marcus", cat: "VD-0702", quantity: 1, fulfilment: "Pickup" },
  { order: "VD-ORD-703", customer: "Ines", cat: "VD-0703", quantity: 1, fulfilment: "Ship" },
  { order: "VD-ORD-704", customer: "Tom", cat: "VD-0704", quantity: 2, fulfilment: "Pickup" },
  { order: "VD-ORD-705", customer: "Aisha", cat: "VD-0705", quantity: 1, fulfilment: "Ship" },
  { order: "VD-ORD-706", customer: "Leo", cat: "VD-0706", quantity: 1, fulfilment: "Pickup" },
  { order: "VD-ORD-707", customer: "Sofia", cat: "VD-0707", quantity: 1, fulfilment: "Ship" },
  { order: "VD-ORD-708", customer: "Ben", cat: "VD-0708", quantity: 1, fulfilment: "Pickup" },
  { order: "VD-ORD-709", customer: "Clara", cat: "VD-0709", quantity: 2, fulfilment: "Pickup" },
  { order: "VD-ORD-710", customer: "Noah", cat: "VD-0710", quantity: 1, fulfilment: "Ship" },
  { order: "VD-ORD-711", customer: "Maya", cat: "VD-0711", quantity: 1, fulfilment: "Pickup" },
  { order: "VD-ORD-712", customer: "Owen", cat: "VD-0712", quantity: 1, fulfilment: "Pickup" },
];

export const samplePreorder: Preorder = preorders[0];

/** The batch takes the first N preorders, in order number order, deterministic. */
export function makePreorders(count: number): Preorder[] {
  return preorders.slice(0, count);
}

export function releaseFor(cat: string): Release {
  const found = releases.find((r) => r.cat === cat);
  if (!found) throw new Error(`No release with catalogue number ${cat}`);
  return found;
}

export function stockStatus(r: Release): StockStatus {
  if (r.stock === 0) return "sold-out";
  if (r.stock <= 20) return "low-stock";
  return "in-stock";
}

export const STATUS_LABELS: Record<StockStatus, string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "sold-out": "Sold out",
};

export const STATUS_COLORS: Record<StockStatus, string> = {
  "in-stock": "#166534",
  "low-stock": "#92400e",
  "sold-out": "#991b1b",
};

export function countByStatus(status: StockStatus): number {
  return releases.filter((r) => stockStatus(r) === status).length;
}

export function totalPressing(): number {
  return releases.reduce((sum, r) => sum + r.pressing, 0);
}

export function totalStock(): number {
  return releases.reduce((sum, r) => sum + r.stock, 0);
}

export function totalPreorders(): number {
  return releases.reduce((sum, r) => sum + r.preorders, 0);
}

/** Preorder value in dollars: every preorder, at its record's price. */
export function preorderValue(): number {
  return releases.reduce((sum, r) => sum + r.preorders * r.price, 0);
}

/** Stock value in dollars: every copy still on the shelf, at its record's price. */
export function stockValue(): number {
  return releases.reduce((sum, r) => sum + r.stock * r.price, 0);
}

/** Releases with twenty or fewer copies left. */
export function lowStockReleases(): Release[] {
  return releases.filter((r) => r.stock > 0 && r.stock <= 20);
}

export function soldOutReleases(): Release[] {
  return releases.filter((r) => r.stock === 0);
}
