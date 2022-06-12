import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificaradminComponent } from './notificaradmin/notificaradmin.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NotificaradminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(
      [{
      path:'notificaradmin', component: NotificaradminComponent,
    }])
  ],
  exports:[
    NotificaradminComponent
  ]
})
export class NotificaradminModule { }
