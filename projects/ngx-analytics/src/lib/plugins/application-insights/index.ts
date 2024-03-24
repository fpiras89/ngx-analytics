import {
  ApplicationInsights,
  IConfig,
  IConfiguration,
  Snippet,
} from "@microsoft/applicationinsights-web";
import { AnalyticsPlugin } from "analytics";

type applicationInsightsConfig = IConfiguration & IConfig;

const defaultConfig: applicationInsightsConfig = {};

export default function applicationInsightsPlugin(
  applicationInsightsSnippet: Snippet,
): AnalyticsPlugin {
  // ApplicationInsights singleton instance
  let ai: ApplicationInsights;
  // return object for analytics to use
  return {
    /* All plugins require a name */
    name: "ApplicationInsights",
    /* Everything else below this is optional depending on your plugin requirements */
    config: { ...defaultConfig, ...applicationInsightsSnippet.config },
    initialize: ({ config }: { config: applicationInsightsConfig }) => {
      if (!config.connectionString) {
        throw new Error("No ApplicationInsights connectionString defined");
      }
      ai = new ApplicationInsights(applicationInsightsSnippet);
    },
    page: ({ payload }: any) => {
      ai.trackPageView();
    },
    track: ({ payload }: any) => {
      const { event, properties } = payload;
      ai.trackEvent(event, properties);
    },
    identify: ({ payload }: any) => {
      const { userId } = payload;
      ai.setAuthenticatedUserContext(userId);
    },
    loaded: () => {
      // return boolean so analytics knows when it can send data to third party
      return !!ai;
    },
  };
}
