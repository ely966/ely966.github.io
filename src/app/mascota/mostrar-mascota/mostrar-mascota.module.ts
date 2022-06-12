import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarMascotaComponent } from './mostrar-mascota/mostrar-mascota.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    MostrarMascotaComponent
  ],
  exports: [
    MostrarMascotaComponent
  ],
  imports: [
    MatIconModule,
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild([
      {path:'mostrarMascota', component: MostrarMascotaComponent}
    ])
  ]
})
export class MostrarMascotaModule { }
