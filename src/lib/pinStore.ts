import { promises as fs } from "fs";
import path from "path";

const publicDir = path.join(process.cwd(), "public");
const PIN_PATTERN = /^\d{6}\.txt$/;
const HEARTBEAT_TIMEOUT_MS = 20_000;
const CLEANUP_INTERVAL_MS = 4_000;

export const isValidPin = (pin: unknown): pin is string =>
  typeof pin === "string" && /^\d{6}$/.test(pin);

export const pinFilePath = (pin: string) => path.join(publicDir, `${pin}.txt`);

export async function cleanupStalePins() {
  let entries: string[];
  try {
    entries = await fs.readdir(publicDir);
  } catch {
    return;
  }

  const now = Date.now();

  await Promise.all(
    entries.map(async (name) => {
      if (!PIN_PATTERN.test(name)) return;
      const file = path.join(publicDir, name);
      try {
        const stat = await fs.stat(file);
        if (now - stat.mtimeMs > HEARTBEAT_TIMEOUT_MS) {
          await fs.unlink(file);
        }
      } catch {
        // already removed
      }
    }),
  );
}

if (typeof process !== "undefined" && process.env.NEXT_RUNTIME !== "edge") {
  setInterval(cleanupStalePins, CLEANUP_INTERVAL_MS).unref();
}
