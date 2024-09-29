import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ALoginComponent } from './components/authentication/a-login/a-login/a-login.component';
import { LoginComponent } from './components/authentication/a-login/login/login.component';
import { RSignUpComponent } from './components/register/r-sign-up/r-sign-up/r-sign-up.component';
import { SignUpComponent } from './components/register/r-sign-up/sign-up/sign-up.component';
import { TlcFiltrosComponent } from './components/tasks/t-list/tl/tl-consulta/tlc-filtros/tlc-filtros.component';
import { TlcTablaComponent } from './components/tasks/t-list/tl/tl-consulta/tlc-tabla/tlc-tabla.component';
import { TlcComponent } from './components/tasks/t-list/tl/tl-consulta/tlc/tlc.component';
import { TlghFormularioComponent } from './components/tasks/t-list/tl/tl-gestion/tlg-habilidad/tlgh-formulario/tlgh-formulario.component';
import { TlghComponent } from './components/tasks/t-list/tl/tl-gestion/tlg-habilidad/tlgh/tlgh.component';
import { TlgpFormularioComponent } from './components/tasks/t-list/tl/tl-gestion/tlg-persona/tlgp-formulario/tlgp-formulario.component';
import { TlgpComponent } from './components/tasks/t-list/tl/tl-gestion/tlg-persona/tlgp/tlgp.component';
import { TlgtFormularioComponent } from './components/tasks/t-list/tl/tl-gestion/tlg-tarea/tlgt-formulario/tlgt-formulario.component';
import { TlgtComponent } from './components/tasks/t-list/tl/tl-gestion/tlg-tarea/tlgt/tlgt.component';
import { TlgComponent } from './components/tasks/t-list/tl/tl-gestion/tlg/tlg.component';
import { ContentComponent } from './shared/components/UI/common/content/content.component';
import { FooterComponent } from './shared/components/UI/common/footer/footer.component';
import { HeaderComponent } from './shared/components/UI/common/header/header.component';
import { LoadingComponent } from './shared/components/UI/common/loading/loading.component';
import { LogoComponent } from './shared/components/UI/common/logo/logo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    TlcTablaComponent,
    LogoComponent,
    FooterComponent,
    ContentComponent,
    ALoginComponent,
    RSignUpComponent,
    LoadingComponent,
    HeaderComponent,
    LogoComponent,
    TlcComponent,
    TlgComponent,
    TlghComponent,
    TlgpComponent,
    TlcFiltrosComponent,
    TlghFormularioComponent,
    TlgpFormularioComponent,
    TlgtComponent,
    TlgtFormularioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),

    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
