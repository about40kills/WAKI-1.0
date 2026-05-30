import khayaApi from "@/services/khaya/khayaClient";
import type { LanguageCode } from "@/types/language";

/** Khaya ASR language codes (Ghana NLP). */
const KHAYA_ASR_CODE: Record<LanguageCode, string> = {
  tw: "tw",
  en: "en",
  gaa: "gaa",
  ee: "ee",
  dag: "dag",
};

function buildFormData(fileUri: string) {
  const formData = new FormData();
  formData.append("audio", {
    uri: fileUri,
    type: "audio/m4a",
    name: "recording.m4a",
  } as unknown as Blob);
  return formData;
}

export async function transcribeAudio(
  fileUri: string,
  language: LanguageCode
): Promise<string> {
  const lang = KHAYA_ASR_CODE[language];

  const run = (withLangParam: boolean) =>
    khayaApi.post("/asr", buildFormData(fileUri), {
      headers: { "Content-Type": "multipart/form-data" },
      ...(withLangParam ? { params: { language: lang } } : {}),
      timeout: 10000,
    });

  try {
    const res = await run(true);
    return res.data?.text ?? "";
  } catch {
    if (language === "tw") {
      try {
        const res = await run(false);
        return res.data?.text ?? "";
      } catch {
        return "";
      }
    }
    return "";
  }
}

/** @deprecated Use transcribeAudio(uri, "tw") */
export async function transcribeTwiAudio(fileUri: string): Promise<string> {
  return transcribeAudio(fileUri, "tw");
}
