import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarClientesComponent } from './mostrar-clientes/mostrar-clientes.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    MostrarClientesComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    FontAwesomeModule,
    RouterModule.forChild(
      [{
      path:'mostrarclientes', component: MostrarClientesComponent,
    }])
  ],
  exports:[
    MostrarClientesComponent
  ]

})
export class MostrarClientesModule { }
