import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarcitaComponent } from './editarcita/editarcita.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    EditarcitaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    MatIconModule,
    //BrowserModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'editarCita', component: EditarcitaComponent}
    ])
  ]
})
export class EditarcitaModule { }
