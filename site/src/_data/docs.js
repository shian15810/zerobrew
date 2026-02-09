import fs from "node:fs";
import path from "node:path";

const DOCS_ROOT = path.join(process.cwd(), "src", "docs");

function toTitle(value) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function extractFrontmatterTitle(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const titleMatch = match[1].match(/^title:\s*(.+)$/m);
  if (!titleMatch) return null;

  return titleMatch[1].trim().replace(/^['"]|['"]$/g, "");
}

function toHref(relativePath) {
  if (relativePath === "index.md") return "/docs/";

  const noExt = relativePath.replace(/\.md$/, "");
  if (noExt.endsWith("/index")) {
    return `/docs/${noExt.slice(0, -"/index".length)}/`;
  }

  return `/docs/${noExt}/`;
}

function walkMarkdownFiles(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith("_")) continue;

    const absolute = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(absolute));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(absolute);
    }
  }

  return files;
}

export default function () {
  if (!fs.existsSync(DOCS_ROOT)) {
    return { groups: [] };
  }

  const files = walkMarkdownFiles(DOCS_ROOT);
  const grouped = new Map();

  for (const filePath of files) {
    const relativePath = path.relative(DOCS_ROOT, filePath).split(path.sep).join("/");
    const segments = relativePath.split("/");

    const groupKey = segments.length > 1 ? segments[0] : "_root";
    const groupTitle = groupKey === "_root" ? "General" : toTitle(groupKey);

    const basename = path.basename(relativePath, ".md");
    const fallbackTitle = basename === "index" ? groupTitle : toTitle(basename);

    const page = {
      title: extractFrontmatterTitle(filePath) || fallbackTitle,
      href: toHref(relativePath),
      source: relativePath,
    };

    if (!grouped.has(groupKey)) {
      grouped.set(groupKey, { title: groupTitle, pages: [] });
    }

    grouped.get(groupKey).pages.push(page);
  }

  const groups = [...grouped.entries()]
    .sort(([a], [b]) => {
      if (a === "_root") return -1;
      if (b === "_root") return 1;
      return a.localeCompare(b);
    })
    .map(([, group]) => {
      group.pages.sort((left, right) => {
        const leftIsIndex = left.source.endsWith("/index.md") || left.source === "index.md";
        const rightIsIndex = right.source.endsWith("/index.md") || right.source === "index.md";

        if (leftIsIndex && !rightIsIndex) return -1;
        if (!leftIsIndex && rightIsIndex) return 1;

        return left.title.localeCompare(right.title);
      });

      return {
        title: group.title,
        pages: group.pages.map(({ title, href }) => ({ title, href })),
      };
    });

  return { groups };
}
