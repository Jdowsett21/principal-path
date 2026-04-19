import * as Crypto from "expo-crypto";
import * as FileSystem from "expo-file-system";

const API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const MODEL = "tts-1-hd";
const DEFAULT_VOICE = "nova";

export const OPENAI_VOICES = ["nova", "shimmer", "alloy", "echo", "fable", "onyx"] as const;
export type OpenAiVoice = (typeof OPENAI_VOICES)[number];

export function hasOpenAiKey(): boolean {
  return typeof API_KEY === "string" && API_KEY.length > 10;
}

const CACHE_DIR = `${FileSystem.cacheDirectory ?? ""}tts/`;

async function ensureDir(): Promise<void> {
  const info = await FileSystem.getInfoAsync(CACHE_DIR);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(CACHE_DIR, { intermediates: true });
  }
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(
      null,
      Array.from(bytes.subarray(i, i + chunk))
    );
  }
  // eslint-disable-next-line no-undef
  return (globalThis as { btoa?: (s: string) => string }).btoa!(binary);
}

export async function synthesizeLine(
  text: string,
  voice: OpenAiVoice = DEFAULT_VOICE
): Promise<string> {
  console.log("[TTS] synthesizeLine start", {
    voice,
    hasKey: !!API_KEY,
    keyPrefix: API_KEY ? API_KEY.slice(0, 7) : "(none)",
    textLen: text.length
  });
  if (!API_KEY) {
    console.warn("[TTS] no API key in env");
    throw new Error("OpenAI API key not set");
  }
  await ensureDir();

  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${MODEL}|${voice}|${text}`
  );
  const fileUri = `${CACHE_DIR}${hash}.mp3`;
  const info = await FileSystem.getInfoAsync(fileUri);
  if (info.exists && info.size && info.size > 0) {
    console.log("[TTS] cache hit", fileUri);
    return fileUri;
  }

  console.log("[TTS] fetching from OpenAI...");
  let res: Response;
  try {
    res = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        voice,
        input: text,
        response_format: "mp3"
      })
    });
  } catch (netErr) {
    console.error("[TTS] network error", netErr);
    throw netErr;
  }
  console.log("[TTS] response status", res.status);
  if (res.status === 429) {
    const errText = await res.text().catch(() => "");
    const match = errText.match(/try again in (\d+)s/i);
    const waitMs = match ? Math.min(parseInt(match[1]!, 10) * 1000 + 500, 30000) : 8000;
    console.warn(`[TTS] rate limited, retrying in ${waitMs}ms`);
    await new Promise((r) => setTimeout(r, waitMs));
    res = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ model: MODEL, voice, input: text, response_format: "mp3" })
    });
    console.log("[TTS] retry status", res.status);
  }
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error("[TTS] API error body:", errText);
    throw new Error(`OpenAI TTS ${res.status}: ${errText.slice(0, 500)}`);
  }
  const buffer = await res.arrayBuffer();
  console.log("[TTS] got mp3, bytes:", buffer.byteLength);
  const base64 = bytesToBase64(new Uint8Array(buffer));
  await FileSystem.writeAsStringAsync(fileUri, base64, {
    encoding: FileSystem.EncodingType.Base64
  });
  console.log("[TTS] wrote cache file", fileUri);
  return fileUri;
}
