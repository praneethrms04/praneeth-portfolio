const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const inline = (s: string) => {
  let out = escapeHtml(s);
  out = out.replace(
    /`([^`]+)`/g,
    '<code class="px-1.5 py-0.5 rounded bg-white/10 text-blue-300 text-[0.9em]">$1</code>',
  );
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  out = out.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline underline-offset-2 hover:text-blue-300">$1</a>',
  );
  return out;
};

export function renderMarkdown(src: string): string {
  if (!src) return "";

  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];

  let i = 0;
  let inCode = false;
  let codeBuffer: string[] = [];
  let codeLang = "";
  let listType: "ul" | "ol" | null = null;
  let paraBuffer: string[] = [];

  const flushPara = () => {
    if (paraBuffer.length) {
      html.push(`<p>${inline(paraBuffer.join(" "))}</p>`);
      paraBuffer = [];
    }
  };
  const closeList = () => {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      flushPara();
      closeList();
      if (!inCode) {
        inCode = true;
        codeLang = line.slice(3).trim();
        codeBuffer = [];
      } else {
        html.push(
          `<pre class="rounded-lg bg-zinc-900/80 border border-white/10 p-4 overflow-x-auto"><code class="text-sm text-gray-200" data-lang="${escapeHtml(
            codeLang,
          )}">${escapeHtml(codeBuffer.join("\n"))}</code></pre>`,
        );
        inCode = false;
      }
      i++;
      continue;
    }
    if (inCode) {
      codeBuffer.push(line);
      i++;
      continue;
    }

    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      flushPara();
      closeList();
      const level = h[1].length;
      const sizes = [
        "text-4xl",
        "text-3xl",
        "text-2xl",
        "text-xl",
        "text-lg",
        "text-base",
      ];
      html.push(
        `<h${level} class="text-white font-bold ${sizes[level - 1]} mt-8 mb-3">${inline(h[2])}</h${level}>`,
      );
      i++;
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      flushPara();
      closeList();
      const quoteLines: string[] = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      html.push(
        `<blockquote class="border-l-2 border-blue-400 pl-4 my-4 text-gray-300 italic">${inline(
          quoteLines.join(" "),
        )}</blockquote>`,
      );
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      flushPara();
      if (listType !== "ul") {
        closeList();
        html.push('<ul class="list-disc pl-6 my-4 space-y-1 text-gray-300">');
        listType = "ul";
      }
      html.push(`<li>${inline(line.replace(/^\s*[-*]\s+/, ""))}</li>`);
      i++;
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      flushPara();
      if (listType !== "ol") {
        closeList();
        html.push('<ol class="list-decimal pl-6 my-4 space-y-1 text-gray-300">');
        listType = "ol";
      }
      html.push(`<li>${inline(line.replace(/^\s*\d+\.\s+/, ""))}</li>`);
      i++;
      continue;
    }

    if (/^\s*$/.test(line)) {
      flushPara();
      closeList();
      i++;
      continue;
    }

    paraBuffer.push(line);
    i++;
  }

  flushPara();
  closeList();
  if (inCode && codeBuffer.length) {
    html.push(
      `<pre class="rounded-lg bg-zinc-900/80 border border-white/10 p-4 overflow-x-auto"><code class="text-sm text-gray-200">${escapeHtml(
        codeBuffer.join("\n"),
      )}</code></pre>`,
    );
  }

  return html.join("\n");
}
