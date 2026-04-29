import Link from "next/link";
import type { ReactNode } from "react";

type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "rule" };

function cleanInline(text: string) {
  return text
    .replace(/\\([\\.*+\-[\](){}#|>_])/g, "$1")
    .replace(/\s{2,}$/g, "");
}

function stripFormatting(text: string) {
  return cleanInline(text)
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1");
}

function renderFormatted(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const boldPattern = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = boldPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(cleanInline(text.slice(lastIndex, match.index)));
    }

    nodes.push(
      <strong key={`${keyPrefix}-bold-${match.index}`}>
        {cleanInline(match[1])}
      </strong>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(cleanInline(text.slice(lastIndex)));
  }

  return nodes.flatMap((node, index) => {
    if (typeof node !== "string") return node;

    const italicNodes: ReactNode[] = [];
    const italicPattern = /(?<!\*)\*([^*]+)\*(?!\*)/g;
    let italicLastIndex = 0;
    let italicMatch: RegExpExecArray | null;

    while ((italicMatch = italicPattern.exec(node)) !== null) {
      if (italicMatch.index > italicLastIndex) {
        italicNodes.push(cleanInline(node.slice(italicLastIndex, italicMatch.index)));
      }

      italicNodes.push(
        <em key={`${keyPrefix}-italic-${index}-${italicMatch.index}`}>
          {cleanInline(italicMatch[1])}
        </em>,
      );
      italicLastIndex = italicMatch.index + italicMatch[0].length;
    }

    if (italicLastIndex < node.length) {
      italicNodes.push(cleanInline(node.slice(italicLastIndex)));
    }

    return italicNodes;
  });
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(...renderFormatted(text.slice(lastIndex, match.index), `${keyPrefix}-text-${match.index}`));
    }

    const [, label, href] = match;
    const isExternal = href.startsWith("http");
    const className =
      "font-semibold text-dutch-orange hover:text-dutch-orange-dark underline decoration-dutch-orange/30 underline-offset-4 transition-colors";

    nodes.push(
      isExternal ? (
        <a
          key={`${keyPrefix}-link-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {renderFormatted(label, `${keyPrefix}-link-label-${match.index}`)}
        </a>
      ) : (
        <Link key={`${keyPrefix}-link-${match.index}`} href={href} className={className}>
          {renderFormatted(label, `${keyPrefix}-link-label-${match.index}`)}
        </Link>
      ),
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(...renderFormatted(text.slice(lastIndex), `${keyPrefix}-tail`));
  }

  return nodes;
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableSeparator(line: string) {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
}

function parseMarkdown(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (/^-{3,}$/.test(line)) {
      blocks.push({ type: "rule" });
      index += 1;
      continue;
    }

    const headingMatch = /^(#{1,6})\s+(.+?)(?:\s+\{#[^}]+\})?$/.exec(line);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: stripFormatting(headingMatch[2]),
      });
      index += 1;
      continue;
    }

    if (
      line.includes("|") &&
      lines[index + 1] &&
      isTableSeparator(lines[index + 1])
    ) {
      const headers = parseTableRow(line);
      const rows: string[][] = [];
      index += 2;

      while (index < lines.length && lines[index].trim().includes("|")) {
        rows.push(parseTableRow(lines[index]));
        index += 1;
      }

      blocks.push({ type: "table", headers, rows });
      continue;
    }

    if (/^[*-]\s+/.test(line)) {
      const items: string[] = [];

      while (index < lines.length && /^[*-]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[*-]\s+/, ""));
        index += 1;
      }

      blocks.push({ type: "unordered-list", items });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];

      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }

      blocks.push({ type: "ordered-list", items });
      continue;
    }

    const paragraphLines = [line];
    index += 1;

    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^-{3,}$/.test(lines[index].trim()) &&
      !/^(#{1,6})\s+/.test(lines[index].trim()) &&
      !/^[*-]\s+/.test(lines[index].trim()) &&
      !/^\d+\.\s+/.test(lines[index].trim()) &&
      !(lines[index].trim().includes("|") && lines[index + 1] && isTableSeparator(lines[index + 1]))
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
  }

  return blocks;
}

export default function MarkdownDocument({ markdown }: { markdown: string }) {
  const blocks = parseMarkdown(markdown);

  return (
    <article className="space-y-7 text-slate-700">
      {blocks.map((block, index) => {
        if (block.type === "rule") {
          return <hr key={index} className="border-slate-200" />;
        }

        if (block.type === "heading") {
          const sharedClass = "font-display font-bold text-navy-900";

          if (block.level === 1) {
            return (
              <h1 key={index} className={`${sharedClass} text-4xl md:text-5xl`}>
                {block.text}
              </h1>
            );
          }

          if (block.level === 2) {
            return (
              <h2 key={index} className={`${sharedClass} text-2xl md:text-3xl pt-4`}>
                {block.text}
              </h2>
            );
          }

          return (
            <h3 key={index} className={`${sharedClass} text-xl md:text-2xl pt-2`}>
              {block.text}
            </h3>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={index} className="leading-8">
              {renderInline(block.text, `paragraph-${index}`)}
            </p>
          );
        }

        if (block.type === "unordered-list" || block.type === "ordered-list") {
          const ListTag = block.type === "unordered-list" ? "ul" : "ol";
          return (
            <ListTag
              key={index}
              className={`space-y-3 leading-8 ${
                block.type === "unordered-list"
                  ? "list-disc pl-6"
                  : "list-decimal pl-6"
              }`}
            >
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {renderInline(item, `list-${index}-${itemIndex}`)}
                </li>
              ))}
            </ListTag>
          );
        }

        return (
          <div key={index} className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-navy-900">
                <tr>
                  {block.headers.map((header) => (
                    <th key={header} className="px-4 py-3 font-display font-semibold">
                      {renderInline(header, `table-${index}-header-${header}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {block.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-3 align-top leading-6">
                        {renderInline(cell, `table-${index}-${rowIndex}-${cellIndex}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </article>
  );
}
