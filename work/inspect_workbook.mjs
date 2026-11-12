import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = process.argv[2];
const blob = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(blob);

console.log((await workbook.inspect({
  kind: "workbook,sheet,table",
  maxChars: 12000,
  tableMaxRows: 12,
  tableMaxCols: 20,
  tableMaxCellChars: 120,
})).ndjson);

for (const name of ["曹子建", "曹子", "子建"]) {
  console.log(`\n--- MATCH: ${name} ---`);
  console.log((await workbook.inspect({
    kind: "match",
    searchTerm: name,
    options: { useRegex: false, maxResults: 50 },
    maxChars: 12000,
  })).ndjson);
}
