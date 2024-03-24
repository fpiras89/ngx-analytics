import { Inject, ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule, DOCUMENT } from "@angular/common";
import { NGX_ANALYTICS_CONFIGURATION } from "./ngx-analytics.tokens";
import { NgxAnalyticsConfiguration } from "./ngx-analytics.models";
import { NgxAnalyticsService } from "./ngx-analytics.service";
import { Router, RouterEvent, Event, NavigationEnd } from "@angular/router";
import { filter } from "rxjs";

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class NgxAnalyticsModule {
  constructor(
    private analytics: NgxAnalyticsService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.router.events
      .pipe(
        filter(
          (e: Event | RouterEvent): e is RouterEvent =>
            e instanceof RouterEvent,
        ),
      )
      .subscribe((event: RouterEvent) => {
        if (event instanceof NavigationEnd) {
          this.analytics.page({
            url: this.document.defaultView?.location.href,
            search: Object.entries(
              this.router.routerState.root.snapshot.queryParams,
            ).reduce(
              (prev, [key, value], index) =>
                index > 0 ? `${prev}&${key}=${value}` : `${key}=${value}`,
              "",
            ),
            path: this.router.url,
          });
        }
      });
  }

  static forRoot(
    config:
      | NgxAnalyticsConfiguration
      | ((args?: any) => NgxAnalyticsConfiguration),
    deps?: any[],
  ): ModuleWithProviders<NgxAnalyticsModule> {
    return {
      ngModule: NgxAnalyticsModule,
      providers: [
        NgxAnalyticsService,
        typeof config === "function"
          ? {
              provide: NGX_ANALYTICS_CONFIGURATION,
              useFactory: config,
              deps,
            }
          : {
              provide: NGX_ANALYTICS_CONFIGURATION,
              useValue: config,
            },
      ],
    };
  }
}
