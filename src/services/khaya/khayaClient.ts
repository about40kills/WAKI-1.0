import axios from "axios";
import Constants from "expo-constants";

const khayaApi = axios.create({
  baseURL: "https://translation.ghananlp.org/v1",
  timeout: 15000,
});

khayaApi.interceptors.request.use((config) => {
  const extra = Constants.expoConfig?.extra as { khayaApiKey?: string } | undefined;
  config.headers["Ocp-Apim-Subscription-Key"] = extra?.khayaApiKey ?? "";
  return config;
});

khayaApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status as number | undefined;
    const config = error?.config as (typeof error.config & { __retryCount?: number }) | undefined;
    if (!config || status !== 429) {
      throw error;
    }
    const retries = config.__retryCount ?? 0;
    if (retries >= 3) {
      throw error;
    }
    config.__retryCount = retries + 1;
    const delayMs = 1000 * 2 ** retries;
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    return khayaApi(config);
  }
);

export default khayaApi;
