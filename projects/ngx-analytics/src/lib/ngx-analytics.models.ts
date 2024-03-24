import { AnalyticsPlugin } from "analytics";

export interface NgxAnalyticsConfiguration {
  app?: string;
  version?: string;
  debug?: boolean;
  plugins?: AnalyticsPluginExtended[];
  plugAngularPlugin?: boolean;
}

export type AnalyticsPluginExtended = AnalyticsPlugin 
  & Record<"methods",  Record<string, (...args: any[]) => any>>
  & Record<"name", string>
  & Record<string, any> 
