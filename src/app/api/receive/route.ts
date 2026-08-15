import { promises as fs } from "fs";
import {
  cleanupStalePins,
  isValidPin,
  pinFilePath,
} from "@/lib/pinStore";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  await cleanupStalePins();

  const pin = new URL(request.url).searchParams.get("pin");
  if (!isValidPin(pin)) {
    return Response.json({ text: "" }, { status: 400 });
  }

  try {
    const text = await fs.readFile(pinFilePath(pin), "utf-8");
    return Response.json({ pin, text });
  } catch {
    return Response.json({ text: "" }, { status: 404 });
  }
}
