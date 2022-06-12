import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrardatosunamascotaComponent } from './mostrardatosunamascota/mostrardatosunamascota.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MostrardatosunamascotaComponent
  ],
  exports: [
    ReactiveFormsModule,
    MostrardatosunamascotaComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FontAwesomeModule,
    RouterModule.forChild([
      {path:'mostrardatosunaMascota', component: MostrardatosunamascotaComponent}
    ])
  ]
})
export class MostrardatosunamascotaModule { }
