import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddadminComponent } from './addadmin/addadmin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AddadminComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule, //para poder recoger todo y poder hacer validacion de cada uno
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forChild(
      [{
      path:'adminAdd', component: AddadminComponent,
    }])
  ],
exports: [
  AddadminComponent
]
})
export class AddadminModule { }
