import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { formatDiagnostics, render } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import PreorderEmail from "../templates/preorder-email";
import StorePage from "../templates/store-page";
import InvoiceDocument from "../templates/invoice-document";
import CoverCard from "../templates/cover-card";

/**
 * Render the four committed examples into out/ :
 *   preorder-email.html + .txt | store-page.html
 *   invoice.html + invoice.pdf
 *   cover-card.html (+ cover-card.png when font files are present)
 *
 * renderPdf() and renderImage() fetch nothing: fonts go in as bytes.
 * Drop Inter WOFF files into assets/fonts/ (see assets/fonts/README.md)
 * to enable the PNG; without them the script says so, plainly.
 */
await mkdir("out", { recursive: true });

const email = await render(<PreorderEmail />);
await writeFile("out/preorder-email.html", email.html);
await writeFile("out/preorder-email.txt", email.text);
console.log("preorder-email:", formatDiagnostics(email.diagnostics) || "clean");

const page = await render(<StorePage />);
await writeFile("out/store-page.html", page.html);
console.log("store-page:", formatDiagnostics(page.diagnostics) || "clean");

const bold = "assets/fonts/Inter-Bold.woff";
const regular = "assets/fonts/Inter-Regular.woff";
const hasFonts = existsSync(bold) && existsSync(regular);
const fontFiles = hasFonts
  ? [
      { family: "Inter", src: await readFile(regular), weight: 400 as const },
      { family: "Inter", src: await readFile(bold), weight: 700 as const },
    ]
  : undefined;

const doc = <InvoiceDocument />;
const printed = await render(doc);
await writeFile("out/invoice.html", printed.html);
// With no font files given, renderPdf() draws in the standard PDF fonts
// (Helvetica/Times) and warns about it in diagnostics, it never fetches.
const pdf = await renderPdf(doc, fontFiles ? { fonts: fontFiles } : undefined);
await writeFile("out/invoice.pdf", pdf.pdf);
console.log(
  "invoice: print HTML + PDF written",
  formatDiagnostics(pdf.diagnostics) || "",
);

const card = <CoverCard />;
const cardHtml = await render(card);
await writeFile("out/cover-card.html", cardHtml.html);

if (hasFonts && fontFiles) {
  const { image, diagnostics } = await renderImage(card, {
    fonts: fontFiles,
  });
  await writeFile("out/cover-card.png", image);
  console.log("cover-card PNG:", formatDiagnostics(diagnostics) || "clean");
} else {
  console.log(
    "cover-card: HTML written. PNG skipped, add Inter WOFF files to assets/fonts/ (they are passed to renderImage() as bytes; nothing is fetched).",
  );
}
