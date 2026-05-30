module.exports = ({ config }) => ({
  ...config,
  extra: {
    anthropicApiKey: process.env.ANTHROPIC_API_KEY ?? "",
    khayaApiKey: process.env.KHAYA_API_KEY ?? "",
    analyticsEndpoint:
      process.env.ANALYTICS_ENDPOINT ??
      process.env.EXPO_PUBLIC_ANALYTICS_ENDPOINT ??
      "",
  },
});
