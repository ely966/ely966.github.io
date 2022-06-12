import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    RegistroClienteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, //para poder recoger todo y poder hacer validacion de cada uno
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forChild(
      [{
      path:'clienteAdd', component: RegistroClienteComponent,
    }])
  ],

  exports: [
    RegistroClienteComponent
  ]
})
export class RegistroClienteModule { }
