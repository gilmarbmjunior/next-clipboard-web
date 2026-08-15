import { formatCode } from "@/lib/formatCode";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    const formatted = await formatCode(String(text));
    return Response.json({ text: formatted });
  } catch {
    return Response.json({ text: "" }, { status: 500 });
  }
}
