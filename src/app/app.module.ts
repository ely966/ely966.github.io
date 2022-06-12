import { FooterModule } from './footer/footer.module';

import { LoginModule } from './login/login.module';
import { NavegadorHeaderModule } from './navegador-header/navegador-header.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteModule } from './cliente/cliente.module';
import { HomeModule } from './home/home.module';

import { PaginasUsuarioModule } from './paginas-usuario/paginas-usuario.module';
import { HttpClientModule } from '@angular/common/http'
import { AuthService } from './auth/auth.service';
import { ClienteService } from './servicios/cliente.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProtegerComponent } from './proteger/proteger/proteger.component';
import { CookieService } from 'ngx-cookie-service';
import { EmailValidatorService } from './servicios/email-validator.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataTablesModule } from 'angular-datatables';
import { AdministradorserviService } from './servicios/administradorservi.service';
import { ClienteguardianGuard } from './proteger/clienteguardian.guard';
import { ProtegerAdminGuard } from './proteger/proteger-admin.guard';
import { UploadFileServiceService } from './servicios/upload-file-service.service';
import { ModalMascotaVerService } from './servicios/modal-mascota-ver.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OtrasfuncionesdeadminModule } from './otrasfuncionesdeadmin/otrasfuncionesdeadmin.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    ClienteModule,
    PaginasUsuarioModule,
    NavegadorHeaderModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    FontAwesomeModule,
    DataTablesModule,
    FooterModule,
    BrowserAnimationsModule,
    OtrasfuncionesdeadminModule

  ], exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [ModalMascotaVerService,UploadFileServiceService, AuthService,ClienteguardianGuard, ClienteService,AdministradorserviService, ProtegerAdminGuard, ProtegerComponent,CookieService, EmailValidatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
