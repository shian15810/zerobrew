import fs from "node:fs";
import path from "node:path";

function readRootFile(fileName) {
  const candidates = [
    path.join(process.cwd(), "..", fileName),
    path.join(process.cwd(), fileName),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return fs.readFileSync(candidate, "utf8");
    }
  }

  return `> Source file not found: ${fileName}`;
}

function stripFirstH1(markdown) {
  return markdown.replace(/^#\s+.+\n+/, "");
}

export default {
  contributing: stripFirstH1(readRootFile("CONTRIBUTING.md")),
  security: stripFirstH1(readRootFile("SECURITY.MD")),
  codeOfConduct: stripFirstH1(readRootFile("CODE_OF_CONDUCT.md")),
};
