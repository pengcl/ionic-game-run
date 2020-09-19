import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CoreModule.forRoot(),
        ThemeModule.forRoot(),
        IonicModule.forRoot({
            mode: 'ios',
            hardwareBackButton: false
        }),
        AppRoutingModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: 'PREFIX_URL', useValue: 'http://120.25.198.225:1339'},
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
