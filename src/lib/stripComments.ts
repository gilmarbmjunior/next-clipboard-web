export function stripComments(code: string): string {
  let result = "";
  let i = 0;
  const n = code.length;
  let skipSpaces = false;

  while (i < n) {
    const c = code[i];
    const next = code[i + 1];

    if (skipSpaces && (c === " " || c === "\t")) {
      i++;
      continue;
    }
    skipSpaces = false;

    if (c === "/" && next === "/") {
      while (i < n && code[i] !== "\n" && code[i] !== "\r") i++;
      continue;
    }

    if (c === "/" && next === "*") {
      i += 2;
      let hadNewline = false;
      while (i < n && !(code[i] === "*" && code[i + 1] === "/")) {
        if (code[i] === "\n" || code[i] === "\r") hadNewline = true;
        i++;
      }
      const after = code[i + 2];
      i += 2;
      if (!hadNewline) {
        const before = result[result.length - 1];
        const isWs = (ch: string | undefined) => !ch || /\s/.test(ch);
        if (isWs(before) && isWs(after)) {
          result = result.replace(/[ \t]+$/, "") + " ";
          skipSpaces = true;
        } else if (before !== undefined && after !== undefined && !isWs(before) && !isWs(after)) {
          result += " ";
        }
      }
      continue;
    }

    if (c === '"' || c === "'") {
      const quote = c;
      result += c;
      i++;
      while (i < n) {
        if (code[i] === "\\" && i + 1 < n) {
          result += code[i] + code[i + 1];
          i += 2;
          continue;
        }
        result += code[i];
        i++;
        if (code[i - 1] === quote) break;
      }
      continue;
    }

    if (c === "`") {
      result += c;
      i++;
      while (i < n) {
        if (code[i] === "\\" && i + 1 < n) {
          result += code[i] + code[i + 1];
          i += 2;
          continue;
        }
        result += code[i];
        i++;
        if (code[i - 1] === "`") break;
      }
      continue;
    }

    result += c;
    i++;
  }

  return result
    .split(/\r?\n/)
    .map((line) => line.replace(/[ \t]+$/, ""))
    .join("\n");
}
