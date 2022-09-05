import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomePageComponent } from './layout/welcome-page/welcome-page.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { registrationFormState } from './state/form.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ErrorRouteComponent } from './layout/error-route/error-route.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    DashboardComponent,
    ErrorRouteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxsModule.forRoot([registrationFormState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
