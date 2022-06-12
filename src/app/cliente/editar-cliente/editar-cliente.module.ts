import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    EditarClienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule.forChild(
      [{
      path:'clienteEditar', component: EditarClienteComponent,
    }])
  ],
  exports:[
    EditarClienteComponent,
  ]
})
export class EditarClienteModule { }
