import fs from "node:fs";
import path from "node:path";

const DOCS_ROOT = path.join(process.cwd(), "src", "docs");

function toTitle(value) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function stripQuotes(value) {
  return value.trim().replace(/^['"]|['"]$/g, "");
}

function extractFrontmatter(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const block = match[1];
  const titleMatch = block.match(/^title:\s*(.+)$/m);
  const orderMatch = block.match(/^order:\s*(\d+)$/m);

  return {
    title: titleMatch ? stripQuotes(titleMatch[1]) : null,
    order: orderMatch ? Number.parseInt(orderMatch[1], 10) : null,
  };
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
    return { root: { title: "Documentation", href: "/docs/" }, groups: [] };
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
    const frontmatter = extractFrontmatter(filePath);
    const isIndex = relativePath === "index.md" || relativePath.endsWith("/index.md");

    const page = {
      title: frontmatter.title || fallbackTitle,
      order: frontmatter.order,
      href: toHref(relativePath),
      source: relativePath,
      isIndex,
    };

    if (!grouped.has(groupKey)) {
      grouped.set(groupKey, { key: groupKey, title: groupTitle, pages: [] });
    }

    grouped.get(groupKey).pages.push(page);
  }

  const groupOrder = {
    _root: 0,
    "get-started": 1,
    "core-concepts": 2,
    commands: 3,
    guides: 4,
    community: 5,
  };

  const orderedGroups = [...grouped.entries()]
    .sort(([a], [b]) => {
      const left = groupOrder[a] ?? 99;
      const right = groupOrder[b] ?? 99;
      if (left !== right) return left - right;
      return a.localeCompare(b);
    })
    .map(([, group]) => {
      group.pages.sort((left, right) => {
        if (left.isIndex && !right.isIndex) return -1;
        if (!left.isIndex && right.isIndex) return 1;

        if (left.order != null && right.order != null) return left.order - right.order;
        if (left.order != null) return -1;
        if (right.order != null) return 1;
        return left.title.localeCompare(right.title);
      });
      return group;
    });

  const rootGroup = orderedGroups.find((group) => group.key === "_root");
  const rootPage = rootGroup?.pages.find((page) => page.isIndex) || {
    title: "Documentation",
    href: "/docs/",
  };

  const rootChildren = (rootGroup?.pages || [])
    .filter((page) => !page.isIndex)
    .map(({ title, href }) => ({ title, href }));

  const groups = orderedGroups
    .filter((group) => group.key !== "_root")
    .map((group) => {
      const parent = group.pages.find((page) => page.isIndex) || null;
      const children = group.pages.filter((page) => !page.isIndex);

      return {
        key: group.key,
        title: group.title,
        parent: parent ? { title: parent.title, href: parent.href } : null,
        children: children.map(({ title, href }) => ({ title, href })),
      };
    });

  return {
    root: { title: rootPage.title, href: rootPage.href },
    rootChildren,
    groups,
  };
}
