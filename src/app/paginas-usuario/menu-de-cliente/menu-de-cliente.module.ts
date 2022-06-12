import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuClienteComponent } from './menu-cliente/menu-cliente.component';



@NgModule({
  declarations: [
    MenuClienteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(
      [{
      path:'menucliente', component: MenuClienteComponent,
    }])
  ],
  exports: [
    MenuClienteComponent
  ]
})
export class MenuDeClienteModule { }
