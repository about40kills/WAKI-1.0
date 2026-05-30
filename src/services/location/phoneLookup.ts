import axios from "axios";

/**
 * Ghana phone number patterns:
 *  +233 XX XXX XXXX  |  0XX XXX XXXX  |  0XX-XXX-XXXX  |  +233XXXXXXXXX
 *  Also match numbers with dots/dashes/spaces as separators.
 */
const GHANA_PHONE_RE =
  /(?:\+233[\s.-]?\d{2}[\s.-]?\d{3}[\s.-]?\d{4})|(?:0[235]\d[\s.-]?\d{3}[\s.-]?\d{4})/g;

/**
 * Search DuckDuckGo HTML for a facility's phone number.
 * Best-effort — returns null if nothing found.
 */
export async function lookupPhone(facilityName: string): Promise<string | null> {
  const query = `${facilityName} Ghana phone number contact`;
  try {
    const { data: html } = await axios.get<string>(
      "https://html.duckduckgo.com/html/",
      {
        params: { q: query },
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
        },
        timeout: 8000,
        responseType: "text",
      },
    );

    // Strip HTML tags to get raw text for easier matching
    const text = html.replace(/<[^>]+>/g, " ");
    const matches = text.match(GHANA_PHONE_RE);
    if (!matches || matches.length === 0) return null;

    // Normalise the first match: collapse whitespace/dashes
    return normalise(matches[0]);
  } catch {
    return null;
  }
}

/** Normalise a raw phone string into a clean format like +233 XX XXX XXXX. */
function normalise(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");

  // Convert local format (0XX...) to international (+233 XX...)
  if (digits.startsWith("0") && digits.length === 10) {
    const intl = "+233" + digits.slice(1);
    return format(intl);
  }
  if (digits.startsWith("+233") && digits.length === 13) {
    return format(digits);
  }
  // Fallback: return cleaned-up original
  return raw.replace(/\s+/g, " ").trim();
}

function format(intl: string): string {
  // +233 XX XXX XXXX
  const d = intl.replace("+", "");
  return `+${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8)}`;
}
