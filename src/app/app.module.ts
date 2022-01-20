import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
registerLocaleData(localeEs, 'es', localeEsExtra);

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ERROR_LEVEL, LoggerService, MyCoreModule } from 'src/lib/my-core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonComponentModule } from './common-component';
import { AjaxWaitInterceptor, MainModule } from './main';
import { AuthInterceptor, SecurityModule } from './security';
import { CommonServicesModule } from './common-services';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    CatalogoComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    MainModule, CommonServicesModule, CommonComponentModule, SecurityModule, MyCoreModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [
    LoggerService,
    { provide: ERROR_LEVEL, useValue: environment.ERROR_LEVEL  },
    { provide: LOCALE_ID, useValue: 'es-ES'},
    { provide: HTTP_INTERCEPTORS, useClass: AjaxWaitInterceptor, multi: true, },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
