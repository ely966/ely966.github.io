import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditadminComponent } from './editadmin/editadmin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    EditadminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule.forChild(
      [{
      path:'admineditar', component: EditadminComponent,
    }])
  ],
  exports:[
    EditadminComponent
  ]
})
export class EditadminModule { }
