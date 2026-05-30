import { useEffect, useState } from "react";
import * as Network from "expo-network";

function isOfflineState(state: Network.NetworkState) {
  const reachable =
    typeof state.isInternetReachable === "boolean"
      ? state.isInternetReachable
      : state.isConnected;
  return reachable === false;
}

export function useNetworkStatus() {
  const [isOffline, setIsOffline] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const initial = await Network.getNetworkStateAsync();
        if (mounted) {
          setIsOffline(isOfflineState(initial));
          setReady(true);
        }
      } catch {
        if (mounted) {
          setIsOffline(false);
          setReady(true);
        }
      }
    };

    load();

    const subscription = Network.addNetworkStateListener((state) => {
      setIsOffline(isOfflineState(state));
      setReady(true);
    });

    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  return { isOffline, ready };
}
