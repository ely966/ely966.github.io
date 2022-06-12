import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarmascotaComponent } from './editarmascota/editarmascota.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    EditarmascotaComponent
  ],
  imports: [
    CommonModule,

    ReactiveFormsModule,
    MatIconModule,
    RouterModule.forChild([
      {path:'editarMascota', component: EditarmascotaComponent}
    ])
  ],
  exports:[
    EditarmascotaComponent
  ]
})
export class EditarmascotaModule { }
