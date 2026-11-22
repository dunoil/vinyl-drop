import { mkdir, writeFile } from "node:fs/promises";
import { render, validate, formatDiagnostics } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import PreorderEmail from "../templates/preorder-email";
import InvoiceDocument from "../templates/invoice-document";
import { CoverCard } from "../templates/cover-card";
import { drop, makePreorders, releases } from "../src/data/drop";
import {
  countByStatus,
  preorderValue,
  stockValue,
  totalPreorders,
  totalPressing,
  totalStock,
} from "../src/data/drop";

/**
 * The batch: one drop file -> a personalised preorder email for
 * every preorder, the five-page invoice and stock-sheet PDF, and
 * thirteen cover-art cards (the drop cover + one per release).
 *
 *   npm run make               12 preorder emails + invoice PDF + 13 cards
 *   npm run make:sample        4 emails, for a quick look
 *
 * The gate runs first: the preorder email is validated before a single
 * file is written, so one bad drop entry never becomes 12 bad emails.
 * Preorder generation is deterministic, a corrections run re-renders
 * only the records that changed.
 */
const arg = process.argv.indexOf("--count");
const count = arg >= 0 ? Number(process.argv[arg + 1]) : 12;
const started = Date.now();

const gate = validate(<PreorderEmail />);
if (!gate.valid) {
  console.error(formatDiagnostics(gate.diagnostics));
  process.exit(1);
}

await mkdir("out/preorders", { recursive: true });
const orders = makePreorders(count);
let emails = 0;
for (const preorder of orders) {
  const { html, text } = await render(
    <PreorderEmail preorder={preorder} />,
  );
  const stem = `out/preorders/${preorder.order.toLowerCase()}`;
  await writeFile(`${stem}.html`, html);
  if (text) await writeFile(`${stem}.txt`, text);
  emails++;
}

const pdf = await renderPdf(<InvoiceDocument />);
await writeFile("out/invoice.pdf", pdf.pdf);
const pdfText = Buffer.from(pdf.pdf).toString("latin1");
const invoicePages = (pdfText.match(/\/Type\s*\/Page[^s]/g) || []).length;

let cards = 0;
const bold = "assets/fonts/Inter-Bold.woff";
const regular = "assets/fonts/Inter-Regular.woff";
if (existsSync(bold) && existsSync(regular)) {
  const fonts = [
    { family: "Inter", src: await readFile(regular), weight: 400 as const },
    { family: "Inter", src: await readFile(bold), weight: 700 as const },
  ];
  const { image: cover } = await renderImage(<CoverCard />, { fonts });
  await writeFile("out/preorders/card-cover.png", cover);
  cards++;
  for (const release of releases) {
    const { image } = await renderImage(<CoverCard release={release} />, {
      fonts,
    });
    await writeFile(
      `out/preorders/card-${release.cat.toLowerCase()}.png`,
      image,
    );
    cards++;
  }
} else {
  console.log("cards skipped: add Inter font files to assets/fonts/ (see its README)");
}

const summary = {
  drop: `${drop.name}, Drop ${drop.dropNo} (${drop.dateLabel})`,
  emails,
  releases: releases.length,
  inStock: countByStatus("in-stock"),
  lowStock: countByStatus("low-stock"),
  soldOut: countByStatus("sold-out"),
  totalPressing: totalPressing(),
  totalStock: totalStock(),
  totalPreorders: totalPreorders(),
  preorderValue: preorderValue(),
  stockValue: stockValue(),
  invoicePages,
  cards,
  seconds: Math.round((Date.now() - started) / 100) / 10,
};
await writeFile("out/batch.json", JSON.stringify(summary, null, 2) + "\n");
console.log(JSON.stringify(summary, null, 2));
