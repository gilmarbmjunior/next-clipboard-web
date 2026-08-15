import { promises as fs } from "fs";
import {
  cleanupStalePins,
  isValidPin,
  pinFilePath,
} from "@/lib/pinStore";

export const dynamic = "force-dynamic";

export async function GET() {
  await cleanupStalePins();

  for (let attempt = 0; attempt < 200; attempt++) {
    const pin = String(Math.floor(Math.random() * 1_000_000)).padStart(6, "0");
    try {
      const handle = await fs.open(pinFilePath(pin), "wx");
      await handle.close();
      return Response.json({ pin });
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code;
      if (code !== "EEXIST") throw error;
    }
  }

  return Response.json({ ok: false }, { status: 500 });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const { pin, text, release } = (body ?? {}) as {
    pin?: unknown;
    text?: unknown;
    release?: unknown;
  };

  if (!isValidPin(pin)) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const file = pinFilePath(pin);

  try {
    if (release === true) {
      await fs.unlink(file);
    } else if (typeof text === "string") {
      const now = new Date();
      await fs.writeFile(file, text, "utf-8");
      await fs.utimes(file, now, now);
    } else {
      const now = new Date();
      await fs.utimes(file, now, now).catch(async () => {
        await fs.writeFile(file, "", "utf-8");
      });
    }
    await cleanupStalePins();
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
