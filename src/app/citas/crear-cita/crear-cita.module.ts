import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearCitaComponent } from './crear-cita/crear-cita.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    CrearCitaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    //BrowserModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'crearCita', component: CrearCitaComponent}
    ])
  ],
  exports: [
    CrearCitaComponent
  ]
})
export class CrearCitaModule { }
