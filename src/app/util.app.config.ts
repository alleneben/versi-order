import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken<AppConfig>("app.config");

export interface AppConfig {
    apiBase: string;
}

export const BaseAppConfig:AppConfig = {
    apiBase: "http://192.168.43.137/gym/service/"
    // apiBase: "http://worktimer.kitchencarelimited.com/server/",
    // apiBase: "https://orders.kitchencarelimited.com/server/"
};
