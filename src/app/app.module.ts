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
import { TlgHabilidadFormularioComponent } from './components/tasks/t-list/tl/tl-gestion/tlg-tarea-formulario/tlg-persona-formulario/tlg-habilidad-formulario/tlg-habilidad-formulario.component';
import { TlgPersonaFormularioComponent } from './components/tasks/t-list/tl/tl-gestion/tlg-tarea-formulario/tlg-persona-formulario/tlg-persona-formulario.component';
import { TlgTareaFormularioComponent } from './components/tasks/t-list/tl/tl-gestion/tlg-tarea-formulario/tlg-tarea-formulario.component';
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
    TlcFiltrosComponent,
    TlgHabilidadFormularioComponent,
    TlgPersonaFormularioComponent,
    TlgTareaFormularioComponent,
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
