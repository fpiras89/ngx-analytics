import { Inject, Injectable } from "@angular/core";
import Analytics, { AnalyticsInstance, PageData } from "analytics";
import { NGX_ANALYTICS_CONFIGURATION } from "./ngx-analytics.tokens";
import {
  AnalyticsPluginExtended,
  NgxAnalyticsConfiguration,
} from "./ngx-analytics.models";

@Injectable()
export class NgxAnalyticsService {
  analytics: AnalyticsInstance;
  config: NgxAnalyticsConfiguration;

  constructor(
    @Inject(NGX_ANALYTICS_CONFIGURATION) config: NgxAnalyticsConfiguration,
  ) {
    this.config = config;
    this.analytics = Analytics(config);
  }

  /**
   *
   * @param userId
   * @param traits
   * @param options
   * @param callback
   * @returns
   */
  identify(
    userId: string,
    traits?: any,
    options?: any,
    callback?: ((...params: any[]) => any) | undefined,
  ) {
    this.debug("AnalyticsService.identify", ...arguments);
    return this.analytics.identify(userId, traits, options, callback);
  }

  /**
   *
   * @param eventName
   * @param payload
   * @param options
   * @param callback
   * @returns
   */
  track(
    eventName: string,
    payload?: any,
    options?: any,
    callback?: ((...params: any[]) => any) | undefined,
  ) {
    this.debug("AnalyticsService.track", ...arguments);
    return this.analytics.track(eventName, payload, options, callback);
  }

  /**
   *
   * @param data
   * @param options
   * @param callback
   * @returns
   */
  page(
    data?: PageData<string> | undefined,
    options?: any,
    callback?: ((...params: any[]) => any) | undefined,
  ) {
    this.debug("AnalyticsService.page", ...arguments);
    return this.analytics.page(data, options, callback);
  }

  /**
   *
   * @param key
   * @returns
   */
  user(key?: string | undefined) {
    this.debug("AnalyticsService.user", ...arguments);
    return this.analytics.user(key);
  }

  /**
   *
   * @param callback
   * @returns
   */
  reset(callback?: ((...params: any[]) => any) | undefined) {
    this.debug("AnalyticsService.reset", ...arguments);
    return this.analytics.reset(callback);
  }

  /**
   *
   * @param callback
   * @returns
   */
  ready(callback: (...params: any[]) => any) {
    this.debug("AnalyticsService.ready", ...arguments);
    return this.analytics.ready(callback);
  }

  /**
   *
   * @param name
   * @param callback
   * @returns
   */
  on(name: string, callback: (...params: any[]) => any) {
    this.debug("AnalyticsService.on", ...arguments);
    return this.analytics.on(name, callback);
  }

  /**
   *
   * @param name
   * @param callback
   * @returns
   */
  once(name: string, callback: (...params: any[]) => any) {
    this.debug("AnalyticsService.once", ...arguments);
    return this.analytics.once(name, callback);
  }

  /**
   *
   * @param key
   * @returns
   */
  getState(key?: string | undefined) {
    this.debug("AnalyticsService.getState", ...arguments);
    return this.analytics.getState(key);
  }

  /**
   *
   */
  get storage() {
    return this.analytics.storage;
  }

  /**
   *
   */
  get plugins() {
    return this.analytics.plugins;
  }

  /**
   * Inkoves custom method of Analytics plugin
   * @param method The method name
   * @param args The arguments to pass to the method
   * @returns A dictionary with the results for each plugin that supports the custom method
   */
  invokeMethod(method: string, ...args: any[]) {
    const results = {} as { [key: string]: any };
    this.config.plugins?.forEach((plugin: AnalyticsPluginExtended) => {
      if (plugin.methods && plugin.methods[method]) {
        results[plugin.name] = plugin.methods[method](args);
      }
    });
    return results;
  }

  private debug(message?: string, ...optionalParams: any[]) {
    this.config.debug && console.log(message, ...optionalParams);
  }
}
