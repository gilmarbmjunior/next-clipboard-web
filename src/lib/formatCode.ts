import prettier from "prettier";
import { stripComments } from "./stripComments";

export async function formatCode(code: string): Promise<string> {
  const stripped = stripComments(code);
  const parsers = ["typescript", "babel", "json", "html", "css"];
  for (const parser of parsers) {
    try {
      return await prettier.format(stripped, { parser });
    } catch {
      // try next parser
    }
  }
  return stripped;
}
