
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente/cliente.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ProtegerComponent } from '../proteger/proteger/proteger.component';



@NgModule({
  declarations: [
    ClienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forChild(
      [
        {
          path:'opcionClienteAdd',
          loadChildren: () => import('./registro-cliente/registro-cliente.module').then(m=> m.RegistroClienteModule),
        },
        {
          path:'opcionClienteEditar', canActivateChild:[ProtegerComponent],
          loadChildren: () => import('./editar-cliente/editar-cliente.module').then(m=> m.EditarClienteModule),
        },
        {
          path:'opcionClienteMostrar',
          loadChildren: () => import('./mostrar-clientes/mostrar-clientes.module').then(m=> m.MostrarClientesModule),
        },
      ]
    ),
  ],
  exports: [
    ClienteComponent
  ]
})
export class ClienteModule { }
