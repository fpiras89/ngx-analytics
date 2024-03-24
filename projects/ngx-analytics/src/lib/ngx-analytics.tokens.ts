import { InjectionToken } from "@angular/core";
import { NgxAnalyticsConfiguration } from "./ngx-analytics.models";

export const NGX_ANALYTICS_CONFIGURATION =
  new InjectionToken<NgxAnalyticsConfiguration>("NGX_ANALYTICS_CONFIGURATION");
