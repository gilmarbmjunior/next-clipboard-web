import { promises as fs } from "fs";
import path from "path";

const clipboardPath = path.join(process.cwd(), "public", "clipboard.txt");

export async function GET() {
  try {
    const text = await fs.readFile(clipboardPath, "utf-8");
    return Response.json({ text });
  } catch {
    return Response.json({ text: "" });
  }
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    await fs.writeFile(clipboardPath, String(text), "utf-8");
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
