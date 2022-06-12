import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearMascotaComponent } from './crear-mascota/crear-mascota.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    CrearMascotaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    RouterModule.forChild([
      {path:'addMascota', component: CrearMascotaComponent}
  ])
],
  exports:[
    CrearMascotaComponent
  ]
})
export class CrearMascotaModule { }
