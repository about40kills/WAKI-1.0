import { useMemo, useEffect, useRef, useState, useCallback } from "react";
import { ActivityIndicator, Alert, BackHandler, Linking, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaWrapper } from "@/components/shared/SafeAreaWrapper";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { CRISIS_CONTACTS } from "@/constants/crisisContacts";
import type { AppColors } from "@/constants/colors";
import { useThemeColors, useThemeMode } from "@/theme/ThemeProvider";
import { useLanguage } from "@/hooks/useLanguage";
import { findNearbyFacilities, type NearbyFacility } from "@/services/location/nearbyFacilities";

function getStyles(colors: AppColors, isDark: boolean) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      padding: 24,
      paddingBottom: 48,
    },
    heroRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 8,
    },
    headline: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.primary,
    },
    subline: {
      fontSize: 15,
      color: colors.textMuted,
      marginBottom: 28,
      lineHeight: 22,
    },
    safetyCard: {
      backgroundColor: colors.surfaceWarm,
      borderRadius: 16,
      padding: 20,
      marginBottom: 32,
    },
    safetyQuestion: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 16,
    },
    safetyBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingVertical: 14,
      borderRadius: 12,
      marginBottom: 10,
    },
    safeBtn: {
      backgroundColor: colors.primary,
    },
    helpBtn: {
      backgroundColor: colors.crisis,
    },
    safetyBtnText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "700",
    },
    contactsHeader: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.textMuted,
      textTransform: "uppercase",
      letterSpacing: 0.8,
      marginBottom: 12,
    },
    contactCard: {
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 16,
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDark ? 0.4 : 0.07,
      shadowRadius: 4,
      elevation: 2,
    },
    contactInfo: {
      flex: 1,
    },
    contactName: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 2,
    },
    contactNotes: {
      fontSize: 12,
      color: colors.textMuted,
      marginBottom: 4,
    },
    contactNumber: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: "500",
    },
    callBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: colors.primary,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 10,
      marginLeft: 12,
    },
    callBtnText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 14,
    },
    footer: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
      marginTop: 24,
      padding: 16,
      backgroundColor: colors.crisisBg,
      borderRadius: 10,
    },
    footerText: {
      flex: 1,
      fontSize: 12,
      color: colors.crisis,
      lineHeight: 18,
    },
    nearbyBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingVertical: 14,
      borderRadius: 12,
      backgroundColor: colors.primary,
      marginBottom: 20,
    },
    nearbyBtnText: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "700",
    },
    nearbyError: {
      fontSize: 13,
      color: colors.textMuted,
      marginBottom: 16,
      textAlign: "center",
    },
    facilityBadge: {
      alignSelf: "flex-start",
      backgroundColor: "transparent",
      paddingHorizontal: 0,
      paddingVertical: 2,
      borderRadius: 6,
      marginBottom: 4,
    },
    facilityBadgeText: {
      fontSize: 10,
      fontWeight: "600",
      color: colors.primary,
      textTransform: "uppercase",
    },
    nameRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    facilityDistance: {
      fontSize: 12,
      color: colors.textMuted,
    },
  });
}

export default function CrisisScreen() {
  const router = useRouter();
  const contactsRef = useRef<ScrollView>(null);
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const { t } = useLanguage();
  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  const [nearbyFacilities, setNearbyFacilities] = useState<NearbyFacility[]>([]);
  const [nearbyLoading, setNearbyLoading] = useState(false);
  const [nearbyError, setNearbyError] = useState<string | null>(null);
  const [nearbySearched, setNearbySearched] = useState(false);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => true);
    return () => sub.remove();
  }, []);

  const handleSafe = () => {
    router.replace("/(tabs)/home");
  };

  const handleCall = async (number: string) => {
    try {
      const cleaned = number.replace(/\s+/g, "");
      const url = `tel:${cleaned}`;
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          "Call not supported",
          `Your device cannot make phone calls. Please dial this number manually: ${number}`
        );
      }
    } catch (error) {
      Alert.alert("Error", "Could not start the call.");
    }
  };

  const handleFindNearby = useCallback(async () => {
    setNearbyLoading(true);
    setNearbyError(null);
    const result = await findNearbyFacilities();
    setNearbyLoading(false);
    setNearbySearched(true);

    if (result.status === "permission_denied") {
      setNearbyError("Location permission denied. Please enable it in Settings.");
    } else if (result.status === "unavailable") {
      setNearbyError(result.message);
    } else {
      setNearbyFacilities(result.facilities);
      if (result.facilities.length === 0) {
        setNearbyError("No facilities found within 10 km.");
      }
    }
  }, []);

  const handleOpenMaps = async (facility: NearbyFacility) => {
    const { latitude, longitude, name } = facility;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      Alert.alert("Location unavailable", "This place does not have map coordinates yet.");
      return;
    }
    const label = encodeURIComponent(name);
    // Do not use maps:0,0 — that literal center is 0°N 0°E (Gulf of Guinea).
    const url = Platform.select({
      ios: `maps://maps.apple.com/?ll=${latitude},${longitude}&q=${label}`,
      default: `geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`,
    });
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert("Maps", "Could not open Maps for this location.");
    }
  };

  return (
    <SafeAreaWrapper>
      <ScrollView
        ref={contactsRef}
        style={styles.screen}
        contentContainerStyle={styles.container}
      >
        <ScreenHeader />
        <View style={styles.heroRow}>
          <Ionicons name="heart" size={28} color={colors.primary} />
          <Text style={styles.headline}>{t("crisis.headline")}</Text>
        </View>
        <Text style={styles.subline}>
          {t("crisis.subline")}
        </Text>

        <View style={styles.safetyCard}>
          <Text style={styles.safetyQuestion}>{t("crisis.safetyQuestion")}</Text>

          <Pressable
            onPress={handleSafe}
            style={[styles.safetyBtn, styles.safeBtn]}
            android_ripple={{ color: "rgba(255,255,255,0.2)" }}
          >
            <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
            <Text style={styles.safetyBtnText}>{t("crisis.yesSafe")}</Text>
          </Pressable>

          <Pressable
            onPress={() =>
              contactsRef.current?.scrollToEnd({ animated: true })
            }
            style={[styles.safetyBtn, styles.helpBtn]}
            android_ripple={{ color: "rgba(255,255,255,0.2)" }}
          >
            <Ionicons name="call-outline" size={18} color="#fff" />
            <Text style={styles.safetyBtnText}>{t("crisis.getHelp")}</Text>
          </Pressable>
        </View>

        <Text style={styles.contactsHeader}>{t("crisis.contactsHeader")}</Text>

        {CRISIS_CONTACTS.map((c) => {
          const isMultiNumber = c.number.includes("/");
          return (
            <View key={c.name} style={styles.contactCard}>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{c.name}</Text>
                <Text style={styles.contactNotes}>{c.notes}</Text>
                <Text style={styles.contactNumber}>{c.number}</Text>
              </View>
              {!isMultiNumber && (
                <Pressable
                  onPress={() => handleCall(c.number)}
                  style={styles.callBtn}
                  android_ripple={{ color: "rgba(255,255,255,0.15)" }}
                >
                  <Ionicons name="call" size={16} color="#fff" />
                  <Text style={styles.callBtnText}>{t("crisis.callNow")}</Text>
                </Pressable>
              )}
            </View>
          );
        })}

        {/* Nearby facilities */}
        <Text style={[styles.contactsHeader, { marginTop: 24 }]}>
          {t("crisis.nearbyHelp")}
        </Text>

        {!nearbySearched && !nearbyLoading && (
          <Pressable
            onPress={handleFindNearby}
            style={styles.nearbyBtn}
            android_ripple={{ color: "rgba(255,255,255,0.2)" }}
          >
            <Ionicons name="location-outline" size={18} color="#fff" />
            <Text style={styles.nearbyBtnText}>{t("crisis.findHospitals")}</Text>
          </Pressable>
        )}

        {nearbyLoading && (
          <ActivityIndicator
            size="small"
            color={colors.primary}
            style={{ marginBottom: 16 }}
          />
        )}

        {nearbyError && <Text style={styles.nearbyError}>{nearbyError}</Text>}

        {nearbyFacilities.map((f, i) => (
          <Pressable
            key={`${f.name}-${i}`}
            style={styles.contactCard}
            onPress={() => handleOpenMaps(f)}
          >
            <View style={styles.contactInfo}>
              <View style={styles.facilityBadge}>
                <Text style={styles.facilityBadgeText}>
                  {f.type === "mental_health" ? "Mental Health" : "Hospital"}
                </Text>
              </View>
              <View style={styles.nameRow}>
                <Text style={styles.contactName}>{f.name}</Text>
                <Ionicons name="navigate-outline" size={14} color={colors.primary} />
              </View>
              <Text style={styles.facilityDistance}>
                {f.distance < 1000
                  ? `${Math.round(f.distance)} m away`
                  : `${(f.distance / 1000).toFixed(1)} km away`}
              </Text>
              {f.phone && (
                <Text style={styles.contactNumber}>{f.phone}</Text>
              )}
            </View>
            {f.phone && (
              <Pressable
                onPress={() => handleCall(f.phone!)}
                style={styles.callBtn}
                android_ripple={{ color: "rgba(255,255,255,0.15)" }}
              >
                <Ionicons name="call" size={16} color="#fff" />
                <Text style={styles.callBtnText}>{t("crisis.callNow")}</Text>
              </Pressable>
            )}
          </Pressable>
        ))}

        <View style={styles.footer}>
          <Ionicons name="information-circle-outline" size={16} color={colors.crisis} />
          <Text style={styles.footerText}>
            {t("crisis.footer")}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}
