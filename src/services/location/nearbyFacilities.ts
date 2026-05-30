import * as Location from "expo-location";
import axios from "axios";
import { lookupPhone } from "./phoneLookup";

export interface NearbyFacility {
  name: string;
  type: "hospital" | "mental_health";
  phone: string | null;
  latitude: number;
  longitude: number;
  distance: number; // metres
}

/**
 * Query OpenStreetMap Overpass API for hospitals and mental-health
 * facilities within `radiusMetres` of the given coordinates.
 */
async function queryOverpass(
  lat: number,
  lon: number,
  radiusMetres: number,
): Promise<NearbyFacility[]> {
  // Search for hospitals, clinics, and facilities tagged with mental health
  const query = `
    [out:json][timeout:10];
    (
      node["amenity"="hospital"](around:${radiusMetres},${lat},${lon});
      way["amenity"="hospital"](around:${radiusMetres},${lat},${lon});
      node["amenity"="clinic"](around:${radiusMetres},${lat},${lon});
      way["amenity"="clinic"](around:${radiusMetres},${lat},${lon});
      node["healthcare"="psychologist"](around:${radiusMetres},${lat},${lon});
      way["healthcare"="psychologist"](around:${radiusMetres},${lat},${lon});
      node["healthcare"="psychiatry"](around:${radiusMetres},${lat},${lon});
      way["healthcare"="psychiatry"](around:${radiusMetres},${lat},${lon});
      node["healthcare"="counselling"](around:${radiusMetres},${lat},${lon});
      way["healthcare"="counselling"](around:${radiusMetres},${lat},${lon});
    );
    out center tags;
  `;

  const { data } = await axios.post(
    "https://overpass-api.de/api/interpreter",
    `data=${encodeURIComponent(query)}`,
    { headers: { "Content-Type": "application/x-www-form-urlencoded" }, timeout: 15000 },
  );

  const elements: Array<{
    tags?: Record<string, string>;
    lat?: number;
    lon?: number;
    center?: { lat: number; lon: number };
  }> = data?.elements ?? [];

  return elements
    .filter((el) => el.tags?.name)
    .map((el) => {
      const elLat = el.lat ?? el.center?.lat ?? lat;
      const elLon = el.lon ?? el.center?.lon ?? lon;
      const isMentalHealth =
        el.tags?.healthcare === "psychologist" ||
        el.tags?.healthcare === "psychiatry" ||
        el.tags?.healthcare === "counselling" ||
        (el.tags?.name?.toLowerCase().includes("psych") ?? false) ||
        (el.tags?.name?.toLowerCase().includes("mental") ?? false);

      return {
        name: el.tags!.name,
        type: isMentalHealth ? "mental_health" : "hospital",
        phone: el.tags?.phone ?? el.tags?.["contact:phone"] ?? null,
        latitude: elLat,
        longitude: elLon,
        distance: haversine(lat, lon, elLat, elLon),
      } satisfies NearbyFacility;
    })
    .sort((a, b) => a.distance - b.distance);
}

/** Haversine distance in metres. */
function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6_371_000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const SEARCH_RADIUS_METRES = 10_000; // 10 km

export type NearbyResult =
  | { status: "ok"; facilities: NearbyFacility[] }
  | { status: "permission_denied" }
  | { status: "unavailable"; message: string };

export async function findNearbyFacilities(): Promise<NearbyResult> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return { status: "permission_denied" };
  }

  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    const { latitude, longitude } = location.coords;
    const facilities = await queryOverpass(latitude, longitude, SEARCH_RADIUS_METRES);

    // Enrich facilities that have no phone number
    const missing = facilities.filter((f) => !f.phone);
    // Look up in parallel, capped at 6 concurrent to avoid throttling
    const BATCH = 6;
    for (let i = 0; i < missing.length; i += BATCH) {
      const batch = missing.slice(i, i + BATCH);
      const results = await Promise.allSettled(
        batch.map((f) => lookupPhone(f.name)),
      );
      results.forEach((r, idx) => {
        if (r.status === "fulfilled" && r.value) {
          batch[idx].phone = r.value;
        }
      });
    }

    return { status: "ok", facilities };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unable to find nearby facilities";
    return { status: "unavailable", message };
  }
}
