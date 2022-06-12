import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditartusdatosComponent } from './editartusdatos/editartusdatos.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EditartusdatosComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'editarTusDatos', component: EditartusdatosComponent}
    ])
  ]
})
export class EditartusdatosModule { }
