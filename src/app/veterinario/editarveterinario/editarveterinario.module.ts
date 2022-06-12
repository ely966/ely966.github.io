import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarveterinarioComponent } from './editarveterinario/editarveterinario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    EditarveterinarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule,
    RouterModule.forChild(
      [{
      path:'veterinarioeditar', component: EditarveterinarioComponent,
    }])
  ],
  exports:[
    EditarveterinarioComponent
  ]
})
export class EditarveterinarioModule { }
